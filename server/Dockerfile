FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache --virtual .build-deps python3 make g++ \
    && npm ci --omit=dev \
    && apk del .build-deps

COPY --chown=node:node src ./src
COPY --chown=node:node scripts ./scripts

RUN mkdir -p /app/data/uploads && chown -R node:node /app/data

ENV NODE_ENV=production
EXPOSE 4000
VOLUME ["/app/data"]

USER node
CMD ["node", "src/index.js"]
