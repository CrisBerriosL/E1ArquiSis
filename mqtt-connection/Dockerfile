# We use alpine for a lightweight (less memory) image
FROM node:16-alpine 

# Create app directory
WORKDIR /mqtt

# Copy the files that declares the dependencies (in this case using yarn)
COPY package.json ./
COPY yarn.lock ./

# Check if all the files are correct when building
RUN ls -a

# Install the dependencies
RUN yarn install

# Copy all the files into the container to run the app
COPY . .

# Run command to start the process runing a shell command using node
CMD yarn start
