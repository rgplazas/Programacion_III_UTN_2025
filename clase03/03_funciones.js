//FUNCIONES BASICAS

function sumar(a, b) {
    return a + b;
}

function saludar(nombre) {
    return `Hola ${nombre}`;
}

function despedir() {
    return "Chau!";
}

//FUNCIONES COMO VARIABLES

const miFuncion = sumar;

console.log(miFuncion(5, 4));

const miVariable = function () {
    console.log("hola");
};

miVariable();

const varDespedir = despedir();
console.log(varDespedir);

const miOtraFuncion = saludar("Juan");
console.log(miOtraFuncion);


//PARAMETROS OPCIONALES
//En JavaScript todos los parametros son opcionales

function nombreApellido(nombre, apellido) {
    if (apellido && nombre) {
        return `${nombre}  ${apellido}`;
    }
    if (apellido == null && nombre) {
        return nombre;
    } else {
        return "Debe ingresar minimamente un nombre";
    }
}

let nombre = nombreApellido("Juan", "Perez");
let otroNombre = nombreApellido("Juan");
let otroNombre1 = nombreApellido();

console.log(nombre);
console.log(otroNombre);
console.log(otroNombre1);


//PARAMETROS PREDETERMINADOS

function generarNombreCompleto(nombre, apellido, capitalizado = false) {
    let cadena;
    if (capitalizado)
        cadena = capitalizar(nombre) + " " + capitalizar(apellido);
    else
        cadena = nombreApellido(nombre, apellido);

    return cadena;
}

function capitalizar(cadena) {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase();
}

console.log(generarNombreCompleto("tony", "stark", true));


//PARAMETROS REST

function completarNombreApellido(nombre, ...losDemasParametros) {
    return nombre + " " + losDemasParametros.join(" ");
    //return losDemasParametros[0];
}

let superman = completarNombreApellido("Clark", "Joseph", "Kent", "DC");

let ironman = completarNombreApellido("Anthony", "Edward", "Tony", "Stark" , "Marvel");

console.log(superman);
console.log(ironman);
