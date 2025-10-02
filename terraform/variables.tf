variable "cloudflare_api_token" {
  description = "API token for Cloudflare"
  type        = string
  sensitive   = true
}

variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID for the domain"
  type        = string
}

variable "project_name" {
  description = "The name of the project"
  type        = string
  default     = "dworak"
}

variable "location" {
  description = "The Azure region where resources will be deployed"
  type        = string
  default     = "centralus"
}

variable "subscription_id" {
  description = "The Azure subscription ID"
  type        = string
}

variable "default_app_name" {
  description = "The name of the default web application"
  type        = string
  default     = "default-app"
}

variable "default_app_domain" {
  description = "The custom domain for the default web application"
  type        = string
  default     = "dwk.dev"
}

variable "default_app_subdomain" {
  description = "The subdomain for the default web application"
  type        = string
  default     = "default"
}

variable "github_token" {
  description = "GitHub PAT with 'repo' scope (and 'admin:org' if using org secrets)"
  type        = string
  sensitive   = true
}

variable "github_owner" {
  description = "GitHub user or org name (owner of the repo)"
  type        = string
}

variable "github_repo" {
  description = "Repository name (without owner)"
  type        = string
}

variable "sentry_auth_token" {
  description = "Sentry Auth Token with 'project:write' scope"
  type        = string
  sensitive   = true
}

variable "sentry_org" {
  description = "Sentry organization slug"
  type        = string
}

variable "sentry_project" {
  description = "Sentry project slug"
  type        = string
}
