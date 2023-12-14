var numerosGenerados = [];
var generacionInterval;

function generarNumero() {
    var numeroAleatorio;

    do {
        numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    } while (numerosGenerados.includes(numeroAleatorio));

    numerosGenerados.push(numeroAleatorio);
    document.getElementById('numaleatorio').innerText = numeroAleatorio;

    // Agregar el número al div "yaaparecidos"
    var yaAparecidosDiv = document.getElementById('yaaparecidos');
    yaAparecidosDiv.innerHTML += '<p>' + numeroAleatorio + '</p>';

    if (numerosGenerados.length === 89) {
        console.log('ya han salido todos los numeros')
    }
}

function startGeneracion() {
    generacionInterval = setInterval(generarNumero, 500);
}

// generar cartones 
document.addEventListener("DOMContentLoaded", function () {
    // Llama a la función para generar el número de cartones inicial
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
    for (var i = 0; i < cantidad; i++) {
        var numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
        numeros.push(numeroAleatorio);
    }
    numeros.sort(function(a, b) {
        return a - b;
    });

    return numeros.map(function(numero) {
        return `<div>${numero}</div>`;
    }).join('');
}


