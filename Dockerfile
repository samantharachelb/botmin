# Use slimmed down image of node:14 to build project
FROM node:14-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app
COPY --chown=node:node ./dist ./dist
COPY --chown=node:node node_modules ./node_modules

CMD ["node", "dist/"]
