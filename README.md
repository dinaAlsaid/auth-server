# LAB - Class 13: Bearer Auth

## Project: Auth-srever :phase 3

### Author: Dina Alsaid

### Setup

#### `.env` requirements (where applicable)

- `PORT=3000`
- `MONGODB_URI=mongodb://localhost:27017/users`
- `SECRET=shhhhThisIsASecret`
- `CLIENT_ID=b19a9b00fc5a28606025`
- `CLIENT_SECRET=e7e30a0e4eaeef24e0459d978904895bb56d37db`
- `API_SERVER=http://localhost:3000/oauth`

#### How to initialize/run your application (where applicable)

- `npm start`

- Endpoints
  - `/signup`
  - `/signin`
  - `/users`
  - `/oauth`
  - `/secret`

#### How to use your library (where applicable)

When signing up: will create a new unique record for the user in the database (username has to be unique) with a hashed password.
when signing in (Basic auth): 

#### Tests

- Bearer Auth: JWT expires in 1 hour
- OAuth route works
- Basic Auth working tests left

#### UML

##### Class 11

![class 11 UML](./class11.png)  

##### Class 12

![class 12 UML](./class12.png)  

##### Class 13

![class 13 UML](./class13.png)  
