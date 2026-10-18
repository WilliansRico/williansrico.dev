variable "aws_region" {
  description = "AWS resources region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Resource environment"
  type        = string
  default     = "DEV"
}