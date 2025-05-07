document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#reintentar").addEventListener("click", averiguar);

});

function averiguar() {

    let nombre = prompt("Ingresar nombre:");

    averiguarIdPaisSimple(nombre);
}

const averiguarIdPaisSimple = async (nombre) => 
{
    let url = `https://api.nationalize.io/?name=${nombre}`;

    try {
        const res = await handleFetchSimple(url);

        const resJSON = await res.json();

        let paisMasProb = resJSON.country.reduce((a, b) => 
        {
            return a.probability > b.probability ? a : b;
        }, 0);

        document.querySelector("#divResultado").innerHTML = `País más probable de ${nombre}: ${paisMasProb.country_id}`;

    } catch (err) {

        alert(err);
    }
};

const handleFetchSimple = async (url) => {
    return await fetch(url)
        .then(handleErrorSimple);
};

const handleErrorSimple = (res) => {
    if (!res.ok)
        throw new Error(res.statusText);
    return res;
};
