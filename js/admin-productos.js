// Valores por defecto actualizados con ID
const productosIniciales = [
    { id: 1, titulo: "Cosplay Dio", precio: "$15.990", img: "img/dio.jpg", categoria: "cosplay" },
    { id: 2, titulo: "Colección Jujutsu Kaisen", precio: "$49.990", img: "img/kaisen.jpg", categoria: "cosplay" },
    { id: 3, titulo: "Colección Left 4 dead", precio: "$15.990", img: "img/bill.jpg", categoria: "cosplay" },
    { id: 4, titulo: "Colección Team Fortress 2", precio: "$30.990", img: "img/tf2.jpg", categoria: "cosplay" },
    { id: 5, titulo: "Colección Destiny", precio: "$89.990", img: "img/destiny.png", categoria: "coleccionables" },
    { id: 6, titulo: "Colección Warhammer 40k", precio: "$80.990", img: "img/ultra.png", categoria: "coleccionables" },
    { id: 7, titulo: "Figura Yujiro Hanma", precio: "$70.990", img: "img/hanma.jpg", categoria: "coleccionables" },
    { id: 8, titulo: "Figura Satoru Gojo", precio: "$7.990", img: "img/gojo.jpg", categoria: "coleccionables" }
];

// Cargar de localStorage
let listaProductos = JSON.parse(localStorage.getItem('productosDb'));

// PROTECCIÓN: Si está vacío O si el primer producto guardado no tiene ID (datos antiguos), lo reiniciamos.
if (!listaProductos || listaProductos.length === 0 || !('id' in listaProductos[0])) {
    listaProductos = productosIniciales;
    localStorage.setItem('productosDb', JSON.stringify(listaProductos));
}

// --------------------------------------------------------
// LÓGICA PARA "MOSTRAR PRODUCTOS"
// --------------------------------------------------------
const tablaProductos = document.getElementById('tabla-productos');
if (tablaProductos) {
    function renderizarTabla() {
        tablaProductos.innerHTML = '';
        listaProductos.forEach(prod => {
            // Envolvemos el prod.id en comillas simples para evitar errores de tipo al hacer clic
            tablaProductos.innerHTML += `
                <tr>
                    <td>${prod.id}</td>
                    <td><img src="${prod.img}" width="50" height="50" style="object-fit: cover; border-radius: 5px;"></td>
                    <td>${prod.titulo}</td>
                    <td class="text-capitalize">${prod.categoria}</td>
                    <td>${prod.precio}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="prepararEdicion('${prod.id}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarProducto('${prod.id}')">Borrar</button>
                    </td>
                </tr>
            `;
        });
    }
    renderizarTabla();
}

// Funciones para botones de la tabla
function eliminarProducto(idBuscado) {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
        // Convertimos a String para asegurar que coincidan los tipos de datos
        listaProductos = listaProductos.filter(p => String(p.id) !== String(idBuscado));
        localStorage.setItem('productosDb', JSON.stringify(listaProductos));
        location.reload(); 
    }
}

function prepararEdicion(id) {
    sessionStorage.setItem('productoAEditar', id);
    window.location.href = "admin-editar-producto.html";
}

// --------------------------------------------------------
// LÓGICA PARA "NUEVO PRODUCTO"
// --------------------------------------------------------
const formNuevo = document.getElementById('formNuevoProducto');
if (formNuevo) {
    formNuevo.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Calculamos el ID asegurándonos de que sean tratados como números
        const nuevoId = listaProductos.length > 0 ? Math.max(...listaProductos.map(p => Number(p.id))) + 1 : 1;
        
        const nuevoProd = {
            id: nuevoId,
            titulo: document.getElementById('tituloInput').value,
            categoria: document.getElementById('categoriaInput').value,
            precio: document.getElementById('precioInput').value,
            img: document.getElementById('imgInput').value
        };

        listaProductos.push(nuevoProd);
        localStorage.setItem('productosDb', JSON.stringify(listaProductos));
        alert("Producto guardado exitosamente");
        window.location.href = "admin-mostrar-producto.html";
    });
}

// --------------------------------------------------------
// LÓGICA PARA "EDITAR PRODUCTO"
// --------------------------------------------------------
const formEditar = document.getElementById('formEditarProducto');
if (formEditar) {
    const idAEditar = sessionStorage.getItem('productoAEditar');
    
    // Usamos String() para asegurar que la comparación funcione sin importar si es número o texto
    const productoObj = listaProductos.find(p => String(p.id) === String(idAEditar));

    if (productoObj) {
        document.getElementById('editIdInput').value = productoObj.id;
        document.getElementById('editTituloInput').value = productoObj.titulo;
        document.getElementById('editCategoriaInput').value = productoObj.categoria;
        document.getElementById('editPrecioInput').value = productoObj.precio;
        document.getElementById('editImgInput').value = productoObj.img;
    } else {
        alert("No se encontró el producto a editar.");
        window.location.href = "admin-mostrar-producto.html";
    }

    formEditar.addEventListener('submit', (e) => {
        e.preventDefault();
        const idActualizado = document.getElementById('editIdInput').value;
        
        const index = listaProductos.findIndex(p => String(p.id) === String(idActualizado));
        
        if(index !== -1) {
            listaProductos[index] = {
                id: Number(idActualizado),
                titulo: document.getElementById('editTituloInput').value,
                categoria: document.getElementById('editCategoriaInput').value,
                precio: document.getElementById('editPrecioInput').value,
                img: document.getElementById('editImgInput').value
            };

            localStorage.setItem('productosDb', JSON.stringify(listaProductos));
            alert("Producto actualizado correctamente");
            window.location.href = "admin-mostrar-producto.html";
        }
    });
}