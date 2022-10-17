"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
class MessageServer {
    constructor(wsServer) {
        this.wsServer = wsServer;
        this.subscribeToMessages = (ws) => {
            ws.on('message', (data) => {
                if (typeof data === 'string') {
                    this.handleMessage(ws, JSON.parse(data));
                }
                else {
                    console.log('Received data of unsupported type.');
                }
            });
        };
        this.cleanupDeadClients = () => {
            this.wsServer.clients.forEach(client => {
                if (this.isDead(client)) {
                    this.wsServer.clients.delete(client);
                }
            });
        };
        this.wsServer.on('connection', this.subscribeToMessages);
        this.wsServer.on('error', this.cleanupDeadClients);
    }
    broadcastExcept(currentClient, message) {
        this.wsServer.clients.forEach(client => {
            if (this.isAlive(client) && client !== currentClient) {
                client.send(JSON.stringify(message));
            }
        });
    }
    replyTo(client, message) {
        client.send(JSON.stringify(message));
    }
    get clients() {
        return this.wsServer.clients;
    }
    isAlive(client) {
        return !this.isDead(client);
    }
    isDead(client) {
        return (client.readyState === WebSocket.CLOSING ||
            client.readyState === WebSocket.CLOSED);
    }
}
exports.MessageServer = MessageServer;
//# sourceMappingURL=message-server.js.map