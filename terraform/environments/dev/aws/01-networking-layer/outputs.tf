output "vpc_id" {
  description = "ID of the main VPC"
  value       = module.networking.vpc_id
  sensitive   = true
}

output "subnet_id" {
  description = "ID of the main subnet"
  value       = module.networking.subnet_id
  sensitive   = true
}

output "web_server_sg_id" {
  description = "ID of the web server security_group"
  value       = module.networking.web_server_sg_id
  sensitive   = true
}

output "availability_zone" {
  description = "Resources availability zone"
  value       = module.networking.availability_zone
  sensitive   = true
}