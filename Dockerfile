FROM node:alpine as builder
WORKDIR '/app'
RUN npm install -g @angular/cli
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/dist/raziel /usr/share/nginx
