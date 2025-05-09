
📘 MODELO DE PRE PARCIAL – Desarrollo Web Frontend Básico - 1 

🎯 Objetivo general:
Vamos a crear una mini app web 🧠💻 que te permita ver, agregar y eliminar eventos personales (tipo agenda). Los eventos se van a guardar en un archivo JSON simulado y se van a manejar con JavaScript usando AJAX (fetch).

🧩 Consignas (paso a paso):
1️⃣ Estructura HTML

📄 Armá una página con:
Un título (👋 Bienvenido a tu agenda).
Un formulario con:
Campo para el nombre del evento.
Campo de fecha (tipo date).
Botón para agregar el evento.

Un espacio donde se van a listar todos los eventos.
Cada evento debe tener un botón 🗑️ para eliminarlo.

2️⃣ Estilos con CSS

🎨 Dale vida a tu página:
Usá colores suaves y márgenes que no hagan doler los ojos 😅.
Aplicá estilos distintos para eventos pasados (gris/tachado) y futuros (colores normales).
3️⃣ JavaScript (la magia)

🧙‍♂️ Al abrir la página:
Cargá los eventos desde un archivo JSON simulado usando fetch().
Mostralos automáticamente en pantalla.

🧩 Al agregar un evento:
Validá que el nombre y la fecha estén cargados.
No se puede poner una fecha del pasado 🕒.
El nuevo evento debe aparecer sin recargar la página.

🧹 Al eliminar un evento:
Que se borre del DOM al instante.

💡 Tip: usá funciones para organizar tu código (cargarEventos, agregarEvento, eliminarEvento, etc).

4️⃣ AJAX + JSON
📁 Simulá los datos de eventos en un archivo eventos.json.

Formato que deben tener los datos:
[
  {
    "id": 1,
    "nombre": "Reunión con equipo",
    "fecha": "2025-05-10"
  },
  {
    "id": 2,
    "nombre": "Entrega del trabajo",
    "fecha": "2025-05-15"
  }
]

5️⃣ Fechas ⏳
Compará la fecha del evento con la fecha actual.
Aplicá clases CSS para mostrar diferente los eventos pasados vs futuros.

📦 ¿Qué entregás?
index.html ✔
estilos.css ✔
main.js ✔
eventos.json ✔

📏 Criterios de evaluación (10 pts en total)
Criterio	Puntaje
Estructura HTML correcta	2 pts
Estilo con CSS aplicado	2 pts
Funciones bien separadas	2 pts
AJAX/JSON funcionando	2 pts
Validaciones y fechas correctas	2 pts