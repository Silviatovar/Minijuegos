
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
                            return '<button onclick="modificarUsuario()(\'' + row.username + '\')">Modificar</button>' +
                                '<button onclick="darseDeBaja2()(\'' + row.username + '\')">Eliminar</button>';
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