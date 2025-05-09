
const getNameAxios = async (idPost) => {
    try {
        const URL = "https://jsonplaceholder.typicode.com/"
        let resPosts = await axios.get(`${URL}posts/${idPost}`)
        /*         console.log(resPosts); */
        let resUsers = await axios.get(`${URL}users/${resPosts.data.userId}`)
        /*    console.log(resUsers ); */
        document.write(`${resUsers.data.name}vive en ${resUsers.data.address.street} escribio el post con el titulo ${resPosts.data.title}`);
    } catch (error) {
        console.log(error);
    }
}
getNameAxios(18)