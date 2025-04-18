/* Aqui va el JS para factura.hmtl */
const facturaContenedor = document.getElementById("facturas_Contenedor");
facturaContenedor.className = `bg-lime-100 flex flex-col items-center`;

const storageBebidas = localStorage.getItem("bebidaStorage");

if (storageBebidas !== null && storageBebidas !== "") {
  facturaStorage = JSON.parse(storageBebidas);
} else {
  mensajeFactura();
}

function mensajeFactura() {
  const mensaje = document.createElement("span");
  mensaje.innerText = `No hay productos, por favor cargue alguna Bebida.`;
  facturaContenedor.appendChild(mensaje);
}

function botonCarta() {
  const cartaBotones = document.createElement("div");
  cartaBotones.className = `p-4`;
  cartaBotones.innerHTML = `
    <a href="" id="limpiarFactura" class="bg-lime-400 hover:bg-lime-600 p-2 rounded-lg text-sm">Limpiar</a>
    <a href="../index.html" class="bg-lime-400 hover:bg-lime-600 p-2 rounded-lg text-sm">Regresar</a>
    `;

  facturaContenedor.appendChild(cartaBotones);
}

botonCarta();

function mostrarFactura(facturaStorage) {
  facturaStorage.forEach((factura) => {
    const contenidoFactura = document.createElement("article");
    contenidoFactura.className = `flex items-center justify-between gap-4 bg-white shadow-md rounded-lg p-4 w-full max-w-3xl mb-4`;
    contenidoFactura.innerHTML = `

    <img src="..${factura.imagen}" alt="${factura.alt}" class="w-24 h-24 object-cover rounded">

    <h2 class="text-lg font-semibold text-gray-800 mb-2">${factura.nombre}</h2>

    <p class="text-gray-600 text-sm mb-4">${factura.descripcion}</p>

    <h3 class="text-gray-800 text-sm mb-4 font-semibold">${factura.precio} $</h3>
    
    <div class="flex items-center gap-2">
    <button id="${factura.id}" class="facturaBoton bg-lime-300 hover:bg-lime-500 px-2 py-1 rounded text-white text-sm font-bold">+</button>
    <button id="${factura.id}" class="facturaBoton bg-yellow-300 hover:bg-yellow-500 px-2 py-1 rounded text-white text-sm font-bold">-</button>
    <button id="${factura.id}" class="botonEliminar bg-red-400 hover:bg-red-600 px-2 py-1 rounded text-white text-sm font-bold">Quitar</button>
    </div>`;
    facturaContenedor.appendChild(contenidoFactura);
  });
  eliminarFactura();
}

mostrarFactura(facturaStorage);

function eliminarFactura() {
  const botonEliminar = document.querySelectorAll("button.botonEliminar");

  botonEliminar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const idFactura = e.currentTarget.id;

      const bebidasGuardadas = JSON.parse(
        localStorage.getItem("bebidaStorage") || "[]"
      );

      const facturaSelecionado = bebidasGuardadas.findIndex(
        (factura) => factura.id == idFactura
      );

      if (facturaSelecionado !== -1) {
        bebidasGuardadas.splice(facturaSelecionado, 1);
        localStorage.setItem("bebidaStorage", JSON.stringify(bebidasGuardadas));
        boton.closest("article").remove();
      }
    });
  });
}
