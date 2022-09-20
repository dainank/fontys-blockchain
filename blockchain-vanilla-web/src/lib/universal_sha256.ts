// SOURCE CODE OF HASHING LIBRARY
function sha256_node(data: string): Promise<string> { 
    const crypto = require('crypto');
    return Promise.resolve(crypto.createHash('sha256').update(data).digest('hex')); // create SHA-256 hash in hex format with data
}

async function sha256_browser(data: string): Promise<string> { 

    const msgUint8Array = new TextEncoder().encode(data);   // convert data to stream of bytes

    const hashByteArray = await crypto.subtle.digest('SHA-256', msgUint8Array); // converts bytes to hash SHA-256

    const hashArray = Array.from(new Uint8Array(hashByteArray));    // pass array

    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join(''); // hashed value
    return Promise.resolve(hashHex);
}

export const sha256 = typeof window === "undefined" ? sha256_node : sha256_browser; // correct method called up based on env (Node/Browser)