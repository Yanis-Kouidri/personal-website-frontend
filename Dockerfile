# Stage 1: Build the React app
FROM node:24.12.0-alpine3.22 AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginxinc/nginx-unprivileged:1.29.2-alpine3.22-slim

USER root


COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the runtime injection script into the container (Not good practice, container should be immutable)
COPY env.sh /docker-entrypoint.d/10-env.sh
COPY sri.sh /docker-entrypoint.d/20-sri.sh

RUN apk add --no-cache openssl && \
  chmod +x /docker-entrypoint.d/10-env.sh /docker-entrypoint.d/20-sri.sh && \
  chown -R nginx:nginx /usr/share/nginx/html /etc/nginx/conf.d/default.conf /docker-entrypoint.d 
# Not good practice, nginx shouldn't have write access to its own files

EXPOSE 8080

USER nginx

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]