output "vpc_id" {
  description = "ID of the main VPC"
  value       = aws_vpc.main-vpc.id
  sensitive   = true
}

output "subnet_id" {
  description = "ID of the main subnet"
  value       = aws_subnet.main-subnet.id
  sensitive   = true
}

output "web_server_sg_id" {
  description = "ID of the web server security_group"
  value       = [aws_security_group.web_server_sg.id]
  sensitive   = true
}

output "availability_zone" {
  description = "Resources availability zone"
  value       = aws_subnet.main-subnet.availability_zone
  sensitive   = true
}