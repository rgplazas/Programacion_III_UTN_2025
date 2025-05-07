document.addEventListener("DOMContentLoaded", () => {
  const xhr = new XMLHttpRequest();

  // --- responseType: pedimos texto plano o json ---
  xhr.responseType = "json";  // Podría ser "text", "blob", etc.

  // --- timeout ---
  xhr.timeout = 5000; // 5 segundos

  // --- withCredentials ---
  xhr.withCredentials = false; // Solo si fuera necesario enviar cookies, tokens, etc.

  // --- onreadystatechange (estado de la petición) ---
  xhr.onreadystatechange = () => {
    console.log("readyState:", xhr.readyState); // Ver cómo cambia
    if (xhr.readyState === 4) { // 4 = Completado
      if (xhr.status === 200) {
        // .response ya viene parseado por responseType = "json"
        const datos = xhr.response;

        // .responseURL muestra la URL de la respuesta
        console.log("URL de respuesta:", xhr.responseURL);

        document.getElementById("resultado").innerText =
          `Hola ${datos.titulo} ${datos.descripcion}`;
      } else {
        console.error("Error", xhr.status, xhr.statusText);
      }
    }
  };

  // --- Manejo de errores por timeout ---
  xhr.ontimeout = () => {
    console.error("La petición tardó demasiado.");
  };

  // --- Abrimos la petición (GET, a datos.json, modo asíncrono) ---
  xhr.open("GET", "datos.json", true);
  // --- Enviamos la petición ---
  xhr.send();

})
