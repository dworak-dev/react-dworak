# @packages/shared

This package contains shared utilities, configurations and code used across multiple packages and applications.

## Installation

This package is already included in the monorepo and can be referenced in any project's `package.json`:

```json
{
  "devDependencies": {
    "@packages/assets": "*"
  }
}
```

> Do not forget to run `yarn` after modifying `package.json`.

## Env vars

Collection of variables meant to be shared across multiple packages and applications. The intention of having variables here instead of a .env file is to have a single source of truth for all the variables, and to be able to use TypeScript to ensure that all the variables are defined and have the correct type.

Variables are split into public and private. Public variables are prefixed with `NEXT_PUBLIC_` and can be used in the client side code. Private variables are prefix with `NEXT_PRIVATE_` and are only available in the server side code.

```ts
import { publicVars } from "@packages/shared/publicVars";
import { privateVars } from "@packages/shared/privateVars";

console.log(publicVars.SOME_ENV_VAR);
console.log(privateVars.SOME_PRIVATE_ENV_VAR);
```

## Routes

The route shared configuration helps with easy renaming, alternate routes and type safety.
All routes on all apps should be defined here, they are used for things like navigation, authentication middleware and automatically mapping rewrites in the `next.config.js` file.

```ts
import { dashboardChartsRouteConfig } from "@packages/shared/routes";

<a href={dashboardChartsRouteConfig.getRoute()}>Graficas</a>
```

### Adding routes

Each app should have its own route configuration file. And all routes should be added to the file. For example, adding a new route to the dashboard app would be done like this:

If the dashboard route configuration file does not exist, create it at `packages/shared/src/routes/dashboard.ts`:

Now add a new route to the file:

```ts
export const dashboardStatsRouteConfig = new DashboardRouteConfig(
  "/stats",
  "/estadisticas",
  true,
  ["/another-example", "/test/another-example"],
);
```

All apps route configuration files should export an array with all the routed defined in the file:

```ts
export const dashboardRouteConfigs: RouteConfig[] = [
  dashboardStatsRouteConfig,
  dashboardChartsRouteConfig,
];
```
