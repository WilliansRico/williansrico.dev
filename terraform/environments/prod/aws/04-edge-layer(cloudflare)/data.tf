data "terraform_remote_state" "compute" {
  backend = "remote"

  config = {
    organization = "terraform-portfolio-state"

    workspaces = {
      name = "prod-03-compute-layer"
    }
  }
}