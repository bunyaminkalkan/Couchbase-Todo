FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE ${APP_PORT}

CMD ["npm", "run", "dev"]