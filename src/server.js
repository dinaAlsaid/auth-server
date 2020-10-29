'use strict';

const express = require('express');
const server = express();
const router = require('./routes/authrouter.js');
const routerExtra = require('./routes/extra-routes.js');

server.use(express.json());
server.use(express.static('./public'));

server.use('/',router);
server.use('/',routerExtra);

module.exports = {
  server: server,
  start: (port) => {
    server.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  },
};
