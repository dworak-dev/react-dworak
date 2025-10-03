FROM node:22-alpine AS base


FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app
# Replace <your-major-version> with the major version installed in your repository. For example:
# RUN yarn global add turbo@^2
RUN yarn global add turbo@^2
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune default-app --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN yarn install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .

# install sentry cli globally with yarn:
RUN yarn global add @sentry/cli

# Sentry environment variables needed in build time for deploying releases and uploading source maps
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_RELEASE

RUN yarn turbo run build
# RUN --mount=type=secret,id=sentry_auth_token \
#   export SENTRY_AUTH_TOKEN=$(cat /run/secrets/sentry_auth_token) && \
#   yarn turbo run build

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/default-app/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/default-app/.next/static ./apps/default-app/.next/static
# Temporarily disabling copying public folder since there is not one at the moment
# COPY --from=installer --chown=nextjs:nodejs /app/apps/default-app/public ./apps/default-app/public

EXPOSE 3000

CMD ["node", "apps/default-app/server.js"]
