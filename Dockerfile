FROM node:alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run prod

FROM nginx
COPY --from=builder /app/dist/raziel-space /var/www/raziel-space
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
