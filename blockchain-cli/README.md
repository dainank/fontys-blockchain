# Running
*Examples are using npm, although commands are identical or close to with any other package manager. I guess that if you are using another package manager than npm, you know what you are doing.*

```js
npm i   // install dependencies
npm run tsc // compile TypeScript into JavaScript
node dist/blockchain.js // run program
node dist/bcProofOfWork.js // run proof-of-work variant program 
```

You can string the compile and run commands together to save time: ```npm run tsc && node dist/blockchain.js```

# Info

There are two versions of the program in this directory:
- basic: 
    1. calculate hash (SHA-256)
    2. store reference of previous block's hash
    3. Add data and metadata
- with proof of work: 
    1. mine hash starting with ```0000``` (SHA-256)
    2. store reference of previous block's hash
    3. Add data and metadata 

# Links

[Crypto Module](https://nodejs.org/api/crypto.html)

# Other

Yes, dist is in repo. If conflicts arise I can remove.
 