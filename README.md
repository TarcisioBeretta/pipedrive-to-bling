## Description

This API was created to import deals from Pipedrive and create orders in Bling.

## How it works

It's necessary to make a GET request to "localhost:3000/integration", then all deals with status "gain" in Pipedrive will be created as orders in Bling.

You can also consult imported items by accessing the "localhost:3000/deal" endpoint.

## Installation

```bash
$ npm install
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

## Endpoints

```bash
# run integration
$ GET localhost:3000/integration

# get imported items
$ GET localhost:3000/deal
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
