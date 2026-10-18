output "ec2_ssm_role" {
  description = "Instance required SSM role for access to replace SSH for extra security"
  type        = string
  value       = module.iam.ec2_ssm_role
  sensitive   = true
}

output "ec2_ssm_instance_profile_name" {
  description = "EC2 SSM role profile name"
  type        = string
  value       = module.iam.ec2_ssm_instance_profile_name
  sensitive   = true
}