'use strict';

const express = require('express');
const BasicAuthMW = require('./auth/middleware/basicAuth.js')
const user=require('./models/user-collection.js')
const oauthMW=require('./auth/middleware/Oauth.js')
const server = express();
server.use(express.json());

server.use(express.static('./public'));


server.get('/oauth',oauthMW , oauthSigninHandler)
server.post('/signup',signupHandler)
server.post('/signin',BasicAuthMW,signinHandler)
server.get('/users',getUsersHandler)

function oauthSigninHandler(req,res){
  res.json({ token: req.token });

}
function signupHandler (req,res){
  user.Model.methods.createHash(req.body).then((data)=>{
    const token = user.Model.methods.generateToken(data)
    console.log("token",token)
    res.json({ token })
  })
}
function signinHandler (req,res){}
function getUsersHandler (req,res){}

module.exports = {
  server: server,
  start: (port) => {
    server.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  },
};
