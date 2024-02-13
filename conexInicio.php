<?php
$valorUsuario = $_POST["username"];
$valorPassword = $_POST["password"];

$servername = "127.0.0.1";
$database = "sala_minijuegos";
$username = "root";
$password = "";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT username, contrasena FROM usuarios WHERE username = '$valorUsuario' AND contrasena = '$valorPassword'";

$result = $conn->query($sql);

if ($result->num_rows == 1) {
  echo "existe";
} else {
  echo "no existe";
}

$conn->close();
?>
