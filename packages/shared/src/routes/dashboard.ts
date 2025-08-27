import { publicVars } from "../publicVars";
import { RouteConfig, RouteConfigParams } from "./RouteConfig";

/*
 * Only purpose of extending this class is to set the baseUrl automatically.
 * This way, we don't have to set it manually for each route.
 * dworak.dev
 */
export class DashboardRouteConfig extends RouteConfig {
  constructor({
    original,
    rewrite,
    isProtected,
    additionalRewrites = [],
    sitemapConfig,
  }: Omit<RouteConfigParams, "baseUrl">) {
    super({
      original,
      rewrite,
      baseUrl: publicVars.DASHBOARD_BASE_URL,
      isProtected,
      additionalRewrites,
      sitemapConfig,
    });
  }
}

const stats = new DashboardRouteConfig({
  original: "/stats",
  rewrite: "/estadisticas",
  isProtected: true,
  additionalRewrites: ["/another-example", "/test/another-example"],
  sitemapConfig: {
    priority: 0.8,
    changeFrequency: "daily",
    lastModified: new Date(),
  },
});

const charts = new DashboardRouteConfig({
  original: "/charts",
  rewrite: "/graficas",
  isProtected: false,
  sitemapConfig: {
    priority: 0.5,
    changeFrequency: "weekly",
    lastModified: new Date(),
  },
});

export const dashboardRouteConfigs = {
  stats,
  charts,
};
