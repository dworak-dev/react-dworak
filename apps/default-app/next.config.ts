import { privateVars } from "@packages/shared/private-vars";
import { defaultAppRouteConfigs } from "@packages/shared/routes";
import { withSentryConfig } from "@sentry/nextjs";
import { NextConfig } from "next";

// Routes renames are imported from a shared config and mapped to the Next.js format.
const mappedRoutes = Object.values(defaultAppRouteConfigs)
  .map((i) =>
    i.rewrites.map((rewrite) => ({
      source: rewrite,
      destination: i.original,
    })),
  )
  .flat();

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    // You might want to add more rewrites in here.

    return mappedRoutes;
  },
};

const withSentryNextConfig = withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: privateVars.SENTRY_JS_ORG,

  project: privateVars.SENTRY_JS_PROJECT,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: `/${privateVars.SENTRY_JS_METRICS_PATH}`,

  // This token is used to upload source maps to Sentry.
  authToken: privateVars.SENTRY_AUTH_TOKEN,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});

// Only return sentry config in production builds
export default process.env.NODE_ENV === "production"
  ? withSentryNextConfig
  : nextConfig;
