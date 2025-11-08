#!/bin/bash
SCHEMA_PATH="./packages/server/prisma/schema.prisma"

# Check if Docker daemon is running
if ! docker info > /dev/null 2>&1; then
  echo "Error: Docker is not running. Please start Docker Desktop or the Docker daemon and try again."
  exit 1
fi


# Start Postgres and Redis in detached mode
docker compose up -d postgres redis server

# Wait for Postgres
./wait-for-it.sh boardwise_postgres:5432 --timeout=60 --strict -- echo "Postgres is up"

# Wait for Redis
./wait-for-it.sh boardwise_redis:6379 --timeout=60 --strict -- echo "Redis is up"


# Run Prisma generate and migrations inside server container
echo "Running Prisma migrations..."

# docker exec -it boardwise_server sh -c "npx prisma generate && npx prisma migrate dev --schema=$SCHEMA_PATH && npx prisma migrate deploy "

docker exec -it boardwise_server sh -c "npx prisma migrate dev --name init && npx prisma generate"


# Run Lerna dev scripts to start server and client concurrently
npx lerna run dev --parallel