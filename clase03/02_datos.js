//ARRAYS EN JAVASCRIPT
const vec = [1, true, "hola"]; 
console.log(vec);

//FOR 'CLÁSICO'
for (let i = 0; i < vec.length; i++) {
    const elemento = vec[i];
    console.log(elemento);
}

const vector = [];
vector[0] = 1;
vector[1] = 2;
vector.push(3);

//FOREACH
vector.forEach(elemento => {
    console.log(elemento);
});


const numeros = [1, 2, 3, 4];
const otrosNumeros = [1, 2, 3];

let eliminado = numeros.pop();
console.log(eliminado);

eliminado = numeros.shift();
console.log(eliminado);

numeros.push(5);
console.log(numeros);

let todosJuntos = numeros.join(" - ");
console.log(todosJuntos);
console.log(typeof(todosJuntos))

let indice = numeros.indexOf(5);
if (indice != -1) {
    console.log(`El índice es ${indice}`);
} else{
    console.log("No se encontró...");
}

if (numeros.includes(2)) {
    console.log("Se encontró...");
} else {
    console.log("No se encontró...");
}
