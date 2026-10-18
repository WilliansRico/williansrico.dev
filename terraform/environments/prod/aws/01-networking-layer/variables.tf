variable "environment" {
  description = "The PROD environment ID variable"
  type        = string
  default     = "PROD"
}

variable "aws_region" {
  description = "The AWS region to deploy the ephimeral testing resources in."
  type        = string
  default     = "us-east-1"
}