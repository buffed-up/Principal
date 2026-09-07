// Array de productos (puedes cambiar títulos, precios y rutas de imagen aquí)
// Array de productos (AGREGAMOS LA PROPIEDAD 'categoria')
const productos = [
    // COSPLAY
    { titulo: "Cosplay Dio", precio: "$15.990", img: "img/dio.jpg", categoria: "cosplay" },
    { titulo: "Colección Jujutsu Kaisen", precio: "$49.990", img: "img/kaisen.jpg", categoria: "cosplay" },
    { titulo: "Colección Left 4 dead ", precio: "$15.990", img: "img/bill.jpg", categoria: "cosplay" },
    { titulo: " Colección Team Fortress 2", precio: "$30.990", img: "img/tf2.jpg", categoria: "cosplay" },
    // COLECCIONABLES
    { titulo: "Colección Destiny", precio: "$89.990", img: "img/destiny.png", categoria: "coleccionables" },
    { titulo: "Colección Warhammer 40k", precio: "$80.990", img: "img/ultra.png", categoria: "coleccionables" },
    { titulo: "Figura Yujiro Hanma", precio: "$70.990", img: "img/hanma.jpg", categoria: "coleccionables" },
    { titulo: "Figura Satoru Gojo", precio: "$7.990", img: "img/gojo.jpg", categoria: "coleccionables" }
];

const contenedor = document.getElementById('contenedor-productos');

// Función para pintar SOLO los productos de una categoría
function renderizarProductos(categoria = 'todos') {
    // Limpiamos el contenedor
    contenedor.innerHTML = '';

    // Filtramos el array según la categoría elegida
    const productosFiltrados = categoria === 'todos' 
        ? productos 
        : productos.filter(producto => producto.categoria === categoria);

    // Pintamos las tarjetas
    productosFiltrados.forEach(producto => {
        const tarjetaHTML = `
            <div class="col-6 col-md-4 col-lg-3 mb-4">
                <div class="card vapor-card h-100 text-center">
                    <img src="${producto.img}" class="card-img-top vapor-img" alt="${producto.titulo}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title vapor-title">${producto.titulo}</h5>
                        <p class="card-text vapor-price mt-auto">${producto.precio}</p>
                        <button class="btn btn-vapor mt-2">Añadir</button>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjetaHTML;
    });
}

// Función que se ejecuta al hacer clic en las pestañas
function filtrarProductos(categoria) {
    renderizarProductos(categoria);
}

// Carga inicial (mostrar todos)
document.addEventListener('DOMContentLoaded', () => renderizarProductos('todos'));