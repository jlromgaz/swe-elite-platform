FROM node:20-alpine

# Native build deps required for better-sqlite3 bindings + openssl for Prisma engine
RUN apk add --no-cache python3 make g++ openssl

WORKDIR /app

# Copy workspace manifests first for layer caching
COPY package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/db/package.json ./packages/db/
COPY packages/ui/package.json ./packages/ui/

RUN npm install

# Copy prisma schema
COPY packages/db/prisma ./packages/db/prisma

# Copy all source
COPY . .

# Generate Prisma client (must run AFTER copying schema)
RUN cd packages/db && npx prisma generate

# Push schema to build-time DB so static pages can query it
RUN cd packages/db && DATABASE_URL=file:./dev.db npx prisma db push --skip-generate

# Build Next.js
RUN cd apps/web && npm run build

EXPOSE 3000

ENV NODE_ENV=production
ENV DATABASE_URL=file:/data/prod.db

COPY scripts/start.sh /app/scripts/start.sh
RUN chmod +x /app/scripts/start.sh

CMD ["/app/scripts/start.sh"]
