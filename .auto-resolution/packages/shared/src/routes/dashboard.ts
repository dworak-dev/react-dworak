import { envVars } from "../envVars";
import { RouteConfig } from "./RouteConfig";

export class DashboardRouteConfig extends RouteConfig {
  constructor(
    original: string,
    rewrite: string,
    isProtected: boolean,
    additionalRewrites: string[] = [],
  ) {
    super(
      original,
      rewrite,
      envVars.DASHBOARD_BASE_URL,
      isProtected,
      additionalRewrites,
    );
  }
}

export const dashboardStatsRouteConfig = new DashboardRouteConfig(
  "/stats",
  "/estadisticas",
  true,
  ["/another-example", "/test/another-example"],
);

export const dashboardChartsRouteConfig = new DashboardRouteConfig(
  "/charts",
  "/graficas",
  false,
);

export const dashboardRouteConfigs: RouteConfig[] = [
  dashboardStatsRouteConfig,
  dashboardChartsRouteConfig,
];
