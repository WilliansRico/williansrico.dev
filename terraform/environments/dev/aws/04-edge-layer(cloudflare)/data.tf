data "terraform_remote_state" "compute" {
  backend = "local"
  config = {
    path = "../03-compute-layer/terraform.tfstate"
  }
}