output "instance_public_ip_address" {
  description = "The instance public IP address"
  value       = module.compute.instance_public_ip_address
  sensitive   = true
}

output "client_certificate" {
  description = "The cloudflare required certificate for TLS"
  value       = module.compute.client_certificate
  sensitive   = true
}

output "client_private_key" {
  description = "The cloudflare required private key for TLS"
  value       = module.compute.client_private_key
  sensitive   = true
}