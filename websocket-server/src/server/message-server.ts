import * as WebSocket from 'ws';

export abstract class MessageServer<T> {
  constructor(private readonly wsServer: WebSocket.Server) {
    this.wsServer.on('connection', this.subscribeToMessages); // pick up connecting or connected connections from clients
    this.wsServer.on('error', this.cleanupDeadClients); // cleanup closing or closed connections from clients
  }

  protected abstract handleMessage(sender: WebSocket, message: T): void; // definition, impl in blockchain class

  protected readonly subscribeToMessages = (ws: WebSocket): void => {
    ws.on('message', (data: WebSocket.Data) => {
      if (typeof data === 'string') {
        this.handleMessage(ws, JSON.parse(data));
      } else {
        console.log('Received data of unsupported type.');
      }
    });
  };

  private readonly cleanupDeadClients = (): void => {
    this.wsServer.clients.forEach(client => {
      if (this.isDead(client)) {
        this.wsServer.clients.delete(client);
      }
    });
  };

// Broadcasting and Replying to Clients
  protected broadcastExcept(currentClient: WebSocket, message: Readonly<T>): void { // broadcast all
    this.wsServer.clients.forEach(client => {
      if (this.isAlive(client) && client !== currentClient) {
        client.send(JSON.stringify(message));
      }
    });
  }

  protected replyTo(client: WebSocket, message: Readonly<T>): void { // reply to single node
    client.send(JSON.stringify(message));
  }

  protected get clients(): Set<WebSocket> {
    return this.wsServer.clients;
  }

  private isAlive(client: WebSocket): boolean {
    return !this.isDead(client);
  }

  private isDead(client: WebSocket): boolean { // check if client in disconnecting or disconnected state
    return (
      client.readyState === WebSocket.CLOSING ||
      client.readyState === WebSocket.CLOSED
    );
  }
}
