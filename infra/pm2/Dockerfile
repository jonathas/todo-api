FROM keymetrics/pm2:8-alpine
LABEL maintainer="Jon Ribeiro <contact@jonathas.com>"

WORKDIR /app

RUN apk update && apk add tzdata &&\ 
    cp /usr/share/zoneinfo/Europe/Prague /etc/localtime &&\ 
    echo "Europe/Prague" > /etc/timezone &&\ 
    apk del tzdata
