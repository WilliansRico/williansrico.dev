terraform {
  required_version = ">= 1.16.6"

  cloud {
    
    organization = "terraform-portfolio-state"

    workspaces {
      name = "dev-04-edge-layer"
    }
  }

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 6.68"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}