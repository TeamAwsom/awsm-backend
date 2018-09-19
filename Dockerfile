FROM node:carbon

RUN mkdir /api
RUN mkdir /api/app

COPY package.json /api/app

WORKDIR /api/app
RUN npm install

COPY . /api/app

CMD ["node", "index.js"]
