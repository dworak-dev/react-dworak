# Fetch the latest Cloudflare IPv4 ranges
data "http" "cf_ipv4" {
  url = "https://www.cloudflare.com/ips-v4"
}

# Fetch the latest Cloudflare IPv6 ranges
data "http" "cf_ipv6" {
  url = "https://www.cloudflare.com/ips-v6"
}

locals {
  # Turn the response bodies into clean lists
  cloudflare_ipv4     = [for cidr in split("\n", trimspace(data.http.cf_ipv4.response_body)) : cidr if cidr != ""]
  cloudflare_ipv6     = [for cidr in split("\n", trimspace(data.http.cf_ipv6.response_body)) : cidr if cidr != ""]
  cloudflare_ip_cidrs = concat(local.cloudflare_ipv4, local.cloudflare_ipv6)
}
