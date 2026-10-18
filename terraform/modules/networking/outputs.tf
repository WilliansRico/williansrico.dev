output "vpc_id" {
  type        = string
  description = "ID of the main VPC"
  value       = aws_vpc.main-vpc.id
  sensitive   = true
}

output "subnet_id" {
  type        = string
  description = "ID of the main subnet"
  value       = aws_subnet.main-subnet.id
  sensitive   = true
}

output "web_server_sg_id" {
  type        = list(string)
  description = "ID of the web server security_group"
  value       = [aws_security_group.web_server_sg.id]
  sensitive   = true
}

output "availability_zone" {
  type        = string
  description = "Resources availability zone"
  value       = aws_subnet.main-subnet.availability_zone
  sensitive   = true
}