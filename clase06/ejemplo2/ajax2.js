document.addEventListener("DOMContentLoaded", () => {
  let contador = 0;
  setInterval(() => { //llama a una funcion cada cierto tiempo
    contador++;
    document.getElementById("contador").textContent = contador;
  }, 1000); // actualiza cada segundo


});


function cargarSincronico() {
  document.getElementById("resultado").textContent = "Cargando datos (SINCRÓNICO)...";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "datos.json", false); // false = sincrónico

  // Simula una espera de red larga
  const start = Date.now();
  while (Date.now() - start < 3000) { } // simula 3 segundos de bloqueo

  xhr.send();

  if (xhr.status === 200) {
    const datos = JSON.parse(xhr.responseText);
    document.getElementById("resultado").textContent = `Hola, ${datos.nombre} ${datos.apellido}`;
  }
}

function cargarAsincronico() {
  document.getElementById("resultado").textContent = "Cargando datos (ASÍNCRONO)...";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "datos.json", true); // true = asíncrono

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      setTimeout(() => { // simula demora de red
        const datos = JSON.parse(xhr.responseText);
        document.getElementById("resultado").textContent = `Hola, ${datos.nombre} ${datos.apellido}`;
      }, 3000); // 3 segundos, pero no bloquea
    }
  };

  xhr.send();
}

// Si se ponen las funciones dentro de DOMContentLoaded, se ejecutan cuando el DOM carga,
// pero no se exponen en el ámbito global, entonces no es posible usarlas con onclick="...".