"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Block {
    constructor(index, previousHash, timestamp, data) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        const { nonce, hash } = this.mine(); // both generated through the new mine method
        this.nonce = nonce;
        this.hash = hash;
    }
    calculateHash(nonce) {
        const data = this.index + this.previousHash + this.timestamp + this.data + nonce; // now additionally contains nonce on the end
        return crypto.createHash('sha256').update(data).digest('hex'); // same commands as previously
    }
    mine() {
        let nonce = 0;
        let hash;
        do {
            hash = this.calculateHash(++nonce); // increment nonce per calculation
        } while (hash.startsWith('00000') === false); // repeat until valid block is found (starts with 0000)
        return { nonce, hash };
    }
}
;
class Blockchain {
    constructor() {
        this.chain = [];
        this.chain.push(new Block(0, '0', Date.now(), 'Genesis Block'));
    }
    get latestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(data) {
        const block = new Block(this.latestBlock.index + 1, this.latestBlock.hash, Date.now(), data);
        this.chain.push(block);
    }
}
console.log('Creating blockchain...\n');
const blockchain = new Blockchain();
console.log('Mining block #1...\n');
blockchain.addBlock('First block');
console.log('Mining block #2...\n');
blockchain.addBlock('Second block');
console.log('Entire Chain:\n');
console.log(JSON.stringify(blockchain, null, 2));
