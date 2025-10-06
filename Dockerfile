# Stage 1: Build the React app
FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginxinc/nginx-unprivileged:alpine

USER root


COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

# Copy the runtime injection script into the container
COPY --chown=nginx:nginx env.sh /docker-entrypoint.d/10-env.sh
COPY --chown=nginx:nginx sri.sh /docker-entrypoint.d/20-sri.sh

RUN apk add --no-cache openssl && \
  chmod +x /docker-entrypoint.d/10-env.sh /docker-entrypoint.d/20-sri.sh && \
  chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 8080

USER nginx

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]