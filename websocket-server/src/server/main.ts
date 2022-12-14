import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as WebSocket from 'ws';
import { BlockchainServer } from './blockchain-server';

const PORT = 3000;
const app = express();
app.disable("x-powered-by");
app.use('/',             express.static(path.join(__dirname, '../../public'))); // location client code
app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules'))); // location node modules

const httpServer: http.Server = app.listen(PORT, () => { // start HTTP server
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Listening on http://localhost:${PORT}`);
  }
});

const wsServer = new WebSocket.Server({ server: httpServer }); // start Web server (both HTTP and WS)
const bcServer = new BlockchainServer(wsServer) // start blockchain notification server