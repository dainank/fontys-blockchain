interface Block {
    index: number; // unique identifier
    timestamp: number; // creation dateTime
    data: string; // data of transaction
    nonce: number; // unique custom value to validate work (proof-of-work)
    currentBlockhash: string; // hashed value
    previousBlockHash: string;
}