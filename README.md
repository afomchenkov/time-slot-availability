## Time Slots Availability service

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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


## Rules
```
- Only return data if there is at least one sales manager that matches the language, products and rating of the input parameter.
- Display the count of how many sales managers are available per slot.
- A slot can be booked or not. Available slots that conflict with other booked slots should not be counted.
- A customer is matched to a sales manager when the language, rating and products of input parameter intersect with the ones a sales
manager has.
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
