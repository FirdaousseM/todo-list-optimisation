FROM node:18

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN sqlite3 ./prisma/dev.db < prisma/script.sql

CMD ["pm2-runtime", "ecosystem.config.js"]