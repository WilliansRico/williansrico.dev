data "terraform_remote_state" "compute" {
  backend = "remote"

  config = {
    organization = "terraform-portfolio-state"

    workspaces = {
      name = "dev-03-compute-layer"
    }
  }
}