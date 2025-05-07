
document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#reintentar").addEventListener("click", averiguar);

});

function averiguar() {

    let nombre = prompt("Ingresar nombre:");

    averiguarIdPaisFetch(nombre);
}

const averiguarIdPaisFetch = (nombre) => {

    let url = `https://api.nationalize.io/?name=${nombre}`;
    
    handleFetchSimple(url)
        .then(res => res.json())
        .then(resJSON => {

            let paisMasProb = resJSON.country.reduce((a, b) => {
                return a.probability > b.probability ? a : b;
            }, 0);

            document.querySelector("#divResultado").innerHTML = `País más probable de ${nombre}: ${paisMasProb.country_id}`;
    })
    .catch(err => {
        alert(err);
    });
};

const handleFetchSimple = (url) => {
    return fetch(url)
        .then(handleErrorSimple);
};

const handleErrorSimple = (res) => {
    if (!res.ok)
        throw new Error(res.statusText);
    return res;
};