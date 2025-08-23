import { DashboardRouteConfig } from "./DashboardRouteConfig";
import { RouteConfig } from "./RouteConfig";

export const dashboardStatsRouteConfig = new DashboardRouteConfig(
  "/stats",
  "/estadisticas",
  ["/another-example", "/test/another-example"],
);

export const dashboardRouteConfigs: RouteConfig[] = [dashboardStatsRouteConfig];
