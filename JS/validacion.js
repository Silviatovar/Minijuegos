
//REGISTRO

document.addEventListener('DOMContentLoaded', function () {
    var formulario = document.getElementById('registroForm'); // Asegúrate de tener un formulario con el id 'registroForm'
    if (formulario) {
        formulario.addEventListener('submit', function (event) {
            event.preventDefault();
            if (validarFormulario()) {
                registrarUsuario();
            } else {
            
            }
        });
    }
});


    function validarFormulario() {
        var nombre = document.getElementById('nombreRegistro').value.trim();
        var apellidos = document.getElementById('apellidosRegistro').value.trim();
        var correo = document.getElementById('CorreoE').value.trim();
        var username = document.getElementById('usernameId').value.trim();
        var password = document.getElementById('passwordRegistro').value.trim();
        var confirmarPassword = document.getElementById('passwordRegistro2').value.trim();
        var fechaNacimiento = document.getElementById('fechaNacimiento').value.trim();
        var sexo = document.getElementById('sexo').value;
        // var dispositivo = document.getElementById('dispositivo').value.trim();

        // Validar longitud máxima del nombre
        if (nombre.length > 50) {
            alert('El nombre no puede tener más de 50 caracteres');
            return false;
        }
        if (apellidos.length < 2){
            alert('Los apellidos no pueden contener menos de 2 caracteres');
            return false;
        }

        // Validar formato de correo electrónico
        var correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
            alert('Por favor, introduce una dirección de correo electrónico válida');
            return false;
        }

        // Validar que el username empiece con "@"
        if (!username.startsWith('@')) {
            alert('El nombre de usuario debe empezar con "@"');
            return false;
        }

        // Validar contraseña
        var contrasenaRegex = /^(?=.*[A-Z]).{8,}$/;
        if (!contrasenaRegex.test(password)) {
            alert('La contraseña debe tener al menos una mayúscula y ser de longitud 8 o más');
            return false;
        }

        // Validar coincidencia de contraseña y confirmación de contraseña
        if (password !== confirmarPassword) {
            alert('Las contraseñas no coinciden');
            return false;
        }

        // Validar fecha de nacimiento
        var fechaNac = new Date(fechaNacimiento);
        var fechaActual = new Date();
        if (fechaNac >= fechaActual) {  // Cambiado ">" por ">=" para permitir fechas de nacimiento iguales al día actual
            alert('La fecha de nacimiento no puede ser en el futuro o igual al día actual');
            return false;
        }

        // Validar selección de género
        if (sexo === "") {
            alert('Por favor, selecciona tu género');
            return false;
        }
        // if(dispositivo === ""){
        //     alert('Por favor, selecciona tu dispositivo');
        //     return false;
        // }

        return true;
    }

        
    function registrarUsuario() {
        var formData = $('#registroForm').serialize();

        $.ajax({
            type: 'POST',
            url: 'conex.php',
            data: formData,
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log(error);
                alert('Error al procesar la solicitud.');
            }
        });
    }


    //FIN REGISTRO
    


    //INICIO SESION

    document.addEventListener('DOMContentLoaded', function () {
        var formularioInicio = document.getElementById('loginForm');

        if (formularioInicio) {
            formularioInicio.addEventListener('submit', function (event) {
                event.preventDefault();
                if (validarFormularioInicio() && verificarUsuario()) {
                    var usernameValue = document.getElementById('usernameInicio').value.trim();
                    localStorage.setItem('username', usernameValue);
                    mostrarNombreUsuarioEnHeader(usernameValue);
                    mostrarNav();
                }
            });
        }
    });


    function validarFormularioInicio() {
        var username = document.getElementById('usernameInicio').value.trim();
        var password = document.getElementById('passwordInicio').value.trim();
        if (!username.startsWith('@')) {
            alert('El nombre de usuario debe empezar con "@"');
            return false;
        }  
         var contrasenaRegex = /^(?=.*[A-Z]).{8,}$/;
        if (!contrasenaRegex.test(password)) {
            alert('La contraseña debe tener al menos una mayúscula y ser de longitud 8 o más');
            return false;
        }
        return true;
    }


    function cerrarSesion() {
       
        localStorage.removeItem('username');
    
        // Cerrar el menú desplegable 
        var menuDesplegable = document.getElementById('userDropdown');
        if (menuDesplegable) {
            var instanciaMenu = bootstrap.Dropdown.getInstance(menuDesplegable);
            if (instanciaMenu) {
                instanciaMenu.hide();
            }
        }
  
        mostrarNombreUsuarioEnHeader("");
    
        ocultarElementosEnCierreSesion();
    }
    
    function ocultarElementosEnCierreSesion() {
        var elementosParaOcultar = document.querySelectorAll('.hide-on-logout');
        elementosParaOcultar.forEach(function (elemento) {
            elemento.style.display = 'none';
        });
    
        var elementosParaMostrar = document.querySelectorAll('.show-on-logout');
        elementosParaMostrar.forEach(function (elemento) {
            elemento.style.display = 'block';
        });
    }
    

    function mostrarNombreUsuarioEnHeader(username) {
        var usernameDisplay = document.getElementById('usernameDisplay');

        if (username) {
            usernameDisplay.textContent = username;
        } else {
            usernameDisplay.textContent = '  ';
        }
    }
    function verificarUsuario() {
        var formData = $('#loginForm').serialize();
    
        $.ajax({
            type: 'POST',
            url: 'conexInicio.php',
            data: formData,
            success: function (response) {
                console.log(response);
                if (response === 'exite') {
                    alert("Usuario Conectado con exito");
                }
            },
            error: function (xhr, status, error) {
        
                console.log(xhr.responseText);
                alert('Error al procesar la solicitud. Detalles: ' + xhr.responseText);
            }
        });
    
 
        return true;
    }

    // Inicializar el nombre de usuario 
    mostrarNombreUsuarioEnHeader(localStorage.getItem('username'));

    function mostrarNav(username) {
        var tabs = document.querySelectorAll('.tablinks');
    
        tabs.forEach(function (tab) {
            if (username) {
                tab.style.display = 'block'; 
            } else {
                if (tab.classList.contains('hide-on-logout')) {
                    tab.style.display = 'block'; 
                }
            }
        });
    }
        function modificarUsuario() {
            // Obtener los valores de los campos del formulario
            var username = $('#modifyUsername').val();
            var newname = $('#newname').val();
            var newapellidos = $('#newapellidos').val();
            var newEmail = $('#newEmail').val();
            var newPassword = $('#newPassword').val();
            var confirmNewPassword = $('#newconfirmNewPassword').val();
            var newfechaNacimiento = $('#newfechaNacimiento').val();
            var newsexo = $('#newsexo').val();
        
            var correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
            // Validaciones
            if (!username.startsWith('@')) {
                alert('El nombre de usuario debe empezar con "@"');
                return false;
            }
        
            if (!correoRegex.test(newEmail)) {
                alert('Por favor, introduce una dirección de correo electrónico válida');
                return false;
            }
        
            if (newPassword.length < 8) {
                alert('La contraseña debe tener al menos 8 caracteres');
                return false;
            }
        
            if (newPassword !== confirmNewPassword) {
                alert('Las contraseñas no coinciden');
                return false;
            }
            
        // Validar fecha de nacimiento
        var fechaNac = new Date(fechaNacimiento);
        var fechaActual = new Date();
        if (fechaNac >= fechaActual) {  // Cambiado ">" por ">=" para permitir fechas de nacimiento iguales al día actual
            alert('La fecha de nacimiento no puede ser en el futuro o igual al día actual');
            return false;
        }

        // Validar selección de género
        if (newsexo === "") {
            alert('Por favor, selecciona tu género');
            return false;
        }

        
            $.ajax({
                type: 'POST',
                url: 'conexGetionDatos.php',
                data: {
                    accion: 'modificarUsuario',
                    username: username,
                    newname: nombre ,
                    newapellidos: apellidos,
                    newEmail: coreeo,
                    newPassword: contrasena,
                    newfechaNacimiento: fechaNacimiento,
                    newsexo: sexo,
                    newdispositivos: dispositivos,
                    newfrecuencia: frecuencia
                },
                success: function (response) {
                    console.log(response);
                    alert('Usuario modificado con éxito');
        
                    // Ocultar la modal después de una operación
                    $('#modifyUserModal').modal('hide');
                },
                error: function (error) {
                    console.log(error);
                    alert('Error al procesar la solicitud.');
                }
            });
        }
        
    //FIN MODIFICAR USUARIO

    // DARSE DE BAJA 

    function confirmarDarseDeBaja() {
        var confirmacion = confirm('¿Estas seguro de que deseas darte de baja?');
        if (confirmacion) {
            darseDeBaja();
        }
    }
    
    function darseDeBaja() {
        var usernameActual = localStorage.getItem('username');
    
        $.ajax({
            type: 'POST',
            url: 'conex.php',
            data: { 
                accion: 'darseDeBaja', 
                username: usernameActual 
            },
            success: function (response) {
                if (response === 'success') {
                    cerrarSesion();
                } else {
                    alert(response); 
                }
            },
            error: function (error) {
                console.log(error);
                alert('Error al procesar la solicitud.');
            }
        });
    }
    //CONSULTAR TABLA PUNTOS

    $(document).ready(function () {
        $('#btnConsultarPuntosAT').on('click', function () {
            $.ajax({
                type: 'GET',
                url: 'conexat.php',
                dataType: 'json',
                success: function (data) {
                    $('#tablaPuntosAT tbody').empty();
    
                    for (var i = 0; i < data.length; i++) {
                        var row = '<tr><td>' + data[i].username + '</td><td>' + data[i].puntos_at + '</td></tr>';
                        $('#tablaPuntosAT tbody').append(row);
                    }
                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert('Error al procesar la solicitud. Detalles: ' + xhr.responseText);
       
                }
            });
        });
    });
    

    //FIN INICIO

    function cargarTablaUsuarios() {
        $.ajax({
            type: 'GET',
            url: 'conexGestionUsuarios.php',
            dataType: 'json',
            success: function (data) {
                // Limpiar la tabla antes de cargar nuevos datos
                $('#tablaUsuarios').DataTable().clear().destroy();
    
                // Construir la tabla utilizando DataTables
                $('#tablaUsuarios').DataTable({
                    data: data,
                    columns: [
                        { data: 'nombre' },
                        { data: 'apellidos' },
                        { data: 'correo' },
                        { data: 'username' },
                        { data: 'fecha_nacimiento' },
                        { data: 'contrasena'},
                        { data: 'sexo' },
         
                        {
                            data: null,
                            render: function (data, type, row) {
                                return '<button onclick="modificarUsuario(\'' + row.username + '\')">Modificar</button>' +
                                    '<button onclick="eliminarUsuario(\'' + row.username + '\')">Eliminar</button>';
                            }
                        }
                    ]
                });
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
                alert('Error al cargar la tabla de usuarios. Detalles: ' + xhr.responseText);
            }
        });
    }
    
    // Llamar a la función cuando la página esté lista
    $(document).ready(function () {
        cargarTablaUsuarios();
    });


    //INICIO ADMINISTRACION JSON
    // Función para cargar y mostrar los datos del juego seleccionado
    window.onload = function () {
        const tipoJuegoElement = document.getElementById('tipoJuego');
        console.log(tipoJuegoElement);
        if (tipoJuegoElement) {
            tipoJuegoElement.addEventListener('change', function () {
                const tipoJuego = this.value;
                fetch('admin.json')
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
    