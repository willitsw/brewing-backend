resource "aws_dynamodb_table" "recipe_table" {
  name             = "recipes"
  hash_key         = "id"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
      name = "user"
      type = "S"
  }

  global_secondary_index {
    name               = "userIndex"
    hash_key           = "user"
    write_capacity     = 5
    read_capacity      = 5
    projection_type    = "ALL"
  }
}