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

  validity_period_hours = 4745 # 6.5 months in hours 
  is_ca_certificate     = true

  allowed_uses = [
    "cert_signing",
    "crl_signing"
  ]
}

resource "tls_private_key" "cloudflare_client" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "tls_cert_request" "cloudflare_client" {
  private_key_pem = tls_private_key.cloudflare_client.private_key_pem

  subject {
    common_name  = "Cloudflare AOP ${var.domain_name}"
    organization = "My ${var.domain_name} Portfolio"
  }
}

resource "tls_locally_signed_cert" "cloudflare_client" {
  cert_request_pem = tls_cert_request.cloudflare_client.cert_request_pem

  ca_private_key_pem = tls_private_key.root_ca.private_key_pem
  ca_cert_pem        = tls_self_signed_cert.root_ca.cert_pem

  validity_period_hours = 4745 # 6.5 months in hours

  allowed_uses = [
    "digital_signature",
    "client_auth"
  ]
}