"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const ws_1 = require("ws"); // websocket server
const app = express(); // Instantiates Express framework
// HTTP Server
app.get('/', (req, res) => // when root path is reached, return this html file
 res.sendFile(path.join(__dirname, '../../public/demo-websocket-client.html')));
const httpServer = app.listen(8000, 'localhost', () => {
    console.log('HTTP server is listening on localhost:8000');
});
// WebSocket Server
const wsServer = new ws_1.Server({ port: 8085 }); // control ws port
console.log('WebSocket server is listening on localhost:8085');
wsServer.on('connection', wsClient => {
    // push data messages
    wsClient.send('This message was pushed by the WebSocket server');
    // handles errors
    wsClient.onerror = (error) => console.log(`The server received: ${error['code']}`);
});
/*
Two servers used to demonstrate how data can be pushed from server to client
without the client needing to make a request for it.
*/ 
//# sourceMappingURL=demo-websocket-server.js.map