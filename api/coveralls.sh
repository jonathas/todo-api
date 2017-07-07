#!/bin/bash

sed -i 's/bin\///g' ./coverage/lcov.info && cat ./coverage/lcov.info | ./node_modules/.bin/coveralls
