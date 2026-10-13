#-------------------------------
# SNS Billing Alert Topic
#-------------------------------

resource "aws_sns_topic" "billing_alerts" {
  name = "Portfolio-${var.environment}-AWS-Billing-Alerts"
}

resource "aws_sns_topic_subscription" "billing_alerts_email" {
  topic_arn = aws_sns_topic.billing_alerts.arn
  protocol  = "email"
  endpoint  = var.email_alerts
}

#-------------------------------
# CloudWatch Billing Alarm
#-------------------------------

resource "aws_cloudwatch_metric_alarm" "billing_alarm" {
  alarm_name        = "Portfolio-${var.environment}-AWS-Billing-Alarm"
  alarm_description = "This alarm monitors the AWS billing charges and triggers when the estimated charges exceed $1 for the free tier."

  namespace   = "AWS/Billing"
  metric_name = "EstimatedCharges"
  dimensions = {
    Currency = "USD"
  }

  statistic          = "Maximum"
  period             = 21600 # 6 hours in seconds
  evaluation_periods = 1
  threshold          = 1.0

  comparison_operator = "GreaterThanOrEqualToThreshold"

  treat_missing_data = "notBreaching"

  alarm_actions = [
    aws_sns_topic.billing_alerts.arn
  ]

  tags = {
    Name = "Portfolio-${var.environment}-AWS-Billing-Alarm"
  }
}

#-------------------------------
# EC2 Instance Status Alarm
#-------------------------------

resource "aws_cloudwatch_metric_alarm" "ec2_status_check" {
  alarm_name        = "Portfolio_${var.environment}_EC2_Status_Check_Alarm"
  alarm_description = "This alarm monitors the EC2 instance status checks and triggers when the instance fails an AWS status check"

  namespace   = "AWS/EC2"
  metric_name = "StatusCheckFailed"

  dimensions = {
    InstanceId = aws_instance.web_server.id
  }

  statistic          = "Maximum"
  period             = 60
  evaluation_periods = 2

  threshold           = 1
  comparison_operator = "GreaterThanOrEqualToThreshold"

  treat_missing_data = "breaching"

  alarm_actions = [
    aws_sns_topic.billing_alerts.arn
  ]

  tags = {
    Name = "Portfolio-${var.environment}-EC2-Status-Check-Alarm"
  }
}

#-----------------------------------------
# EC2 CPU ALARM
#-----------------------------------------

resource "aws_cloudwatch_metric_alarm" "ec2_cpu_high" {
  alarm_name        = "Portfolio_${var.environment}_EC2_High_CPU"
  alarm_description = "Alerts when EC2 CPU utilization remains above 80%."

  namespace   = "AWS/EC2"
  metric_name = "CPUUtilization"

  dimensions = {
    InstanceId = aws_instance.web_server.id
  }

  statistic          = "Average"
  period             = 300
  evaluation_periods = 2

  threshold           = 80
  comparison_operator = "GreaterThanOrEqualToThreshold"

  treat_missing_data = "notBreaching"

  alarm_actions = [
    aws_sns_topic.billing_alerts.arn
  ]

  tags = {
    Name = "Portfolio_${var.environment}_EC2_High_CPU"
  }
}

#-----------------------------------------
# AWS COST ANOMALY DETECTION
#-----------------------------------------

resource "aws_ce_anomaly_monitor" "service_monitor" {
  name              = "Portfolio_${var.environment}_AWS_Service_Cost_Monitor"
  monitor_type      = "DIMENSIONAL"
  monitor_dimension = "SERVICE"
}

resource "aws_ce_anomaly_subscription" "cost_anomaly_alert" {
  name      = "Portfolio_${var.environment}_AWS_Cost_Anomaly_Alert"
  frequency = "DAILY"

  monitor_arn_list = [
    aws_ce_anomaly_monitor.service_monitor.arn
  ]

  subscriber {
    type    = "EMAIL"
    address = var.email_alerts
  }
}

#   Once the account is created, I need to enable the billing alerts manually
# AWS Console > Billing and Cost Management > Billing preferences