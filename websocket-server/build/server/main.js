"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const WebSocket = require("ws");
const blockchain_server_1 = require("./blockchain-server");
const PORT = 3000;
const app = express();
app.use('/', express.static(path.join(__dirname, '../../public'))); // location client code
app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules'))); // location node modules
const httpServer = app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Listening on http://localhost:${PORT}`);
    }
});
const wsServer = new WebSocket.Server({ server: httpServer }); // start Web server (both HTTP and WS)
const bcServer = new blockchain_server_1.BlockchainServer(wsServer); // start blockchain notification server
// new BlockchainServer(wsServer); // start blockchain notification server
//# sourceMappingURL=main.js.map