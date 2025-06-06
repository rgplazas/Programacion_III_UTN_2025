/**
 * @fileoverview Sistema de Gestión de Pinturas - Lógica principal
 * @author Ricardo Gastón Plazas
 * @version 1.0.0
 * @description Aplicación para gestionar inventario de pinturas mediante API REST
 * La aplicación permite realizar operaciones CRUD, filtrado, exportación y visualización
 * de estadísticas para productos de pintura.
 */

// Esperar a que el DOM esté completamente cargado antes de inicializar la aplicación
document.addEventListener("DOMContentLoaded", () => {
    // Constantes de configuración
    /** @const {string} URL base del servicio API REST */
    const API_URL = 'https://utnfra-api-pinturas.onrender.com';
    
    /**
     * @class Pintura
     * @classdesc Modelo para representar un producto de pintura
     * @property {string} id - Identificador único
     * @property {string} marca - Nombre del fabricante
     * @property {number} precio - Precio en USD (50-500, múltiplos de 50)
     * @property {string} color - Código de color en formato hexadecimal
     * @property {number} cantidad - Cantidad disponible en inventario (1-400)
     */
    class Pintura {
        /**
         * Crea una instancia de Pintura
         * @constructor
         * @param {string} id - Identificador único
         * @param {string} marca - Nombre del fabricante
         * @param {number} precio - Precio en USD
         * @param {string} color - Código de color hexadecimal
         * @param {number} cantidad - Cantidad disponible
         */
        constructor(id, marca, precio, color, cantidad) {
            this.id = id;
            this.marca = marca;
            this.precio = precio;
            this.color = color;
            this.cantidad = cantidad;
        }
    }
    
    // Referencias a elementos UI frecuentemente utilizados
    /** @type {HTMLElement} Elemento spinner para indicar carga */
    const spinnerGlobal = document.getElementById('spinnerGlobal');
    
    /**
     * Controla la visibilidad del spinner de carga global
     * @function toggleSpinner
     * @param {boolean} mostrar - true para mostrar el spinner, false para ocultarlo
     * @returns {void}
     */
    function toggleSpinner(mostrar) {
        spinnerGlobal.classList.toggle('d-none', !mostrar);
        spinnerGlobal.classList.toggle('d-flex', mostrar);
    }
    
    /**
     * Realiza peticiones HTTP al API REST con manejo de errores y estados de carga
     * @async
     * @function fetchAPI
     * @param {string} endpoint - Ruta relativa del endpoint (ej: '/pinturas')
     * @param {string} [method='GET'] - Método HTTP (GET, POST, PUT, DELETE)
     * @param {Object} [data=null] - Datos a enviar en el cuerpo de la petición
     * @returns {Promise<Object|null>} Datos de respuesta o null para respuestas 204
     * @throws {Error} Si la petición falla o el servidor responde con error
     * @example
     * // Obtener todas las pinturas
     * const pinturas = await fetchAPI('/pinturas');
     * 
     * // Crear una nueva pintura
     * const nuevaPintura = await fetchAPI('/pinturas', 'POST', { marca: 'Alba', precio: 200, ... });
     */
    async function fetchAPI(endpoint, method = 'GET', data = null) {
        try {
            // Mostrar indicador de carga
            toggleSpinner(true);
            
            // Configurar opciones de la petición
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            // Agregar cuerpo JSON solo para métodos que lo requieren
            if (data && (method === 'POST' || method === 'PUT')) {
                options.body = JSON.stringify(data);
            }
            
            // Realizar petición fetch a la API
            const response = await fetch(`${API_URL}${endpoint}`, options);
            
            // Manejar respuestas de error HTTP
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            // Caso especial: respuesta exitosa sin contenido (DELETE)
            if (response.status === 204) {
                return null;
            }
            
            // Convertir respuesta a JSON y retornar
            return await response.json();
        } catch (error) {
            // Registrar error y propagarlo para manejo superior
            console.error('Error en la petición a la API:', error);
            throw error;
        } finally {
            // Siempre ocultar el spinner al finalizar, incluso con errores
            toggleSpinner(false);
        }
    }

    // Variables globales
    let pinturas = [];
    let editando = false;
    let idPinturaActual = 0;
    let marcasMasComunes = {}; // Para almacenar frecuencia de marcas
    
    // Funciones manejadoras de eventos
    function handleCargarParaEdicion(e) {
        console.log('Evento cargarParaEdicion recibido con ID:', e.detail);
        // Asegurar que tengamos un ID válido
        if (!e.detail) {
            mostrarMensaje('ID de pintura no válido', 'danger');
            return;
        }
        
        // Navegar al tab del formulario
        const formularioTabEl = document.querySelector('#formulario-tab');
        if (formularioTabEl) {
            // En lugar de simular un clic, mostramos directamente el contenedor del tab
            const formularioPane = document.querySelector('#formulario-tab-pane');
            if (formularioPane) {
                // Quitar active class de todos los tabs y panes
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('show', 'active');
                });
                document.querySelectorAll('.nav-link').forEach(tab => {
                    tab.classList.remove('active');
                    tab.setAttribute('aria-selected', 'false');
                });
                
                // Activar el tab del formulario y su pane
                formularioPane.classList.add('show', 'active');
                formularioTabEl.classList.add('active');
                formularioTabEl.setAttribute('aria-selected', 'true');
            }
        }
        
        // Cargar los datos de la pintura
        cargarParaEdicion(e.detail);
    }
    
    function handleEliminarPintura(e) {
        eliminarPintura(e.detail);
    }
    
    /**
     * Activa un tab específico de manera segura
     * @param {string} tabId - El ID del tab a activar (sin el '#')
     */
    function activarTab(tabId) {
        // Obtener el elemento del tab
        const tabEl = document.getElementById(tabId);
        if (!tabEl) return;
        
        // Obtener el ID del contenedor del tab
        const tabTarget = tabEl.getAttribute('data-bs-target');
        if (!tabTarget) return;
        
        // Obtener el contenedor del tab
        const tabPane = document.querySelector(tabTarget);
        if (!tabPane) return;
        
        // Desactivar todos los tabs y panes
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('show', 'active');
        });
        document.querySelectorAll('.nav-link').forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });
        
        // Activar el tab seleccionado y su contenedor
        tabPane.classList.add('show', 'active');
        tabEl.classList.add('active');
        tabEl.setAttribute('aria-selected', 'true');
        
        // Disparar eventos específicos según el tab
        if (tabId === 'listado-tab') {
            // Actualizar tbody y listado
            tbody = document.getElementById('tblPinturas');
            actualizarListado();
        } else if (tabId === 'estadisticas-tab') {
            // Actualizar gráficos
            generarGraficoBarras();
            generarDistribucionMarcas({...marcasMasComunes});
        }
    }

    // Referencias a elementos del DOM
    const formulario = document.getElementById('frmFormulario');
    const inputID = document.getElementById('inputID');
    const inputMarca = document.getElementById('inputMarca');
    const inputPrecio = document.getElementById('inputPrecio');
    const inputColor = document.getElementById('inputColor');
    const inputCantidad = document.getElementById('inputCantidad');
    const btnAgregar = document.getElementById('btnAgregar');
    const btnModificar = document.getElementById('btnModificar');
    const btnLimpiar = formulario.querySelector('button[type="reset"]');
    let tbody = document.getElementById('tblPinturas'); // Cambiado a let para poder reasignarlo
    
    // Referencias a elementos de filtrado
    const inputFiltroMarca = document.getElementById('inputFiltroMarca');
    const selectFiltroPrecio = document.getElementById('selectFiltroPrecio');
    const btnFiltrar = document.getElementById('btnFiltrar');
    const btnLimpiarFiltros = document.getElementById('btnLimpiarFiltros');

    // Event Listeners
    btnAgregar.addEventListener('click', agregarPintura);
    btnModificar.addEventListener('click', editarPintura);
    btnLimpiar.addEventListener('click', limpiarFormulario);
    btnFiltrar.addEventListener('click', filtrarPinturas);
    btnLimpiarFiltros.addEventListener('click', limpiarFiltros);
    inputFiltroMarca.addEventListener('input', function() {
        if (this.value.length >= 3 || this.value.length === 0) {
            filtrarPinturas();
        }
    });
    selectFiltroPrecio.addEventListener('change', filtrarPinturas);

    // Inicialización
    function init() {
        // Cargar tema guardado
        cargarTema();
        
        // Asegurar que tengamos la referencia correcta al tbody
        tbody = document.getElementById('tblPinturas');
        
        // Configurar eventos para los tabs
        document.querySelectorAll('#myTab button').forEach(tabEl => {
            tabEl.addEventListener('shown.bs.tab', event => {
                const targetId = event.target.getAttribute('data-bs-target');
                
                // Si es el tab de listado, asegurar que el tbody esté correctamente referenciado y actualizar listado
                if (targetId === '#listado-tab-pane') {
                    tbody = document.getElementById('tblPinturas');
                    actualizarListado();
                }
                
                // Si es el tab de estadísticas, actualizar ambos gráficos
                if (targetId === '#estadisticas-tab-pane') {
                    generarGraficoBarras();
                    generarDistribucionMarcas({...marcasMasComunes});
                }
            });
        });
        
        // Configurar eventos para botones de navegación del home
        const btnAgregarPintura = document.getElementById('btnAgregarPintura');
        if (btnAgregarPintura) {
            btnAgregarPintura.addEventListener('click', () => activarTab('formulario-tab'));
        }
        
        const btnVerListado = document.getElementById('btnVerListado');
        if (btnVerListado) {
            btnVerListado.addEventListener('click', () => activarTab('listado-tab'));
        }
        
        const btnVerEstadisticas = document.getElementById('btnVerEstadisticas');
        if (btnVerEstadisticas) {
            btnVerEstadisticas.addEventListener('click', () => activarTab('estadisticas-tab'));
        }
        
        // Configurar eventos para otros botones
        document.getElementById('btnExportarCSV').addEventListener('click', exportarCSV);
        document.getElementById('btnToggleTheme').addEventListener('click', toggleTheme);
        document.getElementById('btnPromedio').addEventListener('click', mostrarPromedio);
        
        // Configurar eventos personalizados para las filas de la tabla
        document.addEventListener('cargarParaEdicion', handleCargarParaEdicion);
        document.addEventListener('eliminarPintura', handleEliminarPintura);
        
        // Cargar datos de la API
        obtenerPinturas();
    }
    
    /**
     * Obtiene todas las pinturas desde la API REST y actualiza la visualización
     * @async
     * @function obtenerPinturas
     * @description Realiza una petición GET a la API para obtener el listado completo de pinturas.
     * En caso de error o respuesta vacía, utiliza datos simulados como fallback.
     * Actualiza la variable global 'pinturas' y refresca la tabla de listado.
     * @throws {Error} Captura y registra cualquier error de la API, pero utiliza datos simulados
     * @returns {Promise<void>}
     */
    async function obtenerPinturas() {
        try {
            // Realizar petición a la API para obtener todas las pinturas
            const data = await fetchAPI('/pinturas');
            pinturas = data || [];
            
            // Manejo de caso cuando la API devuelve un array vacío
            if (pinturas.length === 0) {
                console.log('No se obtuvieron datos de la API, usando datos simulados');
                pinturas = simularRespuestaAPI();
                mostrarMensaje('Usando datos simulados debido a problemas con la API', 'warning');
            }
            
            // Actualizar la interfaz con los datos obtenidos
            actualizarListado();
        } catch (error) {
            // Registrar el error en consola para debugging
            console.error('Error al obtener pinturas:', error);
            
            // Estrategia de respaldo: usar datos simulados en caso de fallo de API
            console.log('Error en la API, usando datos simulados');
            pinturas = simularRespuestaAPI();
            actualizarListado();
            mostrarMensaje('Usando datos simulados debido a problemas con la API', 'warning');
        }
    }
    
    /**
     * Simulación de respuesta de la API (para desarrollo)
     * @returns {Array} Array de pinturas simuladas
     */
    function simularRespuestaAPI() {
        return [
            { id: '1', marca: 'Alba', precio: 150, color: '#ff0000', cantidad: 100 },
            { id: '2', marca: 'Sherwin Williams', precio: 250, color: '#0000ff', cantidad: 75 },
            { id: '3', marca: 'Tersuave', precio: 200, color: '#00ff00', cantidad: 50 },
            { id: '4', marca: 'Colorin', precio: 100, color: '#ffff00', cantidad: 200 },
            { id: '5', marca: 'Alba', precio: 300, color: '#ff00ff', cantidad: 25 }
        ];
    }

    // Función para agregar una nueva pintura
    async function agregarPintura(e) {
        e.preventDefault();
        
        if (!validarFormulario()) return;

        const nuevaPintura = {
            marca: inputMarca.value.trim(),
            precio: parseInt(inputPrecio.value),
            color: inputColor.value,
            cantidad: parseInt(inputCantidad.value)
        };

        try {
            // Enviar a la API
            const pinturaCreada = await fetchAPI('/pinturas', 'POST', nuevaPintura);
            
            // Actualizar array local
            pinturas.push(pinturaCreada);
            
            actualizarListado();
            limpiarFormulario();
            mostrarMensaje('Pintura agregada correctamente', 'success');
        } catch (error) {
            // El error ya se maneja en fetchAPI
            console.error('Error al agregar pintura:', error);
        }
    }

    // Función para editar una pintura existente
    async function editarPintura(e) {
        e.preventDefault();
        
        if (!editando || !validarFormulario()) return;

        const id = inputID.value;
        const pinturaModificada = {
            marca: inputMarca.value.trim(),
            precio: parseInt(inputPrecio.value),
            color: inputColor.value,
            cantidad: parseInt(inputCantidad.value)
        };

        try {
            // Enviar a la API
            await fetchAPI(`/pinturas/${id}`, 'PUT', pinturaModificada);
            
            // Actualizar array local
            const index = pinturas.findIndex(p => p.id == id);
            if (index !== -1) {
                pinturas[index] = { ...pinturaModificada, id };
            }
            
            actualizarListado();
            limpiarFormulario();
            mostrarMensaje('Pintura actualizada correctamente', 'success');
        } catch (error) {
            // El error ya se maneja en fetchAPI
            console.error('Error al modificar pintura:', error);
        }
    }

    /**
     * Obtiene una pintura por ID desde la API
     * @param {string} id - ID de la pintura a obtener
     * @returns {Promise<Object>} Pintura obtenida
     */
    async function obtenerPinturaPorId(id) {
        try {
            return await fetchAPI(`/pinturas/${id}`, 'GET');
        } catch (error) {
            console.error(`Error al obtener pintura con ID ${id}:`, error);
            mostrarMensaje(`No se pudo obtener la pintura con ID ${id}`, 'danger');
            throw error;
        }
    }
    
    // Función para cargar datos en el formulario para edición
    async function cargarParaEdicion(id) {
        try {
            // Obtener la pintura directamente de la API
            const pintura = await obtenerPinturaPorId(id);
            if (!pintura) {
                mostrarMensaje(`No se encontró la pintura con ID ${id}`, 'warning');
                return;
            }
            
            // Actualizar el formulario
            inputID.value = pintura.id;
            inputMarca.value = pintura.marca;
            inputPrecio.value = pintura.precio;
            inputColor.value = pintura.color;
            inputCantidad.value = pintura.cantidad;
    
            editando = true;
            idPinturaActual = id;
            btnAgregar.disabled = true;
            btnModificar.disabled = false;
            
        } catch (error) {
            // Fallback: Intentar encontrar la pintura en el array local
            console.warn('Fallback: Buscando pintura en array local');
            const pinturaLocal = pinturas.find(p => p.id === id);
            
            if (pinturaLocal) {
                inputID.value = pinturaLocal.id;
                inputMarca.value = pinturaLocal.marca;
                inputPrecio.value = pinturaLocal.precio;
                inputColor.value = pinturaLocal.color;
                inputCantidad.value = pinturaLocal.cantidad;
        
                editando = true;
                idPinturaActual = id;
                btnAgregar.disabled = true;
                btnModificar.disabled = false;
            } else {
                mostrarMensaje(`No se pudo cargar la pintura con ID ${id}`, 'danger');
            }
        }
    }

    // Función para eliminar una pintura
    async function eliminarPintura(id) {
        if (!confirm('¿Está seguro de eliminar esta pintura?')) return;
        
        try {
            // Enviar a la API
            await fetchAPI(`/pinturas/${id}`, 'DELETE');
            
            // Actualizar array local
            pinturas = pinturas.filter(p => p.id != id);
            
            actualizarListado();
            mostrarMensaje('Pintura eliminada correctamente', 'info');
        } catch (error) {
            // El error ya se maneja en fetchAPI
            console.error('Error al eliminar pintura:', error);
        }
    }

    // Función para actualizar el listado de pinturas
    function actualizarListado(pinturasAMostrar = null) {
        // Limpiar tabla
        tbody.innerHTML = '';

        // Si no se especifica qué pinturas mostrar, usar la variable global pinturas
        if (pinturasAMostrar === null) {
            pinturasAMostrar = pinturas;
        }

        // Generar filas de la tabla
        pinturasAMostrar.forEach(pintura => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${pintura.id}</td>
                <td>${pintura.marca}</td>
                <td>$${pintura.precio}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <div style="width: 25px; height: 25px; background-color: ${pintura.color}; border: 1px solid #000; border-radius: 4px; margin-right: 5px;"></div>
                        <span>${pintura.color}</span>
                    </div>
                </td>
                <td>${pintura.cantidad}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="document.dispatchEvent(new CustomEvent('cargarParaEdicion', { detail: '${pintura.id}' }))">
                        Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="document.dispatchEvent(new CustomEvent('eliminarPintura', { detail: '${pintura.id}' }))">
                        Eliminar
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Actualizar resumen (con todas las pinturas, no solo las filtradas)
        actualizarResumen(pinturas);

        // Eliminar event listeners anteriores para evitar duplicación
        document.removeEventListener('cargarParaEdicion', handleCargarParaEdicion);
        document.removeEventListener('eliminarPintura', handleEliminarPintura);
        
        // Agregar nuevos event listeners
        document.addEventListener('cargarParaEdicion', handleCargarParaEdicion);
        document.addEventListener('eliminarPintura', handleEliminarPintura);
    }

    // Función para actualizar el resumen
    function actualizarResumen(pinturasParaResumen = pinturas) {
        const totalPinturas = pinturasParaResumen.length;
        const stockTotal = pinturasParaResumen.reduce((total, p) => total + p.cantidad, 0);
        const precioPromedio = totalPinturas > 0 
            ? (pinturasParaResumen.reduce((total, p) => total + p.precio, 0) / totalPinturas).toFixed(2)
            : 0;
            
        // Calcular valor total del inventario
        const valorTotal = pinturasParaResumen.reduce((total, p) => total + (p.precio * p.cantidad), 0);
        
        // Encontrar la marca más común
        // Reiniciar la variable global
        marcasMasComunes = {};
        
        pinturasParaResumen.forEach(p => {
            if(!marcasMasComunes[p.marca]) {
                marcasMasComunes[p.marca] = 1;
            } else {
                marcasMasComunes[p.marca]++;
            }
        });
        
        let marcaMasComun = "Ninguna";
        let maxCantidad = 0;
        
        for(let marca in marcasMasComunes) {
            if(marcasMasComunes[marca] > maxCantidad) {
                maxCantidad = marcasMasComunes[marca];
                marcaMasComun = marca;
            }
        }
        
        // Encontrar la pintura más cara
        let pinturaMasCara = "Ninguna";
        let precioMasCaro = 0;
        
        if(pinturasParaResumen.length > 0) {
            const pinturaMasCaraObj = pinturasParaResumen.reduce((max, p) => p.precio > max.precio ? p : max, pinturasParaResumen[0]);
            pinturaMasCara = `${pinturaMasCaraObj.marca} ($${pinturaMasCaraObj.precio})`;
            precioMasCaro = pinturaMasCaraObj.precio;
        }

        // Actualizar valores en todos los elementos del DOM
        const elementosID = {
            totalPinturas: [document.getElementById('totalPinturas'), document.getElementById('totalPinturas2')],
            stockTotal: [document.getElementById('stockTotal'), document.getElementById('stockTotal2')],
            precioPromedio: [document.getElementById('precioPromedio'), document.getElementById('precioPromedio2')],
            valorTotal: [document.getElementById('valorTotal'), document.getElementById('valorTotal2')],
            marcaMasComun: [document.getElementById('marcaMasComun'), document.getElementById('marcaMasComun2')],
            pinturaMasCara: [document.getElementById('pinturaMasCara'), document.getElementById('pinturaMasCara2')]
        };
        
        // Actualizar cada par de elementos
        elementosID.totalPinturas.forEach(el => { if(el) el.textContent = totalPinturas; });
        elementosID.stockTotal.forEach(el => { if(el) el.textContent = stockTotal; });
        elementosID.precioPromedio.forEach(el => { if(el) el.textContent = precioPromedio; });
        elementosID.valorTotal.forEach(el => { if(el) el.textContent = valorTotal.toFixed(2); });
        elementosID.marcaMasComun.forEach(el => { if(el) el.textContent = marcaMasComun; });
        elementosID.pinturaMasCara.forEach(el => { if(el) el.textContent = pinturaMasCara; });
        
        // Generar gráficos
        generarGraficoBarras();
        generarDistribucionMarcas(marcasMasComunes);
    }
    
    /**
     * Genera un gráfico de barras simple con HTML/CSS
     */
    function generarGraficoBarras() {
        const graficoContainer = document.getElementById('graficoBarras');
        if (!graficoContainer) return;
        
        // Limpiar gráfico anterior
        graficoContainer.innerHTML = '';
        
        if (pinturas.length === 0) {
            graficoContainer.innerHTML = '<div class="alert alert-info">No hay datos para generar el gráfico</div>';
            return;
        }
        
        // Obtener marcas únicas
        const marcas = [...new Set(pinturas.map(p => p.marca))];
        
        // Preparar datos para el gráfico
        const datosGrafico = marcas.map(marca => {
            const pinturasMarca = pinturas.filter(p => p.marca === marca);
            const promedio = calcularPromedio(pinturasMarca);
            return { marca, promedio };
        });
        
        // Encontrar valor máximo para escalar las barras
        const maxPromedio = Math.max(...datosGrafico.map(d => d.promedio));
        
        // Crear contenedor del gráfico
        const graficoBarras = document.createElement('div');
        graficoBarras.className = 'grafico-barras';
        
        // Crear barras
        datosGrafico.forEach(dato => {
            const altura = (dato.promedio / maxPromedio) * 100;
            // Asegurar que marca sea string
            const marcaStr = dato.marca ? String(dato.marca) : 'Sin marca';
            // Generar color basado en la marca para consistencia
            const hue = marcaStr.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360;
            const color = `hsl(${hue}, 70%, 50%)`;
            
            const barraContainer = document.createElement('div');
            barraContainer.className = 'barra-container';
            barraContainer.title = `Promedio: $${dato.promedio.toFixed(2)}`;
            
            barraContainer.innerHTML = `
                <div class="barra-label">${marcaStr}</div>
                <div class="barra" style="height: ${altura}%; background-color: ${color};">
                    $${dato.promedio.toFixed(0)}
                </div>
            `;
            
            graficoBarras.appendChild(barraContainer);
        });
        
        graficoContainer.appendChild(graficoBarras);
    }
    
    /**
     * Genera un gráfico simple de distribución por marcas (tipo pie chart simple)
     * @param {Object} marcasCantidad - Objeto con las marcas y sus cantidades
     */
    function generarDistribucionMarcas(marcasCantidad) {
        const container = document.getElementById('distribucionMarcas');
        if (!container) return;
        
        // Limpiar contenedor
        container.innerHTML = '';
        
        if (Object.keys(marcasCantidad).length === 0) {
            container.innerHTML = '<div class="alert alert-info">No hay datos para generar el gráfico</div>';
            return;
        }
        
        // Crear contenedor de pie chart
        const pieChart = document.createElement('div');
        pieChart.className = 'pie-chart';
        
        // Calcular total
        const total = Object.values(marcasCantidad).reduce((sum, cant) => sum + cant, 0);
        
        // Generar leyenda
        const leyenda = document.createElement('div');
        leyenda.className = 'pie-legend';
        
        // Crear sectores del pie chart
        let acumulado = 0;
        Object.entries(marcasCantidad).forEach(([marca, cantidad], index) => {
            const porcentaje = (cantidad / total) * 100;
            // Asegurar que marca sea string
            const marcaStr = marca ? String(marca) : 'Sin marca';
            const hue = marcaStr.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360;
            const color = `hsl(${hue}, 70%, 50%)`;
            
            // Crear sector
            const inicio = acumulado;
            acumulado += porcentaje;
            
            // Agregar al gráfico solo si es un porcentaje significativo
            if (porcentaje > 1) {
                const sector = document.createElement('div');
                sector.className = 'pie-sector';
                sector.style.setProperty('--start', `${inicio}%`);
                sector.style.setProperty('--end', `${acumulado}%`);
                sector.style.setProperty('--color', color);
                sector.title = `${marcaStr}: ${cantidad} (${porcentaje.toFixed(1)}%)`;
                pieChart.appendChild(sector);
            }
            
            // Agregar a la leyenda
            const itemLeyenda = document.createElement('div');
            itemLeyenda.className = 'legend-item';
            itemLeyenda.innerHTML = `
                <span class="color-box" style="background-color: ${color};"></span>
                <span class="legend-text">${marcaStr}: ${cantidad} (${porcentaje.toFixed(1)}%)</span>
            `;
            leyenda.appendChild(itemLeyenda);
        });
        
        // Crear contenedor flex
        const flexContainer = document.createElement('div');
        flexContainer.className = 'd-flex flex-column flex-md-row align-items-center gap-4';
        flexContainer.appendChild(pieChart);
        flexContainer.appendChild(leyenda);
        
        container.appendChild(flexContainer);
    }
    
    /**
     * Calcula el promedio de precios
     * @param {Array} pinturasLista - Lista de pinturas
     * @returns {number} Promedio
     */
    function calcularPromedio(pinturasLista) {
        if (pinturasLista.length === 0) return 0;
        const suma = pinturasLista.reduce((total, p) => total + p.precio, 0);
        return suma / pinturasLista.length;
    }
    
    /**
     * Muestra el promedio de precios al usuario
     */
    function mostrarPromedio() {
        if (pinturas.length === 0) {
            mostrarMensaje('No hay pinturas para calcular el promedio', 'warning');
            return;
        }
        
        const promedio = calcularPromedio(pinturas);
        mostrarMensaje(`El precio promedio es: $${promedio.toFixed(2)}`, 'info');
    }
    
    /**
     * Exporta las pinturas a un archivo CSV
     */
    function exportarCSV() {
        if (pinturas.length === 0) {
            mostrarMensaje('No hay pinturas para exportar', 'warning');
            return;
        }
        
        // Cabeceras del CSV
        const cabeceras = ['ID', 'Marca', 'Precio', 'Color', 'Cantidad'];
        
        // Convertir datos a filas CSV
        const filas = pinturas.map(p => [p.id, p.marca, p.precio, p.color, p.cantidad]);
        
        // Unir todo en un solo string CSV
        const contenidoCSV = [
            cabeceras.join(','),
            ...filas.map(fila => fila.join(','))
        ].join('\n');
        
        // Crear Blob y descargar
        const blob = new Blob([contenidoCSV], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        
        enlace.href = url;
        enlace.download = `pinturas_${new Date().toISOString().slice(0, 10)}.csv`;
        enlace.style.display = 'none';
        
        document.body.appendChild(enlace);
        enlace.click();
        
        // Limpiar
        setTimeout(() => {
            document.body.removeChild(enlace);
            URL.revokeObjectURL(url);
        }, 100);
        
        mostrarMensaje('Archivo CSV exportado correctamente', 'success');
    }
    
    /**
     * Cambia entre tema claro y oscuro
     */
    function toggleTheme() {
        const body = document.body;
        const iconoTema = document.querySelector('#btnToggleTheme i');
        
        // Verificar tema actual
        const temaActual = body.getAttribute('data-bs-theme');
        const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';
        
        // Cambiar tema
        body.setAttribute('data-bs-theme', nuevoTema);
        
        // Cambiar icono
        iconoTema.classList.remove('bi-moon-fill', 'bi-sun-fill');
        iconoTema.classList.add(nuevoTema === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill');
        
        // Guardar preferencia
        localStorage.setItem('tema', nuevoTema);
    }
    
    /**
     * Carga el tema guardado en localStorage
     */
    function cargarTema() {
        const temaGuardado = localStorage.getItem('tema');
        if (temaGuardado) {
            document.body.setAttribute('data-bs-theme', temaGuardado);
            
            // Actualizar icono
            const iconoTema = document.querySelector('#btnToggleTheme i');
            iconoTema.classList.remove('bi-moon-fill', 'bi-sun-fill');
            iconoTema.classList.add(temaGuardado === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill');
        }
    }

    // Función para validar el formulario
    function validarFormulario() {
        let esValido = true;
        
        // Reiniciar estados de validación
        formulario.querySelectorAll('.is-invalid').forEach(campo => {
            campo.classList.remove('is-invalid');
        });

        // Validar marca
        if (inputMarca.value.trim() === '') {
            inputMarca.classList.add('is-invalid');
            mostrarMensaje('La marca es obligatoria', 'danger');
            inputMarca.focus();
            esValido = false;
        }

        // Validar precio
        const precio = parseInt(inputPrecio.value);
        if (isNaN(precio) || precio < 50 || precio > 500 || precio % 50 !== 0) {
            inputPrecio.classList.add('is-invalid');
            mostrarMensaje('El precio debe ser un número entre 50 y 500, múltiplo de 50', 'danger');
            if (esValido) inputPrecio.focus();
            esValido = false;
        }

        // Validar cantidad
        const cantidad = parseInt(inputCantidad.value);
        if (isNaN(cantidad) || cantidad < 1 || cantidad > 400) {
            inputCantidad.classList.add('is-invalid');
            mostrarMensaje('La cantidad debe ser un número entre 1 y 400', 'danger');
            if (esValido) inputCantidad.focus();
            esValido = false;
        }

        return esValido;
    }

    // Función para limpiar el formulario
    function limpiarFormulario() {
        formulario.reset();
        inputID.value = '';
        editando = false;
        idPinturaActual = 0;
        btnAgregar.disabled = false;
        btnModificar.disabled = true;
        
        // Limpiar estados de validación
        formulario.querySelectorAll('.is-invalid').forEach(campo => {
            campo.classList.remove('is-invalid');
        });
        
        // Eliminar alertas existentes
        const alertasAnteriores = document.querySelectorAll('.alert');
        alertasAnteriores.forEach(alerta => alerta.remove());
    }

    // Función para mostrar mensajes
    function mostrarMensaje(mensaje, tipo) {
        // Eliminar mensajes anteriores
        const alertasAnteriores = document.querySelectorAll('.alert');
        alertasAnteriores.forEach(alerta => alerta.remove());

        // Crear y mostrar nuevo mensaje
        const divMensaje = document.createElement('div');
        divMensaje.className = `alert alert-${tipo} alert-dismissible fade show mt-3`;
        divMensaje.innerHTML = `
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        formulario.parentNode.insertBefore(divMensaje, formulario.nextSibling);
        
        // Eliminar mensaje después de 5 segundos
        setTimeout(() => {
            if (divMensaje) divMensaje.remove();
        }, 5000);
    }

    // Nota: Las pinturas solo se almacenan en memoria durante la sesión
    // No se usa localStorage para los datos de pinturas, solo para preferencias de UI

    // Función para generar un ID único
    function generarID() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Función para filtrar pinturas
    function filtrarPinturas() {
        const filtroMarca = inputFiltroMarca.value.trim().toLowerCase();
        const filtroPrecio = parseInt(selectFiltroPrecio.value);
        
        let pinturasAMostrar = [...pinturas];
        
        // Aplicar filtro de marca si hay texto
        if (filtroMarca) {
            pinturasAMostrar = pinturasAMostrar.filter(p => 
                p.marca.toLowerCase().includes(filtroMarca));
        }
        
        // Aplicar filtro de precio si se seleccionó un precio máximo
        if (filtroPrecio > 0) {
            pinturasAMostrar = pinturasAMostrar.filter(p => p.precio <= filtroPrecio);
        }
        
        // Mostrar el resultado de los filtros
        actualizarListado(pinturasAMostrar);
        
        // Mostrar mensaje con los resultados
        const mensaje = `Se encontraron ${pinturasAMostrar.length} pinturas que coinciden con los filtros aplicados.`;
        mostrarMensaje(mensaje, 'info');
    }
    
    // Función para limpiar los filtros
    function limpiarFiltros() {
        inputFiltroMarca.value = '';
        selectFiltroPrecio.value = '0';
        
        // Recargar todas las pinturas
        actualizarListado();
        mostrarMensaje('Filtros eliminados', 'info');
    }
    
    // Inicializar la aplicación
    init();
});