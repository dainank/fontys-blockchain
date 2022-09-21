// SRC CODE OF STANDALONE CLIENT (utilizes code from lib)
import { Blockchain } from '../lib/bc_transactions';

(async function main(): Promise<void> {
    console.log('⏳ Initializing the blockchain, creating the genesis block...');
    
    const bc = new Blockchain();
    await bc.createGenesisBlock();
    
    bc.createTransaction({ sender: 'Scott', recipient: 'Ben', amount: 50 });
    bc.createTransaction({ sender: 'Ben', recipient: 'Mike', amount: 10 });
    
    await bc.minePendingTransactions();

    bc.createTransaction({ sender: 'Scott', recipient: 'Ben', amount: 15 });
    bc.createTransaction({ sender: 'Ben', recipient: 'John', amount: 60 });
    
    await bc.minePendingTransactions();
    
    console.log(JSON.stringify(bc, null, 2));
})();
