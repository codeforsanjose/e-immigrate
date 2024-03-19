FROM node:latest

WORKDIR /srv

COPY --link ./backend .
RUN npm install

EXPOSE 5000/tcp
LABEL org.opensourcesanjosedistro="debian" \
  org.opensourcesanjoseimage="emmigrate" \
  org.opencontainers.image.source="https://github.com/codeforsanjose/e-immigrate" \
  org.opencontainers.image.ref.name="emmigrate" \
  org.opencontainers.image.title="E-Immigrate" \
  org.opencontainers.image.description="Project New Citizen is a web application created for the Center for Employment Training Immigration and Citizenship Program (CET-ICP) in collaboration with Code for San Jose."
CMD [ "npm", "run", "build-and-serve:watch" ]
