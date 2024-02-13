



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
                    alert('Usuario conectado con éxito' + '\nBienvenido ' + usernameValue);
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
        // var newdispositivos = $('#newdispositivos').val(); // Agregado
        // var newfrecuencia = $('#newfrecuencia').val(); // Agregado
    
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
        var fechaNac = new Date(newfechaNacimiento); // Corregido
        var fechaActual = new Date();
        if (fechaNac >= fechaActual) {
            alert('La fecha de nacimiento no puede ser en el futuro o igual al día actual');
            return false;
        }
    
        // Validar selección de género
        if (newsexo === "") {
            alert('Por favor, selecciona tu género');
            return false;
        }
    //       // Obtener los valores de los checkboxes de dispositivos
    // if ($('#ordenador').prop('checked')) {
    //     newdispositivos.push('Ordenador');
    // }
    // if ($('#movil').prop('checked')) {
    //     newdispositivos.push('Movil');
    // }

    // var newfrecuencia = $('input[name=opciones]:checked').val();
    
        $.ajax({
            type: 'POST',
            url: 'conexGetionDatos.php',
            data: {
                accion: 'modificarUsuario',
                username: username,
                newname: newname, // Corregido
                newapellidos: newapellidos, // Corregido
                newEmail: newEmail, // Corregido
                newPassword: newPassword,
                newfechaNacimiento: newfechaNacimiento,
                newsexo: newsexo,
                // newdispositivos: newdispositivos, 
                // newfrecuencia: newfrecuencia 
            },
            success: function (response) {
                console.log(response);
                alert('Usuario modificado con éxito');
    
                // Ocultar la modal 
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
        
    function darseDeBaja2() {
        var usernameActual = localStorage.getItem('username');
    
        $.ajax({
            type: 'POST',
            url: 'conexGetionDatos.php',
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





