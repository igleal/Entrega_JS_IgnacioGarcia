import { modalCarrito } from "./factura.js";
import { modalHistorial } from "./modalHistorial.js";

/* Conexion a la bd */

const leerBdd = async () => {
  const URL = "./db/bd.json";
  const mensajeError = "<span>Falla de la conexion al Servidor..</span>";
  let renderizar = ``;

  try {
    const respuesta = await fetch(URL);
    const datos = await respuesta.json();
    mostrarBdd(datos);
  } catch (err) {
    renderizar = mensajeError;
    document.body.innerHTML = renderizar;
  }
};

leerBdd();

/* Renderizo el contenidor con el id en el HTML */

const contenedorPrincipal = document.getElementById("contenedor_principal");
contenedorPrincipal.className = `bg-lime-100 flex flex-col items-center`;

function contenedorNavegacion() {
  const divBotones = document.createElement("div");
  divBotones.className = `w-screen flex items-center justify-between bg-lime-300 p-4`;
  divBotones.innerHTML = `
  <button class="historialCompras bg-lime-400 hover:bg-lime-600 p-2 rounded-lg text-sm">Historial</button>
  <button class="carritoCompras bg-lime-400 hover:bg-lime-600 p-2 rounded-lg text-sm">Ver Carrito</button>
  `;

  contenedorPrincipal.appendChild(divBotones);
}

contenedorNavegacion();

/* Funciones para abrir el modal de Carrito y Historial que estoy importado de mi otro archivo js */

function abrirModalCarrito() {
  const botonCarrito = document.querySelector("button.carritoCompras");

  botonCarrito.addEventListener("click", () => {
    modalCarrito(contenedorPrincipal);
  });
}
abrirModalCarrito();

function abrirModalHistorial() {
  const botonHistorial = document.querySelector("button.historialCompras");

  botonHistorial.addEventListener("click", () => {
    modalHistorial(contenedorPrincipal);
  });
}
abrirModalHistorial();

/* Funcion que renderiza las bedidas de la bd */

function mostrarBdd(datoBebidas) {
  const divBedida = document.createElement("div");
  divBedida.className = `flex flex-wrap justify-center gap-4 pt-4`;

  datoBebidas.forEach((bebida) => {
    const articleBebida = document.createElement("article");
    articleBebida.className =
      "bg-indigo-200 shadow-md rounded-lg p-4 min-w-sm max-w-sm";

    articleBebida.innerHTML = `
    <img src=".${bebida.imagen}" alt="${bebida.alt}" class="max-w-sm h-48 object-cover rounded-t-lg mb-4 block mx-auto">
    <h2 class="text-xl font-semibold text-gray-800 mb-2">${bebida.nombre}</h2>
    <h3 class="text-gray-800 text-sm mb-4 font-semibold">${bebida.precio} $</h3>
    <button id="${bebida.id}"class="botonModal px-4 py-2 rounded-lg bg-lime-400 hover:bg-lime-600 duration-600 text-sm">Agregar</button>`;

    divBedida.appendChild(articleBebida);
  });
  contenedorPrincipal.appendChild(divBedida);
  abrirModalBebida(datoBebidas);
}

/* Funcion que renderiza el modal de agregar bebidas al localStorage */

function abrirModalBebida(datoBebidas) {
  const modalBoton = document.querySelectorAll("button.botonModal");

  modalBoton.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const idBebida = e.currentTarget.id;
      const bebidaSelecionada = datoBebidas.find(
        (bebida) => bebida.id == idBebida
      );
      const detallesBebida = {
        ...bebidaSelecionada,
        cantidad: 1,
      };
      if (detallesBebida) {
        modalBebida(detallesBebida);
      }
    });
  });
}

function modalBebida(detallesBebida) {
  const modalFondo = document.createElement("div");
  modalFondo.className =
    "fixed w-full h-full bg-black/40 flex items-center justify-center cerrarModal";

  const modalInfo = document.createElement("div");
  modalInfo.className = "bg-indigo-200 shadow-md rounded-lg w-[500px] p-4";

  modalInfo.innerHTML = `
    <button class="cerrarModal rounded-lg bg-red-500 hover:bg-red-800 text-white px-4 py-2 font-semibold mb-3">Cerrar</button>

  <div>
    <img src="${detallesBebida.imagen}" alt="${
    detallesBebida.alt
  }" class="max-w-sm h-48 object-cover rounded-t-lg mb-4 block mx-auto">
  </div>

  <div class="flex flex-col w-full px-4 bg-white p-2 rounded-lg">

    <div class"text-gray-800"">
      <h2>${detallesBebida.nombre}</h2>
      <p>${detallesBebida.descripcion}</p>
      <span class="">Precio unid. $ ${detallesBebida.precio}</span>
    </div>

    <div class="flex gap-16 py-4">
      <span class="totalCantidad">Unids. ${detallesBebida.cantidad}</span>
      <span class="precioCantidad">Precio Total. ${precioTotal(
        detallesBebida
      )}</span>
    </div>

    <div class="flex justify-between">
      <div class="flex items-center gap-4">
        <button class="cantidadResta rounded-lg bg-yellow-500 hover:bg-yellow-800 px-2 py-1 text-white font-bold">-</button>
        <p class="cantidadTotal text-gray-800">${detallesBebida.cantidad}</p>
        <button class="cantidadSuma rounded-lg bg-green-500 hover:bg-green-800 px-2 py-1 text-white font-bold">+</button>
      </div>
      <button class="agregarFactura rounded-lg bg-green-500 hover:bg-red-800 text-white px-4 py-2 font-semibold">Agregar</button>
    </div>

  </div>`;

  modalFondo.appendChild(modalInfo);
  contenedorPrincipal.appendChild(modalFondo);

  cerrarModal(modalFondo);
  agregarCarrito(detallesBebida, modalFondo);
  cantidad(detallesBebida);
}

/* Funciones para cerrar y agregar al carrito */

function cerrarModal(modalFondo) {
  modalFondo.addEventListener("click", (e) => {
    const cerrarModalDivInfo = e.target.matches("button.cerrarModal");
    const cerrarModalDivFondo = e.target === modalFondo;
    if (cerrarModalDivInfo || cerrarModalDivFondo) {
      modalFondo.remove();
    }
  });
}

function agregarCarrito(detallesBebida, modalFondo) {
  const agregar = document.querySelector("button.agregarFactura");

  agregar.addEventListener("click", () => {
    const bebidasGuardadas =
      JSON.parse(localStorage.getItem("bebidaStorage")) || [];

    const verificaBebida = bebidasGuardadas.find(
      (bsGuardada) => bsGuardada.id === detallesBebida.id
    );

    if (verificaBebida) {
      verificaBebida.cantidad += detallesBebida.cantidad;
    } else {
      bebidasGuardadas.push(detallesBebida);
    }
    localStorage.setItem("bebidaStorage", JSON.stringify(bebidasGuardadas));

    modalFondo.remove();

    Toastify({
      text: "Compra Agregada",
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

function precioTotal(detallesBebida) {
  const precio = parseFloat(detallesBebida.precio);
  const cantidad = parseFloat(detallesBebida.cantidad);
  const totalPrecio = precio * cantidad;

  return totalPrecio.toLocaleString("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

/* Funcion de aumentar o dismuir cantidad de bebidas en el modal */

function cantidad(detallesBebida) {
  const total = document.querySelector("p.cantidadTotal");
  const precioCantidad = document.querySelector("span.precioCantidad");
  const totalCantidad = document.querySelector("span.totalCantidad");

  const botonResta = document.querySelector("button.cantidadResta");
  const botonSuma = document.querySelector("button.cantidadSuma");

  botonResta.addEventListener("click", () => {
    if (detallesBebida.cantidad > 1) {
      detallesBebida.cantidad--;
      total.innerHTML = detallesBebida.cantidad;
      totalCantidad.innerHTML = `Unids. ${detallesBebida.cantidad}`;
      precioCantidad.innerHTML = `Precio Total. ${precioTotal(detallesBebida)}`;
    }
  });

  botonSuma.addEventListener("click", () => {
    detallesBebida.cantidad++;
    total.innerHTML = detallesBebida.cantidad;
    totalCantidad.innerHTML = `Unids. ${detallesBebida.cantidad}`;
    precioCantidad.innerHTML = `Precio Total. ${precioTotal(detallesBebida)}`;
  });
}
