# syntax=docker/dockerfile:1
FROM node:12
COPY package.json .
RUN npm install\
    && npm install tsc -g
COPY . .
RUN tsc
CMD ["node", "./dist/server.js"]