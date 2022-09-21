import * as crypto from 'crypto';

class Block {   // item
    readonly hash: string;

    constructor(
        readonly index: number, // unique identifier (sequential)
        readonly previousHash: string,  //  previous block's hash
        readonly timestamp: number, // creation dateTime
        readonly data: string // transaction
    ) {
        this.hash = this.calculateHash();   // on creation
    }

    private calculateHash(): string {
        const data = this.index + this.previousHash + this.timestamp + this.data; // concatenate all variables in function together (except its own hash)
        return crypto
            .createHash('sha256') // instance (Hash object) for generator
            .update(data) // hash variable inside of Hash object updated to the related data
            .digest('hex'); // convert hash into hexadecimal string
    }
};

class Blockchain {  // list
    private readonly chain: Block[] = [];

    private get latestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    constructor() {
        this.chain.push(new Block(0, '0', Date.now(), 'Genesis block'));
    }

    addBlock(data: string): void {

        const block = new Block(
            this.latestBlock.index + 1,
            this.latestBlock.hash,
            Date.now(),
            data
        );

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
