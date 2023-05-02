FROM node:14.15.1-alpine
RUN npm install
COPY index.js .
EXPOSE 8080
CMD [ "node", "index.js" ]
