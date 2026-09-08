// ============================================================
// 1. FUNCIONES BÁSICAS DEL CARRITO
// ============================================================

// Obtener el carrito del localStorage (o crear uno vacío si no existe)
function obtenerCarrito() {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
}

// Guardar el carrito en el localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorNavbar();
}

// Actualizar el contador en el navbar
function actualizarContadorNavbar() {
    const carrito = obtenerCarrito();
    const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
    const contador = document.getElementById('contador-carrito-nav');
    if (contador) {
        contador.innerText = totalProductos;
    }
}

// ============================================================
// 2. AGREGAR PRODUCTO AL CARRITO (VERSIÓN DEFINITIVA - SOLO SUMA)
// ============================================================
function agregarAlCarrito(id, titulo, precio, img, cantidad = 1) {
    const carrito = obtenerCarrito();
    
    // Buscar si el producto ya está en el carrito usando el ID
    const productoExistente = carrito.find(item => item.id === id);
    
    if (productoExistente) {
        // Si ya existe, sumamos la cantidad seleccionada
        productoExistente.cantidad += cantidad;
    } else {
        // Si no existe, creamos una entrada nueva con la cantidad seleccionada
        carrito.push({
            id: id,
            titulo: titulo,
            precio: precio,
            img: img,
            cantidad: cantidad
        });
    }
    
    guardarCarrito(carrito);
    alert('Producto añadido al carrito!');
}

// ============================================================
// 3. RENDERIZAR EL CARRITO EN LA PÁGINA
// ============================================================

function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const contenedor = document.getElementById('lista-productos-carrito');
    
    // LIMPIAR el contenedor ANTES de dibujar (esto arregla el problema)
    contenedor.innerHTML = '';
    
    // Si el carrito está vacío
    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="text-center">Tu carrito está vacío.</p>';
        document.getElementById('total-carrito').innerText = '$0';
        return;
    }
    
    let totalGeneral = 0;
    
    // Generar el HTML de cada producto
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;
        
        contenedor.innerHTML += `
            <div class="row align-items-center mb-4 vapor-card p-3">
                <div class="col-3">
                    <img src="${item.img}" alt="${item.titulo}" style="width: 100px; height: 100px; object-fit: contain; background-color: #000;">
                </div>
                <div class="col-5">
                    <h5 class="vapor-title">${item.titulo}</h5>
                    <p style="font-size: 0.8rem; opacity: 0.7;">Precio unitario: $${item.precio}</p>
                </div>
                <div class="col-4 text-end">
                    <div class="d-flex justify-content-end align-items-center gap-2">
                        <button class="btn btn-sm btn-vapor" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                        <span class="vapor-price">${item.cantidad}</span>
                        <button class="btn btn-sm btn-vapor" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                    </div>
                    <p class="vapor-price mt-2" style="font-size: 1.2rem;">$${subtotal}</p>
                    <button class="btn btn-sm btn-outline-danger mt-1" onclick="quitarDelCarrito(${item.id})">Eliminar</button>
                </div>
            </div>
        `;
    });
    
    // Actualizar el total general
    document.getElementById('total-carrito').innerText = '$' + totalGeneral;
}

// ============================================================
// 4. CAMBIAR CANTIDAD Y ELIMINAR
// ============================================================

function cambiarCantidad(id, delta) {
    const carrito = obtenerCarrito();
    const producto = carrito.find(item => item.id === id);
    
    if (producto) {
        producto.cantidad += delta;
        
        // Si la cantidad llega a 0, eliminar el producto
        if (producto.cantidad <= 0) {
            quitarDelCarrito(id);
        } else {
            guardarCarrito(carrito);
            renderizarCarrito(); // <-- ESTO ARREGLA EL PROBLEMA: Actualiza la pantalla al instante
        }
    }
}

function quitarDelCarrito(id) {
    const carrito = obtenerCarrito();
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    guardarCarrito(nuevoCarrito);
    renderizarCarrito();
}

// ============================================================
// 5. CUPÓN Y PAGO
// ============================================================

function aplicarCupon() {
    const cupon = document.getElementById('cupon').value.trim().toUpperCase();
    const carrito = obtenerCarrito();
    let total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    if (cupon === 'VAPOR10') {
        total = total * 0.9; // 10% de descuento
        document.getElementById('total-carrito').innerText = '$' + Math.round(total);
        alert('¡Cupón aplicado! 10% de descuento.');
    } else {
        alert('Cupón inválido.');
    }
}

function pagar() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }
    
    alert('¡Pago realizado con éxito! Gracias por tu compra.');
    localStorage.setItem('carrito', JSON.stringify([])); // Vaciar carrito
    renderizarCarrito(); // Recargar página
}

// ============================================================
// 6. INICIALIZAR
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorNavbar();
    renderizarCarrito();
});