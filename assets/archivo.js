// CREAMOS EL SET PARA LOS NUMEROS GENERADOS
var numerosGeneradosGlobal = new Set();
var generacionInterval;
var primerBingoCantado = false;

// CREAMOS LA FUNCION PARA VERIFICAR LA LINEA LLAMANDO AL CARTON
function verificarLinea(carton) {
    // CREAMOS UN IF PARA VER SI SE HA CANTADO BINGO ANTERIORMENTE
    if (primerBingoCantado) {
        return;
    }

    // NOS TRAEMOS TODAS LAS FILAS 
    var filas = carton.querySelectorAll('.clasecarton .fila');
    // ITERAMOS CON UN FOREACH TODAS LAS FILAS DE LOS CARTONES
    filas.forEach(function (fila) {
        // NOS TRAEMOS TODAS LAS CASILLAS DE CADA FILA
        var celdas = fila.querySelectorAll('div');
        // CON EL METODO EVERY MIRAMOS TODAS LAS CELDAS
        var todasMarcadas = Array.from(celdas).every(celda => celda.classList.contains('marcado'));
        // SI TODAS LAS FILAS ESTAN MARCADAS ENTONCES
        if (todasMarcadas) {
            // EN EL HTML PONDRIA EL SIGUIENTE MENSAJE
            document.getElementById('cantar').innerText = '¡HAN CANTADO LÍNEA!';
        }
    });
}

// CREAMOS LA FUNCION GENERAR NUMERO
// FUNCION PARA GENERAR UN NÚMERO ALEATORIO
function generarNumero() {
    // VERIFICA SI YA SE HA CANTADO BINGO
    if (primerBingoCantado) {
        // SI YA SE CANTÓ BINGO, DETIENE LA GENERACIÓN DE NÚMEROS
        clearInterval(generacionInterval);
        return;
    }

    // GENERA UN NÚMERO ALEATORIO QUE NO HAYA SIDO GENERADO ANTES
    var numeroAleatorio;
    do {
        numeroAleatorio = Math.floor(Math.random() * 90) + 1;
    } while (numerosGeneradosGlobal.has(numeroAleatorio));

    // AGREGA EL NÚMERO A LA LISTA DE NÚMEROS GENERADOS
    numerosGeneradosGlobal.add(numeroAleatorio);

    // ACTUALIZA EL ELEMENTO EN LA PÁGINA CON EL NÚMERO ALEATORIO
    document.getElementById('numaleatorio').innerText = numeroAleatorio;

    // AGREGA EL NÚMERO A LA LISTA DE NÚMEROS YA APARECIDOS
    var yaAparecidosDiv = document.getElementById('yaaparecidos');
    yaAparecidosDiv.innerHTML += '<p>' + numeroAleatorio + '</p>';

    // OBTIENE TODOS LOS CARTONES DE BINGO EN LA PÁGINA
    var cartones = document.querySelectorAll('.clasecarton');

    // ITERA SOBRE CADA CARTÓN PARA MARCAR LA CELDA CON EL NÚMERO Y VERIFICAR BINGO Y LÍNEA
    cartones.forEach(function (carton) {
        marcarCelda(carton, numeroAleatorio);
        verificarBingo(carton);
        verificarLinea(carton); // Añade esta línea para verificar la línea
    });

    // SI SE HAN GENERADO TODOS LOS NÚMEROS POSIBLES, DETIENE LA GENERACIÓN DE NÚMEROS
    if (numerosGeneradosGlobal.size === 90) {
        console.log('Ya han salido todos los números');
        clearInterval(generacionInterval);
    }
}

// FUNCION PARA MARCAR LA CELDA EN EL CARTÓN CON UN NÚMERO ESPECÍFICO
function marcarCelda(carton, numero) {
    // OBTIENE TODAS LAS FILAS DEL CARTÓN
    var filas = carton.querySelectorAll('.fila');

    // ITERA SOBRE CADA FILA
    filas.forEach(function (fila) {
        // OBTIENE TODAS LAS CELDAS EN LA FILA ACTUAL
        var celdas = fila.querySelectorAll('div');

        // ITERA SOBRE CADA CELDA PARA COMPARAR EL NÚMERO
        celdas.forEach(function (celda) {
            var numeroEnCelda = parseInt(celda.innerText);
            // SI EL NÚMERO EN LA CELDA ES IGUAL AL NÚMERO GENERADO, MARCA LA CELDA
            if (numeroEnCelda === numero) {
                celda.classList.add('marcado');
            }
        });
    });
}
// CREAMOS LA FUNCION PARA VERIFICAR EL BINGO
// LLAMANDO AL CARTIN
function verificarBingo(carton) {
    // VAMOS A VERIFICAR SI SE HA CANTADO BINGO
    if (primerBingoCantado) {
        return;
    }

    // TRAEMOS TODAS LA FILAS DEL CARTON
    var filas = carton.querySelectorAll('.clasecarton .fila');
    // COMPROBAMOS SI TODAS LAS FILAS ESTAN MARCADAS
    var bingoCompleto = Array.from(filas).every(fila => {
        var celdas = fila.querySelectorAll('div');
        return Array.from(celdas).every(celda => celda.classList.contains('marcado'));
    });

    // SI TODAS LAS CASILLAS ESTAN MARCADAS
    if (bingoCompleto) {
        // EN EL DIV CANTAR SALDRIA EL MENSAJE 
        document.getElementById('cantar').innerText = '¡HAN CANTADO BINGO!';
        primerBingoCantado = true;
    }
}

// CREAMOS LA FUNCION PARA INICIAR LA CREACION DE NUMEROS ALEATORIOS
function startGeneracion() {
    // SI QUEREMOS MODIFICAR LA RAPIDEZ DE CREACION DE NUMEROS ALEATORIOS
    // MODIFICARIAMOS EL NUMERO '300'
    generacionInterval = setInterval(generarNumero, 300);
}


document.addEventListener("DOMContentLoaded", function () {
    generarCartones();
});

// FUNCION PARA GENERAR LOS CARTONES
function generarCartones() {
    // UNA VEZ SELECCIONEMOS EL NUMERO DE CARTONES QUE QUEREMOS
    var numCartones = document.getElementById("cartonSelect").value;
    // EN EL DIV DE LOS CARTONES 
    var contenedorCartones = document.getElementById("cartones");
    // GENERAMOS LOS CARTONES CON EL INNER PARA QUE SE METAN EN EL CONTENEDOR CARTONES
    contenedorCartones.innerHTML = "";

    // CREAMOS UN FOR PARA QUE DEPENDIENDO DE LOS CARTONES QUE QUERAMOS CREE LOS QUE LE PIDAMOS
    for (var i = 1; i <= numCartones; i++) {
        var nuevoCarton = document.createElement("div");
        nuevoCarton.id = "cartonseccion" + i;
        // PONEMOS RANGOS EN PARA CADA FILA DE LOS CARTONES Y CREAMOS UN "NUEVOCARTON"
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

// CREAMOS UNA FUNCION PARA GENERAR NUMEROS ALEATORIOS ORDENADOR
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


// UNA VEZ LE DEMOS AL BOTON REINICIAR
function resetJuego() {
    // HACEMOS QUE PARE LA GENERACION DE NUMEROS
    clearInterval(generacionInterval);

    // REINICIAMOS EL CONTADOR Y LO PONEMOS EN 0 
    numerosGeneradosGlobal.clear();
    document.getElementById('numaleatorio').innerText = '0';

    // BORRAMOS TODAS LAS CASILLAS MARCADAS EN VVERDES PARA EMPEZAR DE NUEBO
    var cartones = document.querySelectorAll('.clasecarton');
    cartones.forEach(function (carton) {
        var celdas = carton.querySelectorAll('.marcado');
        celdas.forEach(function (celda) {
            celda.classList.remove('marcado');
        });
    });

    // ELIMINAMOS LOS CARTONES UTILIZADOS
    var contenedorCartones = document.getElementById("cartones");
    contenedorCartones.innerHTML = '';

    // BORRAMOS TAMBIEN LOS NUMEROS DEL CONTENEDOR DONDE SALEN TODOS LOS NUMEROS GNEREDAOS POR EL GENEREDADOR
    document.getElementById('yaaparecidos').innerHTML = '';

    // REINICIAMOS LOS MENSAJES DEL DIV CANTAR
    document.getElementById('cantar').innerText = '';

    // FORZAMOS QUE EL PRIMER BINGO SEA FALSE
    primerBingoCantado = false;
}
