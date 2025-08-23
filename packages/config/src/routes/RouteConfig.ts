export class RouteConfig {
  public original: string;
  public preferedRewrite: string;
  public rewrites: string[];
  public baseUrl: string;

  constructor(
    original: string,
    rewrite: string,
    baseUrl: string,
    additionalRewrites: string[] = [],
  ) {
    this.original = original;
    this.preferedRewrite = rewrite;
    this.baseUrl = baseUrl;
    this.rewrites = [rewrite, ...additionalRewrites];
  }

  getRoute(isAbsolute?: boolean) {
    return `${isAbsolute ? this.baseUrl : ""}${this.preferedRewrite}`;
  }
}
