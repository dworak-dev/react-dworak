# apps/web/Dockerfile
# Runtime-only image: copy CI-built artifacts (no build here)
FROM node:20-alpine AS runner

# Set working dir inside the container
WORKDIR /app

# Ensure production mode
ENV NODE_ENV=production
# You can override at runtime if you run on another port:
ENV PORT=3000

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# ---- COPY PREBUILT ARTIFACTS FROM CI WORKSPACE ----
# These paths assume you ran `next build` with `output: 'standalone'`
# for the app at apps/default-app, and you're building the image from the repo root.
# 1) Minimal node server (+ its node_modules)
COPY ./apps/default-app/.next/standalone ./
# 2) Static assets for this app
COPY ./apps/default-app/.next/static ./apps/default-app/.next/static
# 3) Public assets (uncomment if you serve anything from /public)
# COPY ./apps/default-app/public ./apps/default-app/public

# If you use Next image optimization with remote patterns, nothing else needed here.
# If you rely on process.env at runtime, pass them as env vars when starting the container.

USER nextjs
EXPOSE 3000

# In standalone builds, Next generates a server entry relative to the app path
# e.g. apps/default-app/server.js inside the standalone bundle.
CMD ["node", "apps/default-app/server.js"]
