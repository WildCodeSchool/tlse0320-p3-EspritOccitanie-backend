# WCS project 3 back 

## Installing

Clone the repo

Run npm install

### Create the database 

Create two databases
- one for local development 
- one for tests

Update your .env file so it matches your database configuration

## Run the app
```sh
npm start
```

To run with nodemon
```sh
npm run start-watch
```

## To run tests
```sh
npm test
```

## Reset your testing database
```sh
npm run tests:reset-db
```

## Writing tests

All tests are in the __tests__ directory. 
Write tests for each route


# Before each push

```sh
npm run lint
```
Let you know if you have linter error. If some errors remains, push will be rejected via github actions.

