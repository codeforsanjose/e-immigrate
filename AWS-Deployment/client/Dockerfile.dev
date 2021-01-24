FROM node:alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install
RUN npm run build

FROM openresty/openresty
COPY ./AWS-Deployment/client/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./AWS-Deployment/client/nginx/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY --from=builder /usr/src/app/build /usr/local/openresty/nginx/html
EXPOSE 80