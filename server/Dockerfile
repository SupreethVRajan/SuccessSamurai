FROM node:lts-bullseye-slim

WORKDIR /usr/src/server
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]