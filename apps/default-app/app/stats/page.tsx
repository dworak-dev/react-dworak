import { defaultAppRouteConfigs } from "@packages/shared/routes";

export default () => (
  <div>
    <h1 style={{ fontSize: 30 }}>Estadisticas</h1>
    <a href={defaultAppRouteConfigs.charts.getRoute()}>Graficas</a>
  </div>
);
