# Use the official Node.js 18 image as a parent image
FROM node:18-alpine as builder

# Set the working directory for both client and server
WORKDIR /app

# Copy package.json files for both client and server
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies for client
WORKDIR /app/client
RUN npm ci

# Copy client source code and build
COPY client/ ./
RUN npm run build

# Install dependencies for server
WORKDIR /app/server
RUN npm ci

# Copy server source code and build
COPY server/ ./
RUN npm run build

# Create production image
FROM node:18-alpine

WORKDIR /app

# Copy built server code
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/package*.json ./
COPY --from=builder /app/server/data ./data

# Install production dependencies only
RUN npm ci --only=production

# Copy built client code to be served by Express
COPY --from=builder /app/client/dist ./public

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/server.js"]