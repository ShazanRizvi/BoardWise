FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
EXPOSE 3000
