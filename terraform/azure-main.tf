# Create the Azure Resource Group (RG) to hold all resources.
resource "azurerm_resource_group" "rg" {
  name     = "rg-${var.project_name}"
  location = var.location
}

# Container Registry (CR) to hold Docket images.
resource "azurerm_container_registry" "cr" {
  name                = "cr${var.project_name}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = false
}

# App Service Plans (one per env)
resource "azurerm_service_plan" "asp" {
  for_each            = local.envs
  name                = "asp-${each.key}-${var.project_name}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "B1" # change to a map if you want different SKUs per env
}

# Managed Identities to pull from ACR (one per env)
resource "azurerm_user_assigned_identity" "puller" {
  name                = "id-cr-puller-${var.project_name}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
}

# Grant AcrPull on the registry to each identity
resource "azurerm_role_assignment" "acr_pull" {
  scope                = azurerm_container_registry.cr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_user_assigned_identity.puller.principal_id
}
