FROM node:20-alpine
WORKDIR /usr/share1
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]