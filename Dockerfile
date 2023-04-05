#      _                      _
#   __| | __ _  ___        __| | ___   ___ ___
#  / _` |/ _` |/ _ \_____ / _` |/ _ \ / __/ __|
# | (_| | (_| |  __/_____| (_| | (_) | (__\__ \
#  \__,_|\__,_|\___|      \__,_|\___/ \___|___/

#  https://github.com/daeuniverse/dae
#
#  Copyright (C) 2023 @daeuniverse <https://dae.v2raya.org>
#
#  This is a self-hosted software, liscensed under the MIT License.
#  See /License for more information.

#  --- Build Stage --- #

FROM docker.io/library/node:current-alpine as build

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . ./
RUN npm run build

# --- Deployment Stage --- #

FROM docker.io/library/nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
