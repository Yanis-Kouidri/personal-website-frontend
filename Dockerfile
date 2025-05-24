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

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]