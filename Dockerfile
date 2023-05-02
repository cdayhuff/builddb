FROM icr.io/codeengine/node:14-alpine
RUN npm install
COPY index.js .
EXPOSE 8080
CMD [ "node", "index.js" ]
