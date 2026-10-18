variable "domain_name" {
  description = "The module environment domain name variable placeholder"
  type        = string
  default     = "dev.williansrico.dev"
}

variable "cloudflare_api_token" {
  description = "The cloudflare account API required token"
  type        = string
  sensitive   = true
}

variable "cloudflare_zone_id" {
  description = "The module required variable, environment based"
  type        = string
}

variable "environment" {
  description = "The module required variable, environment based"
  type        = string
  default     = "DEV"
}