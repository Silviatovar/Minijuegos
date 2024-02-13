
  
    
        function crearSopaDeLetras() {
            // Preguntar al usuario por el número de filas y columnas
            var filas = prompt("Ingrese el número de filas:");
            var columnas = prompt("Ingrese el número de columnas:");

            // Validar la entrada del usuario
            if (!filas || isNaN(filas) || filas <= 0 || !columnas || isNaN(columnas) || columnas <= 0) {
                alert("Por favor, ingrese números válidos para filas y columnas.");
                return;
            }

            // Crear la tabla
            var tabla = document.createElement("table");

            // Crear las filas y columnas
            for (var i = 0; i < filas; i++) {
                var fila = document.createElement("tr");

                for (var j = 0; j < columnas; j++) {
                    var celda = document.createElement("td");
                    celda.textContent = obtenerLetraAleatoria();
                    fila.appendChild(celda);
                }

                tabla.appendChild(fila);
            }

            // Añadir la tabla al cuerpo del documento
            document.body.appendChild(tabla);

            // Preguntar al usuario por el número de palabras a añadir
            var numeroPalabras = prompt("Ingrese el número de palabras que desea añadir:");

            // Validar la entrada del número de palabras
            if (!numeroPalabras || isNaN(numeroPalabras) || numeroPalabras <= 0) {
                alert("Por favor, ingrese un número válido para el número de palabras.");
                return;
            }


            // Añadir cada palabra según la dirección especificada
            for (var i = 0; i < numeroPalabras; i++) {
                var palabra;
                var direccion;
                var filaInicio;
                var columnaInicio;

                // Bucle hasta que se proporcionen valores válidos para la palabra
                do {
                    palabra = prompt("Ingrese la palabra #" + (i + 1) + ":");
                    direccion = prompt("Ingrese la dirección de la palabra (arriba, abajo, izquierda, derecha):");
                    filaInicio = prompt("Ingrese la fila de inicio:");
                    columnaInicio = prompt("Ingrese la columna de inicio");
                } while (!palabra || palabra.trim() === "" || !direccion || !["arriba", "abajo", "izquierda", "derecha"].includes(direccion.toLowerCase()) ||
                !filaInicio || isNaN(filaInicio) || filaInicio < 0 || filaInicio >= filas ||
                !columnaInicio || isNaN(columnaInicio) || columnaInicio < 0 || columnaInicio >= columnas);

                // Añadir la palabra a la sopa de letras
                agregarPalabra(tabla, palabra, direccion, parseInt(filaInicio), parseInt(columnaInicio), filas, columnas);
            }
        }

        function agregarPalabra(tabla, palabra, direccion, filaInicio, columnaInicio, filas, columnas) {
            var longitud = palabra.length;

            switch (direccion.toLowerCase()) {
                case "arriba":
                    for (var i = 0; i < longitud; i++) {
                        if (filaInicio - i >= 0) {
                            tabla.rows[filaInicio - i].cells[columnaInicio].textContent = palabra.charAt(i);
                        } else {
                            alert(" La palabra se sale de los límites derechos de la tabla");
                            break;  // La palabra se sale de los límites superiores de la tabla
                        }
                    }
                    break;

                case "abajo":
                    for (var i = 0; i < longitud; i++) {
                        if (filaInicio + i < filas) {
                            tabla.rows[filaInicio + i].cells[columnaInicio].textContent = palabra.charAt(i);
                        } else {

                            alert(" La palabra se sale de los límites derechos de la tabla");
                            break;  // La palabra se sale de los límites inferiores de la tabla
                        }
                    }
                    break;

                case "izquierda":
                    for (var i = 0; i < longitud; i++) {
                        if (columnaInicio - i >= 0) {
                            tabla.rows[filaInicio].cells[columnaInicio - i].textContent = palabra.charAt(i);
                        } else {

                            alert(" La palabra se sale de los límites derechos de la tabla");
                            break;  // La palabra se sale de los límites izquierdos de la tabla
                        }
                    }
                    break;

                case "derecha":
                    for (var i = 0; i < longitud; i++) {
                        if (columnaInicio + i < columnas) {
                            tabla.rows[filaInicio].cells[columnaInicio + i].textContent = palabra.charAt(i);
                        } else {

                            alert(" La palabra se sale de los límites derechos de la tabla");
                            break;
                        }
                    }
                    break;

                default:
                    alert("Dirección no válida.");
                    break;
            }
        }

        function obtenerLetraAleatoria() {
            var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var indiceAleatorio = Math.floor(Math.random() * letras.length);
            return letras.charAt(indiceAleatorio);
        }

        // Llamar a la función al cargar la página
         document.getElementsByClassName(".sopa").addEventListener("click",crearSopaDeLetras);
        

