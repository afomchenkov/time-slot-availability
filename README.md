## Time Slots Availability service

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation & start instructions

```bash
# install the dependencies
$ npm install
# start the service via docker compose with the DB
$ start:docker
```

## Run the tests
```bash
# unit tests
$ cd resources/tests
# install test dependencies
$ npm install
# run provided tests
$ npm run test
```


## Rules
```
- Only return data if there is at least one sales manager that matches the language, products and rating of the input parameter.
- Display the count of how many sales managers are available per slot.
- A slot can be booked or not. Available slots that conflict with other booked slots should not be counted.
- A customer is matched to a sales manager when the language, rating and products of input parameter intersect with the ones a sales
manager has.
```
