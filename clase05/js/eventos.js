
function mostrar() {
    alert("click desde función");
}

//#region MANEJADOR SEMÁNTICO

window.onload = ( () => {
    document.querySelector("#btnMostrar").addEventListener("click", mostrar);
});

//#endregion

//#region MANEJADOR SEMÁNTICO 2

// document.addEventListener("DOMContentLoaded", () => {

//     document.querySelector("#btnMostrar").addEventListener("click", () => {
//         console.log("click desde manejador semántico");
//     });

// });

//#endregion
