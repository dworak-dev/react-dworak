// TODO: Implement some sort of race condition prevention for when two clients
// request the same data at the same time and the cache is stale. At that moment
// both clients will fetch the data from the server instead of one waiting for
// the other to finish and then using the cached data.
import { GraphQLClient, RequestDocument, Variables } from "graphql-request";

/*
 * This is a very simple caching mechanism for GraphQL queries.
 * It caches the result of a query for a specified amount of time (default: 5 minutes).
 * If the cached data is older than the cache time, it will fetch the data again.
 * It is by no means a complete cached solution but specially for catalogs it does the job.
 * dworak.dev
 */
export class CachedQuery<T, V extends Variables = Variables> {
  public document: RequestDocument;
  public client: GraphQLClient;
  public cacheTime: number = 5 * 60 * 1000; // 5 minutes
  public lastFetchedAt?: number;
  private variables: V;
  public data: T | null = null;

  constructor(
    document: RequestDocument,
    client: GraphQLClient,
    variables: V,
    cacheTime?: number,
  ) {
    this.document = document;
    this.client = client;
    if (cacheTime) {
      this.cacheTime = cacheTime;
    }
    this.variables = variables;
  }

  async getData(): Promise<T> {
    const now = Date.now();

    const isStale =
      this.lastFetchedAt === undefined ||
      now - this.lastFetchedAt > this.cacheTime;

    if (isStale || this.data === null) {
      this.lastFetchedAt = now;
      this.data = await this.client.request<T>(this.document, this.variables);
    }

    return this.data;
  }
}
