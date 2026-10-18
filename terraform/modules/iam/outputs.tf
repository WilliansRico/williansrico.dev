output "ec2_ssm_role" {
  type        = string
  description = "The required role for EC2 instance access"
  value       = aws_iam_role.ec2_ssm_role.id
  sensitive   = true
}

output "ec2_ssm_instance_profile_name" {
  type        = string
  description = "The EC2 instance profile name"
  value       = aws_iam_instance_profile.ec2_ssm_instance_profile.name
  sensitive   = true
}