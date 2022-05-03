FROM node:15.3.0-buster-slim as builder

WORKDIR /srv

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM openresty/openresty
COPY ./AWS-Deployment/client/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./AWS-Deployment/client/nginx/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY --from=builder /srv/build /usr/local/openresty/nginx/html
EXPOSE 80
