"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../shared/messages");
const message_server_1 = require("./message-server");
class BlockchainServer extends message_server_1.MessageServer {
    constructor() {
        super(...arguments);
        this.receivedMessagesAwaitingResponse = new Map();
        this.sentMessagesAwaitingReply = new Map(); // Used as accumulator for replies from clients.
    }
    handleMessage(sender, message) {
        switch (message.type) {
            case messages_1.MessageTypes.GetLongestChainRequest: return this.handleGetLongestChainRequest(sender, message);
            case messages_1.MessageTypes.GetLongestChainResponse: return this.handleGetLongestChainResponse(sender, message);
            case messages_1.MessageTypes.NewBlockRequest: return this.handleAddTransactionsRequest(sender, message);
            case messages_1.MessageTypes.NewBlockAnnouncement: return this.handleNewBlockAnnouncement(sender, message);
            default: {
                console.log(`Received message of unknown type: "${message.type}"`);
            }
        }
    }
    handleGetLongestChainRequest(requestor, message) {
        if (this.clientIsNotAlone) { // ask other nodes about their chains
            this.receivedMessagesAwaitingResponse.set(message.correlationId, requestor);
            this.sentMessagesAwaitingReply.set(message.correlationId, new Map()); // Map accumulates replies from clients
            this.broadcastExcept(requestor, message);
        }
        else { // no other nodes, blockchain must be empty
            this.replyTo(requestor, {
                type: messages_1.MessageTypes.GetLongestChainResponse,
                correlationId: message.correlationId,
                payload: []
            });
        }
    }
    handleGetLongestChainResponse(sender, message) {
        if (this.receivedMessagesAwaitingResponse.has(message.correlationId)) {
            const requestor = this.receivedMessagesAwaitingResponse.get(message.correlationId);
            if (this.everyoneReplied(sender, message)) {
                const allReplies = this.sentMessagesAwaitingReply.get(message.correlationId).values();
                const longestChain = Array.from(allReplies).reduce(this.selectTheLongestChain);
                this.replyTo(requestor, longestChain); // response sent to client
            }
        }
    }
    handleAddTransactionsRequest(requestor, message) {
        this.broadcastExcept(requestor, message);
    }
    handleNewBlockAnnouncement(requestor, message) {
        this.broadcastExcept(requestor, message);
    }
    everyoneReplied(sender, message) {
        const repliedClients = this.sentMessagesAwaitingReply
            .get(message.correlationId)
            .set(sender, message);
        const awaitingForClients = Array.from(this.clients).filter(c => !repliedClients.has(c));
        return awaitingForClients.length === 1; // check if all clients replied
    }
    selectTheLongestChain(currentlyLongest, current, index) {
        return index > 0 && current.payload.length > currentlyLongest.payload.length ? current : currentlyLongest;
    }
    get clientIsNotAlone() {
        return this.clients.size > 1;
    }
}
exports.BlockchainServer = BlockchainServer;
//# sourceMappingURL=blockchain-server.js.map