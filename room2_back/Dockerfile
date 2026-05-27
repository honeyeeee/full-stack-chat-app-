FROM node:alpine
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . . 
EXPOSE 8800

CMD [ "npm","start" ]