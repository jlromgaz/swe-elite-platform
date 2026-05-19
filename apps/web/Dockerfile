FROM node:20-alpine

# Native build deps required for better-sqlite3 bindings
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy workspace manifests first for layer caching
COPY package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/db/package.json ./packages/db/
COPY packages/ui/package.json ./packages/ui/

RUN npm install

# Copy prisma schema and generate client
COPY packages/db/prisma ./packages/db/prisma
RUN cd packages/db && npx prisma generate

# Copy all source
COPY . .

# Build Next.js
RUN cd apps/web && npm run build

EXPOSE 3000

ENV NODE_ENV=production
ENV DATABASE_URL=file:/data/prod.db

CMD ["sh", "-c", "cd packages/db && npx prisma db push --skip-generate && cd /app/apps/web && npm start"]
