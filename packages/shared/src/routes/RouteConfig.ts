/*
 * All routes must extend this class.
 * In some instances you might want to extend this class to modifty the `getRoute` method.
 * For example, if you want to add query parameters to the route.
 * Aside from that, refrain from heavely modifying this class.
 * (You might want, in the future, to add something for authoriziation, but for now, keep it simple.)
 * dworak.dev
 */

export type SitemapConfig = {
  priority: number;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  lastModified: Date;
};

export type RouteConfigParams = {
  original: string;
  rewrite: string;
  baseUrl: string;
  isProtected: boolean;
  additionalRewrites?: string[];
  sitemapConfig?: SitemapConfig;
};

export class RouteConfig {
  public original: string;
  public preferedRewrite: string;
  public rewrites: string[];
  public baseUrl: string;
  public isProtected: boolean;
  public sitemapConfig?: SitemapConfig;

  constructor({
    original,
    rewrite,
    baseUrl,
    isProtected,
    additionalRewrites = [],
    sitemapConfig,
  }: RouteConfigParams) {
    this.original = original;
    this.preferedRewrite = rewrite;
    this.baseUrl = baseUrl;
    this.isProtected = isProtected;
    this.rewrites = [original, rewrite, ...additionalRewrites];
    this.sitemapConfig = sitemapConfig;
  }

  getRoute(isAbsolute?: boolean) {
    return `${isAbsolute ? this.baseUrl : ""}${this.preferedRewrite}`;
  }

  getUrl() {
    return `${this.baseUrl}${this.preferedRewrite}`;
  }

  getSiteMap() {
    return {
      url: this.getUrl(),
      ...this.sitemapConfig,
    };
  }
}
