/*
 * Be very carefull as all these variables are exposed to the client side.
 * Only values that are safe to share withthe public should be added here with the explicit
 * prefix `NEXT_PUBLIC`.
 * dworak.dev
 */

export const publicVars = {
  DEFAULT_APP_BASE_URL:
    process.env.NEXT_PUBLIC_DEFAULT_APP_BASE_URL ?? "http://localhost:3001",
  GRAPHQL_API_URL:
    process.env.NEXT_PUBLIC_GRAPHQL_API_URL ??
    "https://spacex-production.up.railway.app/graphql",
  SENTRY_DSN:
    process.env.NEXT_PUBLIC_SENTRY_DSN ??
    // eslint-disable-next-line no-secrets/no-secrets
    "https://014d00c260f541d6adf70d6870fd4b8b@o4509895725350912.ingest.us.sentry.io/4509895728693248",
};
