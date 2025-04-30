
//#region OBTENGO EL PRIMER ELEMENTO

 let primerParrafo = document.querySelector("p");
 console.log(primerParrafo);

 let primerDiv = document.querySelector("div");
 console.log(primerDiv);

 let h3 = document.querySelector("h3");
 console.log(h3);

//#endregion

//#region OBTENGO TODOS LOS ELEMENTOS

 let todosParrafos = document.querySelectorAll("p");
 console.log(todosParrafos);

 let todosDivs = document.querySelectorAll("div"); 
 console.log(todosDivs);

 let elementosClase = document.querySelectorAll(".cursiva");
 console.log(elementosClase);

//#endregion

//#region OBTENGO ELEMENTO ÚNICO

 let divId = document.querySelector("#divId");
 console.log(divId);

//#endregion

//#region RECORRIENDO ELEMENTOS
 let parrafos = document.querySelectorAll("p");

 parrafos.forEach( (p) => console.log(p) );

//#endregion

//#region MANIPULANDO ELEMENTOS

 let segundoParrafo = document.querySelectorAll("p").item(1);

 segundoParrafo.innerHTML = "Agrego texto desde js";

 segundoParrafo.style.background = "#ff0033";
 segundoParrafo.style.fontSize = "18px";

 segundoParrafo.innerHTML += " y estilos";

//#endregion

//#region AGREGO Y QUITO CLASES

 document.querySelector("h3").classList.add("titulo", "error");
 document.querySelector(".cursiva").classList.remove("cursiva");
 document.querySelector("p").classList.toggle("cursiva");

//#endregion

//#region AGREGO ELEMENTOS AL DOM

 let a = document.createElement("a");
 let nodoTexto = document.createTextNode("Ir a Google");

 a.appendChild(nodoTexto);

 a.setAttribute("href", "http://www.google.com.ar");
 a.setAttribute("target", "_blank");
 a.setAttribute("class", "centrado");
 a.setAttribute("title", "algo");

 document.querySelector("#divId").appendChild(a);


 let p = document.createElement("p");
 let nTexto = document.createTextNode("Esto es un texto nuevo");

 p.appendChild(nTexto);
 p.setAttribute("class", "centrado");

 document.querySelector("body").appendChild(p);

//#endregion

//#region QUITO ELEMENTOS DEL DOM

 document.body.removeChild(document.querySelector("h3"));

 document.querySelectorAll("p").item(2).removeAttribute("class");

//#endregion
