FROM node:18.12.0-alpine as build
WORKDIR /frontend
COPY package.json .
RUN npm install -f
COPY . .
RUN npm run build
