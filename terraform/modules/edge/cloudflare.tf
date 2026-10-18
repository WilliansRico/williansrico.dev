#-----------------------------------------
# CLOUDFLARE PROXIED DNS RECORDS
#-----------------------------------------

# ROOT DOMAIN (APEX)

resource "cloudflare_dns_record" "root" {
  zone_id = var.cloudflare_zone_id

  name    = "@"
  type    = "A"
  content = var.server_public_ip

  ttl     = 1
  proxied = true

  comment = "Portfolio ${var.environment} root proxied domain"
}


# SUBDOMAIN REDIRECTION (Prod Only)

resource "cloudflare_dns_record" "www" {
  # Use this redirect if it's PROD only, otherwise skip as this suffix is not valid for DEV
  count = lower(var.environment) == "prod" ? 1 : 0

  zone_id = var.cloudflare_zone_id

  name    = "www"
  type    = "A"
  content = "192.0.2.1"

  ttl     = 1
  proxied = true

  comment = "Portfolio ${var.environment} www proxied subdomain"
}

#-----------------------------------------
# CLOUDFLARE REDIRECTS
#-----------------------------------------

resource "cloudflare_ruleset" "redirects" {
  zone_id     = var.cloudflare_zone_id
  name        = "Portfolio ${var.environment} Redirects"
  description = "HTTP to HTTPS and hostname redirects"
  kind        = "zone"
  phase       = "http_request_dynamic_redirect"

  rules = concat(
    [
      {
        ref         = "http_to_https"
        description = "Redirect HTTP traffic to HTTPS"
        expression  = "(http.request.scheme eq \"http\")"
        action      = "redirect"

        action_parameters = {
          from_value = {
            status_code = 301

            target_url = {
              expression = "concat(\"https://\", http.request.host, http.request.uri.path)"
            }

            preserve_query_string = true
          }
        }
      }
    ],
    lower(var.environment) == "prod" ? [
      {
        ref         = "www_to_apex"
        description = "Redirect WWW hostname to apex domain"
        expression  = "(http.host eq \"${var.domain_name}\")"
        action      = "redirect"

        action_parameters = {
          from_value = {
            status_code = 301

            target_url = {
              expression = "concat(\"https://${var.domain_name}\", http.request.uri.path)"
            }

            preserve_query_string = true
          }
        }
      }
    ] : []
  )
}

#--------------------------------------
# SSL FULL STRICT MODE
#--------------------------------------

resource "cloudflare_zone_setting" "zone_settings_ssl_strict" {
  zone_id    = var.cloudflare_zone_id
  setting_id = "ssl"
  value      = "strict"
}

#----------------------------------------------------------------
# CLOUDFLARE AUTHENTICATED ORIGIN PULLS (AOP) PER-HOSTNAME LEVEL
#----------------------------------------------------------------

resource "cloudflare_authenticated_origin_pulls_hostname_certificate" "portfolio" {
  zone_id = var.cloudflare_zone_id

  certificate = var.client_certificate_pem
  private_key = var.client_private_key_pem
}

resource "cloudflare_authenticated_origin_pulls" "portfolio" {
  zone_id = var.cloudflare_zone_id

  config = [{
    hostname = var.domain_name
    cert_id  = cloudflare_authenticated_origin_pulls_hostname_certificate.portfolio.id
    enabled  = true
  }]
}