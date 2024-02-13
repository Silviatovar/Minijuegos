 
 
    //INICIO ADMINISTRACION JSON
    // Función para cargar y mostrar los datos del juego seleccionado
    window.onload = function () {
        const tipoJuegoElement = document.getElementById('tipoJuego');
        console.log(tipoJuegoElement);
        if (tipoJuegoElement) {
            tipoJuegoElement.addEventListener('change', function () {
                const tipoJuego = this.value;
                fetch('Json/admin.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al cargar el archivo JSON');
                        }
                        return response.json();
                    })
                    .then(data => {
                        const tbody = document.getElementById('tbodyDatos');
                        tbody.innerHTML = ''; 
                        data.juegos[tipoJuego].forEach(juego => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                            <td>${juego.nombre}</td>
                            <td>${juego.categoria}</td>
                            <td>${juego.edad_recomendada}</td>
                            <td>
                                <ul>
                                ${juego.jugadores.map(jugador => `<li>${jugador.nombre} (${jugador.edad} años, ${jugador.puntos} puntos)</li>`).join('')}
                                </ul>
                            </td>
                        `;
                            tbody.appendChild(row);
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });
        }
    }
    