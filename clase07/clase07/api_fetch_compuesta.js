
document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#reintentar").addEventListener("click", averiguarCompuesta);

});

function averiguarCompuesta() {

    let nombre = prompt("Ingresar nombre:");

    averiguarIdPaisFetchCompuesta(nombre);
}


const averiguarIdPaisFetchCompuesta = (nombre) => {

    let url = `https://api.nationalize.io/?name=${nombre}`;
    
    manejadorFetchCompuesta(url)
        .then(res => res.json())
        .then(resJSON => {
            
            let paisMasProb = resJSON.country.reduce((a, b) => {
                return a.probability > b.probability ? a : b;
            }, 0);

            return paisMasProb.country_id;
        })
        .then(codPais => {
            
            url = `https://restcountries.com/v3.1/alpha/${codPais}`;
            
            return manejadorFetchCompuesta(url);
        })
        .then(res => res.json())
        .then(resJSON => {
            document.querySelector("#divResultado").innerHTML = `Probablemente el nombre ${nombre} sea de <strong>${resJSON[0].translations.spa.common}</strong>`;
        })
        .catch(err => {
            alert(err);
        });
};

const manejadorFetchCompuesta = (url) => {
    return fetch(url)
        .then(manejadorErrorCompuesta);
};

const manejadorErrorCompuesta = (res) => {
    if (!res.ok)
        throw new Error(res.statusText);
    return res;
};