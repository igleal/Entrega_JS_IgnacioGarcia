/* Funcion para mostrar si hay algo en el localstorage o no */

export function modalCarrito(contenedorPrincipal) {
  const storageBebidas = localStorage.getItem("bebidaStorage");

  if (storageBebidas !== null && storageBebidas !== "") {
    const carritoStorage = JSON.parse(storageBebidas);
    if (carritoStorage.length > 0) {
      modalInfoCarrito(carritoStorage, contenedorPrincipal);
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
    text: "No hay nada en el Carrito.",
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

/* Funcion que renderiza el contenido del localStorage cuando hay bebidas en este */

function modalInfoCarrito(carritoStorage, contenedorPrincipal) {
  const modalFondo = document.createElement("div");
  modalFondo.className =
    "fixed w-full h-full bg-black/40 flex items-center justify-center cerrarModal";

  const modalDetalles = document.createElement("div");
  modalDetalles.className =
    "w-[700px] max-h-[500px] bg-indigo-200 shadow-md rounded-lg overflow-y-auto px-6";
  modalDetalles.innerHTML = `
  <div class="flex justify-between py-4">
  <span class="text-xl font-bold text-gray-800">Tus Pedidos</span>
  <button class="cerrarModal rounded-lg bg-red-500 hover:bg-red-800 p-2 text-sm font-bold text-white">Cerrar</button>
  </div>`;

  carritoStorage.forEach((bebida) => {
    const modalInfo = document.createElement("article");
    modalInfo.className =
      "flex items-center justify-between gap-8 bg-white shadow-md rounded-lg p-4 max-w-3xl p-2 mb-4";
    modalInfo.innerHTML = `
    <img src="..${bebida.imagen}" alt="${
      bebida.alt
    }" class="w-30 h-30 object-cover rounded">
    
    <h2 class="text-xl font-extralight text-gray-800">${bebida.nombre}</h2>

    <h3 class="text-lg font-medium text-gray-800">${bebida.precio} $</h3>
    <span class="precioCantidadBebidas" text-lg text-gray-800 font-medium">${bebidasPrecioCantidad(
      bebida
    )}</span>
    
    <div class="flex items-center gap-2">
        <button id="${
          bebida.id
        }" class="botonResta rounded-lg bg-yellow-500 hover:bg-yellow-800 px-2 py-1 text-white font-bold">-</button>
        <span class="contador text-gray-800">${bebida.cantidad}</span>
        <button id="${
          bebida.id
        }" class="botonSuma rounded-lg bg-green-500 hover:bg-green-800 px-2 py-1 text-white font-bold">+</button>
        <button id="${
          bebida.id
        }" class="botonEliminar rounded-lg bg-red-500 hover:bg-red-800 px-2 py-1 text-white font-bold">Eliminar</button>
    </div>`;

    modalDetalles.appendChild(modalInfo);
  });
  modalFondo.appendChild(modalDetalles);
  contenedorPrincipal.appendChild(modalFondo);

  const footerCarrito = contenerdorFooterCarrito(carritoStorage);
  modalDetalles.appendChild(footerCarrito);

  eliminarFactura(carritoStorage, modalFondo);
  restaBebida(carritoStorage);
  sumaBebida(carritoStorage);
  cerrarModalCarrito(modalFondo);
  limpiarBoton(modalFondo);

  botonFinalizarCompra(modalDetalles, modalFondo, carritoStorage);
}

function contenerdorFooterCarrito(carritoStorage) {
  const footerCarrito = document.createElement("div");
  footerCarrito.className = "flex flex-col gap-4 py-6";

  footerCarrito.innerHTML = `
    <div class="flex justify-between">
      <span class="text-sm text-gray-800 font-bold">Precio Total</span>
      <span class="carritoPrecioTotal text-sm text-gray-800 font-bold">${carritoTotal(
        carritoStorage
      )}</span>
    </div>

    <div class="flex justify-between">
      <button class="finalizarCompra rounded-lg bg-green-500 hover:bg-green-800 text-white px-4 py-2 font-semibold">Finalizar Compra</button>
      <button class="limpiarCarrito rounded-lg bg-red-500 hover:bg-red-800 text-white px-4 py-2 font-semibold">Borrar Carrito</button>
    </div>`;

  return footerCarrito;
}

/* Funciones de los botones de las bebidas en el carrito */

function eliminarFactura(carritoStorage, modalFondo) {
  const botonEliminar = document.querySelectorAll("button.botonEliminar");
  const precioTotalId = document.querySelector("span.carritoPrecioTotal");

  botonEliminar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const idFactura = e.currentTarget.id;

      const facturaSelecionado = carritoStorage.findIndex(
        (bebida) => bebida.id == idFactura
      );

      if (facturaSelecionado !== -1) {
        carritoStorage.splice(facturaSelecionado, 1);
        localStorage.setItem("bebidaStorage", JSON.stringify(carritoStorage));
        boton.closest("article").remove();

        Toastify({
          text: "Bebida Eliminada",
          duration: 1500,
          gravity: "top",
          position: "right",
          offset: {
            y: 60,
          },
          style: {
            backgroundColor: "#f87171",
          },
        }).showToast();
        if (carritoStorage.length === 0) {
          modalFondo.remove();
        }
      }
      precioTotalId.innerHTML = carritoTotal(carritoStorage);
    });
  });
}

function restaBebida(carritoStorage) {
  const botonResta = document.querySelectorAll("button.botonResta");

  botonResta.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const idFactura = e.currentTarget.id;

      const facturaSelecionado = carritoStorage.findIndex(
        (bebida) => bebida.id == idFactura
      );

      if (facturaSelecionado !== -1) {
        if (carritoStorage[facturaSelecionado].cantidad > 1) {
          carritoStorage[facturaSelecionado].cantidad--;

          Toastify({
            text: "Bebida Actualizada",
            duration: 1500,
            gravity: "top",
            position: "right",
            offset: {
              y: 60,
            },
            style: {
              backgroundColor: "#f87171",
            },
          }).showToast();
        } /* else {
          bebidasGuardadas.splice(facturaSelecionado, 1);
          const bebida = document.querySelector("article");
        } */

        localStorage.setItem("bebidaStorage", JSON.stringify(carritoStorage));

        contador(e.currentTarget, carritoStorage, facturaSelecionado);
      }
    });
  });
}

function sumaBebida(carritoStorage) {
  const botonSuma = document.querySelectorAll("button.botonSuma");

  botonSuma.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const idFactura = e.currentTarget.id;

      const facturaSelecionado = carritoStorage.findIndex(
        (bebida) => bebida.id == idFactura
      );

      if (facturaSelecionado !== -1) {
        if (carritoStorage[facturaSelecionado].cantidad) {
          carritoStorage[facturaSelecionado].cantidad++;

          Toastify({
            text: "Bebida Actualizada",
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
        localStorage.setItem("bebidaStorage", JSON.stringify(carritoStorage));
      }

      contador(e.currentTarget, carritoStorage, facturaSelecionado);
    });
  });
}

function contador(ecurrentTarget, carritoStorage, facturaSelecionado) {
  const article = ecurrentTarget.closest("article");
  const precioCantidad = ecurrentTarget.closest("article");

  if (article) {
    const contador = article.querySelector("span.contador");
    const cantidadPrecio = precioCantidad.querySelector(
      "span.precioCantidadBebidas"
    );
    const precioTotalId = document.querySelector("span.carritoPrecioTotal");

    if (contador && cantidadPrecio && precioTotalId) {
      contador.innerText = carritoStorage[facturaSelecionado].cantidad;
      cantidadPrecio.innerHTML = bebidasPrecioCantidad(
        carritoStorage[facturaSelecionado]
      );
      precioTotalId.innerHTML = carritoTotal(carritoStorage);
    }
  }
}

function bebidasPrecioCantidad(bebida) {
  const precio = parseFloat(bebida.precio);
  const cantidad = parseFloat(bebida.cantidad);
  const totalPrecio = precio * cantidad;

  return totalPrecio.toLocaleString("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

function carritoTotal(carritoStorage) {
  const precioTotal = carritoStorage.reduce((totalAcumalado, bebida) => {
    const precio = parseFloat(bebida.precio);
    const cantidad = parseFloat(bebida.cantidad);
    return totalAcumalado + precio * cantidad;
  }, 0);

  return precioTotal;
}

/* Funciones del carrito como precio total, cerrar, comprar y limpiar */

function cerrarModalCarrito(modalFondo) {
  modalFondo.addEventListener("click", (e) => {
    const cerrarModalBoton = e.target.matches("button.cerrarModal");
    const cerrarModalFondo = e.target === modalFondo;
    if (cerrarModalBoton || cerrarModalFondo) {
      modalFondo.remove();
    }
  });
}

function limpiarBoton(modalFondo) {
  const boton = modalFondo.querySelector("button.limpiarCarrito");
  boton.addEventListener("click", () => {
    localStorage.removeItem("bebidaStorage");
    modalFondo.remove();

    Toastify({
      text: "Se ha limpiado el carrito",
      duration: 1500,
      gravity: "top",
      position: "right",
      offset: {
        y: 60,
      },
      style: {
        backgroundColor: "#f87171",
      },
    }).showToast();
  });
}

function botonFinalizarCompra(modalDetalles, modalFondo, carritoStorage) {
  const modalFinalizarCompra = document.querySelector("button.finalizarCompra");
  modalFinalizarCompra.addEventListener("click", () => {
    if (modalDetalles && modalDetalles.remove) {
      modalDetalles.remove();
    }
    abrirModalFinalizarCompra(modalFondo, carritoStorage);
  });
}

function abrirModalFinalizarCompra(modalFondo, carritoStorage) {
  const modalFinalizarCompra = document.createElement("div");
  modalFinalizarCompra.className =
    "fixed w-full h-full bg-black/40 flex items-center justify-center cerrarModal";
  modalFinalizarCompra.innerHTML = `
  <div class="w-[400px] rounded-lg bg-indigo-200 p-6">
    <div class="flex justify-between items-center py-4">
      <h2 class="text-xl font-bold text-gray-800">Finalizar Comprar</h2>
      <button class="cerrarModal rounded-lg bg-red-500 hover:bg-red-800 p-2 text-sm font-bold text-white">Cerrar</button>
    </div>
    <form id="formComprar" class="space-y-4">
    <input type="text" name="nombre" placeholder="Nombre" required class="w-full rounded-lg border p-2 bg-white">
    <input type="text" name="apellido" placeholder="Apellido" required class="w-full rounded-lg border p-2 bg-white">
    <select name="formaPago" required class="w-full rounded border p-2 bg-white">
      <option value="">Selecciona una forma de pago</option>
      <option value="efectivo">Efectivo</option>
      <option value="tarjeta">Tarjeta</option>
    </select>
    <div class="flex flex-col justify-center gap-2">
      <span class="text-xl font-bold text-gray-800">Precio Total $ ${carritoTotal(
        carritoStorage
      )}</span>
    </div>
    <div class="flex justify-center gap-4">
      <button class="rounded-lg bg-green-500 hover:bg-green-800 text-white px-4 py-2 font-semibold">Finalizar Comprar</button>
      <button class="rounded-lg bg-red-500 hover:bg-red-800 text-white px-4 py-2 font-semibold">Volver al Carrito</button>
    </div>
    </fomr>
  </div>`;

  modalFondo.appendChild(modalFinalizarCompra);
  comprarFactura(modalFinalizarCompra, carritoStorage, modalFondo);
}

function comprarFactura(modalFinalizarCompra, carritoStorage, modalFondo) {
  const precioTotal = carritoTotal(carritoStorage);
  const formularioCompra = modalFinalizarCompra.querySelector("#formComprar");
  formularioCompra.addEventListener("submit", (e) => {
    e.preventDefault();

    const facturaCompra = {
      nombre: formularioCompra.nombre.value,
      apellido: formularioCompra.apellido.value,
      forma_de_pago: formularioCompra.formaPago.value,
      detalles_factura: {
        articulos_comprados: carritoStorage,
        precioTotal,
      },
    };

    const facturaLocal =
      JSON.parse(localStorage.getItem("StorageFacturas")) || [];
    facturaLocal.push(facturaCompra);
    localStorage.setItem("StorageFacturas", JSON.stringify(facturaLocal));

    localStorage.removeItem("bebidaStorage");
    modalFinalizarCompra.remove();
    modalFondo.remove();

    Toastify({
      text: "Compra realizada con exito",
      duration: 1500,
      gravity: "top",
      position: "right",
      offset: {
        y: 60,
      },
      style: {
        backgroundColor: "#f87171",
      },
    }).showToast();
  });
}
