terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.48.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.1.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.2.0"
    }
  }

  required_version = "~> 1.0"
}

provider "aws" {
  region = var.aws_region
}

resource "aws_apigatewayv2_api" "lambda" {
  name          = "serverless_lambda_gw"
  protocol_type = "HTTP"
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = aws_apigatewayv2_api.lambda.name

  retention_in_days = 30
}

resource "aws_apigatewayv2_stage" "lambda" {
  api_id = aws_apigatewayv2_api.lambda.id

  name        = "beer-backend-prod"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

# LAMBDA ZIP FILE

data "archive_file" "beer_backend_lambda_zip" {
  type = "zip"
  source_dir  = "../artifacts/compiled-ts/back-end"
  output_path = "../artifacts/built-lambdas/beer_backend_lambdas.zip"
  output_file_mode = "0666"
}

resource "aws_s3_bucket_object" "beer_backend_lambda_zip" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "beer_backend_lambdas.zip"
  source = data.archive_file.beer_backend_lambda_zip.output_path

  etag = filemd5(data.archive_file.beer_backend_lambda_zip.output_path)
}

# LAYER FOR NODE MODULES ######################

data "archive_file" "beer_backend_node_modules_zip" {
  type = "zip"
  source_dir  = "../lambda-node-modules"
  output_path = "../artifacts/lambda-node-modules.zip"
  output_file_mode = "0666"
}

resource "aws_s3_bucket_object" "beer_backend_node_modules_zip" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "beer_backend_node_modules.zip"
  source = data.archive_file.beer_backend_node_modules_zip.output_path

  etag = filemd5(data.archive_file.beer_backend_node_modules_zip.output_path)
}

resource "aws_lambda_layer_version" "node_modules_layer" {
  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_bucket_object.beer_backend_node_modules_zip.key

  layer_name = "node_modules_layer"

  compatible_runtimes = ["nodejs14.x"]
  source_code_hash = data.archive_file.beer_backend_node_modules_zip.output_base64sha256
}

# HELLO WORLD ##########################

# resource "aws_lambda_function" "hello_world" {
#   function_name = "HelloWorld"

#   s3_bucket = aws_s3_bucket.lambda_bucket.id
#   s3_key    = aws_s3_bucket_object.beer_backend_lambda_zip.key

#   runtime = "nodejs14.x"
#   handler = "lambdas/hello-world.handler"

#   source_code_hash = data.archive_file.beer_backend_lambda_zip.output_base64sha256

#   role = aws_iam_role.lambda_exec.arn
# }

# resource "aws_cloudwatch_log_group" "hello_world" {
#   name = "/aws/lambda/${aws_lambda_function.hello_world.function_name}"

#   retention_in_days = 30
# }

# resource "aws_apigatewayv2_integration" "hello_world" {
#   api_id = aws_apigatewayv2_api.lambda.id

#   integration_uri    = aws_lambda_function.hello_world.invoke_arn
#   integration_type   = "AWS_PROXY"
#   integration_method = "POST"
# }

# resource "aws_apigatewayv2_route" "hello_world" {
#   api_id = aws_apigatewayv2_api.lambda.id

#   route_key = "GET /hello"
#   target    = "integrations/${aws_apigatewayv2_integration.hello_world.id}"
# }

# resource "aws_cloudwatch_log_group" "api_gw" {
#   name = "/aws/api_gw/${aws_apigatewayv2_api.lambda.name}"

#   retention_in_days = 30
# }

# resource "aws_lambda_permission" "api_gw" {
#   statement_id  = "AllowExecutionFromAPIGateway"
#   action        = "lambda:InvokeFunction"
#   function_name = aws_lambda_function.hello_world.function_name
#   principal     = "apigateway.amazonaws.com"

#   source_arn = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
# }

module "hello_world_lambda" {
  source = "./modules/lambda-with-gateway"

  # Edit these
  function_name = "HelloWorld"
  handler_route = "lambdas/hello-world.handler"
  gateway_route = "GET /hello"

  # These shouldnt change probably
  iam_role = aws_iam_role.lambda_exec.arn
  lambda_layers = [aws_lambda_layer_version.node_modules_layer.arn]
  source_code_hash = data.archive_file.beer_backend_lambda_zip.output_base64sha256
  s3_bucket_object_id = aws_s3_bucket_object.beer_backend_lambda_zip.key
  s3_bucket_id = aws_s3_bucket.lambda_bucket.id
  api_id = aws_apigatewayv2_api.lambda.id
  api_execution_arn = aws_apigatewayv2_api.lambda.execution_arn
}

module "recipe_get_by_id_lambda" {
  source = "./modules/lambda-with-gateway"

  # Edit these
  function_name = "GetRecipeById"
  handler_route = "lambdas/recipes/get-by-id.handler"
  gateway_route = "GET /recipe"

  # These shouldn't change probably
  iam_role = aws_iam_role.lambda_exec.arn
  lambda_layers = [aws_lambda_layer_version.node_modules_layer.arn]
  source_code_hash = data.archive_file.beer_backend_lambda_zip.output_base64sha256
  s3_bucket_object_id = aws_s3_bucket_object.beer_backend_lambda_zip.key
  s3_bucket_id = aws_s3_bucket.lambda_bucket.id
  api_id = aws_apigatewayv2_api.lambda.id
  api_execution_arn = aws_apigatewayv2_api.lambda.execution_arn
}

# GET RECIPE BY ID ######################

# resource "aws_lambda_function" "get_recipe_by_id" {
#   function_name = "GetRecipeById"

#   s3_bucket = aws_s3_bucket.lambda_bucket.id
#   s3_key    = aws_s3_bucket_object.beer_backend_lambda_zip.key

#   runtime = "nodejs14.x"
#   handler = "lambdas/recipes/get-by-id.handler"

#   source_code_hash = data.archive_file.beer_backend_lambda_zip.output_base64sha256
#   layers = [aws_lambda_layer_version.node_modules_layer.arn]

#   role = aws_iam_role.lambda_exec.arn
# }

# resource "aws_cloudwatch_log_group" "get_recipe_by_id" {
#   name = "/aws/lambda/${aws_lambda_function.get_recipe_by_id.function_name}"

#   retention_in_days = 30
# }

# resource "aws_apigatewayv2_integration" "get_recipe_by_id" {
#   api_id = aws_apigatewayv2_api.lambda.id

#   integration_uri    = aws_lambda_function.get_recipe_by_id.invoke_arn
#   integration_type   = "AWS_PROXY"
#   integration_method = "POST"
# }

# resource "aws_apigatewayv2_route" "get_recipe_by_id" {
#   api_id = aws_apigatewayv2_api.lambda.id

#   route_key = "GET /recipe"
#   target    = "integrations/${aws_apigatewayv2_integration.get_recipe_by_id.id}"
# }

# resource "aws_cloudwatch_log_group" "get_recipe_by_id_log_group" {
#   name = "/aws/get_recipe_by_id/${aws_apigatewayv2_api.lambda.name}"

#   retention_in_days = 30
# }

# resource "aws_lambda_permission" "get_recipe_by_id_permission" {
#   statement_id  = "AllowExecutionFromAPIGateway"
#   action        = "lambda:InvokeFunction"
#   function_name = aws_lambda_function.get_recipe_by_id.function_name
#   principal     = "apigateway.amazonaws.com"

#   source_arn = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
# }