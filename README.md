# 📘 Programación III - UTN 2025  

<div align="center">

[![UTN Logo](https://fra.utn.edu.ar/wp-content/uploads/2023/07/utn_logo_svg.svg)](https://fra.utn.edu.ar/wp-content/uploads/2023/07/utn_logo_svg.svg)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://semver.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Last Updated](https://img.shields.io/badge/last%20updated-April%202025-orange.svg)](https://github.com/rgplazas/Programacion_III_UTN_2025/commits/main)

</div>

¡Bienvenido/a al repositorio oficial de **Programación III** de la Universidad Tecnológica Nacional (UTN)! Este proyecto forma parte del plan de estudios 2025 de la Tecnicatura Universitaria en Programación. 🎓

Este repositorio está diseñado para proporcionar una experiencia de aprendizaje integral en el desarrollo web full-stack, con énfasis en las mejores prácticas de la industria y tecnologías actuales.

🔗 **Repositorio:** [GitHub - Programación III](https://github.com/rgplazas/Programacion_III_UTN_2025.git)

---

## 📚 Contenido del Curso

### Clase 1: Introducción a HTML5 🌐

#### 📖 Explicación Técnica
HTML5 (HyperText Markup Language 5) es el lenguaje estándar para crear páginas web. Es un lenguaje de marcado que define la estructura básica de una página web mediante etiquetas.

#### 🛠️ Conceptos Fundamentales
- **Estructura básica de un documento HTML**
- **Etiquetas semánticas**
- **Elementos de texto y formateo**
- **Enlaces y navegación**
- **Imágenes y multimedia**

#### 💡 Ejemplo Práctico
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Primera Página</title>
</head>
<body>
    <h1>¡Hola Mundo!</h1>
    <p>Este es mi primer párrafo en HTML.</p>
</body>
</html>
```

#### 📚 Recursos Oficiales
- [MDN Web Docs - HTML](https://developer.mozilla.org/es/docs/Web/HTML)
- [W3C HTML5 Specification](https://html.spec.whatwg.org/)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)

---

### Clase 2: CSS3 y Diseño Web 🎨

#### 📖 Explicación Técnica
CSS (Cascading Style Sheets) es el lenguaje utilizado para estilizar y dar formato a documentos HTML. CSS3 es la última evolución que incluye animaciones, flexbox, grid y más.

#### 🛠️ Conceptos Clave
- **Selectores y especificidad**
- **Modelo de caja**
- **Flexbox y Grid**
- **Responsive Design**
- **Animaciones y transiciones**

#### 💡 Ejemplo Práctico
```css
/* Estilos básicos */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    gap: 20px;
}

.card {
    background: #fff;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}
```

#### 📚 Recursos Oficiales
- [MDN CSS Reference](https://developer.mozilla.org/es/docs/Web/CSS)
- [CSS-Tricks](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/)

---

### Clase 3: JavaScript Fundamentos 🌟

#### 📖 Explicación Técnica
JavaScript es un lenguaje de programación que permite crear contenido dinámico, controlar multimedia, animar imágenes y prácticamente todo lo demás en la web moderna.

#### 🛠️ Conceptos Fundamentales
- **Variables y tipos de datos**
- **Funciones y scope**
- **Arrays y objetos**
- **Eventos del DOM**
- **Promesas y async/await**

#### 💡 Ejemplo Práctico
```javascript
// Manipulación del DOM
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#miBoton');
    const mensaje = document.querySelector('#mensaje');

    button.addEventListener('click', async () => {
        try {
            const respuesta = await fetch('https://api.ejemplo.com/datos');
            const datos = await respuesta.json();
            mensaje.textContent = datos.mensaje;
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
```

#### 📚 Recursos Oficiales
- [MDN JavaScript Guide](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://javascript.info/)
- [ECMAScript Specifications](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)

---

### Clase 4: DOM y Eventos 🌍

#### 📖 Explicación Técnica
El DOM (Document Object Model) es una interfaz de programación para documentos HTML y XML. Define la estructura lógica de los documentos y la forma en que se accede y manipula.

#### 🛠️ Conceptos Clave
- **Selección de elementos**
- **Manipulación del DOM**
- **Eventos y listeners**
- **Delegación de eventos**
- **Traversing del DOM**

#### 💡 Ejemplo Práctico
```javascript
// Ejemplo de manipulación del DOM y eventos
class TodoList {
    constructor() {
        this.form = document.querySelector('#todoForm');
        this.input = document.querySelector('#todoInput');
        this.list = document.querySelector('#todoList');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        this.list.addEventListener('click', (e) => {
            if (e.target.matches('.delete-btn')) {
                this.deleteTodo(e.target.parentElement);
            }
        });
    }

    addTodo() {
        const text = this.input.value.trim();
        if (text) {
            const li = document.createElement('li');
            li.innerHTML = `
                ${text}
                <button class="delete-btn">❌</button>
            `;
            this.list.appendChild(li);
            this.input.value = '';
        }
    }

    deleteTodo(element) {
        element.remove();
    }
}

new TodoList();
```

#### 📚 Recursos Oficiales
- [MDN DOM Reference](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model)
- [DOM Events Reference](https://developer.mozilla.org/es/docs/Web/Events)
- [JavaScript DOM Tutorial](https://www.w3schools.com/js/js_htmldom.asp)

---

### Clase 5: APIs Web y Fetch 🌐

#### 📖 Explicación Técnica
La API Fetch proporciona una interfaz moderna para realizar peticiones HTTP en JavaScript, reemplazando el antiguo XMLHttpRequest.

#### 🛠️ Conceptos Fundamentales
- **Promesas y Fetch API**
- **Métodos HTTP (GET, POST, PUT, DELETE)**
- **Manejo de respuestas JSON**
- **Headers y opciones de configuración**
- **Manejo de errores en peticiones**

#### 💡 Ejemplo Práctico
```javascript
async function obtenerDatos() {
    try {
        const response = await fetch('https://api.ejemplo.com/datos');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
```

#### 📚 Recursos Oficiales
- [MDN Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [Using Fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch)
- [JavaScript.info - Fetch](https://javascript.info/fetch)

---

### Clase 6: AJAX y XMLHttpRequest 📡

#### 📖 Explicación Técnica
AJAX (Asynchronous JavaScript And XML) es una técnica de desarrollo web que permite actualizar partes de una página web sin recargarla completamente, mejorando la interactividad y experiencia del usuario.

#### 🛠️ Conceptos Fundamentales
- **XMLHttpRequest y sus estados**
- **Eventos de la petición AJAX**
- **Manejo de datos JSON y XML**
- **Callbacks y manejo asíncrono**
- **Integración con APIs REST**

#### 💡 Ejemplo Práctico
```javascript
function realizarPeticionAJAX() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const datos = JSON.parse(xhr.responseText);
                mostrarDatos(datos);
            } else {
                console.error('Error en la petición');
            }
        }
    };
    xhr.open('GET', 'datos.json', true);
    xhr.send();
}
```

#### 📚 Recursos Oficiales
- [MDN XMLHttpRequest](https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest)
- [W3Schools AJAX Tutorial](https://www.w3schools.com/js/js_ajax_intro.asp)
- [JavaScript.info - Network requests](https://javascript.info/xmlhttprequest)

---

### Clase 7: Fetch Avanzado y Manejo de Datos 📊

#### 📖 Explicación Técnica
Fetch API avanzado permite realizar operaciones complejas de red, manejar diferentes tipos de datos y implementar patrones de comunicación asíncrona sofisticados en aplicaciones web modernas.

#### 🛠️ Conceptos Fundamentales
- **Fetch con diferentes métodos HTTP**
- **Async/Await y promesas encadenadas**
- **Manejo de archivos y FormData**
- **Cabeceras personalizadas y CORS**
- **Manejo de errores avanzado**

#### 💡 Ejemplo Práctico
```javascript
class GestorDatos {
    async obtenerUsuarios() {
        try {
            const response = await fetch('data/usuarios.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const usuarios = await response.json();
            return usuarios;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    }

    async enviarDatos(datos) {
        try {
            const response = await fetch('api/datos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            return await response.json();
        } catch (error) {
            console.error('Error al enviar datos:', error);
            throw error;
        }
    }
}

// Uso del cliente API
const api = new APIClient('https://api.ejemplo.com');

async function getUsers() {
    try {
        const users = await api.get('/users');
        console.log(users);
    } catch (error) {
        console.error('Error getting users:', error);
    }
}
```

#### 📚 Recursos Oficiales
- [MDN Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [Using Fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch)
- [HTTP Status Codes](https://developer.mozilla.org/es/docs/Web/HTTP/Status)

---

### Clase 7-bis: Peticiones HTTP Avanzadas 📝

#### 📖 Explicación Técnica
Profundizamos en diferentes métodos para realizar peticiones HTTP en JavaScript, explorando Fetch API, Async/Await y Axios para consumir APIs REST.

#### 🛠️ Conceptos Fundamentales
- **Fetch API y promesas encadenadas**
- **Async/Await para código asíncrono**
- **Axios como cliente HTTP**
- **Manejo de errores en peticiones**
- **Consumo de APIs REST**

#### 💡 Ejemplo Práctico
```javascript
// Ejemplo con Async/Await
const getNameAsync = async (idPost) => {
    try {
        const URL = "https://jsonplaceholder.typicode.com/"
        let respuestaPost = await fetch(`${URL}posts/${idPost}`)
        let post = await respuestaPost.json()
        let respuestaUser = await fetch(`${URL}users/${post.userId}`)
        let user = await respuestaUser.json()

        document.write(`El Post ${idPost} con el título ${post.title} 
                       lo escribió ${user.name} de ${user.address.city}`)
    } catch (error) {
        console.log(error)
    }
}
```

#### 📚 Recursos Oficiales
- [MDN Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [JavaScript.info - Async/Await](https://javascript.info/async-await)

---

### Clase 8: Bootstrap y Diseño Responsivo 🎨

#### 📖 Explicación Técnica
Bootstrap es un framework front-end que facilita el desarrollo de sitios web responsivos y móviles. Proporciona componentes predefinidos y un sistema de grid que agiliza el proceso de diseño y desarrollo web.

#### 🛠️ Conceptos Fundamentales
- **Sistema de Grid**
- **Componentes Bootstrap**
- **Clases utilitarias**
- **Personalización de temas**
- **Diseño responsivo**

#### 💡 Ejemplo Práctico
```html
<div class="container">
    <div class="row">
        <div class="col-md-4">
            <div class="card shadow-sm">
                <img src="imagen.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Título</h5>
                    <p class="card-text">Contenido de la tarjeta con Bootstrap</p>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary">Acción Principal</button>
                        <button class="btn btn-outline-secondary">Acción Secundaria</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

#### 📚 Recursos Oficiales
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

---

## 📂 Estructura del Repositorio y Recursos Adicionales

### 📚 Estructura de Carpetas

```bash
Programacion_III_UTN_2025/
├── clase01/           # Introducción a HTML5
│   ├── index.html     # Página principal de la clase
│   ├── clase01_01.html, clase01_02.html, ... # Ejemplos secuenciales
│   ├── imagenes/      # Recursos de imágenes
│   └── media/         # Recursos multimedia
├── clase02/           # CSS3 y Diseño Web
│   ├── index.html     # Página principal de la clase
│   ├── clase02_*.html # Ejemplos de CSS
│   └── css/           # Hojas de estilo
├── clase03/           # JavaScript Fundamentos
│   ├── index.html     # Página principal de la clase
│   ├── clase03_*.html # Ejemplos de JavaScript
│   └── js/            # Scripts de JavaScript
├── clase04/           # DOM y Eventos
│   ├── index.html     # Página principal de la clase
│   ├── clase04_*.html # Ejemplos de manipulación DOM
│   └── js/            # Scripts para eventos
├── clase05/           # APIs Web y Fetch
│   ├── index.html     # Página principal de la clase
│   ├── clase05_*.html # Ejemplos de Fetch API
│   └── js/            # Scripts para peticiones
├── clase06/           # AJAX y XMLHttpRequest
│   ├── index.html     # Página principal de la clase
│   ├── clase06_*.html # Ejemplos de AJAX
│   └── js/            # Scripts para AJAX
├── clase07/           # Fetch Avanzado y Manejo de Datos
│   ├── index.html     # Página principal de la clase
│   ├── api*.html      # Ejemplos de API con Fetch/Async
│   ├── api_*.js       # Scripts para consumo de APIs
│   ├── css/           # Estilos para ejemplos
│   ├── data/          # Datos de ejemplo
│   ├── img/           # Recursos gráficos
│   └── manejadora.js  # Script principal
├── clase07-bis/       # Peticiones HTTP Avanzadas
│   ├── index.html     # Página principal de la clase
│   ├── clase07bis_*.html # Ejemplos avanzados
│   └── js/            # Scripts para peticiones avanzadas
├── clase08/           # Bootstrap y Diseño Responsivo
│   ├── index.html     # Página principal de la clase
│   ├── bootstrap.min.css # Framework CSS Bootstrap
│   ├── bootstrap.bundle.min.js # Scripts de Bootstrap
│   └── pages/         # Páginas de ejemplo
├── index.html         # Página principal del repositorio
└── README.md          # Documentación principal
```

### 📝 Organización del Contenido

- **Estructura Modular**: Cada clase está organizada en su propia carpeta con:
  - Archivos HTML secuenciales (clase0X_01.html, clase0X_02.html, etc.)
  - Recursos específicos (CSS, JavaScript, imágenes)
  - Página index.html que sirve como índice de la clase 

- **Sistema de Carpetas**:
  - `/css`: Hojas de estilo y personalizaciones
  - `/js`: Scripts y funcionalidades JavaScript
  - `/img` o `/imagenes`: Recursos gráficos
  - `/media`: Archivos multimedia
  - `/data`: Datos de ejemplo para APIs
  - `/pages`: Páginas adicionales o ejemplos

- **Documentación**:
  - Cada clase incluye su propio README o índice
  - Ejemplos comentados y documentados
  - Guías de implementación y mejores prácticas
  - Referencias a recursos externos útiles

- **Sistema de Ejercicios**:
  - Ejercicios básicos para practicar conceptos
  - Proyectos prácticos integradores
  - Desafíos adicionales para profundizar

### 📚 Recursos de Aprendizaje

#### 🎓 Plataformas de Práctica
- [CodePen](https://codepen.io/) - Para experimentar con HTML/CSS/JS
- [JSFiddle](https://jsfiddle.net/) - Entorno de pruebas web
- [GitHub](https://github.com/) - Control de versiones y colaboración

#### 📖 Documentación Oficial
- [MDN Web Docs](https://developer.mozilla.org/es/)
- [W3Schools](https://www.w3schools.com/)
- [DevDocs](https://devdocs.io/)

#### 📰 Blogs y Recursos
- [CSS-Tricks](https://css-tricks.com/)
- [Smashing Magazine](https://www.smashingmagazine.com/)
- [JavaScript Weekly](https://javascriptweekly.com/)

---

## 📌 Tecnologías y Herramientas

### 🎨 **Frontend**

#### ✅ **HTML5**
- Semántica web moderna
- Formularios avanzados
- Multimedia y gráficos
- APIs web modernas

#### ✅ **CSS3**
- Flexbox y Grid
- Animaciones y transiciones
- Variables CSS
- Media Queries
- Preprocesadores (SASS)

#### ✅ **JavaScript (ES6+)**
- Programación moderna
- Manipulación del DOM
- APIs asíncronas
- Módulos ES6
- Gestión de eventos

### 🖥️ **Backend** (Próximamente)

#### 🔄 **Node.js**
- Runtime de JavaScript
- Sistema de módulos
- NPM (Node Package Manager)

#### 🔄 **Express.js**
- Routing
- Middleware
- REST APIs

#### 🔄 **MySQL**
- Diseño de bases de datos
- Consultas SQL
- Relaciones y joins

---

## 🚀 Requisitos Previos  

Para comenzar con el curso, necesitarás:

- ✅ **Editor de Código**: [Visual Studio Code](https://code.visualstudio.com/) (recomendado)
- ✅ **Navegador Moderno**: Chrome, Firefox, o Edge en su última versión
- ✅ **Git**: [Descarga aquí](https://git-scm.com/downloads) para control de versiones
- ✅ **Conocimientos Básicos**: HTML, CSS y fundamentos de programación

### Próximos Requisitos (para módulos avanzados)
- 🔄 **Node.js**: Versión LTS desde [nodejs.org](https://nodejs.org/)
- 🔄 **MySQL**: Community Edition
- 🔄 **Supabase**: Para ejemplos de backend-as-a-service

---

## 🔧 Inicio Rápido

1. **Clona el repositorio**
   ```sh
   git clone https://github.com/rgplazas/Programacion_III_UTN_2025.git
   ```

2. **Explora el contenido**
   ```sh
   cd Programacion_III_UTN_2025
   ```

3. **Abre el proyecto**
   - Abre `index.html` en tu navegador para ver la página principal
   - Cada carpeta de clase contiene su propio `index.html` con ejemplos
   - Revisa el `modelo_primer_parcial` para practicar para el examen

4. **Mantente actualizado**
   ```sh
   git pull origin main
   ```

---

## 🤝 Contribuciones y Soporte

### Cómo Contribuir
1. Haz un fork del repositorio
2. Crea una rama para tu contribución (`git checkout -b feature/mejora`)
3. Realiza tus cambios y commitea (`git commit -am 'Agrega nueva mejora'`)
4. Sube tus cambios (`git push origin feature/mejora`)
5. Abre un Pull Request

### Reportar Problemas
Si encuentras algún error o tienes sugerencias, por favor:
1. Revisa primero los [issues existentes](https://github.com/rgplazas/Programacion_III_UTN_2025/issues)
2. Si no encuentras uno relacionado, crea un nuevo issue describiendo el problema

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">
Desarrollado con ❤️ para la UTN
</div>

---

## 📧 Contacto

Si tienes dudas o sugerencias, puedes abrir un issue en GitHub o contactarme por correo electrónico.

---

## 🎯 ¡A programar! 🚀

### 📌 ¿Cómo usarlo?  
1. Copia el texto.  
2. Crea un archivo en la raíz del repositorio llamado **README.md**.  
3. Pega el contenido y guárdalo.  
4. ¡Listo! GitHub lo mostrará automáticamente como documentación principal del repositorio. 🚀  
