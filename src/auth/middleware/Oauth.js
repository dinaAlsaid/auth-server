'use strict';

require('dotenv').config();
const superagent = require('superagent');
const user = require('../../models/user-collection.js')
const tokenServerUrl = 'https://github.com/login/oauth/access_token';
const remoteAPI = 'https://api.github.com/user';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = process.env.API_SERVER;

module.exports = async (req,res,next) =>{
  const code=req.query.code;
  const token = await requestToken(code);
  const remoteUser = await getUserInfo(token);
  const usertoken = await getUser(remoteUser);
  req.token = usertoken;
  next();

}

async function requestToken(code){
  let requestSample = {
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: API_SERVER,
    grant_type: 'authorization_code',
  }
  const responseToken = await superagent
  .post(tokenServerUrl)
  .send( requestSample );

  return responseToken.body.access_token;
}

async function getUserInfo(token){
  const userResponse = await superagent
  .get(remoteAPI)
  .set('Authorization', `token ${token}`)
  .set('user-agent', 'express-app');

  return userResponse.body;

}

async function getUser(remoteUser){
  const userRecord = {
    username: remoteUser.login,
    password: 'anythingBecause not actual password'
  }
  const jwtoken = await user.Model.methods.generateToken(userRecord);
  return jwtoken;
}