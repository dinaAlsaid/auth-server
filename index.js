'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server');

const MONGODB_URI = "mongodb+srv://dinamalsaid:dina5982354@cluster0.zco2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ;
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.start(PORT);
