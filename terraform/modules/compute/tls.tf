# AOP ROOT CA

resource "tls_private_key" "root_ca" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "tls_self_signed_cert" "root_ca" {
  private_key_pem = tls_private_key.root_ca.private_key_pem

  subject {
    common_name  = "${var.domain_name} AOP Root CA"
    organization = "My Portfolio"
  }

  validity_period_hours = 4745 # Approximately 198 days
  is_ca_certificate     = true

  allowed_uses = [
    "cert_signing",
    "crl_signing"
  ]
}

# CLOUDFLARE AOP CLIENT PRIVATE KEY

resource "tls_private_key" "cloudflare_client" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

# CLOUDFLARE AOP CLIENT CSR

resource "tls_cert_request" "cloudflare_client" {
  private_key_pem = tls_private_key.cloudflare_client.private_key_pem

  subject {
    common_name  = "Cloudflare AOP ${var.domain_name}"
    organization = "My Portfolio"
  }
}

# CLOUDFLARE AOP CLIENT CERTIFICATE

resource "tls_locally_signed_cert" "cloudflare_client" {
  cert_request_pem = tls_cert_request.cloudflare_client.cert_request_pem

  ca_private_key_pem = tls_private_key.root_ca.private_key_pem
  ca_cert_pem        = tls_self_signed_cert.root_ca.cert_pem

  validity_period_hours = 4745 # Approximately 198 days

  allowed_uses = [
    "digital_signature",
    "client_auth"
  ]
}

# ORIGIN SERVER PRIVATE KEY

resource "tls_private_key" "origin_server" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

# ORIGIN SERVER CERTIFICATE SIGNING REQUEST (CSR)

resource "tls_cert_request" "origin_server" {
  private_key_pem = tls_private_key.origin_server.private_key_pem

  subject {
    common_name  = var.domain_name
    organization = "My Portfolio"
  }

  dns_names = [
    var.domain_name,
    "*.${var.domain_name}"
  ]
}

# CLOUDFLARE ORIGIN CA CERTIFICATE

resource "cloudflare_origin_ca_certificate" "origin_server" {
  csr = tls_cert_request.origin_server.cert_request_pem

  hostnames = [
    var.domain_name,
    "*.${var.domain_name}"
  ]

  request_type       = "origin-rsa"
  requested_validity = 4745 # Approximately 198 days
}