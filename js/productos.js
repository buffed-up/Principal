// ============================================================
// 1. ARRAY DE PRODUCTOS
// ============================================================
const productos = [
    { id: 1, titulo: "Cosplay Dio", precio: "$15.990", img: "img/dio.jpg", categoria: "cosplay" },
    { id: 2, titulo: "Figura Yujiro Hanma", precio: "$70.990", img: "img/hanma.jpg", categoria: "coleccionables" },
    { id: 3, titulo: "Figura Satoru Gojo", precio: "$60.990", img: "img/gojo.jpg", categoria: "coleccionables" },
    { id: 4, titulo: "Colección Jujutsu Kaisen", precio: "$49.990", img: "img/kaisen.jpg", categoria: "cosplay", esColeccion: true },
    { id: 5, titulo: "Cosplay Bill", precio: "$20.990", img: "img/bill.jpg", categoria: "cosplay" },
    { id: 6, titulo: "Colección Team Fortress 2", precio: "$30.990", img: "img/tf2.jpg", categoria: "cosplay", esColeccion: true },
    { id: 7, titulo: "Colección Destiny", precio: "$89.990", img: "img/destiny.png", categoria: "coleccionables", esColeccion: true },
    { id: 8, titulo: "Colección Warhammer 40k", precio: "$80.990", img: "img/ultra.png", categoria: "coleccionables", esColeccion: true }
];

// ============================================================
// 2. ARTÍCULOS DENTRO DE CADA COLECCIÓN (CON SUS PROPIOS IDs)
// ============================================================
const articulosDeColecciones = {
    4: [ // Colección Jujutsu Kaisen
        { id: 101, titulo: "Cosplay Gojo", precio: "$25.990", img: "img/gojo cosplay.png" },
        { id: 102, titulo: "Cosplay Itadori", precio: "$25.990", img: "img/kaisen.jpg" },
        { id: 103, titulo: "Cosplay Mahito", precio: "$20.990", img: "img/mahito.jpeg" }
    ],
    6: [ // Colección Team Fortress 2
        { id: 104, titulo: "Cosplay Heavy", precio: "$30.990", img: "img/heavy.jpg" },
        { id: 105, titulo: "Cosplay spy", precio: "$30.990", img: "img/spy.jpg"},
        { id: 106, titulo: "Cosplay Scout", precio: "$28.990", img: "img/scout.jpg" }
    ],
    7: [ // Colección Destiny
        { id: 107, titulo: "Prop As de picas", precio: "$200.990", img: "img/as de picas.jpg" },
        { id: 108, titulo: "Prop mitoclasta vex", precio: "$380.990", img: "img/vex.png" },
        { id: 109, titulo: "Figura espectro", precio: "$90.990", img: "img/espectro.jpg" }
    ],
    8: [ // Colección Warhammer 40k
        { id: 110, titulo: "Figuras grupo ultramarine", precio: "$400.990", img: "img/ultra.png" },
        { id: 111, titulo: "Figura dreadnought", precio: "$180.990", img: "img/dreadnought.png" },
        { id: 112, titulo: "Figura orco", precio: "$150.990", img: "img/orco.png" }
    ]
};

// ============================================================
// 3. FUNCIÓN PARA LIMPIAR PRECIO (Para que el carrito pueda sumar)
// ============================================================
function limpiarPrecio(precioTexto) {
    // Quita "$", "." y espacios, y convierte a número entero
    return parseInt(precioTexto.replace(/[$.]/g, '').replace(/\s/g, ''));
}

// ============================================================
// 4. LÓGICA DE RENDERIZADO
// ============================================================
const contenedor = document.getElementById('contenedor-productos');
let categoriaActual = 'todos';
let vieneDeIndex = false; // Variable para saber si venimos del menú principal

function renderizarProductos(categoria = 'todos') {
    categoriaActual = categoria;
    contenedor.innerHTML = '';
    document.getElementById('filtros-categorias').classList.remove('d-none');

    const productosFiltrados = categoria === 'todos' 
        ? productos 
        : productos.filter(producto => producto.categoria === categoria);

    productosFiltrados.forEach(producto => {
        const esColeccion = producto.esColeccion === true;
        
        const tarjetaHTML = `
            <div class="col-6 col-md-4 col-lg-3 mb-4">
                <div class="card vapor-card h-100 text-center" style="cursor: pointer;" 
                     onclick="${esColeccion ? `abrirColeccion(${producto.id})` : `window.location.href='producto-detalle.html?id=${producto.id}'`}">
                    <img src="${producto.img}" class="card-img-top vapor-img" alt="${producto.titulo}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title vapor-title">${producto.titulo}</h5>
                        <p class="card-text vapor-price mt-auto">${producto.precio}</p>
                        
                        ${esColeccion 
                            ? `<button class="btn btn-vapor mt-2" onclick="event.stopPropagation(); abrirColeccion(${producto.id})">Ver Colección</button>` 
                            : `<button class="btn btn-vapor mt-2" onclick="event.stopPropagation(); agregarAlCarrito(${producto.id}, '${producto.titulo}', ${limpiarPrecio(producto.precio)}, '${producto.img}'); window.location.href='producto-detalle.html?id=${producto.id}'">Ver Detalle</button>`
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
                <div class="card vapor-card h-100 text-center" style="cursor: pointer;" onclick="window.location.href='producto-detalle.html?id=${articulo.id}'">
                    <img src="${articulo.img}" class="card-img-top vapor-img" alt="${articulo.titulo}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title vapor-title">${articulo.titulo}</h5>
                        <p class="card-text vapor-price mt-auto">${articulo.precio}</p>
                        <button class="btn btn-vapor mt-2" onclick="event.stopPropagation(); agregarAlCarrito(${articulo.id}, '${articulo.titulo}', ${limpiarPrecio(articulo.precio)}, '${articulo.img}'); window.location.href='producto-detalle.html?id=${articulo.id}'">Ver Detalle</button>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjetaHTML;
    });
}

function volverAColecciones() {
    document.getElementById('filtros-categorias').classList.remove('d-none');
    document.getElementById('titulo-seccion').innerText = "PRODUCTOS";
    document.getElementById('btn-volver').style.display = 'none';
    
    // Si venimos del index, volvemos al index. Si no, a la lista de productos
    if (vieneDeIndex) {
        window.location.href = 'index.html';
    } else {
        renderizarProductos(categoriaActual);
    }
}

// ============================================================
// 5. FUNCIÓN PARA ABRIR COLECCIÓN DESDE LA URL (Index)
// ============================================================
function abrirColeccionDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    const idColeccion = parseInt(params.get('coleccion'));
    const desdeIndex = params.get('desde'); // Detecta si viene del index
    
    // Guardamos si venimos del index
    if (desdeIndex === 'index') {
        vieneDeIndex = true;
    }
    
    // Si hay un ID de colección en la URL, la abrimos automáticamente
    if (idColeccion) {
        abrirColeccion(idColeccion);
    }
}

// Carga inicial (mostrar todos y verificar si viene de la tabla del index)
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos('todos');
    abrirColeccionDesdeURL(); // <-- Esto abre la colección si viene del index
});