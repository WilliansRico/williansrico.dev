module "cloudflare" {
  source = "../../../../modules/edge"

  cloudflare_zone_id     = var.cloudflare_zone_id
  domain_name            = var.domain_name
  environment            = var.environment
  server_public_ip       = data.terraform_remote_state.compute.outputs.instance_public_ip_address
  client_certificate_pem = data.terraform_remote_state.compute.outputs.client_certificate
  client_private_key_pem = data.terraform_remote_state.compute.outputs.client_private_key
}