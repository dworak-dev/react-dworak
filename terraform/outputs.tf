output "acr_name" {
  value       = azurerm_container_registry.cr.name
  description = "ACR name (useful for az acr login)."
}

output "acr_login_server" {
  value       = azurerm_container_registry.cr.login_server
  description = "Fully-qualified registry (e.g., crdevrg.azurecr.io)."
}
