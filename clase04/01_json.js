
// //objeto simple
 const persona = { "nombre" : "Juan", "edad" : 35 , "femenino" : false  };
 console.log(persona);


 let cadenaJSON = `objeto = ${persona.nombre} - ${persona.edad}`;

 console.log(cadenaJSON);

// //array  
cadenaJSON = `array = ${persona["nombre"]} - ${persona["edad"]}`;
 console.log(cadenaJSON);

// //agregar propiedades
 persona.apellido = "Perez";
 persona["dni"] = 222;
 persona.fechaNacimiento = "21/12/1990"

 console.log(persona);

// //quitar propiedades
 delete persona.dni;
 delete persona["fechaNacimiento"]

 console.log(persona);


// //JSON.parse
 const otraPersona = JSON.parse(`{"prop_1":"valor_1", "prop_2":"valor_2"}`);
 otraPersona.prop_3 = "valor_3";
 console.log(otraPersona);

// //JSON.stringify
 let otraCadenaJSON = JSON.stringify(otraPersona);
 console.log(otraCadenaJSON);


// //JSON complejo
 const personas = [
     { "nombre" : "Juan", "edad" : 35 },
     { "nombre" : "Anibal", "edad" : 26, "femenino" : false }
    ];

 console.log(personas);

 personas.forEach(p => {
     console.log(p);
     //alert(JSON.stringify(p));
 });            

 for (let index = 0; index < personas.length; index++) {
     const p = personas[index];
     console.log(p);
 }

// //JSON con funciones

 let cadena = "";

 const personaFunc = {
                         "nombre" : "Ricardo",
                         "edad" : 34,
                         "saludar" : function () { 
                             return `Hola soy ${this.nombre} y tengo ${this.edad} años.`; 
                         }
                     };

 cadena = personaFunc.saludar();
    
 console.log(cadena);

 personaFunc.amigos = [
                         { "nombre" : "Juan", "edad" : 35 },
                         { "nombre" : "Anibal", "edad" : 26 }
                     ];

 console.log(personaFunc);

 personaFunc.saludarAmigos = function () {
    
     let ret = "";

     this.amigos.forEach(a => {
        //console.log(a);
        ret += `Hola soy ${a.nombre} y tengo ${a.edad} años.\n`;
    })

     //for(let i=0; i < this.amigos.length; i++)
     //{
     //    ret += `Hola soy ${this.amigos[i].nombre} y tengo ${this.amigos[i].edad} años.\n`; 
     //}

     return ret;
 }

 console.log(personaFunc.saludarAmigos());