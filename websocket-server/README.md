# Node.js Websocket Server (TypeScript)
## Introduction
Previous projects only supported a single miner adding blocks with transaction data. If multiple miners wish to contribute to a blockchain at the same time, we will need a server that broadcasts messages to the blockchain's nodes (all computers part of the blockchain). This project is a server using the **Websocket protocol** to do exactly so. Additionally, web clients (users) will also be able to make requests of this server.

## Installing & Running

## Dependencies
- **ws** - Node.js library that supports Websocket protocol.
- **express** - Tiny Node.js framework for HTTP support.
- **nodemon** - Dev tool that restarts Node.js apps when change in script detected.
- **lit-html** - HTML templates for rendering in DOM.

## Key Topics

### Longest Chain Rule
Usually a blockchain has **many blocks** (e.g. 100 blocks) and a **pool of pending transactions**, whereby various miners pick different transactions for their next blocks (e.g. 10 transactions). This means that if miners, M1, M2 and M3 all submit their next block for the chain (block 101 since there are already 100 before), each submitted block will contain different transactions:

![Forked Blockchain](https://github.com/dainank/fontys-blockchain/blob/WebsocketServer/websocket-server/assets/images/forked-blockchain.png)

### Emulating More Than One Miner

### The WebSocket Protocol