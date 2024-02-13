let espacio = document.getElementById("vacio");
let expresion = "";

function agregarNumero(numero) {
    expresion += numero;
    actualizarEspacio();
}

function agregarOperador(operador) {
    expresion += operador;
    actualizarEspacio();
}

function limpiar() {
    expresion = "";
    actualizarEspacio();
}

function actualizarEspacio() {
    espacio.textContent = expresion;
}

function calcular() {
    try {
        let resultadoCalculado = eval(expresion);
        espacio.textContent = resultadoCalculado;
    } catch (error) {
        espacio.textContent = "Error";
    }
}
function toggleAvButtons() {
    const avButtons = document.querySelectorAll('.av');
    avButtons.forEach((button) => {
      button.style.display = (button.style.display === 'none' || button.style.display === 'none') ? 'flex' : 'none';
    });
  }
  