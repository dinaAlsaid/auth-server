'use strict';

const express = require('express');
const router = express.Router();
const BasicAuthMW = require('../auth/middleware/basicAuth');
const oauthMW = require('../auth/middleware/Oauth.js');
const beareMW = require('../auth/middleware/bearer.js');
const user = require('../models/user-collection.js');

router.get('/oauth', oauthMW, oauthSigninHandler);
router.post('/signup', signupHandler);
router.post('/signin', BasicAuthMW, signinHandler);
router.get('/users', getUsersHandler);
router.get('/bearerRoute', beareMW, bearerAuthHandler);

function oauthSigninHandler(req, res) {
  res.json({ token: req.token });
}
function signupHandler(req, res) {
  user.createHash(req.body).then((data) => {
    const token = user.generateToken(data);
    console.log('__token from sign up__', token);
    res.json({ token, data });
  });
}
function signinHandler(req, res) {
  res.json({ token: req.token });
}
async function getUsersHandler(req, res) {
  let result = await user.findAll();
  res.json(result);
}

function bearerAuthHandler(req, res) {
  res.send('you are authorized');
}

module.exports = router;
