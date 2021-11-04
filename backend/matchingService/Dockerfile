# syntax=docker/dockerfile:1

FROM node:14-alpine
WORKDIR '/var/www/app'
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 8000
# CMD [ "node", "app.js" ]
CMD ["npm", "start"]
# docker build -t matching-service ./matchingService