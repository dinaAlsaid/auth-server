'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./lib/server');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.start(PORT);