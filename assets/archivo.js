var numerosGenerados = [];
var generacionInterval;

function generarNumero() {
    var numeroAleatorio;

    do {
        numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    } while (numerosGenerados.includes(numeroAleatorio));
    numerosGenerados.push(numeroAleatorio);
    document.getElementById('numaleatorio').innerText = numeroAleatorio;
    if (numerosGenerados.length === 89) {
        reiniciarGeneracion();
    }
}

function startGeneracion() {
    generacionInterval = setInterval(generarNumero, 2000);
}

function stopGeneracion() {
    clearInterval(generacionInterval);
}

function reiniciarGeneracion() {
    clearInterval(generacionInterval);
    numerosGenerados = [];
}