import {
  GetLandpadsCatalogDocument,
  GetLandpadsCatalogQuery,
  GetLandpadsCatalogQueryVariables,
} from "@packages/graphql";
import { GraphQLClient } from "graphql-request";

import { CachedQuery } from "./CachedQuery";

export const getCachedCatalogs = (client: GraphQLClient) => {
  const landpadsCachedQuery = new CachedQuery<
    GetLandpadsCatalogQuery,
    GetLandpadsCatalogQueryVariables
  >(GetLandpadsCatalogDocument, client, {});

  const landpadsCachedQuery2 = new CachedQuery<
    GetLandpadsCatalogQuery,
    GetLandpadsCatalogQueryVariables
  >(GetLandpadsCatalogDocument, client, {});

  return {
    landpadsCachedQuery,
    landpadsCachedQuery2,
  };
};
