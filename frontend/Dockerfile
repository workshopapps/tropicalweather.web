FROM node:18.12.0-alpine as build
WORKDIR /frontend
COPY package.json .
RUN yarn install
COPY . .
RUN yarn run build
