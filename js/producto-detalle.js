// ============================================================
// 1. ARRAY DE PRODUCTOS (Para buscar los IDs 1-8)
// ============================================================
const productos = [
    { id: 1, titulo: "Cosplay Dio", precio: "$15.990", img: "img/dio.jpg", descripcion: "Cosplay oficial de Dio Brando de JoJo's Bizarre Adventure. Incluye máscara, abrigo y detalles de la serie." },
    { id: 2, titulo: "Figura Yujiro Hanma", precio: "$70.990", img: "img/hanma.jpg", descripcion: "Figura coleccionable de Yujiro Hanma de Baki. Alta fidelidad y detalles impresionantes." },
    { id: 3, titulo: "Figura Satoru Gojo", precio: "$60.990", img: "img/gojo.jpg", descripcion: "Figura de acción de Satoru Gojo de Jujutsu Kaisen. Incluye accesorios intercambiables." },
    { id: 4, titulo: "Colección Jujutsu Kaisen", precio: "$49.990", img: "img/kaisen.jpg", descripcion: "Colección completa de Jujutsu Kaisen. Incluye figuras, accesorios y más." },
    { id: 5, titulo: "Cosplay Bill", precio: "$20.990", img: "img/bill.jpg", descripcion: "Cosplay del personaje Bill de Left 4 Dead. Incluye camisa, chaleco y accesorios." },
    { id: 6, titulo: "Colección Team Fortress 2", precio: "$30.990", img: "img/tf2.jpg", descripcion: "Colección de Team Fortress 2 con múltiples personajes y accesorios." },
    { id: 7, titulo: "Colección Destiny", precio: "$89.990", img: "img/destiny.png", descripcion: "Colección completa de Destiny con figuras, props y más." },
    { id: 8, titulo: "Colección Warhammer 40k", precio: "$80.990", img: "img/ultra.png", descripcion: "Colección de Warhammer 40k con figuras de Ultramarines y más." }
];

// ============================================================
// 2. ARTÍCULOS DENTRO DE CADA COLECCIÓN (Con precios y descripciones)
// ============================================================
const articulosDeColecciones = {
    4: [
        { id: 101, titulo: "Cosplay Gojo", precio: "$25.990", img: "img/gojo cosplay.png", descripcion: "Cosplay de Gojo Satoru. Incluye venda para los ojos, abrigo y detalles de alta calidad." },
        { id: 102, titulo: "Cosplay Itadori", precio: "$25.990", img: "img/kaisen.jpg", descripcion: "Cosplay de Yuji Itadori. Incluye uniforme Jujutsu High y detalles de la serie." },
        { id: 103, titulo: "Cosplay Mahito", precio: "$20.990", img: "img/mahito.jpeg", descripcion: "Cosplay de Mahito. Incluye vendajes y detalles únicos del personaje." }
    ],
    6: [
        { id: 104, titulo: "Cosplay Heavy", precio: "$30.990", img: "img/heavy.jpg", descripcion: "Cosplay del Heavy de Team Fortress 2. Incluye camisa, chaleco y accesorios." },
        { id: 105, titulo: "Cosplay spy", precio: "$30.990", img: "img/spy.jpg", descripcion: "Cosplay del Spy de Team Fortress 2. Incluye máscara, traje y accesorios." },
        { id: 106, titulo: "Cosplay Scout", precio: "$28.990", img: "img/scout.jpg", descripcion: "Cosplay del Scout de Team Fortress 2. Incluye gorra, bat y accesorios." }
    ],
    7: [
        { id: 107, titulo: "Prop As de picas", precio: "$200.990", img: "img/as de picas.jpg", descripcion: "Prop réplica del As de Picas de Destiny. Perfecto para coleccionistas." },
        { id: 108, titulo: "Prop mitoclasta vex", precio: "$380.990", img: "img/vex.png", descripcion: "Prop réplica de la Mitoclasta Vex. Detalles de alta precisión." },
        { id: 109, titulo: "Figura espectro", precio: "$90.990", img: "img/espectro.jpg", descripcion: "Figura del Espectro de Destiny. Réplica detallada." }
    ],
    8: [
        { id: 110, titulo: "Figuras grupo ultramarine", precio: "$400.990", img: "img/ultra.png", descripcion: "Figura de Ultramarine de Warhammer 40k. Pintado a mano." },
        { id: 111, titulo: "Figura dreadnought", precio: "$180.990", img: "img/dreadnought.png", descripcion: "Figura de Dreadnought de Warhammer 40k. Alta calidad." },
        { id: 112, titulo: "Figura orco", precio: "$150.990", img: "img/orco.png", descripcion: "Figura de Orco de Warhammer 40k. Detalles impresionantes." }
    ]
};


// 3. FUNCIÓN PARA LIMPIAR PRECIO (Para que el carrito pueda sumar)

function limpiarPrecio(precioTexto) {
    return parseInt(precioTexto.replace(/[$.]/g, '').replace(/\s/g, ''));
}


function obtenerIdDeURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

function cambiarImagen(src) {
    document.getElementById('imagen-principal').src = src;
}


let clicsTank = 0;

function activarEasterEggTank() {
    const overlay = document.getElementById('easter-egg-tank');
    const img = overlay.querySelector('.easter-egg-img-tank');
    
    // Obtener los audios con los IDs CORRECTOS
    const audioMusica = document.getElementById('audio-tank');
    const audioGrunidos = document.getElementById('audio-grunidos-tank');
    
    // 1. REINICIAR LA ANIMACIÓN (para que aparezca cada vez)
    overlay.style.display = 'block';
    img.style.animation = 'none';
    img.offsetHeight; 
    img.style.animation = ''; // Vuelve a ejecutar la animación
    
    // 2. REPRODUCIR AMBOS AUDIOS
    if (audioMusica) {
        audioMusica.currentTime = 0;
        audioMusica.play();
    }
    if (audioGrunidos) {
        audioGrunidos.currentTime = 0;
        audioGrunidos.play();
    }
    
    // 3. OCULTAR DESPUÉS DE 3 SEGUNDOS Y PAUSAR AUDIOS
    setTimeout(() => {
        overlay.style.display = 'none';
        
        if (audioMusica) {
            audioMusica.pause();
        }
        if (audioGrunidos) {
            audioGrunidos.pause();
        }
    }, 3000);
}

function renderizarDetalle() {
    const id = obtenerIdDeURL();
    
    // Buscar primero en los productos principales
    let producto = productos.find(p => p.id === id);

    // Si no está, buscar en los artículos de las colecciones
    if (!producto) {
        for (let key in articulosDeColecciones) {
            const encontrado = articulosDeColecciones[key].find(a => a.id === id);
            if (encontrado) {
                producto = encontrado;
                break;
            }
        }
    }

    if (!producto) {
        document.querySelector('.container').innerHTML = '<h2 class="text-center mt-5">Producto no encontrado</h2>';
        return;
    }

    // Llenar datos principales
    document.getElementById('imagen-principal').src = producto.img;
    document.getElementById('nombre-producto').innerText = producto.titulo;
    document.getElementById('precio-producto').innerText = producto.precio;
    document.getElementById('descripcion-producto').innerText = producto.descripcion;

    // AGREGAR AL CARRITO: Asignar la función al boton
    document.getElementById('boton-anadir').onclick = function() {
        const cantidad = parseInt(document.getElementById('cantidad').value) || 1;
        agregarAlCarrito(producto.id, producto.titulo, limpiarPrecio(producto.precio), producto.img, cantidad);
    };

    
    const titulo = document.getElementById('nombre-producto');
    
    
    if (producto.titulo === 'Cosplay Bill') {
        titulo.style.cursor = 'pointer'; // Para que se vea clicable
        titulo.onclick = function() {
            clicsTank++;
            if (clicsTank === 5) {
                activarEasterEggTank();
                clicsTank = 0; // Reiniciar contador
            }
        };
    } else {
        
        titulo.style.cursor = 'default';
        titulo.onclick = null;
    }
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', renderizarDetalle);