# Node.js Websocket Server (TypeScript)
## Introduction
Previous projects only supported a single miner adding blocks with transaction data. If multiple miners wish to contribute to a blockchain at the same time, we will need a server that broadcasts messages to the blockchain's nodes (all computers are part of the blockchain). This project is a server using the **Websocket protocol** to do exactly so. Additionally, web clients (users) will also be able to make requests to this server.

## Installing & Running
### Installing
1. `npm install -g nodemon`
2. `npm i`
3. `npm run build`

### Running
1. Run Server (choose one):
  - `node build/server/main.js`
  - `nodemon build/server/main.js`
  - `npx nodemon build/server/main.js`

## Dependencies
- **ws** - Node.js library that supports Websocket protocol.
- **express** - Tiny Node.js framework for HTTP support.
- **nodemon** - Dev tool that restarts Node.js apps when a change in the script is detected.
- **lit-html** - HTML templates for rendering in DOM.
> ```@types/package``` is used to provide TypeScript support for the npm packages above.

## File Structure

```
- public [created during build]
    - index.html    | compiled client/main.ts, essentially web client
- src    [src code]
    - client        | client impl
    - server        | server impl
        - main.ts   | code that starts Websocket and notification servers
    - shared        | shared files for client and server
```

## Key Topics

### Longest Chain Rule
A blockchain usually has **many blocks** (e.g. 100 blocks) and a **pool of pending transactions**, whereby various miners pick different transactions for their next blocks (e.g. 10 transactions). This means that if miners, M1, M2 and M3 all submit their next block for the chain (block 101 since there are already 100 before), each submitted block will contain different transactions:

![Forked Blockchain](https://github.com/dainank/fontys-blockchain/blob/WebsocketServer/websocket-server/assets/images/forked-blockchain.png)

The three unconfirmed blocks mined by the miners are all potentially valid but this is where the **longest chain rule** comes in. Let's say there are two other miners M4 and M5. Each picks a block to build upon from the three 101 blocks available to mine block 102. M4 may pick M2's block while M5 picks M3's block (usually at random since mining is an automated process). Let's say M5 finishes mining block 102 first and a sixth miner M6 then picks that one up and finds the next block, the chain would then look as follows:

![Forked Blockchain](https://github.com/dainank/fontys-blockchain/blob/WebsocketServer/websocket-server/assets/images/forked-blockchain-adv.jpg)

Essentially the M2 -> M4 -> M6 chain is now the longest through sheer luck, thus all future miners are now continuing this chain rather than the falling behind M1, and M3 -> M5 chains. All transactions in the longest chain are validated and removed from the unconfirmed transactions list, while any transactions which were in the now obsolete M1 and M3 -> M5 forked chains are returned to the pending transactions list. This longest-chain rule can prevent double spending and fraudulent blocks from getting into the blockchain.

## Double Spending
Imagine that there is a criminal called John who wants to gain coins worth $1000 in his crypto wallet. He could find the next valid block's hash containing a fake transaction sending $1000 to his wallet from a person called Alex for example. Meanwhile, all the other miners would find valid blocks without this fake transaction since they do not know about it. Additionally, John (and potentially any other criminals working with them) would be the only ones finding this one block with this fake transaction while all other miners would find blocks without this fake transaction. This essentially means that if someone wishes to defraud the blockchain, he would have to convince more than 50% of all nodes' computing power to be in on the fake transaction, an impossible feat.

### Emulating More Than One Miner

### The WebSocket Protocol
It is key to understand that the server we add here is not a central authority but rather a server for utility services:
- caching hashes
- broadcasting new transactions
- requesting for the longest chain
- announcing newly created blocks

Essentially nothing can be created, validated or stored with this server, it simply returns info.

Miners would utilize the above server to pick pending transactions and to see which block to build upon by requesting the longest chain.

## WebSockets
*A low-overhead binary protocol supported by web browsers/servers.*
- The WebSocket protocol allows bidirectional message-oriented streaming of text and binary data between browsers and web servers.
- Both the server and client can initiate data push to another party.
- Based on events & callbacks
  1. browser app establishes a connection with the server (`connection` event)
  2. app invokes callback to handle received `connection` event
  3. client code expects a `message` event providing the callback
  4. `close` and `error` events handle appropriate tasks

### Running Demo WebSocket Server:
```js
npm run build:server
node build/server/demo-websocket-server.js
```

### Usage Examples:
Anything that requires immediate notification when an important event has happened elsewhere:
- live trading
- chap apps
- multiplayer online games
- real-time social streams
- blockchains
- controlling devices over the web

In our case, it is important for the other miners to immediately know when a block has been mined.

### Differences Between HTTP and WebSocket
- HTTP is a *half-duplex* type of communication
- WebSocket is a *full-duplex* type of communication
HTTP must wait for a response after a request is made while WebSockets allow the travel of data in both directions simultaneously.

- HTTP has a heavy overhead with several hundred bytes (headers).
- WebSocket has a light overhead with a couple of bytes.
Continuous requests are not required with WebSockets since any changes will always be broadcasted.

- HTTP URLs contain the famous `http://`
- WebSocket URLs are simply `ws://`

## Walkthrough
When starting the application the following happens:
- client requests the server to find the longest chain
- when transactions are pending, no requests are made
- initiating the mining process will broadcast a message
- when the block has been mined, the new block is broadcasted
  - other miners add this block usually to their blockchain

![Sequence Diagram](https://github.com/dainank/fontys-blockchain/blob/WebsocketServer/websocket-server/assets/images/sequence-diagram.jpg)

### Data | Server -> Client
1. client opens web-app
2. server initiates communications
3. server pushes data to the browser client

