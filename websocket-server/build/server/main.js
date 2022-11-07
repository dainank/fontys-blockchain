"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const WebSocket = require("ws");
const blockchain_server_1 = require("./blockchain-server");
const PORT = 3000;
const app = express();
app.use('/', express.static(path.join(__dirname, '../../public')));
app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));
const httpServer = app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Listening on http://localhost:${PORT}`);
    }
});
const wsServer = new WebSocket.Server({ server: httpServer });
new blockchain_server_1.BlockchainServer(wsServer);
//# sourceMappingURL=main.js.map