# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Install dependencies - Point to the frontend subfolder
COPY frontend/package*.json ./
RUN npm ci

# Copy source code from the frontend subfolder
COPY frontend/ .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# Builder stage
FROM node:20-slim AS builder

WORKDIR /app

# Point to the frontend subfolder
COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
ARG GIT_SHA
ARG BUILD_DATE
ARG VERSION
LABEL org.opencontainers.image.title="Monize Frontend" \
      org.opencontainers.image.description="Frontend for Monize, a self-hosted personal finance app" \
      org.opencontainers.image.source="https://github.com/cgarito/monize" \
      org.opencontainers.image.url="https://github.com/cgarito/monize"

RUN apk add --no-cache dumb-init

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy standalone build from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
