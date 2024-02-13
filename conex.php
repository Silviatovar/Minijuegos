<?php
$valorUsuario = $_POST["username"];
$valorPassword = $_POST["password"];
$valorNombre = $_POST['nombre'];
$valorApellidos = $_POST['apellidos'];
$valorCorreo = $_POST['CorreoE'];
$valorFechaNacimiento = $_POST['fechaNacimiento'];
$valorSexo = $_POST['sexo'];
// $valorFrecuencia = $_POST['frecuencia'];

$servername = "127.0.0.1";
$database = "sala_minijuegos";
$username = "root";
$password = "";

$conn = new mysqli($servername, $username, $password, $database);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Verificar si el usuario ya existe
$verificarUsuario = $conn->prepare("SELECT username FROM usuarios WHERE username = ?");
$verificarUsuario->bind_param("s", $valorUsuario);
$verificarUsuario->execute();
$verificarUsuario->store_result();

if ($verificarUsuario->num_rows > 0) {
    echo "El usuario ya existe. Por favor, elige otro nombre de usuario.";
} else {
    // El usuario no existe, proceder con la inserción
    $verificarUsuario->close();

    $sql = $conn->prepare("INSERT INTO usuarios (nombre, apellidos, correo, username, contrasena, fecha_nacimiento, sexo) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $sql->bind_param("sssssss", $valorNombre, $valorApellidos, $valorCorreo, $valorUsuario, $valorPassword, $valorFechaNacimiento, $valorSexo);

    if ($sql->execute()) {
      echo "USUARIO REGISTRADO CON ÉXITO";
    } else {
      echo "Error al registrar usuario: " . $sql->error;
    }
}

$conn->close();
?>
