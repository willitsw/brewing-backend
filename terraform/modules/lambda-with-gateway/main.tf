resource "aws_lambda_function" "function" {
  function_name = var.function_name

  s3_bucket = var.s3_bucket_id
  s3_key    = var.s3_bucket_object_id

  runtime = "nodejs14.x"
  handler = var.handler_route

  source_code_hash = var.source_code_hash
  layers = var.lambda_layers

  role = var.iam_role
}

resource "aws_cloudwatch_log_group" "log_group" {
  name = "/aws/lambda/${aws_lambda_function.function.function_name}"

  retention_in_days = 30
}

resource "aws_apigatewayv2_integration" "apigateway_integration" {
  api_id = var.api_id

  integration_uri    = aws_lambda_function.function.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "route" {
  api_id = var.api_id

  route_key = var.gateway_route
  target    = "integrations/${aws_apigatewayv2_integration.apigateway_integration.id}"
}

resource "aws_lambda_permission" "permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.function.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${var.api_execution_arn}/*/*"
}