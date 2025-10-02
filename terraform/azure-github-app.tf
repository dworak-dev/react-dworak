# App registration (AAD application)
resource "azuread_application" "github" {
  display_name = "sp-${var.project_name}-github"
}

# Service principal in the tenant for the app
resource "azuread_service_principal" "github" {
  client_id = azuread_application.github.client_id
}

# Client secret (password) for the service principal
resource "azuread_service_principal_password" "github" {
  service_principal_id = azuread_service_principal.github.id

  end_date = "2026-01-01T00:00:00Z"
}

# Permissions: give the SP rights where it should act from GitHub
# (Here: Contributor on the resource group. You can scope this wider/narrower.)
resource "azurerm_role_assignment" "github_rg_contributor" {
  scope                = azurerm_resource_group.rg.id
  role_definition_name = "Contributor"
  principal_id         = azuread_service_principal.github.object_id
}

locals {
  azure_credentials_json = jsonencode({
    clientId       = azuread_application.github.client_id
    clientSecret   = azuread_service_principal_password.github.value
    subscriptionId = data.azurerm_subscription.current.subscription_id
    tenantId       = data.azurerm_client_config.current.tenant_id
  })
}


