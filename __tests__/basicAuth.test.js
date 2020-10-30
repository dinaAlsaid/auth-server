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
  //---------------------------------------Basic----------------------------------------
  // test sign up with new user
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
  // test sign in with existing user
  it('sets token as authorization headers when signin with valid user', async () => {
    await mockRequest
      .post('/signin')
      .set('authorization', `Basic ${encoded}`)
      .send(newUser)
      .then((results) => {
        let token = results.body.token;
        expect(token).toBeDefined();
        expect(token).toEqual(jwt);
      });
  });
  //---------------------------------------Bearer----------------------------------------
  // test access route /secret with token from sign in
  it('allows user to access /secret with a valid token/before token expiration', async () => {
    await mockRequest
      .get('/secret')
      .set('authorization', `Bearer ${jwt}`)
      .then((result) => {
        expect(result.text).toEqual('you are authorized');
      });
  });

  it('doesn\'t allow user to access /secret after token expiration', async (done) => {
    await setTimeout(async () => {
      await mockRequest
        .get('/secret')
        .set('authorization', `Bearer ${jwt}`)
        .then((result) => {
          // will cause an error with message unauthorised
          expect(result.status).toEqual(500);
          expect(result.text).not.toEqual('you are authorized');
          done();
        });
    }, 4000); // wait 4 seconds
  });
});
