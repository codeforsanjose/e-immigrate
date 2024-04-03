FROM node:latest as step1

WORKDIR /srv

COPY --link ./frontend .
RUN npm install

FROM step1 as build
RUN npm run build



FROM nginx as nginx-build
LABEL org.opensourcesanjosedistro="debian" \
  org.opensourcesanjoseimage="emmigrate" \
  org.opencontainers.image.source="https://github.com/codeforsanjose/e-immigrate" \
  org.opencontainers.image.ref.name="emmigrate" \
  org.opencontainers.image.title="E-Immigrate" \
  org.opencontainers.image.description="Project New Citizen is a web application created for the Center for Employment Training Immigration and Citizenship Program (CET-ICP) in collaboration with Code for San Jose."
COPY docker/frontend/conf_d /etc/nginx/conf.d
COPY docker/frontend/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /srv/dist /usr/share/nginx/html
EXPOSE 80/tcp


FROM step1 as local
EXPOSE 80/tcp



LABEL org.opensourcesanjosedistro="debian" \
  org.opensourcesanjoseimage="emmigrate" \
  org.opencontainers.image.source="https://github.com/codeforsanjose/e-immigrate" \
  org.opencontainers.image.ref.name="emmigrate" \
  org.opencontainers.image.title="E-Immigrate" \
  org.opencontainers.image.description="Project New Citizen is a web application created for the Center for Employment Training Immigration and Citizenship Program (CET-ICP) in collaboration with Code for San Jose."
CMD [ "npm", "run", "serve:dev" ]
