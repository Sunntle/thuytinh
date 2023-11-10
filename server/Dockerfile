FROM node:18-alpine

WORKDIR /thuytinh/backend

COPY package*.json ./

RUN npm install

RUN npm install -g webpack webpack-cli webpack-node-externals

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]
#yml: docker compose up -d
#docker build --tag node-docker .
#docker run -p 8080:8080 -d node-docker