import * as crypto from 'crypto';

class Block {
    readonly nonce: number;   // unique custom value to generate valid block
    readonly hash: string;

    constructor(
        readonly index: number,
        readonly previousHash: string,
        readonly timestamp: number,
        readonly data: string
    ) {
        const { nonce, hash } = this.mine();    // both generated through the new mine method
        this.nonce = nonce;
        this.hash = hash;
    }

    private calculateHash(nonce: number): string {
        const data = this.index + this.previousHash + this.timestamp + this.data + nonce;   // now additionally contains nonce on the end
        return crypto.createHash('sha256').update(data).digest('hex');  // same commands as previously
    }

    private mine(): { nonce: number, hash: string } {
        let nonce = 0;
        let hash: string;

        do {
            hash = this.calculateHash(++nonce);   // increment nonce per calculation
        } while (hash.startsWith('00000') === false);   // repeat until valid block is found (starts with 0000)

        return { nonce, hash };
    }
};

class Blockchain {
    private readonly chain: Block[] = [];

    private get latestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    constructor() {
        this.chain.push(new Block(0, '0', Date.now(), 'Genesis Block'));
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

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const blockchain = new Blockchain();

console.log('Welcome to Fontys blockchain!\n');
userSelection()

function userSelection(): void {
    console.log('Options:\n1 - Mine Block\n2 - View Blockchain\n3 - Exit Program\n');
    readline.question('Select Option: ', selection => {
        console.log("---------------------------------------------\n")
        if (selection === '1') {  // mining blocks
            console.log("Mining block... (estimated 1min)")
            blockchain.addBlock(`${Math.random()}`) // random data
            console.log("Block mined.\n")
        } else if (selection === '2') {   // view blockchain
            console.log("Viewing blockchain: ")
            console.log(JSON.stringify(blockchain, null, 2));
        } else if (selection === '3') {   // view blockchain
            console.log("Exiting...")
            readline.close();
            process.exit(1);
        } else {    // wrong input
            console.log("Error, please select 1, 2 or 3.")
        }
        console.log("---------------------------------------------\n")
        userSelection()
    });
}
