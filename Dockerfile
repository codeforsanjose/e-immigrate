FROM --platform=amd64 node:15.3.0-buster-slim as npm-cache

ENV NODE_ENV=production
WORKDIR /srv

COPY --link package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm install --loglevel verbose

FROM npm-cache as frontend-build

COPY --link . .
RUN npm run build

FROM frontend-build as app

EXPOSE 5000/tcp
CMD [ "node", "./backend/index.js" ]
