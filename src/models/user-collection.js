'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'shhhhThisIsASecret';

const user = mongoose.Schema({
  username: { type: 'string', required: true, unique: true },
  password: { type: 'string', required: true },
});

class userCollection {
  constructor() {
    this.Model = mongoose.model('user', user);
  }
  async authenticate(username, password) {
    let record = await this.Model.find({ username });
    console.log(record);
    const valid = await bcrypt.compare(password, record[0].password);
    console.log('\nauthenticate: does password match?', valid);
    return record[0];
  }
  async createHash(record) {
    record.password = await bcrypt.hash(record.password, 5);
    console.log('___record after hash___', record);
    const newRec = new this.Model(record);
    return newRec.save();
  }
  generateToken(user) {
    console.log('\n __user__', user);
    const token = jwt.sign({ username: user.username }, SECRET);
    return token;
  }
  async findAll() {
    let results = await this.Model.find();
    return results;
  }
  update(_id, record) {
    return this.Model.findOneAndUpdate(_id, record, { new: true });
  }
  delete(_id) {
    return this.Model.findOneAndDelete(_id);
  }
}
module.exports = new userCollection();
