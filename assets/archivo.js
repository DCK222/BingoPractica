var numerosGeneradosGlobal = new Set();
var generacionInterval;
var primerBingoCantado = false;

function verificarLinea(carton) {
    if (primerBingoCantado) {
        return;
    }

    var filas = carton.querySelectorAll('.clasecarton .fila');
    filas.forEach(function (fila) {
        var celdas = fila.querySelectorAll('div');
        var todasMarcadas = Array.from(celdas).every(celda => celda.classList.contains('marcado'));
        if (todasMarcadas) {
            document.getElementById('cantar').innerText = '¡HAN CANTADO LÍNEA!';
        }
    });
}

// Modifica la función generarNumero para llamar a verificarLinea
function generarNumero() {
    if (primerBingoCantado) {
        clearInterval(generacionInterval);
        return;
    }

    var numeroAleatorio;

    do {
        numeroAleatorio = Math.floor(Math.random() * 90) + 1;
    } while (numerosGeneradosGlobal.has(numeroAleatorio));

    numerosGeneradosGlobal.add(numeroAleatorio);
    document.getElementById('numaleatorio').innerText = numeroAleatorio;

    var yaAparecidosDiv = document.getElementById('yaaparecidos');
    yaAparecidosDiv.innerHTML += '<p>' + numeroAleatorio + '</p>';

    var cartones = document.querySelectorAll('.clasecarton');
    cartones.forEach(function (carton) {
        marcarCelda(carton, numeroAleatorio);
        verificarBingo(carton);
        verificarLinea(carton); // Añade esta línea para verificar la línea
    });

    if (numerosGeneradosGlobal.size === 90) {
        console.log('Ya han salido todos los números');
        clearInterval(generacionInterval);
    }
}
function marcarCelda(carton, numero) {
    var filas = carton.querySelectorAll('.fila');
    filas.forEach(function (fila) {
        var celdas = fila.querySelectorAll('div');
        
        celdas.forEach(function (celda) {
            var numeroEnCelda = parseInt(celda.innerText);
            if (numeroEnCelda === numero) {
                celda.classList.add('marcado');
                
            }
        });
    });
}

function verificarBingo(carton) {
    if (primerBingoCantado) {
        return;
    }

    var filas = carton.querySelectorAll('.clasecarton .fila');
    var bingoCompleto = Array.from(filas).every(fila => {
        var celdas = fila.querySelectorAll('div');
        return Array.from(celdas).every(celda => celda.classList.contains('marcado'));
    });

    if (bingoCompleto) {
        document.getElementById('cantar').innerText = '¡HAN CANTADO BINGO!';
        primerBingoCantado = true;
    }
}

function startGeneracion() {
    generacionInterval = setInterval(generarNumero, 300);
}


document.addEventListener("DOMContentLoaded", function () {
    generarCartones();
});

function generarCartones() {
    var numCartones = document.getElementById("cartonSelect").value;
    var contenedorCartones = document.getElementById("cartones");
    contenedorCartones.innerHTML = "";

    for (var i = 1; i <= numCartones; i++) {
        var nuevoCarton = document.createElement("div");
        nuevoCarton.id = "cartonseccion" + i;
        nuevoCarton.innerHTML = `
        <div class="clasecarton carton${i}">
            <div class="fila" id="fila1">
                ${generarNumerosAleatoriosOrdenados(1, 30, 9)}
            </div>
            <div class="fila" id="fila2">
                ${generarNumerosAleatoriosOrdenados(31, 60, 9)}
            </div>
            <div class="fila" id="fila3">
                ${generarNumerosAleatoriosOrdenados(61, 90, 9)}
            </div>
        </div>
        `;
        contenedorCartones.appendChild(nuevoCarton);
    }
}

function generarNumerosAleatoriosOrdenados(min, max, cantidad) {
    var numeros = [];
    while (numeros.length < cantidad) {
        var numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
        if (numeros.indexOf(numeroAleatorio) === -1) {
            numeros.push(numeroAleatorio);
        }
    }
    numeros.sort(function(a, b) {
        return a - b;
    });
    return numeros.map(function(numero) {
        return `<div>${numero}</div>`;
    }).join('');
}



function resetJuego() {
    // Detener la generación de números
    clearInterval(generacionInterval);

    // Reiniciar el contador
    numerosGeneradosGlobal.clear();
    document.getElementById('numaleatorio').innerText = '0';

    // Quitar las clases 'marcado' de todas las celdas en todos los cartones
    var cartones = document.querySelectorAll('.clasecarton');
    cartones.forEach(function (carton) {
        var celdas = carton.querySelectorAll('.marcado');
        celdas.forEach(function (celda) {
            celda.classList.remove('marcado');
        });
    });

    // Quitar los cartones
    var contenedorCartones = document.getElementById("cartones");
    contenedorCartones.innerHTML = '';

    // Reiniciar el contenido de yaaparecidos
    document.getElementById('yaaparecidos').innerHTML = '';

    // Reiniciar el mensaje de bingo
    document.getElementById('cantar').innerText = '';

    primerBingoCantado = false;
}
