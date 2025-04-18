//LAS SIGUIENTES FUNCIONES SON EQUIVALENTES. 

const f1 = function (i) { return i * i; };
console.log(f1(2));

//SINTAXIS DE "Fat arrow"
const f2 = (i) => i * i;

console.log(f2(2));

const f3 = function() {
    let algo = 3;
    let mensaje = algo % 2 ? "es par" : "es impar";
    console.log(mensaje);
}
f3();

const f4 = () => {
    let algo = 3;
    let mensaje = algo % 2 ? "es par" : "es impar";
    console.log(mensaje);
}
f4();
