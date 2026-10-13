#---------------------------------
# FREE TIER AWS UBUNTU MACHINE LOOK UP
#---------------------------------

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # CANONICAL (Official Ubuntu image owner)
}

#---------------------------------
# EC2 INSTANCE SET UP
#---------------------------------

resource "aws_instance" "web_server" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  vpc_security_group_ids      = var.vpc_security_group_ids
  subnet_id                   = var.subnet_id
  iam_instance_profile        = var.iam_instance_profile
  associate_public_ip_address = true

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"
    http_put_response_hop_limit = 2
  }

  user_data = <<-EOF
    #!/bin/bash

    set -e

    exec > >(tee /var/log/user-data.log | logger -t user-data -s 2>/dev/console) 2>&1

    #--------------------------------
    # Nginx Installation
    #--------------------------------

    apt-get update
    apt-get install -y nginx

    systemctl enable nginx
    systemctl start nginx

    #--------------------------------
    # PUBLIC CERT UPLOAD
    #--------------------------------

    install -d -m 0755 /etc/nginx/ssl

    cat > /etc/nginx/ssl/aop-root-ca.crt <<'CERT'
    ${tls_self_signed_cert.root_ca.cert_pem}
    CERT

    chmod 0644 /etc/nginx/ssl/aop-root-ca.crt

    #--------------------------------
    # Docker Installation
    #--------------------------------

    apt-get install -y ca-certificates curl gnupg

    install -m 0755 -d /etc/apt/keyrings

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    chmod a+r /etc/apt/keyrings/docker.gpg

    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
      | tee /etc/apt/sources.list.d/docker.list > /dev/null

    apt-get update

    apt-get install -y \
      docker-ce \
      docker-ce-cli \
      containerd.io \
      docker-buildx-plugin \
      docker-compose-plugin

    usermod -aG docker ubuntu

    systemctl enable docker
    systemctl start docker

    EOF

  tags = {
    Name = "Portfolio_${var.environment}_WebServer_Instance"
  }
}