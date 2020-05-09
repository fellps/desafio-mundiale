FROM node:alpine

WORKDIR /usr/crawler/

COPY package*.json ./
RUN yarn install --force --ignore-optional

COPY . .

EXPOSE 3000

CMD  ["yarn", "dev"]