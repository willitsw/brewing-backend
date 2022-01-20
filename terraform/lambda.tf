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

# LAMBDA FUNCTIONS ##########################

module "recipe_get_by_id_lambda" {
  # Edit these
  function_name = "RecipeGetById"
  handler_route = "lambdas/recipes/get-by-id.handler"
  gateway_route = "GET /recipes/{id}"

  # These shouldn't change probably
  source = "./modules/lambda-with-gateway"
  iam_role = aws_iam_role.lambda_exec.arn
  lambda_layers = [aws_lambda_layer_version.node_modules_layer.arn]
  source_code_hash = data.archive_file.beer_backend_lambda_zip.output_base64sha256
  s3_bucket_object_id = aws_s3_bucket_object.beer_backend_lambda_zip.key
  s3_bucket_id = aws_s3_bucket.lambda_bucket.id
  api_id = aws_apigatewayv2_api.lambda.id
  api_execution_arn = aws_apigatewayv2_api.lambda.execution_arn
}

module "recipe_get_by_user_lambda" {
  # Edit these
  function_name = "RecipeGetByUser"
  handler_route = "lambdas/recipes/get-by-user.handler"
  gateway_route = "GET /recipes/user/{id}"

  # These shouldn't change probably
  source = "./modules/lambda-with-gateway"
  iam_role = aws_iam_role.lambda_exec.arn
  lambda_layers = [aws_lambda_layer_version.node_modules_layer.arn]
  source_code_hash = data.archive_file.beer_backend_lambda_zip.output_base64sha256
  s3_bucket_object_id = aws_s3_bucket_object.beer_backend_lambda_zip.key
  s3_bucket_id = aws_s3_bucket.lambda_bucket.id
  api_id = aws_apigatewayv2_api.lambda.id
  api_execution_arn = aws_apigatewayv2_api.lambda.execution_arn
}

module "recipe_create_update_lambda" {
  # Edit these
  function_name = "RecipeCreateUpdate"
  handler_route = "lambdas/recipes/create-update.handler"
  gateway_route = "POST /recipes"

  # These shouldn't change probably
  source = "./modules/lambda-with-gateway"
  iam_role = aws_iam_role.lambda_exec.arn
  lambda_layers = [aws_lambda_layer_version.node_modules_layer.arn]
  source_code_hash = data.archive_file.beer_backend_lambda_zip.output_base64sha256
  s3_bucket_object_id = aws_s3_bucket_object.beer_backend_lambda_zip.key
  s3_bucket_id = aws_s3_bucket.lambda_bucket.id
  api_id = aws_apigatewayv2_api.lambda.id
  api_execution_arn = aws_apigatewayv2_api.lambda.execution_arn
}

module "recipe_delete_lambda" {
  # Edit these
  function_name = "RecipeDelete"
  handler_route = "lambdas/recipes/delete.handler"
  gateway_route = "DELETE /recipes/{id}"

  # These shouldn't change probably
  source = "./modules/lambda-with-gateway"
  iam_role = aws_iam_role.lambda_exec.arn
  lambda_layers = [aws_lambda_layer_version.node_modules_layer.arn]
  source_code_hash = data.archive_file.beer_backend_lambda_zip.output_base64sha256
  s3_bucket_object_id = aws_s3_bucket_object.beer_backend_lambda_zip.key
  s3_bucket_id = aws_s3_bucket.lambda_bucket.id
  api_id = aws_apigatewayv2_api.lambda.id
  api_execution_arn = aws_apigatewayv2_api.lambda.execution_arn
}