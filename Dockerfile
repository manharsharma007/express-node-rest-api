FROM node:current-alpine3.18

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
USER node

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 8000

CMD ["npm", "run", "prod"]
