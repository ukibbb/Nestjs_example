FROM node:18-alpine

RUN mkdir /application && \
chown -R node:node /application

WORKDIR /application

COPY --chown=node:node package.json package-lock.json tsconfig.json tsconfig.build.json ./
COPY --chown=node:node src/ ./src

USER node

RUN npm install

CMD ["npm", "run", "start:dev"]
