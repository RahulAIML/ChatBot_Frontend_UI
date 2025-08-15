# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code and environment files
COPY . .

# Build the application with environment variables
ARG VITE_COMMON_API_URL=/api
ARG VITE_CHATBOT_API=/api
ENV VITE_COMMON_API_URL=$VITE_COMMON_API_URL
ENV VITE_CHATBOT_API=$VITE_CHATBOT_API

# Build the application
RUN yarn build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
