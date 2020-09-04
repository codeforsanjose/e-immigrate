FROM node:alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    git \
    openssh-client

RUN git clone --single-branch --branch master https://github.com/codeforsanjose/e-immigrate.git
WORKDIR /usr/src/app/e-immigrate

RUN npm install
RUN npm install -g serve
RUN apk del build-dependencies

RUN npm run build

FROM openresty/openresty
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY --from=builder /usr/src/app/e-immigrate/build /usr/local/openresty/nginx/html
EXPOSE 80