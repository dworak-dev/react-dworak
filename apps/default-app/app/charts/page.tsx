import { defaultAppRouteConfigs } from "@packages/shared/routes";

export default () => (
  <div>
    <h1 style={{ fontSize: 30 }}>Graficas</h1>
    <a href={defaultAppRouteConfigs.stats.getRoute()}>Estatidsticas</a>
  </div>
);
