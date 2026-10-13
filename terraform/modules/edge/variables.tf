variable "cloudflare_zone_id" {
  description = "The module required variable, environment based"
  type        = string
}

variable "domain_name" {
  description = "The module required variable, environment based"
  type        = string
}

variable "environment" {
  description = "The module required variable, environment based"
  type        = string
}

variable "server_public_ip" {
  description = "Public IP of the web server passed from compute module"
  type        = string
}

variable "client_certificate_pem" {
  description = "TLS client certificate PEM from compute module"
  type        = string
}

variable "client_private_key_pem" {
  description = "TLS client private key PEM from compute module"
  type        = string
}