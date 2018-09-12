FROM node:carbon

RUN addgroup -S app && adduser -S -g app app

RUN mkdir /api
RUN mkdir /api/app
COPY package.json /api/app
RUN chown -R app:app /api/*

USER app
WORKDIR /api/app
RUN npm install

USER root
COPY . /api/app
RUN chown -R app:app /api/*

USER app

CMD ["node", "index.js"]
