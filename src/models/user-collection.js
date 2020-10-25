'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'shhhhThisIsASecret';

const user = mongoose.Schema({
  username: { type: 'string', required: true },
  password: { type: 'string', required: true },
});

user.methods.authenticate = async function (username, password) {
  const exist = await user.findOne({ username });
  if (exist) {
    const valid = await bcrypt.compare(password, this.password);
    console.log('authenticate: does password match?', valid);
    return valid;
  } else {
    return Promise.reject('no username found');
  }
};
user.methods.createHash = async function (password) {
  const exist = await user.findOne({ username });
  if (!exist) {
    this.password = await bcrypt.hash(password, 5);
  } else {
    return Promise.reject('username exists in database');
  }
};
user.methods.generateToken = function (user) {
  const token = jwt.sign({ username: user.username }, SECRET);
  return token;
};

class userCollection {
  constructor() {
    this.Model = user;
  }
  read(_id) {
    //if id exist find by id if not find all
    let id = _id ? { _id } : {};
    return this.Model.find(id);
  }
  create(record) {
    const newRec = new this.Model(record);
    return newRec.save();
  }
  update(_id, record) {
    return this.Model.findOneAndUpdate(_id, record, { new: true });
  }
  delete(_id) {
    return this.Model.findOneAndDelete(_id);
  }
}
module.exports = new userCollection();
