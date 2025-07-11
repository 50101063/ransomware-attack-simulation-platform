# Dockerfile for Backend (Node.js/Express Application)

# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
# This allows us to install dependencies before copying the rest of the application code
COPY package*.json ./

# Install application dependencies
# Using --production will only install dependencies listed in "dependencies" in package.json
# For development, we might install devDependencies as well, but for a production-like build,
# it's better to keep the image lean.
RUN npm install --production

# Copy the rest of the application source code
# This assumes your TypeScript source code is in `src` and you'll build it to `dist`
COPY . .

# If you are using TypeScript, compile it
# Ensure tsconfig.json is configured to output to a 'dist' folder
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run your app
# Assuming your compiled JavaScript entry point is dist/index.js
CMD ["node", "dist/index.js"]
