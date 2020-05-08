FROM node:alpine

WORKDIR /usr/crawler/

COPY package*.json ./
RUN yarn install -f

COPY . .

EXPOSE 3000

CMD  ["yarn", "dev"] 