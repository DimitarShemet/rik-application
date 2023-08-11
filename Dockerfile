FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN apk --no-cache add curl
EXPOSE 4200
CMD ["npm", "start"]