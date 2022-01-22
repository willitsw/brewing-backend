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

  backend "s3" {
    bucket = "whatalesyou-terraform"
    key = "prod/terraform.tfstate"
    region = "us-east-2"
  }

  required_version = "~> 1.0"
}

provider "aws" {
  region = var.aws_region
}

provider "aws" {
  alias = "acm_provider"
  region = "us-east-1"
}