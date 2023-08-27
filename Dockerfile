###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:latest as development

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./

RUN yarn install 

COPY --chown=node:node . ./

RUN chown node:node /usr/src/app

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:latest as build

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/ .

RUN yarn run build

###################
# PRODUCTION
###################

FROM nginx:latest as production

COPY default.conf /etc/nginx/conf.d/

COPY --from=build /usr/src/app/dist /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]