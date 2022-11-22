import * as express from "express";
import * as path from "path";
import {Server} from "ws"; // websocket server

const app = express(); // Instantiates Express framework
app.disable("x-powered-by");

// HTTP Server
app.get('/', (req, res) => // when root path is reached, return this html file
    res.sendFile(path.join(__dirname, '../../public/demo-websocket-client.html')));

const httpServer = app.listen(8000, 'localhost', () => { // control client port
    console.log('HTTP server is listening on localhost:8000');
});

// WebSocket Server
const wsServer = new Server({port:8085}); // control ws port
console.log('WebSocket server is listening on localhost:8085');

wsServer.on('connection',
    wsClient => { // if 'connection' event is received
        // push data messages
        wsClient.send('This message was pushed by the WebSocket server');
        // handles errors
        wsClient.onerror = (error) =>
            console.log(`The server received: ${error['code']}`);
    }
);

/*
Two servers used to demonstrate how data can be pushed from server to client
without the client needing to make a request for it.
*/