FROM keymetrics/pm2-docker-alpine:8
MAINTAINER Jon Ribeiro <contact@jonathas.com>

RUN apk update && apk add tzdata &&\ 
    cp /usr/share/zoneinfo/Europe/Prague /etc/localtime &&\ 
    echo "Europe/Prague" > /etc/timezone &&\ 
    apk del tzdata