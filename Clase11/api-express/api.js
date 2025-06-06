//importar express
const express = require('express');
const app = express();
const PORT = 3500;

//Middleware para que express pueda leer json
app.use(express.json());

//Rutas
app.get('/api', (req, res) => {
    res.send('MI APIIIIII');
});
app.get('/api/saludo/inicial', (req, res) => {
    res.send('Hola creando una API Basico');
});

app.get('/api/saludo/intermedio', (req, res) => {
    res.send('Hola creando una API Intermedio');
});

app.get('/api/saludo/avanzado', (req, res) => {
    res.send('Hola creando una API Avanzado');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//http://127.0.0.1:58336/api