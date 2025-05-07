document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#reintentar").addEventListener("click", averiguarCompuesta);

});

function averiguarCompuesta() {

    let nombre = prompt("Ingresar nombre:");

    averiguarPaisCompuesta(nombre);
}


const averiguarPaisCompuesta = async (nombre) => {

    let url = `https://api.nationalize.io/?name=${nombre}`;
    
    try {
        let res = await manejadorFetch(url);

        let resJSON = await res.json();

        let paisMasProb = resJSON.country.reduce((a, b) => {
            return a.probability > b.probability ? a : b;
        }, 0);

        const codPais = paisMasProb.country_id;

        url = `https://restcountries.com/v3.1/alpha/${codPais}`;
        
        res = await manejadorFetch(url);
        
        resJSON = await res.json();
        
        document.querySelector("#divResultado").innerHTML = `Probablemente el nombre ${nombre} sea de <strong>${resJSON[0].translations.spa.common}</strong>`;

    } catch (err) {

        alert(err);
    }    
};

const manejadorFetch = async (url) => {
    return await fetch(url)
        .then(manejadorError);
};

const manejadorError = (res) => {
    if (!res.ok)
        throw new Error(res.statusText);
    return res;
};