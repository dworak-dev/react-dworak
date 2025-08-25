export class RouteConfig {
  public original: string;
  public preferedRewrite: string;
  public rewrites: string[];
  public baseUrl: string;
  public isProtected: boolean;

  constructor(
    original: string,
    rewrite: string,
    baseUrl: string,
    isProtected: boolean,
    additionalRewrites: string[] = [],
  ) {
    this.original = original;
    this.preferedRewrite = rewrite;
    this.baseUrl = baseUrl;
    this.isProtected = isProtected;
    this.rewrites = [original, rewrite, ...additionalRewrites];
  }

  getRoute(isAbsolute?: boolean) {
    return `${isAbsolute ? this.baseUrl : ""}${this.preferedRewrite}`;
  }
}
