'use strict';
const base64 = require('base-64');
const userCollection = require('../../models/user-collection.js');

module.exports = (req, res, next) => {
  console.log('__header auth basic__', req.headers.authorization);
  if (!req.headers.authorization) {
    next('invalid login');
  } else {
    const encodedUserInfo = req.headers.authorization.split(' ').pop();
    const decoded = base64.decode(encodedUserInfo);
    const [username, password] = decoded.split(':');

    userCollection
      .authenticate(username, password)
      .then((valid) => {
        console.log('____valid? from basic auth____\n', valid);
        req.token = userCollection.generateToken(valid);
        next();
      })
      .catch(() => next('Invalid Login'));
  }
};
