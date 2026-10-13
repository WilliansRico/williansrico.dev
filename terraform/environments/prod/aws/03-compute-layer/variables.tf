variable "environment" {
  description = "Web server Environment ID"
  type        = string
  default     = "PROD"
}

variable "domain_name" {
  description = "Portfolio Domain"
  type        = string
  default     = "williansrico.dev"
}

variable "email_alerts" {
  description = "Email for the sytem generated alerts"
  type        = string
  sensitive   = true
}

variable "instance_type" {
  description = "Web host instance type"
  type        = string
  default     = "t3.small"
}

variable "aws_region" {
  description = "The AWS region to deploy the ephimeral testing resources in."
  type        = string
  default     = "us-east-1"
}