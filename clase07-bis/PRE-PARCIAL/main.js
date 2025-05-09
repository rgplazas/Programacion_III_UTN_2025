const listaEventos = document.getElementById("listaEventos"); // Referencia a la lista donde mostrar eventos
const formulario = document.getElementById("formulario"); // Referencia al formulario
const nombreInput = document.getElementById("nombreEvento"); // Campo para el nombre del evento
const fechaInput = document.getElementById("fechaEvento"); // Campo para la fecha del evento
let eventos = []; // Array para almacenar los eventos

// Cargar eventos desde el archivo JSON simulado
const cargarEventos = async () => {
  const res = await fetch("eventos.json"); // Petición para obtener los datos
  eventos = await res.json(); // Convertir la respuesta en formato JSON
  mostrarEventos(); // Llamar a la función para mostrar los eventos en pantalla
};

// Mostrar los eventos en el DOM
const mostrarEventos = () => {
  listaEventos.innerHTML = ""; // Limpiar la lista antes de volver a mostrarla
  const hoy = new Date(); // Fecha actual

  // Iterar sobre los eventos para mostrarlos
  eventos.forEach((evento) => {
    const li = document.createElement("li");
    li.classList.add("evento");

    // Comparar la fecha del evento con la fecha actual
    const fechaEvento = new Date(evento.fecha);
    const esPasado = fechaEvento < hoy; // Si la fecha es menor que hoy, es un evento pasado
    li.classList.add(esPasado ? "pasado" : "futuro"); // Agregar clase para diferenciar eventos pasados y futuros

    // Agregar el contenido del evento a la lista
    li.innerHTML = `
      <span>${evento.nombre} - ${evento.fecha}</span>
      <button class="eliminar" data-id="${evento.id}">🗑️</button>
    `;

    listaEventos.appendChild(li); // Añadir el evento a la lista

    // Agregar la funcionalidad de eliminar evento
    document.querySelectorAll(".eliminar").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id); // Obtener el id del evento
        eliminarEvento(id); // Llamar a la función para eliminar el evento
      });
    });
  });
};

// Función para agregar un nuevo evento
const agregarEvento = (e) => {
  e.preventDefault(); // Prevenir la acción por defecto (recargar página)

  const nombre = nombreInput.value.trim(); // Obtener el nombre del evento
  const fecha = fechaInput.value; // Obtener la fecha seleccionada

  // Validar si los campos están vacíos
  if (!nombre || !fecha) {
    alert("⚠️ Por favor completá todos los campos.");
    return;
  }

  const fechaSeleccionada = new Date(fecha); // Convertir la fecha a un objeto Date
  const hoy = new Date(); // Fecha actual
  hoy.setHours(0, 0, 0, 0); // Eliminar las horas de la fecha actual para comparar solo la fecha

  // Validar si la fecha es del pasado
  if (fechaSeleccionada < hoy) {
    alert("⚠️ No podés agregar eventos en el pasado.");
    return;
  }

  // Crear un nuevo evento y agregarlo al array
  const nuevoEvento = {
    id: Date.now(), // Usar el timestamp como id único
    nombre,
    fecha
  };

  eventos.push(nuevoEvento); // Agregar el nuevo evento al array
  mostrarEventos(); // Actualizar la lista de eventos
  formulario.reset(); // Limpiar el formulario
};

// Función para eliminar un evento
const eliminarEvento = (id) => {
  eventos = eventos.filter(evento => evento.id !== id); // Filtrar el evento por su id
  mostrarEventos(); // Actualizar la lista de eventos
};

// Inicializar la app
document.addEventListener("DOMContentLoaded", () => {
  cargarEventos(); // Cargar los eventos al cargar la página
  formulario.addEventListener("submit", agregarEvento); // Manejar el envío del formulario
});
