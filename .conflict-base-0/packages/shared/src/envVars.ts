export const envVars = {
  // Base URL for the dashboard project. This is use mostly for routing purposes.
  DASHBOARD_BASE_URL: "http://localhost:3001",

  // Used for when creating graphQL clients.
  GRAPHQL_API_URL: "https://spacex-production.up.railway.app/graphql",

  // Sentry configuration for error logging and monitoring.
  SENTRY_JS_ORG: "dworak-dev",
  SENTRY_JS_PROJECT: "react-dworak",
  SENTRY_JS_DSN:
    // eslint-disable-next-line no-secrets/no-secrets
    "https://014d00c260f541d6adf70d6870fd4b8b@o4509895725350912.ingest.us.sentry.io/4509895728693248",
  SENTRY_JS_METRICS_PATH: "mtrcs",
};
