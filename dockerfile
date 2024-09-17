# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Install bzip2
RUN apt-get update && apt-get install -y bzip2

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN --mount=type=cache,id=s/b041ee39-fc71-486c-af31-9c903a986657-/root/npm,target=/root/.npm npm ci

# Copy the rest of your app's source code
COPY . .

# Your build commands and other instructions...

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]