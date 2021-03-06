FROM node:8.9.0
# Create app directory
RUN mkdir -p /usr/src/blog-server-express

ADD package.json /usr/src/package.json
ADD gulpfile.js /usr/src/gulpfile.js
RUN npm i -g gulp
#ADD startup.sh /usr/src/startup.sh

WORKDIR /usr/src/blog-server-express

RUN npm set progress false && npm install

# If you are building your code for production
# RUN npm install --only=production
#VOLUME ["./"]
# Bundle app source

EXPOSE 1337
CMD [ "gulp" ]