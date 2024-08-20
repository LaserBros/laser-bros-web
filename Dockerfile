# Use the latest Node.js LTS version
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

RUN npm install -g npm@10.8.2
# Install dependencies
RUN npm install -f

# Copy the rest of the application code
COPY . .

# Expose the desired port
EXPOSE 3000

# Use nodemon to run the server
CMD ["npm", "start"]