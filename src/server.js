'use strict';

const express = require('express');
const server = express();
const cors = require('cors');
const router = require('./routes/authrouter.js');
const routerExtra = require('./routes/extra-routes.js');

const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200
}
server.use(cors(corsOptions));
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
