FROM node:19-bullseye

# Creating Root Directory in Container
WORKDIR /app

# Installing Dependencies
COPY package*.json ./

# Run npm install
RUN npm install

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 8080

# Run npm start
CMD [ "npm", "start" ]