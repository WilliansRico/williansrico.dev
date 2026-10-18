data "http" "cloudflare_ips" {
  url = "https://www.cloudflare.com/ips-v4"
}

locals {
  cloudflare_ipv4_ranges = split("\n", trimspace(data.http.cloudflare_ips.response_body))
}