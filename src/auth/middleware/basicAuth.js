'use strict';
const base64 = require('base-64');
const userCollection = require('../../models/user-collection.js');

module.exports = (req, res, next) => {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    next('invalid login');
  } else {
    const encodedUserInfo = req.headers.authorization.split(' ').pop();
    const decoded = base64.decode(encodedUserInfo);
    const [username, password] = decoded.split(':');
    userCollection.Model
    .authenticate(username, password)
    .then((valid) => {
      if (valid === true) {
        req.token = userCollection.Model.generateToken(valid);
        next();
      }
    })
    .catch(() => next('Invalid Login'));

  }
};
