// funcion que recibe un id de post y hace 2 peticiones fetch encadenadas



const getNameFetch = idPost => {
    //primera peticion : obtiene un post especifico desde la API
    const URL = "https://jsonplaceholder.typicode.com/"

    fetch(`${URL}posts/${idPost}`)
    .then((respuesta)=>{
    //convierte la respuesta del post a formato JSON
    return respuesta.json();

    })
    /* guardo respuesta.JSON en post */
    .then ((post)=>{
        fetch (`${URL}users/${post.userId}`)
        .then((respuesta)=>{
            return respuesta.json();    //convierte la respuesta del post a formato JSON
        })
        .then((user)=>{
            //Mostrar en consola informacion de la persona que escribio el post
            document.write(`${user.name}vive en ${user.address.street} escribio el post con el titulo ${post.title}`);
        })
    })
}
getNameFetch(8)








/* arrow function */
/* const getNameFetch  = nombre =>(`Hola ${nombre}`)
console.log(getNameFetch("Natalio")
);
 
 */