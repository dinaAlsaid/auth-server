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
  /* encrypts the password then creates a new user record  */
  async createHash(record) {
    try{
      record.password = await bcrypt.hash(record.password, 5);
      console.log('___record after hash___', record);
      const newRec = new this.Model(record);
      return newRec.save();
      
    }catch(err){
      return err.messsage;
    }
  }

  async authenticate(username, password) {
    let record = await this.Model.find({ username });
    // console.log(record);
    const valid = await bcrypt.compare(password, record[0].password);
    console.log('\nauthenticate: does password match?', valid);
    return record[0];
  }

  generateToken(user) {
    try{
      console.log('\n __user__', user);
      const token = jwt.sign({ username: user.username }, SECRET);
      return token;

    }catch(err){
      return err.message;
    }
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
}

module.exports = new userCollection();
