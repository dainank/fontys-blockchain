import * as WebSocket from 'ws';
import { Message, MessageTypes, UUID } from '../shared/messages';
import { MessageServer } from './message-server';

type Replies = Map<WebSocket, Message>; // replies from nodes

export class BlockchainServer extends MessageServer<Message> { // see constructor
    private readonly receivedMessagesAwaitingResponse = new Map<UUID, WebSocket>();

    private readonly sentMessagesAwaitingReply = new Map<UUID, Replies>(); // Used as accumulator for replies from clients.

    protected handleMessage(sender: WebSocket, message: Message): void {    // call up appropriate method based on received msg
        switch (message.type) {
            case MessageTypes.GetLongestChainRequest : return this.handleGetLongestChainRequest(sender, message);
            case MessageTypes.GetLongestChainResponse: return this.handleGetLongestChainResponse(sender, message);
            case MessageTypes.NewBlockRequest        : return this.handleAddTransactionsRequest(sender, message);
            case MessageTypes.NewBlockAnnouncement   : return this.handleNewBlockAnnouncement(sender, message);
            default: {
                console.log(`Received message of unknown type: "${message.type}"`);
            }
        }
    }

    private handleGetLongestChainRequest(requestor: WebSocket, message: Message): void { // client asking for longest chain

        if (this.clientIsNotAlone) {    // ask other nodes about their chains
            this.receivedMessagesAwaitingResponse.set(message.correlationId, requestor);
            this.sentMessagesAwaitingReply.set(message.correlationId, new Map()); // Map accumulates replies from clients
            this.broadcastExcept(requestor, message);
        } else {    // no other nodes, blockchain must be empty
            this.replyTo(requestor, {
                type: MessageTypes.GetLongestChainResponse,
                correlationId: message.correlationId,
                payload: []
            });
        }
    }

    private handleGetLongestChainResponse(sender: WebSocket, message: Message): void { // client sending longest chain
        if (this.receivedMessagesAwaitingResponse.has(message.correlationId)) {
            const requestor = this.receivedMessagesAwaitingResponse.get(message.correlationId);

            if (this.everyoneReplied(sender, message)) {
                const allReplies = this.sentMessagesAwaitingReply.get(message.correlationId).values();
                const longestChain = Array.from(allReplies).reduce(this.selectTheLongestChain);
                this.replyTo(requestor, longestChain); // response sent to client
            }
        }
    }

    private handleAddTransactionsRequest(requestor: WebSocket, message: Message): void {
        this.broadcastExcept(requestor, message);
    }

    private handleNewBlockAnnouncement(requestor: WebSocket, message: Message): void {
        this.broadcastExcept(requestor, message);
    }

    private everyoneReplied(sender: WebSocket, message: Message): boolean {
        const repliedClients = this.sentMessagesAwaitingReply
            .get(message.correlationId)
            .set(sender, message);

        const awaitingForClients = Array.from(this.clients).filter(c => !repliedClients.has(c));

        return awaitingForClients.length === 1; // check if all clients replied
    }

    private selectTheLongestChain(currentlyLongest: Message, current: Message, index: number) {
        return index > 0 && current.payload.length > currentlyLongest.payload.length ? current : currentlyLongest;
    }

    private get clientIsNotAlone(): boolean { // check is more than one node in blockchain
        return this.clients.size > 1;
    }
}