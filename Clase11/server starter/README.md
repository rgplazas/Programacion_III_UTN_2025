mi-proyecto/
├── node_modules/          # Dependencias instaladas(aparece al usar el comando "npm install")
├── public/                # Archivos públicos (CSS, JS, imágenes)
│   └── css/
│   └── js/
├── src/                   # Código fuente de la aplicación
│   ├── controllers/       # Lógica de control (acciones para rutas)
│   ├── models/            # Modelos de datos (ej: esquemas de BD)
│   ├── routes/            # Definición de rutas de la app
│   ├── views/             # Vistas (si usás un motor como EJS/Pug)
│   └── app.js             # Configuración principal de Express
├── .env                   # Variables de entorno
├── .gitignore             # Archivos que Git debe ignorar
├── package.json           # Dependencias y scripts del proyecto
├── package-lock.json      # Versión exacta de las dependencias
└── README.md              # Descripción del proyecto