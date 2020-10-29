'use strict';

const userCollection = require('../../models/user-collection.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('UnAuthorized before');
  } else {
    const token = req.headers.authorization.split(' ').pop();
    userCollection
      .authenticateJWT(token)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch(() => {
        next('unAuthorized');
      });
  }
};
