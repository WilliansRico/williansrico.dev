terraform {
  required_version = ">= 1.16.6"

  cloud {
    
    organization = "willians-organization"

    workspaces {
      name = "dev-02-iam-layer"
    }
  }
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.68"
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