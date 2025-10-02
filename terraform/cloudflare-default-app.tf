# Create DNS records in Cloudflare for the web app
resource "cloudflare_dns_record" "txt_asuid_default_app" {
  for_each = local.envs
  zone_id  = data.cloudflare_zone.default_app.zone_id
  name     = "asuid.${local.envs[each.key].subdomain}"
  ttl      = 300
  type     = "TXT"
  content  = azurerm_linux_web_app.default_app[each.key].custom_domain_verification_id
  proxied  = false
}

# CNAME record pointing to the Azure Web App default hostname
resource "cloudflare_dns_record" "cname_default_app" {
  for_each = local.envs
  zone_id  = data.cloudflare_zone.default_app.zone_id
  name     = local.envs[each.key].subdomain
  ttl      = 300
  type     = "CNAME"
  content  = azurerm_linux_web_app.default_app[each.key].default_hostname
  proxied  = false
}

# Wait for DNS propagation
resource "time_sleep" "wait_for_default_app_dns" {
  for_each = local.envs
  depends_on = [
    cloudflare_dns_record.txt_asuid_default_app,
    cloudflare_dns_record.cname_default_app
  ]
  create_duration = "120s"

  # Re-run the sleep if these values change (forces replace)
  triggers = {
    txt_content   = cloudflare_dns_record.txt_asuid_default_app[each.key].content
    txt_name      = cloudflare_dns_record.txt_asuid_default_app[each.key].name
    cname_content = cloudflare_dns_record.cname_default_app[each.key].content
    cname_name    = cloudflare_dns_record.cname_default_app[each.key].name
  }
}

# Enable Cloudflare proxying after the SSL certificate is bound
resource "null_resource" "enable_cf_proxy_after_cert" {
  for_each = local.envs
  depends_on = [
    azurerm_app_service_certificate_binding.default_app
  ]

  # force this to run whenever the binding changes
  triggers = {
    binding_id = azurerm_app_service_certificate_binding.default_app[each.key].id
    record_id  = cloudflare_dns_record.cname_default_app[each.key].id
  }

  provisioner "local-exec" {
    command = "curl -sS -X PATCH https://api.cloudflare.com/client/v4/zones/${data.cloudflare_zone.default_app.zone_id}/dns_records/${cloudflare_dns_record.cname_default_app[each.key].id} -H 'Authorization: Bearer ${var.cloudflare_api_token}' -H 'Content-Type: application/json' --data '${jsonencode({ proxied = true })}' >/dev/null"
  }
}

