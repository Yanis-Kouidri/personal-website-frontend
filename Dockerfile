# Stage 1: Build the React app
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock (if exists)
COPY package.json ./
COPY yarn.lock ./

RUN corepack enable

# Install dependencies using Yarn
RUN yarn install --immutable

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN yarn build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built static files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy custom Nginx configuration (optional, see below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the runtime injection script into the container
COPY env.sh /docker-entrypoint.d/10-env.sh
COPY sri.sh /docker-entrypoint.d/20-sri.sh

RUN dos2unix /docker-entrypoint.d/*.sh /etc/nginx/conf.d/default.conf && \
  chmod +x /docker-entrypoint.d/*.sh && \
  apk add --no-cache openssl 


# Expose port 80
EXPOSE 80

# Let Docker run your script before starting Nginx
ENTRYPOINT ["/docker-entrypoint.sh"]

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]