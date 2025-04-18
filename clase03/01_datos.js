//DECLARACIÓN DE VARIABLES

var variable = "hola";      //ámbito global NO SE RECOMIENDA

let otraVariable = (510 + 50 + 40) + "Hola" + (50 + 40);  //ámbito local

const PI = 3.141592;        //ámbito local 
                            //pero su valor no puede
                            //ser modificado

console.log(variable);
console.log(otraVariable);
console.log(PI);

//PI = 0; //genera error

//EJEMPLOS DE TIPOS DE DATOS

console.log(typeof(variable));
console.log(typeof(otraVariable));
console.log(typeof(PI));

let esVerdad = true;
esVerdad = 0;
esVerdad = "false";
console.log(typeof(esVerdad));


let entero = 1;
let decimal = 10.59;
let hexa = 0xFF55AA;
let binario = 0b1001001;
let octal = 0o7125;
let agrupacion = decimal + " - " + hexa + " - " + binario + " - " + octal

console.log(agrupacion);
console.log(typeof(agrupacion))
console.log(typeof(hexa))

let obj = null;
let indefinido;
let simbolo = Symbol("es un símbolo");

console.log(obj + " - " + typeof(obj));
console.log(indefinido + " - " + typeof(indefinido));
console.log(simbolo.toString() + " - " + typeof simbolo);


//OPERADOR == vs OPERADOR ===

if (entero == "1") {
    console.log("son iguales");
}

if (entero == 1) {
    console.log("son iguales");
}

if (entero === "1") {
    console.log("son idénticos");
}
else{
    console.log("no son idénticos");
}

if (entero === 1) {
    console.log("son idénticos");
}


//LET vs VAR

var a = 123;
console.log(a);

if (true) {
    var a = 456;
    console.log(a);
}

console.log(a);

let b = 123;
console.log(b);

if (true) {
    let b = 456;
    console.log(b);
}
console.log(b);


//PLANTILLAS LITERALES

let cosa = "algo";
cosa = 10;
cosa = true;

let cadena = "hola";
console.log(cadena);

let otraCadena = 'mundo';
console.log(otraCadena);

let masCadenas = `con tilde invertido`;
console.log(masCadenas);

let sinTemplate = cadena + " " + otraCadena + " " + masCadenas + "\n" + cosa + "." 
console.log(sinTemplate);

let template = `concatenando: ${cadena} ${otraCadena} ${masCadenas}.\n${cosa}.`;
console.log(template);