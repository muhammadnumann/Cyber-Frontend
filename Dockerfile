# Set the base image to node:16.17.1-alpine
FROM node:16.18.0-alpine3.16 as build
ENV PATH /app/node_modules/.bin:$PATH
# Specify where our app will live in the container
WORKDIR /app
COPY ./package.json ./
ENV GENERATE_SOURCEMAP false
#*****#
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*
#******#
RUN npm install -g npm@9.6.7         #8.19.3
# rebuild node-sass
RUN yarn add node-sass
RUN npm install --force
RUN npm install --global --force yarn

COPY ./ ./
#RUN npm run build
RUN yarn run build
# We want the production version
#CMD ["npm", "start"]

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8070
CMD ["nginx", "-g", "daemon off;"]

#CMD ["yarn", "start"]
