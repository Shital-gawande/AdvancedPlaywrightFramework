# Use official Node.js runtime as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the project if needed
RUN npm run type-check

# Set environment to production
ENV NODE_ENV=production

# Default command to run tests
CMD ["npm", "test"]
