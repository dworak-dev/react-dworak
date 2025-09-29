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

variable "environment" {
  description = "The environment for the deployment (e.g., dev, staging, prod)"
  type        = string
  default     = "dev"
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
  default     = "default"
}

variable "default_app_domain" {
  description = "The custom domain for the default web application"
  type        = string
  default     = "dwk.dev"
}

variable "default_app_subdomain" {
  description = "The subdomain for the default web application"
  type        = string
  default     = "default5"
}

variable "default_app_image_name" {
  description = "The Docker image for the dashboard application"
  type        = string
  default     = "default:latest"
}
