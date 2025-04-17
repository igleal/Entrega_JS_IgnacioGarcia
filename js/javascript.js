const cafeBebidas = [
  {
    id: 1,
    nombre: "Latte Hot",
    descripcion: "Espresso y leche al vapor.",
    precio: 3.75,
    imagen: "../assets/img_productos/latte_hot.jpg",
    alt: "Latte caliente con espresso y leche al vapor",
  },
  {
    id: 2,
    nombre: "Latte Iced",
    descripcion: "Espresso y leche; servido sobre hielo.",
    precio: 4.0,
    imagen: "../assets/img_productos/latte_iced.jpg",
    alt: "Latte frío servido con hielo",
  },
  {
    id: 3,
    nombre: "Mocha Iced",
    descripcion:
      "Chocolate real y espresso combinado con leche; servido sobre hielo.",
    precio: 4.5,
    imagen: "../assets/img_productos/mocha_iced.jpg",
    alt: "Mocha frío con chocolate y espresso sobre hielo",
  },
  {
    id: 4,
    nombre: "Mocha Hot",
    descripcion:
      "Chocolate real derretido en leche al vapor, combinado con espresso y cubierto con crema batida y chispas de chocolate.",
    precio: 4.75,
    imagen: "../assets/img_productos/mocha_hot.jpg",
    alt: "Mocha caliente con crema batida y chispas de chocolate",
  },
  {
    id: 5,
    nombre: "Cappuccino",
    descripcion:
      "Espresso y leche al vapor cubierto con una capa profunda de espuma.",
    precio: 3.95,
    imagen: "../assets/img_productos/cappuccino.jpg",
    alt: "Cappuccino espumoso servido en taza",
  },
  {
    id: 6,
    nombre: "Americano Hot",
    descripcion: "Espresso con agua caliente humeante.",
    precio: 3.0,
    imagen: "../assets/img_productos/americano_hot.jpg",
    alt: "Café americano caliente con espresso y agua",
  },
  {
    id: 7,
    nombre: "Americano Iced",
    descripcion: "Espresso fresco enfriado sobre hielo.",
    precio: 3.25,
    imagen: "../assets/img_productos/americano_iced.jpg",
    alt: "Americano frío servido sobre hielo",
  },
  {
    id: 8,
    nombre: "Espresso",
    descripcion: "Espresso recién hecho.",
    precio: 2.5,
    imagen: "../assets/img_productos/espresso.jpg",
    alt: "Taza de espresso recién preparado",
  },
  {
    id: 9,
    nombre: "Macchiato",
    descripcion: "Espresso rematado con una cucharada de espuma.",
    precio: 2.75,
    imagen: "../assets/img_productos/macchiato.jpg",
    alt: "Macchiato con espuma en la parte superior",
  },
  {
    id: 10,
    nombre: "Latte de Avellana de Chocolate Oscuro",
    descripcion:
      "Espresso Forte y leche al vapor combinada con ricos cocoas y jarabe de avellana. Cubierto con crema batida.",
    precio: 5.0,
    imagen: "../assets/img_productos/latte_avellana_chocolate_oscuro.jpg",
    alt: "Latte de avellana con crema batida",
  },
  {
    id: 11,
    nombre: "Latte Eggnog",
    descripcion: "Espresso Forte combinado con ponche de huevo al vapor.",
    precio: 5.25,
    imagen: "../assets/img_productos/latte_eggnog.jpg",
    alt: "Latte de ponche de huevo con espresso",
  },
  {
    id: 12,
    nombre: "Candy Cane Blanco Chocolate Caliente",
    descripcion:
      "Chocolate blanco suave combinado con menta. ¡Un favorito de vacaciones de niños y adultos por igual!",
    precio: 4.95,
    imagen: "../assets/img_productos/candy_cane_chocolate_blanco.jpg",
    alt: "Chocolate blanco caliente con menta estilo Candy Cane",
  },
  {
    id: 13,
    nombre: "Tostada de Canela Latte",
    descripcion:
      "Espresso Forte y leche al vapor combinados con sabores de azúcar caramelizada y canela dulce.",
    precio: 5.0,
    imagen: "../assets/img_productos/tostada_canela_latte.jpg",
    alt: "Latte con sabor a tostada de canela",
  },
  {
    id: 14,
    nombre: "Moccaccino de Menta",
    descripcion:
      "Audaz Espresso Forte combinado con jarabe de menta y chocolate cremoso.",
    precio: 5.25,
    imagen: "../assets/img_productos/moccaccino_menta.jpg",
    alt: "Moccaccino con chocolate y menta",
  },
  {
    id: 15,
    nombre: "Caramelo Chai de Avena Iced",
    descripcion:
      "Mezcla festiva de especias chai, leche de avena cremosa y caramelo, servido sobre hielo.",
    precio: 4.85,
    imagen: "../assets/img_productos/caramelo_chai_avena_iced.jpg",
    alt: "Chai helado con leche de avena y caramelo",
  },
  {
    id: 16,
    nombre: "Tostada de Canela de Avena Latte",
    descripcion:
      "Leche de avena cremosa y Espresso Forte infundida con los sabores de tostadas de canela.",
    precio: 5.1,
    imagen: "../assets/img_productos/tostada_canela_avena_latte.jpg",
    alt: "Latte de avena con sabor a tostada de canela",
  },
];

let bebidaContenedor = document.getElementById("contenedor_Bebidas");

function mostrarBebidas(cafeBebidas) {
  cafeBebidas.forEach((bebida) => {
    const cartaBedida = document.createElement("article");
    
    cartaBedida.className = "bg-indigo-200 shadow-md rounded-lg p-6 m-2 max-w-sm";
    
    cartaBedida.innerHTML = `
    <img src="#" alt="${bebida.alt}" class="w-full h-48 object-cover rounded-t-lg mb-4">
    <h2 class="text-xl font-semibold text-gray-800 mb-2">${bebida.nombre}</h2>
    <p class="text-gray-600 text-sm mb-4">${bebida.descripcion}</p>
    <h3 class="text-gray-600 text-sm mb-4">${bebida.precio} $</h3>
    <button id="${bebida.id}${bebida.nombre}" class="bg-lime-400 p-1 rounded-lg text-sm">Agregar</button>`;
    
    bebidaContenedor.appendChild(cartaBedida);
  });
}

mostrarBebidas(cafeBebidas);
