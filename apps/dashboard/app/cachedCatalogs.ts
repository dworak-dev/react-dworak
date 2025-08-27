import { getCachedCatalogs } from "@packages/graphql/cachedCatalogs";
import { getGraphqlClient } from "@packages/graphql/graphqlClient";
import { publicVars } from "@packages/shared/publicVars";

const client = getGraphqlClient(publicVars.GRAPHQL_API_URL);

const dashboardCachedCatalogs = getCachedCatalogs(client);

export { dashboardCachedCatalogs };
