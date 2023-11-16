FROM node:20-alpine

# Creating Root Directory in Container
WORKDIR /app

# Installing Dependencies
COPY package*.json ./

# Run npm install
RUN npm install

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Run npm start
CMD [ "npm", "start" ]