FROM node:12 AS build-env
WORKDIR /backoffice

# Install PM2 globally
RUN npm install --global pm2

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]
