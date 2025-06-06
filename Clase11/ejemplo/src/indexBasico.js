const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end('Hola desde Node.js sin frameworks');
});

server.listen(4000, () => {
  console.log('Servidor corriendo en http://localhost:4000');
});
