# Define the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the application code into the container
COPY ./web . 

# Install dependencies
RUN npm install

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application server
CMD ["npm", "start"]
