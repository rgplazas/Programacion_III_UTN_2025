
class Usuario {

    nombre;  // público
    #dni;    // protegido
    _edad;   // privado
    static estatico;

    constructor(nombre, dni) {
      this.nombre = nombre;
      this.#dni = dni;
      this._edad = 0;
      Usuario.estatico = "valor estático";
    }
  
    get edad() {
      return this._edad;
    }
  
    set edad(value) {
      if (value.length > 0) {
        console.log("Ingrese edad mayor a cero.");
        return;
      }
      this._edad = value;
    }

    get dni(){
        return this.#dni;
    }
  
    saludar(){
        console.log(`Hola ${this.nombre}!!! tu dni es: ${this.#dni} y tu edad es ${this._edad}.`);
    }

    static saludarEstatico(obj){
      obj.saludar();
    }
  }


const obj = new Usuario("Juan", 222);

//console.log(obj.#dni); // error, es privado
console.log(obj.name);

console.log(obj.dni); //accesor
console.log(obj.nombre);//accesor


obj.nombre = "Pepe";
console.log(obj.nombre);

console.log(obj.dni);
obj.dni = 0; // NO lo cambia, es un accesor de solo lectura
console.log(obj.dni);
obj.edad = 35;
obj.saludar();


 class Vehiculo {

   #marca;

   constructor(marca){
     this.#marca = marca;
   }

   toString() {
     return `MARCA: ${this.#marca}`;
   }
 }

 class Auto extends Vehiculo{

   color;

   constructor(marca, color) {
     super(marca);
     this.color = color;
   }

   toString() {
     return `${super.toString()} - COLOR: ${this.color}`;
   }
 }


 const auto = new Auto("ford", "rojo");
 console.log(auto.toString());


 class Abstracta {

   constructor() {

     if(this.constructor === Abstracta) {
       //throw new Error("No se puede instanciar una clase abstracta.");
       console.log("no Se puede instanciar")
     }else{
        console.log("Se puede instanciar")
     }

   }
 }

 class Concreta extends Abstracta {
    
   constructor(){
     super();
      
   }
 }

 const objConc = new Concreta();
 const objAbst = new Abstracta();