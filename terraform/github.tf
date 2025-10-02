# Set credentials so GitHub can interact with Azure
resource "github_actions_secret" "azure_credentials" {
  repository      = var.github_repo
  secret_name     = "AZURE_CREDENTIALS"
  plaintext_value = local.azure_credentials_json
}

# Set repository variable for pushing to ACR
resource "github_actions_variable" "acr_name" {
  repository    = data.github_repository.repo.name
  variable_name = "ACR_NAME"
  value         = azurerm_container_registry.cr.name
}

# Set repository variable for pushing to ACR
resource "github_actions_variable" "acr_login_server" {
  repository    = data.github_repository.repo.name
  variable_name = "ACR_LOGIN_SERVER"
  value         = azurerm_container_registry.cr.login_server
}


# Create GitHub Actions environment
resource "github_repository_environment" "repo_environment" {
  for_each    = local.envs
  repository  = data.github_repository.repo.name
  environment = each.key
}

# Set repository environment varible for each env with the docker image name
resource "github_actions_variable" "docker_image" {
  repository    = data.github_repository.repo.name
  variable_name = "DOCKER_IMAGE_NAME"
  value         = var.default_app_name
}

# Set repository environment varible for each env with the docker image name
resource "github_actions_environment_variable" "docker_image" {
  for_each      = local.envs
  repository    = data.github_repository.repo.name
  environment   = github_repository_environment.repo_environment[each.key].environment
  variable_name = "DOCKER_IMAGE_TAG"
  value         = each.key
}


