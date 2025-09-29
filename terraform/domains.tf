# Default app cloudlfare zone
data "cloudflare_zone" "default_app" {
  zone_id = var.cloudflare_zone_id
}

data "http" "cf_ipv4" {
  url = "https://www.cloudflare.com/ips-v4"
}

data "http" "cf_ipv6" {
  url = "https://www.cloudflare.com/ips-v6"
}

locals {
  # turn the response bodies into clean lists
  cloudflare_ipv4     = [for cidr in split("\n", trimspace(data.http.cf_ipv4.response_body)) : cidr if cidr != ""]
  cloudflare_ipv6     = [for cidr in split("\n", trimspace(data.http.cf_ipv6.response_body)) : cidr if cidr != ""]
  cloudflare_ip_cidrs = concat(local.cloudflare_ipv4, local.cloudflare_ipv6)

  # your FQDN used in x-forwarded-host checks
  default_app_fqdn = "${var.default_app_subdomain}.${var.default_app_domain}"
}

# Create DNS records in Cloudflare for the web app
resource "cloudflare_dns_record" "txt_asuid_default_app" {
  zone_id = data.cloudflare_zone.default_app.zone_id
  name    = "asuid.${var.default_app_subdomain}"
  ttl     = 300
  type    = "TXT"
  content = azurerm_linux_web_app.default_app.custom_domain_verification_id
  proxied = false
}

# CNAME record pointing to the Azure Web App default hostname
resource "cloudflare_dns_record" "cname_default_app" {
  zone_id = data.cloudflare_zone.default_app.zone_id
  name    = var.default_app_subdomain
  ttl     = 300
  type    = "CNAME"
  content = azurerm_linux_web_app.default_app.default_hostname
  proxied = false
}

resource "time_sleep" "wait_for_dns" {
  depends_on = [
    cloudflare_dns_record.txt_asuid_default_app,
    cloudflare_dns_record.cname_default_app
  ]
  create_duration = "120s"

  # Re-run the sleep if these values change (forces replace)
  triggers = {
    txt_content   = cloudflare_dns_record.txt_asuid_default_app.content
    cname_content = cloudflare_dns_record.cname_default_app.content
    cname_name    = cloudflare_dns_record.cname_default_app.name
  }
}
