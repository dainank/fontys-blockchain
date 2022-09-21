"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Block {
    constructor(index, // unique identifier (sequential)
    previousHash, //  previous block's hash
    timestamp, // creation dateTime
    data // transaction
    ) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash(); // on creation
    }
    calculateHash() {
        const data = this.index + this.previousHash + this.timestamp + this.data; // concatenate all variables in function together (except its own hash)
        return crypto
            .createHash('sha256') // instance (Hash object) for generator
            .update(data) // hash variable inside of Hash object updated to the related data
            .digest('hex'); // convert hash into hexadecimal string
    }
}
;
class Blockchain {
    constructor() {
        this.chain = [];
        this.chain.push(new Block(0, '0', Date.now(), 'Genesis block'));
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
blockchain.addBlock('Block One');
console.log('Mining block #2...\n');
blockchain.addBlock('Block Two');
console.log('Entire Chain:\n');
console.log(JSON.stringify(blockchain, null, 2));
