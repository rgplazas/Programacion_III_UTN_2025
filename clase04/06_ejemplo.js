
const DATA = ( () => {
    const d = [
        { "nombre": "Juana", "sexo": "F", "edad": 25 },
        { "nombre": "Roberto", "sexo": "M", "edad": 40 },
        { "nombre": "Julian", "sexo": "M", "edad": 35 }
    ];
    return d;
})();
const usuarios = DATA;


for (let i = 0; i < usuarios.length; i++) {
    console.log(usuarios[i].nombre + " - " + usuarios[i].sexo + " - " + usuarios[i].edad);
}

const soloNombres = usuarios.map( (item, i, usuarios) => item.nombre );
console.log(soloNombres);

const inicialJota = usuarios.filter( usuario => usuario.nombre.startsWith("J"));
console.log(inicialJota);

const edadUsuarios = usuarios.reduce( (anterior, siguiente) => anterior + siguiente.edad, 0);
console.log(edadUsuarios);

const nombresUsuariosFemeninos = () => {
    return DATA
        .filter( user => user.sexo === 'F')
        .map( user => user.nombre);
};

console.log(nombresUsuariosFemeninos());
