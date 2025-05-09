const getNameAsync = async (idPost) => {

    try {
        /*         URL BASE para no repetirla en cada fetch */
        const URL = "https://jsonplaceholder.typicode.com/"
        /*   obtener los datos del post mediante fetch */
        let repuestaAPIpost = await fetch(`${URL}posts/${idPost}`)
        let post = await repuestaAPIpost.json()  //convertimos la respuesta en JSON 
        /*          document.write (`el posteo se titula : ${post.title} `) */
        let repuestaAPIuser = await fetch(`${URL}users/${post.userId}`)
        let user = await repuestaAPIuser.json()

        document.write(`el Post ${idPost} con el titulo ${post.title} lo escribió <strong> ${user.name} </strong> y vive en la ciudad de ${user.address.city}`)
    } catch (error) {
        console.log(error);

    }
}
getNameAsync(8)

