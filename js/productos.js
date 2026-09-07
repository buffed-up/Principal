// ============================================================
// 1. ARRAY DE PRODUCTOS
// ============================================================
const productos = [
    { id: 1, titulo: "Cosplay Dio", precio: "$15.990", img: "img/dio.jpg", categoria: "cosplay" },
    { id: 2, titulo: "Figura Yujiro Hanma", precio: "$70.990", img: "img/hanma.jpg", categoria: "coleccionables" },
    { id: 3, titulo: "Figura Satoru Gojo", precio: "$7.990", img: "img/gojo.jpg", categoria: "coleccionables" },
    { id: 4, titulo: "Colección Jujutsu Kaisen", precio: "$49.990", img: "img/kaisen.jpg", categoria: "cosplay" },
    { id: 5, titulo: "Cosplay Bill", precio: "$20.990", img: "img/bill.jpg" , categoria: "cosplay" },
    { id: 6, titulo: "Colección Team Fortress 2", precio: "$30.990", img: "img/tf2.jpg", categoria: "cosplay" },
    { id: 7, titulo: "Colección Destiny", precio: "$89.990", img: "img/destiny.png", categoria: "coleccionables" },
    { id: 8, titulo: "Colección Warhammer 40k", precio: "$80.990", img: "img/ultra.png", categoria: "coleccionables" }
];

// ============================================================
// 2. ARTÍCULOS DENTRO DE CADA COLECCIÓN
// ============================================================
const articulosDeColecciones = {
    4: [
        { titulo: "Cosplay Gojo", precio: "$25.990", img: "img/gojo cosplay.png" },
        { titulo: "Cosplay Itadori", precio: "$39.990", img: "img/kaisen.jpg" },
        { titulo: "Cosplay Mahito", precio: "$5.990", img: "img/mahito.jpeg" }
    ],

    6: [
        { titulo: "Cosplay Heavy", precio: "$30.990", img: "img/tf2.jpg" },
        { titulo: "Cosplay spy", precio: "$30.990", img: "img/tf2.jpg" },
        { titulo: "Cosplay Scout", precio: "$28.990", img: "img/logo.png" }
    ],
    7: [
        { titulo: "Prop As de picas", precio: "$200.990", img: "img/as de picas.jpg" },
        { titulo: "Prop mitoclasta vex", precio: "$380.990", img: "img/vex.png" },
        { titulo: "figura espectro", precio: "$90.990", img: "img/espectro.jpg" }
    ],
    8: [
        { titulo: "figura ultramarine", precio: "$250.990", img: "img/ultra.png" },
        { titulo: "figura dreadnought", precio: "$180.990", img: "img/dreadnought.png" },
        { titulo: "figura orco", precio: "$150.990", img: "img/orco.png" }
    ]
};

const contenedor = document.getElementById('contenedor-productos');
let categoriaActual = 'todos';

function renderizarProductos(categoria = 'todos') {
    categoriaActual = categoria;
    contenedor.innerHTML = '';

    // Mostrar las pestañas
    document.getElementById('filtros-categorias').classList.remove('d-none');

    const productosFiltrados = categoria === 'todos' 
        ? productos 
        : productos.filter(producto => producto.categoria === categoria);

    productosFiltrados.forEach(producto => {
        const esColeccion = producto.titulo.toLowerCase().includes("colección") || producto.titulo.toLowerCase().includes("coleccion");
        
        const tarjetaHTML = `
            <div class="col-6 col-md-4 col-lg-3 mb-4">
                <div class="card vapor-card h-100 text-center">
                    <img src="${producto.img}" class="card-img-top vapor-img" alt="${producto.titulo}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title vapor-title">${producto.titulo}</h5>
                        <p class="card-text vapor-price mt-auto">${producto.precio}</p>
                        
                        ${esColeccion 
                            ? `<button class="btn btn-vapor mt-2" onclick="abrirColeccion(${producto.id})">Ver Colección</button>` 
                            : `<button class="btn btn-vapor mt-2">Añadir</button>`
                        }
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjetaHTML;
    });
}

function filtrarProductos(categoria) {
    renderizarProductos(categoria);
}

function abrirColeccion(idColeccion) {
    // OCULTAR LAS PESTAÑAS usando la clase d-none de Bootstrap
    document.getElementById('filtros-categorias').classList.add('d-none');

    const articulos = articulosDeColecciones[idColeccion] || [];
    const nombreColeccion = productos.find(p => p.id === idColeccion)?.titulo || "Colección";

    document.getElementById('titulo-seccion').innerText = nombreColeccion;
    const btnVolver = document.getElementById('btn-volver');
    btnVolver.style.display = 'inline-block';

    contenedor.innerHTML = '';
    articulos.forEach(articulo => {
        const tarjetaHTML = `
            <div class="col-6 col-md-4 col-lg-3 mb-4">
                <div class="card vapor-card h-100 text-center">
                    <img src="${articulo.img}" class="card-img-top vapor-img" alt="${articulo.titulo}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title vapor-title">${articulo.titulo}</h5>
                        <p class="card-text vapor-price mt-auto">${articulo.precio}</p>
                        <button class="btn btn-vapor mt-2">Añadir</button>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjetaHTML;
    });
}

function volverAColecciones() {
    // VOLVER A MOSTRAR LAS PESTAÑAS
    document.getElementById('filtros-categorias').classList.remove('d-none');

    document.getElementById('titulo-seccion').innerText = "PRODUCTOS";
    document.getElementById('btn-volver').style.display = 'none';
    renderizarProductos(categoriaActual);
}

// Carga inicial
document.addEventListener('DOMContentLoaded', () => renderizarProductos('todos'));