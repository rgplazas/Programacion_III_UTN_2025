
// let xhttp = new XMLHttpRequest(); 
// xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
// xhttp.send();
// console.log(xhttp.responseText);

document.addEventListener("DOMContentLoaded", () => {
    // 1. Crear el objeto XMLHttpRequest
    const peticion = new XMLHttpRequest();

    // 2. Configurar la petición (GET, URL, true = asíncrono)
    peticion.open("GET", "datos.json", true);

    // 3. Definir qué hacer cuando la petición cambia de estado
    peticion.onreadystatechange = () => {
        if (peticion.readyState === 4) { // Solo cuando la petición se completa
            if (peticion.status === 200) {
                const datos = JSON.parse(peticion.responseText);
                console.log("Datos recibidos:", datos);
                document.getElementById("resultado").innerText = `Hola, ${datos.nombre} ${datos.apellido}`;
            } else {
                console.log("Error al cargar los datos.");
            }
        }
    };

    // 4. Enviar la petición
    peticion.send();
})

