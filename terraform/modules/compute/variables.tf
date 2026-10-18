variable "email_alerts" {
  description = "The module email alert variable placeholder"
  type        = string
}

variable "instance_type" {
  description = "The module instance type variable placeholder"
  type        = string
}

variable "environment" {
  description = "The module environment variable placeholder"
  type        = string
}

variable "domain_name" {
  description = "The module environment domain name variable placeholder"
  type        = string
}

variable "vpc_security_group_ids" {
  description = "List of security group IDs for the web server"
  type        = list(string)
}

variable "subnet_id" {
  description = "The subnet ID where the EC2 instance will be deployed"
  type        = string
}

variable "iam_instance_profile" {
  description = "The IAM instance profile name to attach to the EC2 instance"
  type        = string
}