FROM nginx:1.13.0-alpine
MAINTAINER Jon Ribeiro <contact@jonathas.com>

RUN apk update && apk add bash && apk add tzdata &&\ 
    cp /usr/share/zoneinfo/Europe/Prague /etc/localtime &&\ 
    echo "Europe/Prague" > /etc/timezone &&\ 
    apk del tzdata && rm -rf /var/cache/apk/*
