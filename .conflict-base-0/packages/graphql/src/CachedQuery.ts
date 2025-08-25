import { GraphQLClient, RequestDocument, Variables } from "graphql-request";

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
