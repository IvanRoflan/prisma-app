## Installation

```bash
$ npm install
```

## Setup database

- First create database and set connection link to .env file
- Then run following code to migrate database

```bash
# run migrations
npx prisma migrate deploy
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
