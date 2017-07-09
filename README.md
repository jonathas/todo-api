# TODO List API

[![Build Status](https://travis-ci.org/jonathas/todo-api.svg?branch=master)](https://travis-ci.org/jonathas/todo-api) [![Coverage Status](https://coveralls.io/repos/github/jonathas/todo-api/badge.svg?branch=master)](https://coveralls.io/github/jonathas/todo-api?branch=master)

This is a todo list API I decided to develop in order to show a little bit of what I can currently do with Node.js and related technologies.

Here I'm using Node.js with Express, TypeScript, MongoDB and Docker.

As my focus is on backend development, I'll develop the frontend part later.

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
