#!/bin/sh
set -e

echo "Pushing database schema..."
cd packages/db && npx prisma db push --skip-generate

echo "Seeding database..."
npx prisma db seed

echo "Starting application..."
cd /app/apps/web && npm start