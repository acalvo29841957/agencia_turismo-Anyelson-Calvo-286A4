<?php
$conexion = new mysqli("localhost", "root", "", "agencia_turismo");

if ($conexion->connect_error) {
  die("Error de conexión: " . $conexion->connect_error);
}

$destinos = $_POST['destino']; // Ej: "Mérida, Canaima"
$precio_total = $_POST['precio'];
$fecha_reserva = $_POST['fecha_reserva'];
$fecha_viaje = $_POST['fecha_viaje'];
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$cedula = $_POST['cedula'];
$telefono = $_POST['telefono'];
$cantidad = $_POST['cantidad_personas'];

$sql = "INSERT INTO agencia_turismo (
          destino, precio, fecha_reserva, fecha_viaje,
          nombre, apellido, cedula, telefono, cantidad_personas
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);
$stmt->bind_param(
  "sdssssssi",
  $destinos, $precio_total, $fecha_reserva, $fecha_viaje,
  $nombre, $apellido, $cedula, $telefono, $cantidad
);

if ($stmt->execute()) {
  echo "<script>alert('✅ Reserva registrada exitosamente.'); window.location.href='index.php';</script>";
} else {
  echo "❌ Error al registrar la reserva: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>
