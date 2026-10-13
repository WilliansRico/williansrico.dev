variable "aws_region" {
  description = "The AWS region to deploy the ephimeral testing resources in."
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "The ephimeral testing instance type for the web server."
  type        = string
  default     = "t2.micro"
}

variable "email_alerts" {
  description = "The email address to receive billing and all types of alerts."
  type        = string
  sensitive   = true
}

variable "domain_name" {
  description = "Domain name"
  type        = string
  default     = "dev.williansrico.dev"
}

variable "environment" {
  description = "Testing environment"
  type        = string
  default     = "DEV"
}