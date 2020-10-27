'use strict';

const express = require('express');
const user = require('./models/user-collection.js');
const BasicAuthMW = require('./auth/middleware/basicAuth.js');
const oauthMW = require('./auth/middleware/Oauth.js');
const beareMW = require('./auth/middleware/bearer.js');
const server = express();
server.use(express.json());

server.use(express.static('./public'));

server.get('/oauth', oauthMW, oauthSigninHandler);
server.post('/signup', signupHandler);
server.post('/signin', BasicAuthMW, signinHandler);
server.get('/users', getUsersHandler);
server.get('/bearerRoute', beareMW, bearerAuthHandler);

function oauthSigninHandler(req, res) {
  res.json({ token: req.token });
}
function signupHandler(req, res) {
  user.createHash(req.body).then((data) => {
    const token = user.generateToken(data);
    console.log('__token from sign up__', token);
    res.json({ token });
  });
}
function signinHandler(req, res) {
  res.json({ token: req.token });
}
async function getUsersHandler(req, res) {
  let result = await user.findAll();
  console.log('teeeedt', result);
  console.log(Array.isArray(result));
  res.json(result);
}

function bearerAuthHandler(req, res) {
  res.send('you are authorized');
}
module.exports = {
  server: server,
  start: (port) => {
    server.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  },
};
