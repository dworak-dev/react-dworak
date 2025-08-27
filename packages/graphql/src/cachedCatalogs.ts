import {
  GetLandpadsCatalogDocument,
  GetLandpadsCatalogQuery,
  GetLandpadsCatalogQueryVariables,
} from "@packages/graphql";
import { GraphQLClient } from "graphql-request";

import { CachedQuery } from "./CachedQuery";

/*
 * All of the cached catalogs that we want to use in the app.
 * There is no need (at the moment) to havae a file for each app since we can
 * asume that all apps will use the same catalogs. Either way, they are only fetched
 * when requested so there is no performance issue. It receives the client beacause
 * the URL must be set by each app.
 * dworak.dev
 */
export const getCachedCatalogs = (client: GraphQLClient) => {
  const landpadsCachedQuery = new CachedQuery<
    GetLandpadsCatalogQuery,
    GetLandpadsCatalogQueryVariables
  >(GetLandpadsCatalogDocument, client, {});

  return {
    landpadsCachedQuery,
  };
};
