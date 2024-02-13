
    //MOSTRAR TABLA PUNTOS 
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
    