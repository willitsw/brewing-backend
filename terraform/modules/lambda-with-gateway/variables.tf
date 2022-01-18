variable "function_name" {
  description = "Name of the lambda function."
  type        = string
}

variable "handler_route" {
    description = "Route to lambda handler. Ex: lambdas/recipes/get-by-id.handler"
    type = string
}

variable "gateway_route" {
    description = "The url segment that points to this lambda. Ex: GET /recipe"
    type = string
}

variable "s3_bucket_id" {
    description = "The id of the s3 bucket storing the lambda. Ex: aws_s3_bucket.lambda_bucket.id"
    type = string
}

variable "s3_bucket_object_id" {
    description = "The id of the s3 bucket object storing the lambda. Ex: aws_s3_bucket_object.beer_backend_lambda_zip.key"
    type = string
}

variable "source_code_hash" {
    description = "The hashed version of the archive file. EX: data.archive_file.beer_backend_lambda_zip.output_base64sha256"
    type = string
}

variable "lambda_layers" {
    description = "A list of the lambda layers that you want to use. Ex: [aws_lambda_layer_version.node_modules_layer.arn]"
    type = list
}

variable "iam_role" {
  description = "The arn of the iam role you want to apply to this lambda. Ex aws_iam_role.lambda_exec.arn"
  type = string
}

variable "api_id" {
    description = "The id of the api you want to use. Ex: aws_apigatewayv2_api.lambda.id"
    type = string
}

variable "api_execution_arn" {
  description = "The execution arn of the api you want to use. Ex: aws_apigatewayv2_api.lambda.execution_arn"
}