/* Punto 1) En el archivo ./js/manejadora.js se pide agregar las instrucciones necesarias para asociar de
forma semántica el evento ‘click’ del enlace <a id=”mostrar”> a una función que permita
recuperar los usuarios (por AJAX/FETCH) invocando a la ruta (GET/usuarios) del API.
Con el array de JSON recibido se debe crear un listado dinámico (tabla con encabezado y datos)
que se mostrará en el <nav id="panel-derecha">. 

Nota: el listado debe mostrar las columnas ID, NOMBRE, CORREO y PAÍS. No se mostrará la
columna correspondiente a la clave.
Agregar a la tabla una clase de BOOTSTRAP de su elección.*/

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mostrar").addEventListener("click", Mostrarusuarios);
    document.getElementById("formulario").addEventListener("submit", Agregarusuario);
});

async function Mostrarusuarios(){
    const panel = document.getElementById("panel-derecha");
    panel.innerHTML = "<div class='spinner-border text-primary' role='status'></div>";

    try{
        const res = await fetch("https://utnfra-api-usuarios.onrender.com/usuarios");
        const data = await res.json();

        let tabla = "<table class='table table-dark table-striped'>";
        tabla += "<thead><tr><th>#</th><th>Nombre</th><th>Correo</th><th>País</th><th>Acciones</th></tr></thead>";
        tabla += "<tbody>";

        data.forEach(user => {  
            tabla += `<tr>
                        <td><a href="#" onclick="Cargarusuario(${user.id})">${user.id}</a></td>
                        <td>${user.nombre}</td>
                        <td>${user.email}</td>
                        <td>${user.pais}</td>
                        <td><button type="button" class="btn btn-danger btn-sm" onclick="Eliminarusuario(${user.id})">Eliminar</button></td>
                    </tr>`;
        });

        tabla += "</tbody></table>";
        panel.innerHTML = tabla;
        
    }catch(error){
        alert("Error al cargar los usuarios");
        console.log(error);
    }
}

/* Asociar de forma semántica el evento ‘submit’ del formulario a una función que recupere los
valores y los envíe (por AJAX/FETCH) invocando a la ruta (POST/usuarios) del API.
Actualizar el listado solo si se pudo agregar el usuario, caso contrario, informar por alert . */

async function Agregarusuario(e) {
    e.preventDefault();

    if(!ValidarFormulario()) return;

    const usuario = ObtenerDatosFormulario();

    try{
        const res = await fetch("https://utnfra-api-usuarios.onrender.com/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        if(res.ok){
            Mostrarusuarios();
            LimpiarFormulario();
        }else{
            alert("Error al agregar el usuario");
        }
        
    }catch(error){
        alert("Error al agregar el usuario");
        console.log(error);
    }
    
}

function LimpiarFormulario(){
    document.getElementById("formulario").reset();
}

/* Se pide generar las siguientes validaciones a los campos del formulario:
❖ todos los campos deben tener valores requeridos.
❖ el correo electrónico debe tener un formato correcto.
❖ la clave deben ser caracteres alfanuméricos en un rango de tres a ocho caracteres.
❖ se tienen que aceptar los términos y condiciones.
Nota: utilizar BOOTSTRAP y JavaScript para poder resaltar los campos y mostrar mensajes de
error dinámicos y personalizados. */

function ValidarFormulario(){
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const clave = document.getElementById("clave");
    const pais = document.getElementById("pais");
    const terminos = document.getElementById("terminos");

    let valid = true;

    //Limpieza
    [nombre, email, clave, pais].forEach(element => {
        element.classList.remove("is-invalid");
    });

    if(!nombre.value.trim()){
        nombre.classList.add("is-invalid");
        valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email.value)){
        email.classList.add("is-invalid");
        valid = false;
    }

    const claveRegex = /^[a-zA-Z0-9]{3,8}$/;

    if(!claveRegex.test(clave.value)){
        clave.classList.add("is-invalid");
        valid = false;
    }

    if(!pais.value.trim()){
        pais.classList.add("is-invalid");
        valid = false;
    }

    if(!terminos.checked){
        alert("Debe aceptar los términos y condiciones");
        valid = false;
    }

    return valid;
}

function ObtenerDatosFormulario(){
    const id = document.getElementById("id").value;
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const clave = document.getElementById("clave").value;
    const pais = document.getElementById("pais").value;
    const terminos = document.getElementById("terminos").checked;

    return {id, nombre, email, clave, pais};
}


/* Se solicita agregar un enlace a cada uno de los valores de los campos ID del listado, para que al
pulsarlo, se pueda traer información de ese usuario, invocando (por AJAX/FETCH) a la ruta
(GET/usuarios:id) del API.
La información recibida se debe de mostrar en los campos correspondientes del formulario */

async function Cargarusuario(id){
    try{
        const res = await fetch(`https://utnfra-api-usuarios.onrender.com/usuarios/${id}`);
        const data = await res.json();

        document.getElementById("id").value = data.id;
        document.getElementById("nombre").value = data.nombre;
        document.getElementById("email").value = data.email;
        document.getElementById("clave").value = data.clave;
        document.getElementById("pais").value = data.pais;

        const form = document.getElementById("formulario");
        form.removeEventListener("submit", Agregarusuario);
        form.addEventListener("submit", Modificarusuario);
    }catch(error){
        alert("Error al cargar el usuario");
        console.log(error);
    }
}

/* A partir del punto anterior, se pide realizar una modificación de los datos del usuario
seleccionado, invocando (por AJAX/FETCH) a la ruta (PUT/usuarios:id) del API.
Si supera todas las validaciones y se pudo realizar la modificación, refrescar el listado, caso
contrario informar por alert.
Nota: remover el manejador de eventos asociado al ‘submit’ del formulario y agregar uno nuevo
para realizar la modificación. Una vez terminado, volver a asociar el manejador de eventos para
agregar usuarios nuevos. */

async function Modificarusuario(e){
    e.preventDefault();

    if(!ValidarFormulario()) return;

    const usuario = ObtenerDatosFormulario();

    console.log(usuario);

    try{
        const res = await fetch(`https://utnfra-api-usuarios.onrender.com/usuarios/${usuario.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        if(res.ok){
            Mostrarusuarios();
            LimpiarFormulario();
        }else{
            alert("Error al modificar el usuario");
        }
    }catch(error){
        alert("Error al modificar el usuario");
        console.log(error);
    }
}

/* Agregar una nueva columna al listado (X) que permita eliminar un usuario, invocando (por
    AJAX/FETCH) a la ruta (DELETE/usuarios:id) del API.
    Pedir confirmación, mostrando id, nombre y correo, antes de eliminar.
    En caso de éxito, refrescar el listado.
    Nota: utilizar un ícono de BOOTSTRAP (tacho de residuos, o similar) para realizar la acción. */

async function Eliminarusuario(id){
    if(!confirm(`¿Está seguro que desea eliminar el usuario ${id}`)) return;

    try{
        const res = await fetch(`https://utnfra-api-usuarios.onrender.com/usuarios/${id}`, {
            method: "DELETE"
        });

        if(res.ok){
            Mostrarusuarios();
        }else{
            alert("Error al eliminar el usuario");
        }
    }catch(error){
        alert("Error al eliminar el usuario");
        console.log(error);
    }
}

/* ❖ Vaciar los campos del formulario cuando se termina de agregar o modificar.
❖ Agregar un spinner (de su elección) en cada petición hacia el API.
❖ Agregar un enlace (debajo del elemento <a id=”mostrar”>) con el texto Mostrar argentinos
y asocie un manejador de eventos (click) que permita mostrar en el listado solo los
registros de los usuarios cuyo país sea Argentina.
❖ Agregar otro enlace y situarlo debajo del anterior, (Mostrar homónimos) que permita
cargar en el listado a aquellos usuarios cuyo nombre coincida con el tuyo.
3
Modelo primer par */
