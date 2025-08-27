import { publicVars } from "@packages/shared/publicVars";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${publicVars.DASHBOARD_BASE_URL}/sitemap.xml`,
  };
}
