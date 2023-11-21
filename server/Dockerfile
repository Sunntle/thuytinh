FROM node:18-alpine
RUN apk add --no-cache bash
WORKDIR /thuytinh/backend

COPY package*.json ./

RUN npm install

RUN npm install -g webpack webpack-cli webpack-node-externals

COPY . .
RUN chmod +x import-data-and-set-sql-mode.sh
RUN chmod +x wait-for-it.sh
RUN npm run build

CMD [ "node", "dist/main.js" ]
