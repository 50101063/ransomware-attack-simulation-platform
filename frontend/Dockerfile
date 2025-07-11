# Dockerfile for Frontend (React Application)

# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the application with a lightweight web server (e.g., Nginx or directly with Node)
# For development, we'll run the development server directly.
# For production, you'd typically serve the build output with Nginx or a similar static server.

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/build ./
COPY package*.json ./

# Install only production dependencies if you were serving with Node directly
# RUN npm install --only=production

# For development, we copy the entire app and run the dev server
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
