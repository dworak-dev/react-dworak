import { dashboardRouteConfigs } from "@packages/config/dashboardRouteConfigs";
import { NextConfig } from "next";

// Routes renames are imported from a shared config and mapped to the Next.js format.
const mappedRoutes = dashboardRouteConfigs
  .map((i) =>
    i.rewrites.map((rewrite) => ({
      source: rewrite,
      destination: i.original,
    })),
  )
  .flat();

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    // You might want to add more rewrites in here.

    return mappedRoutes;
  },
};

export default nextConfig;
