FROM node:15.3.0-buster-slim

WORKDIR /srv

COPY package*.json .
RUN npm install

# RUN mkdir /srv/backend
COPY backend .
# RUN npm run server

# RUN npm install express
# RUN export NODE_PATH=/srv/node_modules
EXPOSE 5000

CMD [ "node", "index.js" ]
# CMD [ "/bin/bash" ]