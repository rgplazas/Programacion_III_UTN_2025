//ARRAY.MAP

//#1.- SE QUIERE CALCULAR EL CUADRADO DE CADA ELEMENTO
const numeros = [1, 2, 3, 4, 5];
let cuadrados = [];

//a.- FORMA 'TRADICIONAL'
for (let i = 0; i < numeros.length; i++) {
    cuadrados[i] = numeros[i] * numeros[i];
}
console.log(cuadrados);

//b.- CON MAP
cuadrados = numeros.map(function (numero) {
    return numero * numero;
});
console.log(cuadrados);

//c.- CON MAP Y =>
cuadrados = numeros.map( numero => numero * numero );
console.log(cuadrados);


//#2.- SE QUIERE SABER LOS NOMBRES DE LOS PRODUCTOS
const productos = [
    { id: "1", nombre: "Remera", categoria: "Ropa" },
    { id: "2", nombre: "Zapatillas", categoria: "Accesorios" },
    { id: "3", nombre: "Zapatos", categoria: "Accesorios" },
    { id: "4", nombre: "Shorts", categoria: "Ropa" },
    { id: "5", nombre: "Corbata", categoria: "Ropa" }
];

//a.- FORMA 'TRADICIONAL'
let nombreDeProductos = [];

for (let i = 0; i < productos.length; i++) {
    nombreDeProductos.push(productos[i].nombre);
}
console.log(nombreDeProductos);

//b.- CON MAP
nombreDeProductos = productos.map(function (producto, index, array) {
    return producto.nombre;
});
console.log(nombreDeProductos);

//c.- CON MAP Y =>
nombreDeProductos = productos.map((producto, index , array) => {if (index > 1){ return producto.nombre}});
console.log(nombreDeProductos);
