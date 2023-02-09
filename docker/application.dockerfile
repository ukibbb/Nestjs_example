FROM node:18-slim

RUN mkdir /application && \
chown -R node:node /application

WORKDIR /application

COPY --chown=node:node package.json package-lock.json tsconfig.json tsconfig.build.json ./
COPY --chown=node:node src/ ./src
COPY ./docker/run.sh ./docker/wait-for-it.sh ./

USER node

RUN npm install

CMD [ "./run.sh" ]
