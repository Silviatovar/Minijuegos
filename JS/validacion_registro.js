//REGISTRO

document.addEventListener('DOMContentLoaded', function () {
    var formulario = document.getElementById('registroForm'); // Asegúrate de tener un formulario con el id 'registroForm'
    if (formulario) {
        formulario.addEventListener('submit', function (event) {
            event.preventDefault();
            if (validarFormulario()) {
                registrarUsuario();
                console.log('Usuario registrado exitosamente');
                alert('Usuario registrado exitosamente');

            } else {
                console.log('Error al registrar el usuario');
            
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
        // var frecuenciaSelecionada = obtenerValorRadio('frecuencia');
       
        // if (!frecuenciaSelecionada) {
        //     alert('Por favor, selecciona su frecuencia');
        //     return false;
        // }

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

    // function obtenerValorRadio(frecuencia) {
    //     var opciones = document.getElementsByName(frecuencia);
    
    //     for (var i = 0; i < opciones.length; i++) {
    //         if (opciones[i].checked) {
    //             return opciones[i].value;
    //         }
    //     }
    
    //     return null; // Ninguna opción seleccionada
    // }


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
    