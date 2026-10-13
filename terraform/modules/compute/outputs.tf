output "instance_public_ip_address" {
  type        = string
  description = "The instance public IP address"
  value       = aws_instance.web_server.public_ip
  sensitive   = true
}

output "client_certificate" {
  type        = string
  description = "The cloudflare required certificate for TLS"
  value       = tls_locally_signed_cert.cloudflare_client.cert_pem
  sensitive   = true
}

output "client_private_key" {
  type        = string
  description = "The cloudflare required private key for TLS"
  value       = tls_private_key.cloudflare_client.private_key_pem
  sensitive   = true
}