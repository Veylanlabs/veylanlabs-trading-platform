# Use the official Puppeteer image which includes Chromium and all required Linux dependencies
FROM ghcr.io/puppeteer/puppeteer:latest

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Switch to the node user (created by the puppeteer image)
USER node

# Create app directory
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
RUN npm install

# Bundle app source
COPY --chown=node:node . .

# Expose the port the app runs on
EXPOSE 4000

# Command to run the worker
CMD [ "npm", "start" ]
