terraform {
  required_version = ">= 1.14.6"

  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "~> 5.92"
    }
  }  
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}