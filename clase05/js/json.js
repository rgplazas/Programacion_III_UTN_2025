document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#btnEnviar").addEventListener("click", (e)=>{
        
        e.preventDefault();

        let form = document.forms.item(0);

        const data = new FormData(form);
	    const dataObject = Object.fromEntries(data.entries());
	
        console.log(dataObject);  
        
    });
    
});