/*
 * Next.js makes an important disntnction between public and private environment variables.
 * Private variabels must start with `NEXT_PRIVATE_` to be accesible only in the backend side.
 * Be very careful about not exposing sensitive information in public variables.
 * dworak.dev
 */

export const privateVars = {
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
  SENTRY_ORG: process.env.SENTRY_ORG,
  SENTRY_PROJECT: process.env.SENTRY_PROJECT,
  SENTRY_RELEASE: process.env.SENTRY_RELEASE,
  SENTRY_DIST: process.env.SENTRY_DIST,
  SENTRY_ENV: process.env.SENTRY_ENV ?? "local",
};
