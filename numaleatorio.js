function numeroAleatorioFila1() {
    var setNumerosSalir = new Set();
    var numerosFila = [...Array(30).keys()].map(i => i + 1);

    let contador = 1;
    while (contador <= 10) {
        let posicionAle = Math.floor(Math.random() * numerosFila.length);
        let numeroSeleccionado = numerosFila.splice(posicionAle, 1)[0];

        if (!setNumerosSalir.has(numeroSeleccionado)) {
            setNumerosSalir.add(numeroSeleccionado);
            document.getElementById('#fila1 .fila_pos' + contador).textContent = numeroSeleccionado;
            contador++;
        }
    }
}

function numeroAleatorioFila2() {
    var setNumerosSalir = new Set();
    var numerosFila = Array.from({length: 31}, (f, g) => g + 30);

    let contador = 1;
    while (contador <= 10) {
        let posicionAle = Math.floor(Math.random() * numerosFila.length);
        let numeroSeleccionado = numerosFila.splice(posicionAle, 1)[0];

        if (!setNumerosSalir.has(numeroSeleccionado)) {
            setNumerosSalir.add(numeroSeleccionado);
            document.getElementById('fila2_pos' + contador).textContent = numeroSeleccionado;
            contador++;
        }
    }   
}
function numeroAleatorioFila3() {
    var setNumerosSalir = new Set();
    var numerosFila = Array.from({ length: 30 }, (f, g) => g + 61);

    let contador = 1;
    while (contador <= 10) {
        let posicionAle = Math.floor(Math.random() * numerosFila.length);
        let numeroSeleccionado = numerosFila.splice(posicionAle, 1)[0];

        if (!setNumerosSalir.has(numeroSeleccionado)) {
            setNumerosSalir.add(numeroSeleccionado);
            document.getElementById('fila3_pos' + contador).textContent = numeroSeleccionado;
            contador++;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    numeroAleatorioFila1();
    
});
document.addEventListener('DOMContentLoaded', function() {
    numeroAleatorioFila2();
    
});
document.addEventListener('DOMContentLoaded', function() {
    numeroAleatorioFila3();
    
});
