FROM node:15.3.0-buster as npm-cache

WORKDIR /srv

COPY --link package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm install
    # npm install --from-lock-file

FROM npm-cache as frontend-build

COPY --link . .
RUN npm run build

FROM frontend-build as app

EXPOSE 5000/tcp
LABEL org.opensourcesanjosedistro="debian" \
  org.opensourcesanjoseimage="emmigrate" \
  org.opencontainers.image.source="https://github.com/codeforsanjose/e-immigrate" \
  org.opencontainers.image.ref.name="emmigrate" \
  org.opencontainers.image.title="E-Immigrate" \
  org.opencontainers.image.description="Project New Citizen is a web application created for the Center for Employment Training Immigration and Citizenship Program (CET-ICP) in collaboration with Code for San Jose."
CMD [ "node", "./backend/index.js" ]
