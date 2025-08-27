/*
 * Next.js makes an important disntnction between public and private environment variables.
 * Private variabels must start with `NEXT_PRIVATE_` to be accesible only in the backend side.
 * Be very careful about not exposing sensitive information in public variables.
 * dworak.dev
 */

export const privateVars = {
  // Sentry configuration for error logging and monitoring.
  SENTRY_JS_ORG: process.env.NEXT_PRIVATE_SENTRY_JS_ORG ?? "",
  SENTRY_JS_PROJECT: process.env.NEXT_PRIVATE_SENTRY_JS_PROJECT ?? "",
  SENTRY_JS_METRICS_PATH: process.env.NEXT_PRIVATE_SENTRY_JS_METRICS_PATH ?? "",
  SENTRY_AUTH_TOKEN: process.env.NEXT_PRIVATE_SENTRY_AUTH_TOKEN ?? "",
};
