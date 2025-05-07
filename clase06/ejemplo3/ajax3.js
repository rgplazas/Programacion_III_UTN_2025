document.addEventListener('DOMContentLoaded', () => {

  //1. Capturar el evento de envío del formulario
  document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); // evita el envío tradicional del formulario
    //2. Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    //3. Crear un objeto datos
    const datos = {
      nombre: nombre,
      email: email
    };
    //4. preparar la petición AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 201) {
          const respuesta = JSON.parse(xhr.responseText);
          document.getElementById("respuesta").textContent = "Enviado correctamente. ID generado: " + respuesta.id;
        } else {
          document.getElementById("respuesta").textContent = "Error al enviar los datos.";
        }
      }
    };

    xhr.send(JSON.stringify(datos));
  });
})


