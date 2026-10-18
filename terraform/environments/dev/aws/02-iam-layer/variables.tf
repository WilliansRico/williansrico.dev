variable "environment" {
  description = "Infrastructure environment"
  type        = string
  default     = "DEV"
}

variable "aws_region" {
  description = "AWS infrastructure region"
  type        = string
  default     = "us-east-1"
}