# syntax=docker/dockerfile:1

FROM node:14-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "server.js" ]