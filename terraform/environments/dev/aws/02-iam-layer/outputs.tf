output "ec2_ssm_role" {
  type        = string
  description = "The required role for EC2 instance access"
  value       = module.iam.ec2_ssm_role
  sensitive   = true
}

output "ec2_ssm_instance_profile_name" {
  type        = string
  description = "The EC2 instance profile name"
  value       = module.iam.ec2_ssm_instance_profile_name
  sensitive   = true
}