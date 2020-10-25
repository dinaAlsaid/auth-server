'use strict';

const express = require('express');
const BasicAuthMW = require('./auth/middleware/basicAuth.js')

const server = express();
server.use(express.json());

server.post('/signup',signupHandler)
server.post('/signin',BasicAuthMW,signinHandler)
server.get('/users',getUsersHandler)

function signupHandler (req,res){}
function signinHandler (req,res){}
function getUsersHandler (req,res){}

module.exports = {
  server: server,
  start: (port) => {
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  },
};
