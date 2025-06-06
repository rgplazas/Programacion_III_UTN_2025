# Sistema de Gestión de Pinturas - UTN FRA

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![REST API](https://img.shields.io/badge/REST%20API-FF5733?style=for-the-badge&logo=api&logoColor=white)

## 📝 Descripción

Aplicación web frontend desarrollada como parte del Primer Parcial de Programación III en la UTN FRA. El sistema permite gestionar un inventario completo de pinturas, interactuando directamente con una API REST para todas las operaciones de datos.

La aplicación implementa las siguientes funcionalidades principales:

- **CRUD completo de pinturas**: Crear, leer, actualizar y eliminar productos
- **Filtrado dinámico**: Búsqueda por marca y rango de precio
- **Exportación de datos**: Generación de reportes en formato CSV
- **Estadísticas visuales**: Gráficos de barras y pie chart con información relevante
- **Experiencia adaptativa**: Diseño responsive y modo claro/oscuro
- **Accesibilidad mejorada**: Cumplimiento de estándares WCAG 2.1

## 🔧 Tecnologías utilizadas

- **Frontend**: 
  - HTML5 semántico
  - CSS3 con diseño responsive
  - JavaScript (ES6+) vanilla, sin frameworks
  - Bootstrap 5.3.2 para componentes UI
  - Bootstrap Icons para iconografía

- **Backend**: 
  - Comunicación con API REST (https://utnfra-api-pinturas.onrender.com)
  - Manejo asíncrono con Fetch API y Promises
  - Manejo de errores y estados de carga

## 🏗️ Arquitectura del proyecto

```
Program_III_UTN_2025/clase10/prog_3_primer_parcial/
├── pintureria.html       # Interfaz principal y estructura HTML
├── README.md             # Documentación del proyecto
├── css/
│   └── style.css         # Estilos personalizados y responsive
├── js/
│   └── manejadora.js     # Lógica de negocio y comunicación con API
└── img/
    └── utnLogo.png       # Recursos gráficos
```

## 🚀 Instalación y ejecución

1. Clonar o descargar el repositorio
   ```bash
   git clone https://github.com/rgplazas/Programacion_III_UTN_2025.git
   cd Programacion_III_UTN_2025/clase10/prog_3_primer_parcial
   ```

2. Abrir el archivo `pintureria.html` en un navegador web moderno

3. Alternativamente, puedes usar un servidor local como Live Server de VS Code

> **Nota:** La aplicación requiere conexión a internet para comunicarse con la API REST.

## 💪 Funcionalidades implementadas

### Gestión de Pinturas (CRUD)

- ✅ **Carga dinámica desde API**
  - Obtención de listados desde `GET /pinturas`
  - Carga bajo demanda al cambiar de pestaña
  - Manejo de estados de carga con spinner

- ✅ **Formulario completo**
  - Validaciones en tiempo real
  - Retroalimentación visual al usuario
  - Campos con restricciones personalizadas

- ✅ **Operaciones CRUD**
  - Creación: `POST /pinturas`
  - Lectura: `GET /pinturas/:id`
  - Actualización: `PUT /pinturas/:id`
  - Eliminación: `DELETE /pinturas/:id` con confirmación

### Experiencia de Usuario

- ✅ **Filtros avanzados**
  - Búsqueda por marca (3+ caracteres)
  - Filtrado por rangos de precio
  - Limpieza de filtros con un clic

- ✅ **Experiencia visual mejorada**
  - Animaciones sutiles en botones y elementos interactivos
  - Indicadores visuales de estado (carga, éxito, error)
  - Modo oscuro/claro con persistencia

- ✅ **Estadísticas visuales**
  - Gráficos interactivos de barras para precios
  - Gráfico circular para distribución por marcas
  - Resumen de métricas clave

## 📱 Responsive Design

La aplicación está completamente optimizada para diferentes tamaños de pantalla:

- **Dispositivos móviles** (<576px)
  - Navbar colapsable con menú hamburguesa
  - Tamaño de fuente y controles optimizados
  - Scroll vertical en tablas y gráficos

- **Tablets** (576px - 992px)
  - Disposición adaptativa de columnas
  - Gráficos redimensionados para mejor visualización

- **Escritorio** (>992px)
  - Aprovechamiento completo del espacio horizontal
  - Visualización mejorada de tablas y gráficos

## ♻️ Accesibilidad

El proyecto implementa mejoras de accesibilidad siguiendo las pautas WCAG 2.1:

- ✅ **Semántica HTML5**
  - Uso adecuado de encabezados (h1-h6)
  - Elementos semánticos (nav, section, article, etc.)

- ✅ **Atributos ARIA**
  - `aria-label` en controles interactivos
  - `aria-selected` en tabs de navegación
  - `aria-controls` para relaciones entre elementos

- ✅ **Contraste y legibilidad**
  - Ratios de contraste adecuados entre texto y fondo
  - Tamaños de fuente legibles en todos los dispositivos
  - Alternativas textuales para elementos visuales

### Características Avanzadas

- ✅ **Exportación de datos**
  - Generación de CSV con los datos filtrados
  - Descarga automática con nombre de archivo personalizado
  - Formato compatible con Excel y otras herramientas

- ✅ **Personalización de tema**
  - Toggle claro/oscuro con iconos intuitivos
  - Persistencia de preferencia en localStorage
  - Adaptación completa de la interfaz al cambiar

- ✅ **Visualización de datos**
  - Gráficos interactivos con tooltips informativos
  - Actualización dinámica al cambiar los datos
  - Representación visual optimizada para distintos dispositivos

## 💯 Especificaciones técnicas

### API REST

La aplicación se comunica con un servicio backend alojado en Render:

```
URL base: https://utnfra-api-pinturas.onrender.com
```

| Método | Endpoint | Descripción | Parámetros |
|---------|----------|-------------|------------|
| GET | `/pinturas` | Obtiene todas las pinturas | N/A |
| GET | `/pinturas/:id` | Obtiene una pintura por ID | `id` (path parameter) |
| POST | `/pinturas` | Crea una nueva pintura | Objeto pintura (body) |
| PUT | `/pinturas/:id` | Actualiza una pintura existente | `id` (path), objeto pintura (body) |
| DELETE | `/pinturas/:id` | Elimina una pintura | `id` (path parameter) |

### Modelo de datos

```javascript
{
  "id": "string",         // Autogenerado por la API
  "marca": "string",     // Nombre del fabricante (requerido)
  "precio": number,      // Valor en USD (50-500, múltiplos de 50)
  "color": "string",     // Código hexadecimal (#RRGGBB)
  "cantidad": number     // Unidades disponibles (1-400)
}
```

### Reglas de validación

| Campo | Tipo | Restricciones | Validación |
|-------|------|--------------|-------------|
| `marca` | string | Campo requerido | Frontend + Backend |
| `precio` | number | 50-500, múltiplos de 50 | Frontend + Backend |
| `color` | string | Código hexadecimal válido | Frontend |
| `cantidad` | number | 1-400, entero | Frontend + Backend |

## 🔧 Mantenimiento y desarrollo

### Cómo contribuir

1. Clonar el repositorio
2. Crear una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realizar cambios y asegurar que no hay errores
4. Enviar pull request con descripción detallada

### Posibles mejoras futuras

- Implementación de autenticación de usuarios
- Manejo de inventario multi-sucursal
- Generación de reportes en PDF
- Integración con sistemas de facturación
- Módulo de ventas y seguimiento

---

**Desarrollado por:** Rodrigo Plazas

**Profesor:** Federico Davila

**Asignatura:** Programación III

**Institución:** Universidad Tecnológica Nacional (UTN FRA)

## Licencia

Este proyecto fue desarrollado como parte del examen de Programación III para la UTN.
- ✅ Stock total de pinturas
- ✅ Precio promedio de los productos

### Interfaz de Usuario
- ✅ Diseño responsivo que se adapta a diferentes tamaños de pantalla
- ✅ Mensajes de retroalimentación para el usuario
- ✅ Confirmación antes de eliminar productos
- ✅ Formulario de edición con los datos precargados

## Estructura del Proyecto

```
prog_3_primer_parcial/
├── css/
│   └── style.css          # Estilos personalizados
├── img/
│   └── utnLogo.png       # Logo de la aplicación
├── js/
│   └── manejadora.js     # Lógica de la aplicación
├── pintureria.html        # Estructura principal
└── README.md              # Documentación
```

## Tecnologías Utilizadas
- **Frontend**:
  - HTML5
  - CSS3 (con Bootstrap 5.3.2)
  - JavaScript (ES6+)
  - LocalStorage para persistencia de datos

## Cómo Usar la Aplicación

1. **Agregar un nuevo producto**:
   - Complete todos los campos del formulario
   - Haga clic en el botón "Agregar"

2. **Editar un producto existente**:
   - Haga clic en el botón "Editar" del producto que desea modificar
   - Realice los cambios necesarios en el formulario
   - Haga clic en el botón "Modificar"

3. **Eliminar un producto**:
   - Haga clic en el botón "Eliminar" del producto que desea quitar
   - Confirme la acción en el cuadro de diálogo

4. **Ver estadísticas**:
   - El resumen se actualiza automáticamente en la sección inferior del listado

## Validaciones Implementadas

### Formulario de Producto
- **Marca**: Campo obligatorio (no puede estar vacío)
- **Precio**:
  - Debe ser un número entre 50 y 500
  - Debe ser múltiplo de 50
- **Color**: Selección obligatoria (por defecto: rojo)
- **Cantidad**:
  - Debe ser un número entero
  - Mínimo: 1
  - Máximo: 400

## Persistencia de Datos
La aplicación utiliza el `localStorage` del navegador para guardar los datos de manera persistente, por lo que la información se mantendrá incluso después de cerrar el navegador.

## Compatibilidad
La aplicación es compatible con los siguientes navegadores:
- Google Chrome (última versión)
- Mozilla Firefox (última versión)
- Microsoft Edge (última versión)
- Safari (última versión)

## Autor
- **Nombre**: Rodrigo Plazas
- **Materia**: Programación III
- **Año**: 2025
