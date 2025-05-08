## Create a Vite Docker Container

# Use an official dotnet SDK runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /app 

# Copy the package.json file to the container
COPY package.json .

# Install app dependencies
RUN npm install

# Expose the port that the application listens on
EXPOSE 3001 4173

# Start the application
CMD ["npm", "start"]