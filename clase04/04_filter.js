//ARRAY.FILTER

//#1.- SE QUIERE OBTENER TODOS LOS IMPARES
const valores = [1, 2, 3, 4, 5];
let impares = [];

//a.- FORMA 'TRADICIONAL'
let cont = 0;
for (let i = 0; i < valores.length; i++) {
    if (valores[i] % 2 === 1) {
        impares[cont] = valores[i];
        cont++;
    }
}
console.log(impares);

//b.- CON FILTER
impares = valores.filter(function (numero) {
    return numero % 2 === 1;
});
console.log(impares);

//c.- CON FILTER Y =>
impares = valores.filter(numero => numero % 2 === 1);
console.log(impares);


//#2.- SE QUIERE OBTENER LOS PRODUCTOS DE LA CATEGORIA 'ACCESORIOS'
const productosStock = [
    { id: "1", nombre: "Remera", categoria: "Ropa", stock: 150 },
    { id: "2", nombre: "Zapatillas", categoria: "Accesorios", stock: 500 },
    { id: "3", nombre: "Zapatos", categoria: "Accesorios", stock: 200 },
    { id: "4", nombre: "Shorts", categoria: "Ropa", stock: 950 },
    { id: "5", nombre: "Corbata", categoria: "Ropa", stock: 800 }
];

//a.- FORMA 'TRADICIONAL'
let productosAccesorios = [];
for (var i = 0; i < productosStock.length; i++) {
    if (productosStock[i].categoria === "Accesorios") {
        productosAccesorios.push(productosStock[i]);
    }
}
console.log(productosAccesorios);

//b.- CON FILTER
productosAccesorios = productosStock.filter(function (producto, index, array) {
    return producto.categoria === "Accesorios";
});
console.log(productosAccesorios);

//c.- CON FILTER Y =>
productosAccesorios = productosStock.filter( (producto, index, array) => producto.categoria === "Accesorios");
console.log(productosAccesorios);
