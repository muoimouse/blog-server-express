FROM centos:7
RUN yum -y update
RUN yum -y groupinstall "Development Tools"
RUN yum -y install cronie

RUN curl -SLO "http://nodejs.org/dist/v8.9.0/node-v8.9.0.tar.gz"
RUN tar xzvf node-v* && cd node-v*
RUN ./configure
RUN make
RUN make install

CMD [ "node" ]
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN chmod +x startup.sh
RUN npm install -g nodemon