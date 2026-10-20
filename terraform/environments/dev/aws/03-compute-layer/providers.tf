terraform {
  required_version = ">= 1.16.6"

  cloud {
    
    organization = "willians-organization"

    workspaces {
      name = "dev-03-compute-layer"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.68"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.4"
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