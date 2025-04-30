document.addEventListener("DOMContentLoaded", () => {

    administrarEventosBotones();

    document.querySelectorAll("div").forEach((div)=>{

        div.addEventListener("mouseover", ()=> {
            div.classList.toggle("error");
            div.style.cursor="pointer";
        });

        div.addEventListener("mouseout", ()=> {
            div.style.cursor="arrow";
        });
    });
    
});

function administrarEventosBotones(){

    document.querySelector("#btnModificar").addEventListener("click", ()=>modificarPs());

    document.querySelector("#btnColorear").addEventListener("click", ()=>{
        document.body.style.backgroundColor = "#B4BEE4";
    });

    document.querySelector("#btnCargarDatos").addEventListener("click", ()=>{
       
        let nombre = document.querySelector("#txtNombre").value;
        var opcion = document.querySelector("#cboSeleccion").value;

        document.querySelector("main").innerHTML = "Nombre: " + nombre + "<br>Opción: " + opcion;
    });
}

function modificarPs(){

    document.querySelectorAll("p").forEach( (p)=>p.style.fontFamily="arial black" );
    
}

function CambiarDatos(){
    
    alert("Cambia de valor la selección ('op2')\ny del nombre ('ROBERTO')");
    
    document.querySelector("#txtNombre").value = "ROBERTO";
    document.querySelector("#cboSeleccion").value = "op2";

}