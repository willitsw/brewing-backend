resource "aws_apigatewayv2_api" "lambda" {
  name          = "beer_lambda_api"
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

# resource "aws_api_gateway_usage_plan" "beer_usage_plan" {
#   name         = "beer-api-usage-plan"
#   api_stages {
#     api_id = aws_apigatewayv2_api.lambda.id
#     stage  = aws_apigatewayv2_stage.lambda.name
#   }

#   quota_settings {
#     limit  = 30000
#     period = "WEEK"
#   }

#   throttle_settings {
#     burst_limit = 20
#     rate_limit  = 40
#   }
# }