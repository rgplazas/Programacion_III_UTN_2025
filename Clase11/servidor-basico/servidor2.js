// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hola Servidor 2!\n');
});
// starts a simple http server locally on port 3000
server.listen(2500, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:2500');
});
// run with `node server.mjs`