// Importamos las librerías
const express = require('express');
const moment = require('moment');

// Creamos una app de express
const app = express();

// Definimos un puerto
const PORT = 3000;

// Ruta principal
app.get('/', (req, res) => {
  const ahora = moment().format('YYYY-MM-DD HH:mm:ss');
  res.send(`¡Hola desde NodeJS con Express!<br>Fecha actual: ${ahora}`);
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
