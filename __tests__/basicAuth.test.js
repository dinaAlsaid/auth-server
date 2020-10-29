'use strict';

const server = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server.server);
const base64 = require('base-64');

describe('signup and signin', () => {
  let newUser = {
    username: 'someone',
    password: 'something',
  };
  var jwt;
  let encoded = base64.encode(`${newUser.username}:${newUser.password}`);
  it('creates an new user when signup', async () => {
    await mockRequest
      .post('/signup')
      .send(newUser)
      .then((results) => {
        let usr = results.body.data;
        jwt = results.body.token;
        expect(usr.username).toEqual(newUser.username);
        expect(usr.password).not.toEqual(newUser.password);
      });
  });
  it('sets token as authorization headers when signin with valid user', async () => {
    await mockRequest
      .post('/signin')
      .set('authorization', `Basic ${encoded}`)
      .send(newUser)
      .then((results) => {
        let token = results.body.token;
        console.log(token);
        expect(token).toBeDefined();
        expect(token).toEqual(jwt);
      });
  });
});
