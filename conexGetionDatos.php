<?php
// conexGestionUsuarioDetalles.php

$servername = "127.0.0.1";
$database = "sala_minijuegos";
$username = "root";
$password = "";

// Crea la conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verifica la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Verifica si la solicitud es para obtener detalles del usuario o actualizar
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Obtener detalles del usuario
    $username = $_GET['username'];
    $sql = "SELECT * FROM usuarios WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    } else {
        echo json_encode(['error' => 'Usuario no encontrado']);
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Actualizar detalles del usuario
    $username = $_POST['username'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $correo = $_POST['correo'];
    $passwd = password_hash($_POST['contrasena'], PASSWORD_DEFAULT);
    $fechaNacimiento = $_POST['fechaNacimiento'];
    $sexo = $_POST['sexo'];
    // $dispositivos = $_POST['dispositivos'];
    // $frecuencia = $_POST['frecuencia'];



    $sql = $conn->prepare("UPDATE usuarios SET nombre = ?, apellidos = ?, correo = ?, 
    passwd = ?, fechaNacimiento = ?, sexo = ? WHERE username = ?");
    $sql->bind_param("sssssss", $nombre, $apellidos, $correo, $passwd, $fechaNacimiento, $sexo, $username);
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => 'Usuario actualizado correctamente']);
    } else {
        echo json_encode(['error' => 'Error al actualizar el usuario']);
    }
}

$conn->close();
?>
