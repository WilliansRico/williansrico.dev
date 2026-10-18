data "terraform_remote_state" "networking" {
  backend = "remote"

  config = {
    organization = "terraform-portfolio-state"

    workspaces = {
      name = "dev-01-networking-layer"
    }
  }
}

data "terraform_remote_state" "iam" {
  backend = "remote"
  
  config = {
    organization = "terraform-portfolio-state"

    workspaces = {
      name = "dev-02-iam-layer"
    }
  }
}