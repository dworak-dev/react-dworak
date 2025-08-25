import { envVars } from "@packages/common/envVars";
import { getCachedCatalogs } from "@packages/graphql/cachedCatalogs";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(envVars.GRAPHQL_API_URL, {
  errorPolicy: "all",
});

const dashboardCachedCatalogs = getCachedCatalogs(client);

export { dashboardCachedCatalogs };
