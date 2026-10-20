terraform {
  required_version = ">=1.16.6"

  cloud {
    
    organization = "willians-organization"

    workspaces {
      name = "prod-03-compute-layer"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }

    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.3"
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