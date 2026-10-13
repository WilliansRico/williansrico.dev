output "vpc_id" {
  description = "The main webserver VPC ID"
  type        = string
  value       = module.networking.vpc_id
  sensitive   = true
}

output "subnet_id" {
  description = "The main webserver SUBNET ID"
  type        = string
  value       = module.networking.subnet_id
  sensitive   = true
}

output "web_server_sg" {
  description = "The web server security group"
  type        = list(string)
  value       = module.networking.web_server_sg_id
  sensitive   = true
}

output "availability_zone" {
  description = "The webserver host availability zone"
  type        = string
  value       = module.networking.availability_zone
  sensitive   = true
}