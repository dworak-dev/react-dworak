import { envVars } from "../envVars";
import { RouteConfig } from "./RouteConfig";

export class DashboardRouteConfig extends RouteConfig {
  constructor(
    original: string,
    rewrite: string,
    additionalRewrites: string[] = [],
  ) {
    super(original, rewrite, envVars.DASHBOARD_BASE_URL, additionalRewrites);
  }
}
