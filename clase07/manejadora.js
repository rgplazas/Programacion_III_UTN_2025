document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#testFetch").addEventListener("click", () => {
        testFetch();
    });

    document.querySelector("#fetchCompleto").addEventListener("click", () => {
        fetchCompleto();
    });

    document.querySelector("#opcionesFetch").addEventListener("click", () => {
        opcionesFetch();
    });

    document.querySelector("#fetchJSON").addEventListener("click", () => {
        fetchJSON();
    });

    document.querySelector("#fetchJSONES").addEventListener("click", () => {
        fetchJSONES();
    });
});

function testFetch() {

    fetch("data/fetch_test.dat")
        .then((response) => {
            console.log(response);
            console.log(response.text());
        });
}

function fetchCompleto() {

    fetch("data/fetch_test.dat")
        .then((response) => {
            if (response.ok) {
                return response.text();
            }
            else {
                throw new Error("Se ha producido un error");
            }
        })
        .then((dataText) => {
            console.log(dataText);
            document.querySelector("#divResultado").innerHTML = dataText;
        })
        .catch(err => {
            console.error("ERROR: ", err.message);
        });
}


const handleFetch = async (url, options) => {
    try {
        const response = await fetch(url, options);
        return response;
    } catch (error) {
        console.error("Error al hacer fetch:", error);
        throw error;
    }
};

const handleError = (res) => {
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res;
};

async function opcionesFetch() {

    const opciones = {
        method: "GET",
        headers: { "Content-Type": "text/plain" },
    };

    const url = "http://127.0.0.1:5500/data/fetch_test.dat";

    try {
        const response = await handleFetch(url, opciones);
        const dataText = await response.text();
        console.log(dataText);
        document.querySelector("#divResultado").innerHTML = dataText;
    }
    catch (err) {
        console.log(err);
    }
}

function fetchJSON() {

    const opciones = {
        method: "GET",
    };    

    const url = "http://127.0.0.1:5500/data/usuario.json";

    try {
        handleFetch(url, opciones)
            .then((response) => response.json())
            .then((dataJSON) => {
                console.log(dataJSON);
                document.querySelector("#divResultado").innerHTML = JSON.stringify(dataJSON);
            });
    }
    catch (err) {
        console.log(err);
    }
}

function fetchJSONES() {

    try {
        handleFetch("http://127.0.0.1:5500/data/usuarios.json")
            .then((response) => response.json())
            .then((dataJSON) => {
                console.log(dataJSON);
                document.querySelector("#divResultado").innerHTML = JSON.stringify(dataJSON);
            });
    }
    catch (err) {
        console.log(err);
    }

}


function irHacia(pagina) {
    window.location.href = pagina;
}