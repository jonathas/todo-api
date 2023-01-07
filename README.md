# TODO List API

[![Build Status](https://travis-ci.org/jonathas/todo-api.svg?branch=master)](https://travis-ci.org/jonathas/todo-api) [![Coverage Status](https://coveralls.io/repos/github/jonathas/todo-api/badge.svg?branch=master)](https://coveralls.io/github/jonathas/todo-api?branch=master)

## Disclaimer (January of 2023)

I've implemented this example in 2017, when API development was very different from today.
Now in the beginning of 2023 I thought about updating it but then decided to keep it as it is for historical reasons and because there are just way too many things I'd change, so it would be better to start a similar project from scratch.

Let me list below what I would do different if this was done today:

- Use swagger (documentation in a json file) instead of apidoc
- Follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#summary) for writing the commit messages
- Versioning done with the help of [release-it](https://www.npmjs.com/package/release-it)
- Drop gulp and use only typescript instead.
- jest instead of mocha for the tests
- jest instead of istanbul for code coverage
- fastify instead of express
- eslint instead of tslint
- Enforce proper rules with eslint. [Example here](https://gist.github.com/jonathas/c6b5f110e1eaf92d94ac976a19a3a178)
- nodemon is not needed anymore
- bluebird is not needed anymore
- pino instead of winston

Truth be told, nowadays I'd recommend to start an API in Node.js using [Nest](https://nestjs.com/), which already gives you a well implemented architecture to start your project with. So I might be creating a similar project soon, but using Nest instead, and then we can compare the differences.

## Intro

This is a todo list API I decided to develop in order to show a little bit of what I can currently do with Node.js and related technologies.

Here I'm using Node.js with Express, TypeScript, MongoDB and Docker.

## Documentation - Avaliable endpoints

Currently there's a Task controller with all the possible operations and some endpoints related to it.
In order to see which endpoints are available, you need to have gulp installed:

```bash
$ npm i -g gulp
$ cd api && gulp apidoc
```

This will generate the documentation for the API inside docs/apidoc.

## Running the infrastructure with Docker

Install [Docker](https://www.docker.com/) and docker-compose. If you use Windows, click on the icon that will appear on your tray and [enable Shared Drives](https://docs.docker.com/docker-for-windows/#general).

Enter the api directory and run:
```bash
$ yarn install && gulp
```

Then go back to the root of the project, enter the infra directory and:
```bash
$ docker-compose up
```

This will use the docker-compose.yml file inside the infra directory to download and prepare what is needed to run the API.
It uses Nginx as reverse proxy on port 80 that sits in front of the Node server, pm2 as process manager for Node.js and MongoDB as the database, so we have 3 Docker containers.

If you need to run pm2 in development mode so it reloads after every code change, run instead:

```bash
$ docker-compose -f docker-dev.yml up
```

## Testing and checking code coverage report

In order to test, you need to have the packages installed and infra running (previous step).

After that is done, run the following command:
```bash
$ npm test
```

This command will use gulp to transpile the typescript files to the api/bin directory, then mocha to run the tests and istanbul to generate the code coverage report.
After all is done, you will find the report inside api/coverage/lcov-report/index.html
