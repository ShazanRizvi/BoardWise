#!/bin/bash

# Start Postgres and Redis in detached mode
docker compose up -d postgres redis server

# Wait for Postgres
./wait-for-it.sh boardwise_postgres:5432 --timeout=60 --strict -- echo "Postgres is up"

# Wait for Redis
./wait-for-it.sh boardwise_redis:6379 --timeout=60 --strict -- echo "Redis is up"

# Run Prisma generate and migrations inside server container
docker exec -it boardwise_server sh -c "npx prisma generate && npx prisma migrate deploy"

# Run Lerna dev scripts to start server and client concurrently
npx lerna run dev --parallel