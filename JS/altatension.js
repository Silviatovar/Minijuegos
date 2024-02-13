var contadorMarcadas = 0;
var contadorAciertos = 0;
var temporizador;
var segundosRestantes = 10;

document.getElementById("c1").addEventListener("click", tratar, false);
document.getElementById("c2").addEventListener("click", tratar, false);
document.getElementById("c3").addEventListener("click", tratar, false);
document.getElementById("c4").addEventListener("click", tratar, false);
document.getElementById("c5").addEventListener("click", tratar, false);
document.getElementById("c6").addEventListener("click", tratar, false);
document
  .getElementById("Comprobar")
  .addEventListener("click", Comprobar, false);
document.getElementById("reset").addEventListener("click", reset, false);

// Conjunto para almacenar países ya asignados
var paisesAsignados = new Set();
var capitalesAsignadas = new Set();

// Función para generar países aleatorios
function generarPaisesAleatorios(cantidad) {
  var paisesAleatorios = [];
  var paisesDisponibles = [
    { pais: "España", capital: "Madrid", correcta: true },
    { pais: "Portugal", capital: "Lisboa", correcta: true },
    { pais: "Francia", capital: "París", correcta: true },
    { pais: "Italia", capital: "Roma", correcta: true },
    { pais: "Alemania", capital: "Berlín", correcta: true },
    { pais: "Reino Unido", capital: "Londres", correcta: true },
    { pais: "Holanda", capital: "Tokyo", correcta: false },
    { pais: "Suiza", capital: "Dublín", correcta: false },
    { pais: "Suecia", capital: "Monaco", correcta: false },
    { pais: "Noruega", capital: "Budapest", correcta: false },
    { pais: "Dinamarca", capital: "Moscu", correcta: false },
    { pais: "Grecia", capital: "Marruecos", correcta: false },
  ];

  paisesDisponibles.sort(() => Math.random() - 0.5);

  paisesAleatorios.push(
    ...paisesDisponibles.filter((pais) => pais.correcta).slice(0, 3)
  );

  paisesAleatorios.push(
    ...paisesDisponibles.filter((pais) => !pais.correcta).slice(0, 3)
  );

  paisesAleatorios.sort(() => Math.random() - 0.5);

  // while (paisesAleatorios.length < cantidad) {
  //   var indiceAleatorio = Math.floor(Math.random() * paisesDisponibles.length);
  //   var pais = paisesDisponibles.splice(indiceAleatorio, 1)[0];

  //   if (
  //     !paisesAsignados.has(pais.pais) &&
  //     !capitalesAsignadas.has(pais.capital)
  //   ) {
  //     paisesAleatorios.push(pais);
  //     paisesAsignados.add(pais.pais);
  //     capitalesAsignadas.add(pais.capital);
  //   }
  // }

  return paisesAleatorios;
}

// Lógica de temporizador
function actualizarTemporizador() {
  document.getElementById("contador").textContent = segundosRestantes;
}

function iniciarTemporizador() {
  temporizador = setInterval(function () {
    if (segundosRestantes > 0) {
      segundosRestantes--;
      actualizarTemporizador();
    } else {
      document.getElementById("botontemporizador").disabled = false;
      clearInterval(temporizador);
      alert("El tiempo se ha acabado");
    }
  }, 1000);
}

function reiniciarTemporizador() {
  clearInterval(temporizador);
  iniciarTemporizador();
}

function tratar(e) {
  if (document.getElementById("botontemporizador").disabled) {
    reiniciarTemporizador();
    var casilla = e.target;

    // Verificar que la casilla esté seleccionada
    if (casilla.classList.contains("selected")) {
      casilla.classList.remove("selected");
      contadorMarcadas--;
    } else {
      // Verificar si hay más elementos
      if (contadorMarcadas < 3) {
        casilla.classList.add("selected");
        contadorMarcadas++;
      } else {
        alert("No puedes seleccionar más de 3 elementos.");
      }
    }
  }
}

function Comprobar() {
  // clearInterval(temporizador);
  var casillas = document.querySelectorAll("td.selected");
  contadorAciertos = 0;

  for (var i = 0; i < casillas.length; i++) {
    var casilla = casillas[i];
    var paisCapital = JSON.parse(casilla.getAttribute("data-pais-capital"));
    if (casilla.classList.contains("selected") && paisCapital.correcta) {
      contadorAciertos++;
    }
  }

  var mensaje = "El número de aciertos es " + contadorAciertos;
  alert(mensaje);
  if (contadorAciertos === 3) {
    detenerTemporizador();
  }


function detenerTemporizador() {
  clearInterval(temporizador);
  document.getElementById("botontemporizador").disabled = false;
}

}

function reset() {
  document.getElementById("botontemporizador").disabled = true;
  clearInterval(temporizador);
  var casillas = document.querySelectorAll("td.selected");
  casillas.forEach(function (casilla) {
    casilla.classList.remove("selected");
  });
  contadorAciertos = 0;
  contadorMarcadas = 0;
  paisesAsignados.clear();
  capitalesAsignadas.clear();
  segundosRestantes = 11;

  // Lógica para obtener 3 países correctos e incorrectos aleatorios
  var paises = generarPaisesAleatorios();
  // var paisesValidos = paises.filter((pais) => pais.correcta);
  // var paisesInvalidos = paises.filter((pais) => !pais.correcta);

  // Mezclar ambas listas de respuestas
  // paisesValidos = mezclarArray(paisesValidos);
  // paisesInvalidos = mezclarArray(paisesInvalidos);

  // Obtener 3 correctas y 3 incorrectas
  // var paises = paisesValidos.concat(paisesInvalidos);

  // // Mezclar las respuestas
  paises = mezclarArray(paises);

  // Asignar las respuestas a las casillas
  var casillas = document.querySelectorAll("td");

  for (var i = 0; i < casillas.length; i++) {
    casillas[i].textContent = paises[i].pais + " - " + paises[i].capital;
    casillas[i].setAttribute("data-pais-capital", JSON.stringify(paises[i]));
    casillas[i].setAttribute(
      "value",
      paises[i].correcta ? "correcta" : "incorrecta"
    );
  }

  reiniciarTemporizador();
}

function iniciarAltatension() {
  console.log("iniciar");
  document.getElementById("botontemporizador").disabled = true;
  iniciarTemporizador();
  reset();
}

// Iniciar el temporizador y generar las opciones al cargar la página

// Función para mezclar un array
function mezclarArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
