FROM node:20-alpine as build
# Based on: https://mherman.org/blog/dockerizing-a-react-app/

WORKDIR /app

# Build environment
COPY package.json ./
COPY package-lock.json ./
RUN npm install
# Add app
COPY . ./
RUN npm run build


# Production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# # syntax=docker/dockerfile:1.2