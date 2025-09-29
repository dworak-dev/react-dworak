import { publicVars } from "@packages/shared/public-vars";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${publicVars.DEFAULT_APP_BASE_URL}/sitemap.xml`,
  };
}
