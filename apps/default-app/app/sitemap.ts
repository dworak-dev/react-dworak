import { defaultAppRouteConfigs } from "@packages/shared/routes";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.values(defaultAppRouteConfigs).map((route) =>
    route.getSiteMap(),
  );

  // Add more dynamic generated routes here if needed

  return routes;
}
