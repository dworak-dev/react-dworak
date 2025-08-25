import { dashboardChartsRouteConfig } from "@packages/common/routes/dashboard";

export default () => (
  <div>
    <h1 style={{ fontSize: 30 }}>Estadisticas</h1>
    <a href={dashboardChartsRouteConfig.getRoute()}>Graficas</a>
  </div>
);
