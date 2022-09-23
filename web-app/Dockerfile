# We use alpine for a lightweight (less memory) image
FROM node:16-alpine 

# Create app directory
WORKDIR /app

# Copy the files that declares the dependencies (in this case using yarn)
COPY package.json ./
COPY yarn.lock ./

# Check if all the files are correct when building
RUN ls -a

# Install the dependencies
RUN yarn install

# Copy all the files into the container to run the app
COPY . .

# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
# RUN chmod +x /wait

# RUN yarn sequelize db:migrate

# Run command to start the process runing a shell command using node
CMD yarn sequelize db:migrate && yarn dev
