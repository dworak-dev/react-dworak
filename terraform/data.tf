data "azurerm_client_config" "current" {}
data "azurerm_subscription" "current" {}

# Default app cloudlfare zone
data "cloudflare_zone" "default_app" {
  zone_id = var.cloudflare_zone_id
}

data "github_repository" "repo" {
  full_name = "${var.github_owner}/${var.github_repo}"
}

# Environments you want to provision
locals {
  envs = {
    staging = { subdomain = "staging.${var.default_app_subdomain}" }
    prod    = { subdomain = var.default_app_subdomain }
  }
}
