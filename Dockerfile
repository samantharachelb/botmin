# Use slimmed down image of node:12 to build project
FROM node:14-alpine AS BUILD_IMAGE

# add project build requirements
#RUN apk update && apk add yarn curl bash python g++ make && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
#RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app
COPY --chown=node:node ./dist ./dist
COPY --chown=node:node node_modules ./node_modules

# run node-prune
#RUN /usr/local/bin/node-prune
#RUN npm prune --production
CMD ["node", "dist/"]
