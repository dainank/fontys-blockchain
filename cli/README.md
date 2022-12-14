# Running
__You can install and run the program here: https://github.com/dainank/fontys-blockchain/releases/tag/cli__

*Examples are using npm, although commands are identical or close to with any other package manager. I suppose that if you are using another package manager than npm, you know what you are doing.*

```js
npm i   // install dependencies
npm run tsc // compile TypeScript into JavaScript
node dist/blockchain.js // run program
node dist/bcProofOfWork.js // run proof-of-work variant program 
```

You can string the compile and run commands together to save time: ```npm run tsc && node dist/blockchain.js```

**Run program directly from repository root**: ```npm --prefix .\blockchain-cli\ run tsc && node .\blockchain-cli\dist\bcProofOfWork.js```

If you get errors with the above commands, read those errors properly. You are probably executing the commands in the wrong directory.

# Info

There are two versions of the program in this directory:
- basic: 
    1. calculate hash (SHA-256)
    2. store reference of previous block's hash
    3. Add data and metadata
- with proof of work: 
    1. mine hash starting with ```00000``` (SHA-256)
    2. store reference of previous block's hash
    3. Add data and metadata

The proof of work is a more realistic demo of a blockchain since essentially any blockchain in production has the proof of work functionality in place. It is recommended to first look through ```blockchain.ts``` before attempting to understand the ```bcProofOfWork.ts``` (duplicate comments are not carried over).

# Links

[Crypto Module](https://nodejs.org/api/crypto.html)

# Other

See dist for binary files, or go to the releases page.
 
