# Default Web App (APP) that pulls its image from the Container Registry (CR) using the Managed Identity (ID)
resource "azurerm_linux_web_app" "default_app" {
  for_each            = local.envs
  name                = "app-${each.key}-${var.project_name}-${var.default_app_name}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_service_plan.asp[each.key].location
  service_plan_id     = azurerm_service_plan.asp[each.key].id

  https_only = false

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.puller.id]
  }

  site_config {
    always_on = true
    application_stack {
      docker_image_name   = "${var.default_app_name}:${each.key}"
      docker_registry_url = "https://${azurerm_container_registry.cr.login_server}"
    }
    container_registry_use_managed_identity       = true
    container_registry_managed_identity_client_id = azurerm_user_assigned_identity.puller.client_id

    ip_restriction_default_action = "Deny"
    dynamic "ip_restriction" {
      for_each = local.cloudflare_ip_cidrs
      content {
        name       = "allow-cf-${replace(ip_restriction.value, "/[.:]/", "-")}"
        priority   = 100 + index(local.cloudflare_ip_cidrs, ip_restriction.value)
        action     = "Allow"
        ip_address = ip_restriction.value

        // TODO: add header based restrictions (previously existed, search in repo)
      }
    }

    // TODO: add scm ip restrictions (previously existed, search in repo)
  }

  app_settings = {
    # "DOCKER_ENABLE_CI"   = "true"
    "NEXT_PUBLIC_SENTRY_ENVIRONMENT" = each.key
  }
}

# Webhook in the Container Registry to notify the web app of new image pushes
resource "azurerm_container_registry_webhook" "default_app_webhook" {
  for_each            = local.envs
  name                = "webhook${each.key}${var.project_name}${replace(var.default_app_name, "-", "")}"
  resource_group_name = azurerm_resource_group.rg.name
  registry_name       = azurerm_container_registry.cr.name
  location            = azurerm_resource_group.rg.location
  service_uri         = "https://${azurerm_linux_web_app.default_app[each.key].site_credential[0].name}:${azurerm_linux_web_app.default_app[each.key].site_credential[0].password}@${azurerm_linux_web_app.default_app[each.key].name}.scm.azurewebsites.net/api/registry/webhook"
  status              = "enabled"
  scope               = "${var.default_app_name}:${each.key}"
  actions             = ["push"]
  custom_headers = {
    "Content-Type" = "application/json"
  }
}

# Custom domain and SSL certificate for the web app using the recently created records in Cloudflare DNS
resource "azurerm_app_service_custom_hostname_binding" "default_app" {
  for_each            = local.envs
  hostname            = "${local.envs[each.key].subdomain}.${var.default_app_domain}"
  app_service_name    = azurerm_linux_web_app.default_app[each.key].name
  resource_group_name = azurerm_resource_group.rg.name

  # Wait for the DNS records to be created before binding the custom domain
  depends_on = [
    time_sleep.wait_for_default_app_dns,
  ]
}

# SSL certificate for the custom domain using Azure Managed Certificate
resource "azurerm_app_service_managed_certificate" "default_app" {
  for_each                   = local.envs
  custom_hostname_binding_id = azurerm_app_service_custom_hostname_binding.default_app[each.key].id
}

# Bind the recently created SSL certificate to the custom domain
resource "azurerm_app_service_certificate_binding" "default_app" {
  for_each            = local.envs
  hostname_binding_id = azurerm_app_service_custom_hostname_binding.default_app[each.key].id
  certificate_id      = azurerm_app_service_managed_certificate.default_app[each.key].id
  ssl_state           = "SniEnabled"
}
