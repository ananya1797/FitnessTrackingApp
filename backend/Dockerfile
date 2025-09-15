# Stage 1: Build dependencies
FROM node:18-alpine AS build

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of your backend code
COPY . .

# Stage 2: Run
FROM node:18-alpine

WORKDIR /app

# Copy only the necessary files from build stage
COPY --from=build /app /app

# Expose the backend port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]


