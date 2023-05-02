FROM icr.io/codeengine/golang:alpine
RUN npm install
COPY index.js .
EXPOSE 8080
CMD [ "node", "index.js" ]
