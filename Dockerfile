FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y sqlite3

COPY package.json ./
RUN npm install -g pm2
RUN npm install

EXPOSE 3000

COPY . .
RUN sqlite3 ./prisma/dev.db < prisma/script.sql 
CMD ["pm2-runtime", "ecosystem.config.js"]
