let carrito = [];
let mostrandoFormulario = false;

function agregarDestino(nombre, precio, imagen) {
  carrito.push({ nombre, precio, imagen });
  actualizarCarrito();
  mostrarCarrito();
}

function eliminarDestino(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("detalleDestino");
  lista.innerHTML = "";

  let total = 0;

  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item-carrito";

    const img = document.createElement("img");
    img.src = item.imagen;
    img.alt = item.nombre;
    img.className = "imagen-carrito";

    const info = document.createElement("p");
    info.innerHTML = `<strong>${item.nombre}</strong> - $${item.precio}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => eliminarDestino(index);

    div.appendChild(img);
    div.appendChild(info);
    div.appendChild(btnEliminar);
    lista.appendChild(div);

    total += item.precio;
  });

  document.getElementById("contadorCarrito").textContent = carrito.length;

  // Actualizar campos ocultos del formulario
  document.getElementById("formDestino").value = carrito.map(d => d.nombre).join(", ");
  document.getElementById("formPrecio").value = total.toFixed(2);

  // Mostrar u ocultar formulario según estado
  document.getElementById("formularioCompra").style.display = mostrandoFormulario ? "block" : "none";
  document.getElementById("botonesCarrito").style.display = mostrandoFormulario ? "none" : "block";
}

function mostrarCarrito() {
  document.getElementById("modalCarrito").style.display = "block";
  mostrandoFormulario = false;
  actualizarCarrito();
}

function cerrarCarrito() {
  document.getElementById("modalCarrito").style.display = "none";
}

function añadirOtroDestino() {
  mostrandoFormulario = false;
  cerrarCarrito();
}

function irAPagar() {
  mostrandoFormulario = true;
  actualizarCarrito();
}
