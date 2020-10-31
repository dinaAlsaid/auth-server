'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'shhhhThisIsASecret';
// let roles = {
//   user: ['read'],
//   writer: ['read', 'create'],
//   editor: ['read', 'create', 'update'],
//   admin: ['read', 'create', 'update', 'delete'],
// };

const user = mongoose.Schema({
  username: { type: 'string', required: true, unique: true },
  password: { type: 'string', required: true },
  role: { type: 'string', enum: ['user', 'writer', 'editor', 'admin'] },
});

class userCollection {
  constructor() {
    this.Model = mongoose.model('user', user);
    this.capabilities = [];
  }
  /* encrypts the password then creates a new user record  */
  async createHash(record) {
    record.password = await bcrypt.hash(record.password, 5);
    this.set(record.role);
    console.log('___record after hash___', record);
    const newRec = new this.Model(record);
    return newRec.save();
  }

  async authenticate(username, password) {
    let record = await this.Model.find({ username });
    // console.log(record);
    const valid = await bcrypt.compare(password, record[0].password);
    console.log('\nauthenticate: does password match?', valid);
    return record[0];
  }

  generateToken(user) {
    console.log('\n __user__', user);
    // jwt expires in 10sec
    const token = jwt.sign({ username: user.username }, SECRET, {
      expiresIn: '4s',
    });
    return token;
  }

  async findAll() {
    let results = await this.Model.find();
    return results;
  }
  async findUser(username) {
    let results = await this.Model.findOne({ username });
    return results;
  }

  async authenticateJWT(token) {
    const tokenObj = jwt.verify(token, SECRET);
    let user = await this.Model.findOne({ username: tokenObj.username });
    if (user) {
      return Promise.resolve(tokenObj);
    } else {
      console.log('user doesn\'t exist or wrong token');
      return Promise.reject();
    }
  }
  set(role) {
    switch (role) {
    case 'admin':
      this.capabilities=[...['read', 'create', 'update', 'delete']];
      break;
    case 'editor':
      this.capabilities=[...['read', 'create', 'update']];
      break;
    case 'writer':
      this.capabilities=[...['read', 'create']];
      break;
    case 'user':
      this.capabilities=[...['read']];
      break;
    default:
      break;
    }
  }
}

module.exports = new userCollection();
