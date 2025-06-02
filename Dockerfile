FROM node:18

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

CMD ["pm2-runtime", "ecosystem.config.js"]