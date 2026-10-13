module "compute" {
  source = "../../../../modules/compute"

  environment            = var.environment
  domain_name            = var.domain_name
  email_alerts           = var.email_alerts
  instance_type          = var.instance_type
  vpc_security_group_ids = [data.terraform_remote_state.networking.outputs.web_server_sg_id]
  subnet_id              = data.terraform_remote_state.networking.outputs.subnet_id
  iam_instance_profile   = data.terraform_remote_state.iam.outputs.ec2_ssm_instance_profile_name
}