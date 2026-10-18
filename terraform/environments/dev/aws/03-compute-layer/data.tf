data "terraform_remote_state" "networking" {
  backend = "local"

  config = {
    path = "../01-networking-layer/terraform.tfstate"
  }
}

data "terraform_remote_state" "iam" {
  backend = "local"
  
  config = {
    path = "../02-iam-layer/terraform.tfstate"
  }
}