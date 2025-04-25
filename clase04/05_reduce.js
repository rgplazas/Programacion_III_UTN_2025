//ARRAY.REDUCE

//#1.- SE QUIERE OBTENER LA SUMA DE TODOS LOS NUMEROS
const nums = [1, 2, 3, 4, 5];
let total = 0;

//a.- FORMA 'TRADICIONAL'
for (let i = 0; i < nums.length; i++) {
    total += nums[i];
}
console.log(total);

//b.- CON REDUCE
total = nums.reduce(function (anterior, actual) {
    return anterior + actual;
}, 0);
console.log(total);

//DETALLE FUNCIONAMIENTO
total = nums.reduce(function (anterior, actual, index) {
    var valor = anterior + actual;
    console.log("Valor anterior: " + anterior + "; valor actual: " + actual +
        "; iteración nro.: " + (index + 1));
    return valor;
}, 0);
console.log(total);

//c.- CON REDUCE Y =>
total = nums.reduce( (anterior, actual) => anterior + actual, 0);
console.log(total);


//#2.- SE QUIERE OBTENER LOS PRODUCTOS DE LA CATEGORIA 'ACCESORIOS'
const productosInventario = [
    { id: "1", nombre: "Remera", categoria: "Ropa", stock: 150 },
    { id: "2", nombre: "Zapatillas", categoria: "Accesorios", stock: 500 },
    { id: "3", nombre: "Zapatos", categoria: "Accesorios", stock: 200 },
    { id: "4", nombre: "Shorts", categoria: "Ropa", stock: 950 },
    { id: "5", nombre: "Corbata", categoria: "Ropa", stock: 800 }
];

//a.- FORMA 'TRADICIONAL'
let productosTotal = [];
let totalStock = 0;

for (let i = 0; i < productosInventario.length; i++) {
    totalStock += productosInventario[i].stock;
}
console.log(totalStock);

//b.- CON REDUCE
totalStock = productosInventario.reduce(function (anterior, actual, index, array) {
    return anterior + actual.stock;
}, 0);
console.log(totalStock);

//c.- CON REDUCE Y =>
totalStock = productosInventario.reduce( (anterior, actual, index, array) => anterior + actual.stock, 0);
console.log(totalStock);