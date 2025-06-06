const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Codigos de estado');
})

// ✅ 200 OK
app.get('/ok', (req, res) => {
  res.status(200).send('Todo está bien (200 OK)');
});

// ✅ 201 Created
app.post('/crear', (req, res) => {
  // Aquí normalmente se crearía un recurso
  res.status(201).send('Recurso creado correctamente (201 Created)');
});

// ✅ 400 Bad Request
app.get('/error-cliente', (req, res) => {
  res.status(400).send('Solicitud incorrecta (400 Bad Request)');
});

// ✅ 401 Unauthorized
app.get('/no-autorizado', (req, res) => {
  res.status(401).send('No autorizado (401 Unauthorized)');
});

// ✅ 403 Forbidden
app.get('/prohibido', (req, res) => {
  res.status(403).send('Acceso prohibido (403 Forbidden)');
});

// ✅ 404 Not Found
app.get('/no-encontrado', (req, res) => {
  res.status(404).send('Recurso no encontrado (404 Not Found)');
});

// ✅ 500 Internal Server Error
app.get('/error-servidor', (req, res) => {
  res.status(500).send('Error del servidor (500 Internal Server Error)');
});

// ✅ 503 Service Unavailable
app.get('/no-disponible', (req, res) => {
  res.status(503).send('Servicio no disponible (503 Service Unavailable)');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
