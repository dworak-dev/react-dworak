import { GraphQLClient } from "graphql-request";

export const getGraphqlClient = (url: string) =>
  new GraphQLClient(url, {
    errorPolicy: "all",
  });
