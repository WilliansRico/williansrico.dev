variable "aws_region" {
  description = "The AWS region to deploy resources in."
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "The instance type for the web server."
  type        = string
  default     = "t2.micro"
}