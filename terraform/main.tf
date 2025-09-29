resource "azurerm_resource_group" "rg" {
  name     = "rg-${var.environment}-${var.project_name}"
  location = var.location
}

// Container Registry (CR) to hold Docket images.
resource "azurerm_container_registry" "cr" {
  name                = "cr${var.environment}${var.project_name}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = false
}

// App Service Plans (ASP) are needed to host Web Apps (APP). All apps in an asp share the same compute resources.
resource "azurerm_service_plan" "asp" {
  name                = "asp-${var.environment}-${var.project_name}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "B1"
}


# Managed Identity (ID) meant for pulling images from the Container Registry
resource "azurerm_user_assigned_identity" "puller" {
  name                = "id-cr-puller"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
}

# Grant AcrPull on the registry to the identity
resource "azurerm_role_assignment" "acr_pull" {
  scope                = azurerm_container_registry.cr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_user_assigned_identity.puller.principal_id
}


# Default Web App (APP) that pulls its image from the Container Registry (CR) using the Managed Identity (ID)
resource "azurerm_linux_web_app" "default_app" {
  name                = "app-${var.environment}-${var.project_name}-${var.default_app_name}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_service_plan.asp.location
  service_plan_id     = azurerm_service_plan.asp.id

  https_only = true

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.puller.id]
  }

  site_config {
    always_on = true
    application_stack {
      docker_image_name   = var.default_app_image_name
      docker_registry_url = "https://${azurerm_container_registry.cr.login_server}"
    }
    container_registry_use_managed_identity       = true
    container_registry_managed_identity_client_id = azurerm_user_assigned_identity.puller.client_id

    # 🔐 deny by default; we'll only ALLOW Cloudflare + expected host below
    ip_restriction_default_action = "Deny"

    # ✅ Allow rules: Cloudflare IPs AND x-forwarded-host = your custom domain
    dynamic "ip_restriction" {
      for_each = local.cloudflare_ip_cidrs
      content {
        name       = "allow-cf-${replace(ip_restriction.value, "/[.:]/", "-")}"
        priority   = 100 + index(local.cloudflare_ip_cidrs, ip_restriction.value)
        action     = "Allow"
        ip_address = ip_restriction.value

        #headers {
        #x_forwarded_host = [
        #local.default_app_fqdn,
        #"www.${local.default_app_fqdn}",
        #]
        #}
      }
    }

    # Do the same for the Kudu/SCM site
    scm_ip_restriction_default_action = "Deny"

    dynamic "scm_ip_restriction" {
      for_each = local.cloudflare_ip_cidrs
      content {
        name       = "allow-cf-scm-${replace(scm_ip_restriction.value, "/[.:]/", "-")}"
        priority   = 100 + index(local.cloudflare_ip_cidrs, scm_ip_restriction.value)
        action     = "Allow"
        ip_address = scm_ip_restriction.value

        #headers {
        #x_forwarded_host = [
        #local.default_app_fqdn,
        #"www.${local.default_app_fqdn}",
        #]
        #}
      }
    }
  }

  app_settings = {
    "DOCKER_ENABLE_CI" = "true"
  }
}

# Custom domain and SSL certificate for the web app using the recently created records in Cloudflare DNS
resource "azurerm_app_service_custom_hostname_binding" "default_app" {
  hostname            = "${var.default_app_subdomain}.${var.default_app_domain}"
  app_service_name    = azurerm_linux_web_app.default_app.name
  resource_group_name = azurerm_resource_group.rg.name

  # Wait for the DNS records to be created before binding the custom domain
  depends_on = [
    time_sleep.wait_for_dns,
  ]
}

# SSL certificate for the custom domain using Azure Managed Certificate
resource "azurerm_app_service_managed_certificate" "default_app" {
  custom_hostname_binding_id = azurerm_app_service_custom_hostname_binding.default_app.id
}

# Bind the recently created SSL certificate to the custom domain
resource "azurerm_app_service_certificate_binding" "default_app" {
  hostname_binding_id = azurerm_app_service_custom_hostname_binding.default_app.id
  certificate_id      = azurerm_app_service_managed_certificate.default_app.id
  ssl_state           = "SniEnabled"
}
