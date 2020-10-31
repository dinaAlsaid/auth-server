'use strict';

const express = require('express');
const router = express.Router();
const bearerMW = require('../auth/middleware/bearer.js');
const permissions = require('../auth/middleware/authorize.js');

//bearer test route
router.get('/secret', bearerMW, bearerAuthHandler);

// permissions test routes
router.get('/read', bearerMW, permissions('read'), readHandler);
router.post('/add', bearerMW, permissions('create'), addHandler);
router.put('/change', bearerMW, permissions('update'), changeHandler);
router.delete('/remove', bearerMW, permissions('delete'), removeHandler);

// callbacks
function bearerAuthHandler(req, res) {
  res.send('you are authorized');
}

function readHandler(req, res) {
  res.send('Route /read worked');
}

function addHandler(req, res) {
  res.send('Route /add worked');
}

function changeHandler(req, res) {
  res.send('Route /change worked');
}

function removeHandler(req, res) {
  res.send('Route /remove worked');
}

module.exports = router;
