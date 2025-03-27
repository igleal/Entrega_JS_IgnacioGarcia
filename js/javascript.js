/* let datos = [{ item: "camiseta" }, { item: "pantalon" }, { item: "vestido" }]; */
let datos = ["camiseta", "pantalon", "vestido"];

function agregarDatos(newDato) {
  datos.push(newDato);
  console.log(`Item agregado: ${newDato}`);
}

function verDatos() {
  if (datos.length === 0) {
    console.log("No hay ningun dato para ver");
  } else {
    for (let dato of datos) {
      console.log(`Item: ${dato}`);
    }
  }
}

function eliminarDato(deleDato) {
  let index = datos.indexOf(deleDato);

  if (index !== -1) {
    datos.splice(index, 1);
    console.log(`Item eliminado: ${deleDato}`);
  } else {
    console.log(`No se encontro el item: ${deleDato}`);
  }
}

let opcion = parseInt(
  prompt(
    "Seleccione una Opcion: \n 1-Agregar \n 2-Buscar \n 3-Eliminar \n 4-Salir"
  )
);

while (opcion !== 4) {
  switch (opcion) {
    case 1:
      let newDato = prompt("Ingrese el dato agregar: ");
      agregarDatos(newDato);
      break;
    case 2:
      verDatos();
      break;
    case 3:
      let deleDato = prompt("Ingrese el dato que desea eliminar: ");
      eliminarDato(deleDato);
      break;
    default:
      alert("Opcion no valida");
      break;
  }

  opcion = parseInt(
    prompt(
      "Seleccione una Opcion: \n 1-Agregar \n 2-Buscar \n 3-Eliminar \n 4-Salir"
    )
  );
}
alert("Hasta Pronto");
