FROM node:18

WORKDIR /app

COPY package.*.json ./
RUN npm install

COPY . .

EXPOSE 3000

RUN npm install -g pm2

CMD ["pm2-runtime", "npm", "--", "start"]