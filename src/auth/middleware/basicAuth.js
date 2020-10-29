'use strict';
const base64 = require('base-64');
const userCollection = require('../../models/user-collection.js');

module.exports = (req, res, next) => {
  console.log('__header auth basic__', req.headers);
  if (!req.headers.authorization) {
    next('invalid login');
  } else {
    const encodedUserInfo = req.headers.authorization.split(' ').pop();
    const decoded = base64.decode(encodedUserInfo);

    const [username, password] = decoded.split(':');

    userCollection
      .authenticate(username, password)
      .then((validUser) => {
        console.log('____validUser? from basic auth____\n', validUser);
        req.token = userCollection.generateToken(validUser);
        next();
      })
      .catch(() => next('Invalid Login'));
  }
};
