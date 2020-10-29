'use strict';

const express = require('express');
const server = express();
const router = require('./routes/authrouter.js');

server.use(express.json());
server.use(express.static('./public'));

server.use('/',router);

module.exports = {
  server: server,
  start: (port) => {
    server.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  },
};
