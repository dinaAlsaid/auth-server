'use strict';

const express = require('express');
const router = express.Router();
const beareMW = require('../auth/middleware/bearer.js');

// router.get('/secret',beareMW,secretHandler);

router.get('/secret', beareMW, bearerAuthHandler);

function bearerAuthHandler(req, res) {
  res.send('you are authorized');
}


module.exports = router;
