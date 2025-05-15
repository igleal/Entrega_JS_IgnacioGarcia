/* Aqui va el JS para factura.hmtl */
const facturaContenedor = document.getElementById("facturas_Contenedor");
facturaContenedor.className = `bg-lime-100 min-h-screen flex flex-col items-center`;

function contenedorBotones() {
  const divBoton = document.createElement("div");

  divBoton.className =
    "w-screen flex items-center justify-between bg-lime-300 p-4 bottom-4";

  const botonesIzquierdo = document.createElement("div");
  botonesIzquierdo.innerHTML = `
    <a href="../index.html" class="bg-lime-400 hover:bg-lime-600 p-2 rounded-lg text-sm">Regresar</a>
    `;

  const botonesDerecho = document.createElement("div");
  botonesDerecho.innerHTML = `
  <button class="bg-lime-400 hover:bg-lime-600 p-2 rounded-lg text-sm">Limpiar</button>
  <button class="bg-lime-400 hover:bg-lime-600 p-2 rounded-lg text-sm">Comprar</button>`;

  divBoton.appendChild(botonesIzquierdo);
  divBoton.appendChild(botonesDerecho);

  facturaContenedor.appendChild(divBoton);
}

contenedorBotones();

const storageBebidas = localStorage.getItem("bebidaStorage");

if (storageBebidas !== null && storageBebidas !== "") {
  facturaStorage = JSON.parse(storageBebidas);
  if (facturaStorage.length === 0) {
    mensajeFactura();
  }
} else {
  mensajeFactura();
}

function mensajeFactura() {
  const mensaje = document.createElement("span");
  mensaje.innerText = `No hay productos, por favor cargue alguna Bebida.`;
  facturaContenedor.appendChild(mensaje);
}

function mostrarFactura(facturaStorage) {
  const facturaDiv = document.createElement("div");
  facturaDiv.className = `pt-4`;

  facturaStorage.forEach((factura) => {
    const contenidoFactura = document.createElement("article");
    contenidoFactura.className = `flex items-center justify-between gap-4 bg-white shadow-md rounded-lg p-4 w-full max-w-3xl mb-4`;
    contenidoFactura.innerHTML = `

    <img src="..${factura.imagen}" alt="${factura.alt}" class="w-24 h-24 object-cover rounded">

    <h2 class="text-lg font-semibold text-gray-800 mb-2">${factura.nombre}</h2>

    <p class="text-gray-600 text-sm mb-4">${factura.descripcion}</p>

    <h3 class="text-gray-800 text-sm mb-4 font-semibold">${factura.precio} $</h3>
    
    <div class="flex items-center gap-2">
    <button id="${factura.id}" class="botonResta facturaBoton bg-lime-300 hover:bg-lime-500 px-2 py-1 rounded text-white text-sm font-bold">-</button>
    <span class="contador">${factura.cantidad}</span>
    <button id="${factura.id}" class="botonSuma facturaBoton bg-yellow-300 hover:bg-yellow-500 px-2 py-1 rounded text-white text-sm font-bold">+</button>
    <button id="${factura.id}" class="botonEliminar bg-red-400 hover:bg-red-600 px-2 py-1 rounded text-white text-sm font-bold">Eliminar</button>
    </div>`;

    facturaDiv.appendChild(contenidoFactura);
  });

  facturaContenedor.appendChild(facturaDiv);
  eliminarFactura();
  restaBebida();
  sumaBebida();
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

        Toastify({
          text: "Bebida Eliminada",
          duration: 1500,
          gravity: "top",
          position: "center",
          backgroundColor: "#f87171",
        }).showToast();
      }
    });
  });
}

function limpiarBoton() {
  const botonLimpiar = document.getElementById("limpiarFactura");

  botonLimpiar.addEventListener("click", () => {
    localStorage.removeItem(bebidaStorage);
  });
}

function restaBebida() {
  const botonResta = document.querySelectorAll("button.botonResta");

  botonResta.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const idFactura = e.currentTarget.id;

      const bebidasGuardadas = JSON.parse(
        localStorage.getItem("bebidaStorage") || "[]"
      );

      const facturaSelecionado = bebidasGuardadas.findIndex(
        (factura) => factura.id == idFactura
      );

      if (facturaSelecionado !== -1) {
        if (bebidasGuardadas[facturaSelecionado].cantidad > 1) {
          bebidasGuardadas[facturaSelecionado].cantidad--;

          Toastify({
            text: "Bebida Actualizada",
            duration: 1500,
            gravity: "top",
            position: "right",
            backgroundColor: "#f87171",
          }).showToast();
        } /* else {
          bebidasGuardadas.splice(facturaSelecionado, 1);
          const bebida = document.querySelector("article");
        } */

        localStorage.setItem("bebidaStorage", JSON.stringify(bebidasGuardadas));

        contador(e.currentTarget, bebidasGuardadas, facturaSelecionado);
      }
    });
  });
}

function sumaBebida() {
  const botonSuma = document.querySelectorAll("button.botonSuma");

  botonSuma.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const idFactura = e.currentTarget.id;

      const bebidasGuardadas = JSON.parse(
        localStorage.getItem("bebidaStorage") || "[]"
      );

      const facturaSelecionado = bebidasGuardadas.findIndex(
        (factura) => factura.id == idFactura
      );

      if (facturaSelecionado !== -1) {
        if (bebidasGuardadas[facturaSelecionado].cantidad) {
          bebidasGuardadas[facturaSelecionado].cantidad++;

          Toastify({
            text: "Bebida Actualizada",
            duration: 1500,
            gravity: "top",
            position: "right",
            backgroundColor: "#34d399",
          }).showToast();
        }
        localStorage.setItem("bebidaStorage", JSON.stringify(bebidasGuardadas));
      }

      contador(e.currentTarget, bebidasGuardadas, facturaSelecionado);
    });
  });
}

function contador(ecurrentTarget, bebidasGuardadas, facturaSelecionado) {
  const article = ecurrentTarget.closest("article");
  if (article) {
    const contador = article.querySelector("span.contador");
    if (contador) {
      contador.innerText = bebidasGuardadas[facturaSelecionado].cantidad;
    }
  }
}
