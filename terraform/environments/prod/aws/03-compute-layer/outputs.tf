output "instance_public_ip_address" {
  type        = string
  description = "The instance public API address for the cloudflare configurations"
  value       = module.compute.instance_public_ip_address
  sensitive   = true
}

output "client_certificate" {
  type        = string
  description = "The client required certs"
  value       = module.compute.client_certificate
  sensitive   = true
}

output "client_private_key" {
  type        = string
  description = "The client required private key"
  value       = module.compute.client_private_key
  sensitive   = true
}

