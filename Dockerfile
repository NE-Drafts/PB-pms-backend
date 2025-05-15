FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

COPY ./src/prisma ./src/prisma


RUN yarn prisma:all

RUN yarn build

EXPOSE 5006

CMD ["yarn", "dev"]