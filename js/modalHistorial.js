/* Funcion para mostrar si hay algo en el localstorage o no */

export function modalHistorial(contenedorPrincipal) {
  const facturaHistorial = localStorage.getItem("StorageFacturas");

  if (facturaHistorial !== null && facturaHistorial !== "") {
    const modalFacturas = JSON.parse(facturaHistorial);
    if (modalFacturas.length > 0) {
      modalFacturasHistorial(modalFacturas, contenedorPrincipal);
      /* console.log(modalFacturas); */
    } else {
      mensajeError();
    }
  } else {
    mensajeError();
  }
}

/* Funcion de mensaje que se muestra sino hay nada en localStorage */

function mensajeError() {
  Toastify({
    text: "No hay nada en el Historial.",
    duration: 1500,
    gravity: "top",
    position: "right",
    offset: {
      y: 60,
    },
    style: {
      backgroundColor: "#34d399",
    },
  }).showToast();
}

/* Funcion que renderiza el contenido del localStorage cuando hay facturas generadas en este */

function modalFacturasHistorial(modalFacturas, contenedorPrincipal) {
  const modalFondo = document.createElement("div");
  modalFondo.className =
    "fixed w-full h-full bg-black/40 flex items-center justify-center cerrarModal";

  const modalDetalles = document.createElement("div");
  modalDetalles.className =
    "w-[700px] max-h-[500px] bg-indigo-200 shadow-md rounded-lg overflow-y-auto px-6";
  modalDetalles.innerHTML = `
  <div class="flex justify-between py-4">
  <span class="text-xl font-bold text-gray-800">Historial de Facturas</span>
  <button class="cerrarModal rounded-lg bg-red-500 hover:bg-red-800 p-2 text-sm font-bold text-white">Cerrar</button>
  </div>`;

  modalFacturas.forEach((factura) => {
    const facturaInfo = document.createElement("article");
    facturaInfo.className =
      "flex items-center justify-between gap-8 bg-white shadow-md rounded-lg p-4 max-w-3xl p-2 mb-4";
    facturaInfo.innerHTML = `
    <h2>Forma de Pago: ${factura.forma_de_pago}</h2>
    <span>Precio Total: ${factura.detalles_factura.precioTotal}</span>`;

    modalDetalles.appendChild(facturaInfo);
  });

  modalFondo.appendChild(modalDetalles);
  contenedorPrincipal.appendChild(modalFondo);

  cerrarModalCarrito(modalFondo);
}

function cerrarModalCarrito(modalFondo) {
  modalFondo.addEventListener("click", (e) => {
    const cerrarModalBoton = e.target.matches("button.cerrarModal");
    const cerrarModalFondo = e.target === modalFondo;
    if (cerrarModalBoton || cerrarModalFondo) {
      modalFondo.remove();
    }
  });
}