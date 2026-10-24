#-----------------------------------------------
# VPC RESOURCE
#-----------------------------------------------

resource "aws_vpc" "main-vpc" {
  cidr_block                       = "10.0.0.0/16"
  assign_generated_ipv6_cidr_block = true
  
  tags = {
    Name = "Portfolio_${var.environment}_VPC"
  }
}

#----------------------------------------------
# INTERNET GATEWAY RESOURCE
#----------------------------------------------

resource "aws_internet_gateway" "main-gateway" {
  vpc_id = aws_vpc.main-vpc.id

  tags = {
    Name = "Portfolio_${var.environment}_Internet_Gateway"
  }
}

#-------------------------------------------------
# AWS provider availabilty zones
#-------------------------------------------------

data "aws_availability_zones" "available" {
  state = "available"

  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}

#-------------------------------------------------
# SUBNET RESOURCE
#-------------------------------------------------

resource "aws_subnet" "main-subnet" {
  vpc_id                          = aws_vpc.main-vpc.id
  cidr_block                      = "10.0.1.0/24"
  ipv6_cidr_block                 = cidrsubnet(aws_vpc.main-vpc.ipv6_cidr_block, 8, 0)
  assign_ipv6_address_on_creation = true
  availability_zone               = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "Portfolio_${var.environment}_Subnet"
  }
}

#-----------------------------------------------
# ROUTE TABLE RESOURCE
#-----------------------------------------------

resource "aws_route_table" "main" {
  vpc_id = aws_vpc.main-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main-gateway.id
  }
  route {
    ipv6_cidr_block = "::/0"
    gateway_id      = aws_internet_gateway.main-gateway.id
  }
}

#---------------------------------------------
# ROUTE TABLE ASSOCIATION RESOURCE
#---------------------------------------------

resource "aws_route_table_association" "main" {
  subnet_id      = aws_subnet.main-subnet.id
  route_table_id = aws_route_table.main.id
}

#----------------------------------------------
# SECURITY GROUP AND IDENTITY
#----------------------------------------------

resource "aws_security_group" "web_server_sg" {
  name        = "Portfolio_${var.environment}_WebServer_SG"
  description = "Allow inbound/outbound traffic"
  vpc_id      = aws_vpc.main-vpc.id

  ingress {
    description      = "Allow HTTPS Acccess"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = local.cloudflare_ipv4_ranges #CloudFlare IPv4 IP Ranges
    ipv6_cidr_blocks = local.cloudflare_ipv6_ranges #CloudFlare IPv6 IP Ranges
  }

  egress {
    description = "Allow outbound IPv4 traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
  description      = "Allow outbound IPv6 traffic"
  from_port        = 0
  to_port          = 0
  protocol         = "-1"
  ipv6_cidr_blocks = ["::/0"]
}

  tags = {
    Name = "Portfolio_${var.environment}_WebServer_SG"
  }
}