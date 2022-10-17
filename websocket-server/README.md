# Node.js Websocket Server (TypeScript)
## Introduction
Previous projects only supported a single miner adding blocks with transaction data. If multiple miners wish to contribute to a blockchain at the same time, we will need a server that broadcasts messages to the blockchain's nodes (all computers part of the blockchain). This project is a server using the **Websocket protocol** to do exactly so. Additionally, web clients (users) will also be able to make requests of this server.

## Installing & Running

## Installing
- `npm install -g nodemon`
- `npm i`

## Running
```node build/server/main.js```

## Dependencies
- **ws** - Node.js library that supports Websocket protocol.
- **express** - Tiny Node.js framework for HTTP support.
- **nodemon** - Dev tool that restarts Node.js apps when change in script detected.
- **lit-html** - HTML templates for rendering in DOM.

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
Usually a blockchain has **many blocks** (e.g. 100 blocks) and a **pool of pending transactions**, whereby various miners pick different transactions for their next blocks (e.g. 10 transactions). This means that if miners, M1, M2 and M3 all submit their next block for the chain (block 101 since there are already 100 before), each submitted block will contain different transactions:

![Forked Blockchain](https://github.com/dainank/fontys-blockchain/blob/WebsocketServer/websocket-server/assets/images/forked-blockchain.png)

The three unconfirmed blocks mined by the miners are all potentionally valid but this is where the **longest chain rule** comes in. Let's say there are two other miners M4 and M5. Each picks a block to build upon from the three 101 blocks available to mine the 102 block. M4 may pick M2's block while M5 picks M3's block (usually at random since mining is an automated process). Let's say M5 finishes mining the block 102 first and a sixth miner M6 then picks that one up and finds the next block, the chain would then look as follows:

![Forked Blockchain](https://github.com/dainank/fontys-blockchain/blob/WebsocketServer/websocket-server/assets/images/forked-blockchain-adv.jpg)

Essentially the M2 -> M4 -> M6 chain is now longest through sheer luck, thus all future miners are now continuing this chain rather than the falling behind M1, and M3 -> M5 chains. All transactions in longest chain are validated and removed from the unconfirmed transactions list, while any transactions which were in the now obsolete M1 and M3 -> M5 forked chains are returned to the pending transactions list. This longest chain rule can prevent double spending and fraudulent blocks from getting into the blockchain.

## Double Spending
Imagine that there is a criminal called John who wants to gain coins worth $1000 in his cryptowallet. He could find the next valid block's hash containing a fake transaction sending $1000 to his wallet from a person called Alex for example. Meanwhile, all the other miners would find valid blocks without this fake transaction since they do not know about it. Additionally John (and potentionally any other criminals working with) would be the only ones finding this one block with this fake transaction while all other miners would find blocks without this fake transaction. This essentially means that if someone wishes to defraud the blockchain, he would have to convince more than 50% of all node's computing power to be in on the fake transaction, an impossible feat.

### Emulating More Than One Miner

### The WebSocket Protocol
It is key to understand that the server we add here is not a central authority but rather a server for utility services:
- caching hashes
- broadcasting new transactions
- requesting for longest chain
- announcing newly created blocks

Essentially nothing can be created, validated or stored with this server, it simply returns info.

Miners would utilize the above server to pick pending transactions and to see which block to build upon by requesting the longest chain.