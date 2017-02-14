FROM phusion/passenger-customizable
MAINTAINER Jon Ribeiro <contact@jonathas.com>

# Copy nginx configuration
COPY nginx.conf /etc/nginx

# Enable Nginx, set the timezone, create directories
RUN rm -f /etc/service/nginx/down &&\ 
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | NVM_DIR=/usr/local/nvm PROFILE=/etc/bash.bashrc bash &&\ 
    export NVM_DIR="/usr/local/nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" &&\ 
    nvm install 6.9.2 && npm i -g gulp && ln -s /usr/local/nvm/versions/node/v6.9.2/lib/node_modules/gulp/bin/gulp.js /usr/bin/gulp &&\ 
    ln -s /usr/local/nvm/versions/node/v6.9.2/bin/node /usr/bin/node &&\ 
    ln -s /usr/local/nvm/versions/node/v6.9.2/bin/npm /usr/bin/npm &&\ 
    cp /usr/share/zoneinfo/Europe/Prague /etc/localtime &&\ 
    mkdir /home/app/api /home/app/html && chown app:app /home/app/api && chown app:app /home/app/html