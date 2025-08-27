import { getCachedCatalogs } from "@packages/graphql/cached-catalogs";
import { getGraphqlClient } from "@packages/graphql/grapqhl-client";
import { publicVars } from "@packages/shared/public-vars";

const client = getGraphqlClient(publicVars.GRAPHQL_API_URL);

const dashboardCachedCatalogs = getCachedCatalogs(client);

export { dashboardCachedCatalogs };
