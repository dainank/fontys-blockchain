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
        } while (hash.startsWith('0000') === false); // repeat until valid block is found (starts with 0000)
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
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const blockchain = new Blockchain();
console.log('Welcome to Fontys blockchain!\n');
userSelection();
function userSelection() {
    console.log('Options:\n1 - Mine Block\n2 - View Blockchain\n3 - Exit Program\n');
    readline.question('Select Option: ', selection => {
        console.log("---------------------------------------------\n");
        if (selection === '1') { // mining blocks
            console.log("Mining block...");
            blockchain.addBlock(`${Math.random()}`); // random data
            console.log("Block mined.\n");
        }
        else if (selection === '2') { // view blockchain
            console.log("Viewing blockchain: ");
            console.log(JSON.stringify(blockchain, null, 2));
        }
        else if (selection === '3') { // view blockchain
            console.log("Exiting...");
            readline.close();
            process.exit(1);
        }
        else { // wrong input
            console.log("Error, please select 1, 2 or 3.");
        }
        console.log("---------------------------------------------\n");
        userSelection();
    });
}
