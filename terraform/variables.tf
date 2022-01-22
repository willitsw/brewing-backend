# Input variable definitions

variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "us-east-2"
}

variable "domain_name" {
  type = string
  description = "The domain name for the website."
  default = "whatalesyou.net"
}

variable "bucket_name" {
  type = string
  description = "The name of the bucket without the www. prefix. Normally domain_name."
  default = "whatalesyou.net"
}

variable "common_tags" {
  description = "Common tags you want applied to all components."
  default = {
    Project = "WhatAlesYou"
  }
}