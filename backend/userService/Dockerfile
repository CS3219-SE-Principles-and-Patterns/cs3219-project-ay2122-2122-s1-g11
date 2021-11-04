# syntax=docker/dockerfile:1

FROM node:14-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "node", "server.js" ]
# docker build -t user-service ./userService