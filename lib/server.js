const express = require('express');
const cors = require('cors');

const router = express.Router();
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);

require('../route/route-free-trial-request')(router);
require('../route/route-confirm-appointment')(router);
require('../route/route-teacher')(router);

app.use(cors());
app.use(router);

app.all('*', (req, res) => {
  res.sendStatus(404);
});

const server = module.exports;
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        process.stdout.write(`🌎  Listening on port: ${process.env.PORT}\n`);
        server.isOn = true;
        resolve(server.http);
      });
      return server.http;
    }
    return reject(new Error('server already running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if (server.http && server.isOn) {
      return server.http.close(() => {
        server.isOn = false;
        resolve();
      });
    }
    return reject(new Error('the server is not running'));
  });
};
