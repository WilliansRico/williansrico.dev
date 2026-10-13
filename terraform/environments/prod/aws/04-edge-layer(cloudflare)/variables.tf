variable "cloudflare_zone_id" {
  description = "Cloudflare required zone ID"
  type        = string
  sensitive   = true
}

variable "domain_name" {
  description = "The web domain name"
  type        = string
  default     = "williansrico.dev"
}

variable "environment" {
  description = "The server environment ID"
  type        = string
  default     = "PROD"
}

variable "cloudflare_api_token" {
  description = "The required API token for the cloudflare resources provisioning"
  type        = string
  sensitive   = true
}