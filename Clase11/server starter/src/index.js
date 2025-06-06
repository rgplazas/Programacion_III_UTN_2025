//se requiere el modulo de express
const express = require('express');

//creamos una instancia de express
const app = express();

//creamos una ruta
app.get('/', (req, res) => {
    res.send('GET - servidor de node.js');
});

//iniciamos el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en: http://localhost:3000');
});