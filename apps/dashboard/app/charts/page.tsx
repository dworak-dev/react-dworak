import { dashboardStatsRouteConfig } from "@packages/common/routes/dashboard";

export default () => (
  <div>
    <h1 style={{ fontSize: 30 }}>Graficas</h1>
    <a href={dashboardStatsRouteConfig.getRoute()}>Estatidsticas</a>
  </div>
);
