// Usuarios iniciales (de prueba) para que el sistema no empiece vacío
const usuariosIniciales = [
    {
        id: 1,
        run: "190110222",
        nombre: "Admin",
        apellido: "Principal",
        correo: "admin@profesor.duoc.cl",
        fechaNacimiento: "1980-01-01",
        rol: "administrador",
        region: "Región Metropolitana",
        comuna: "Santiago",
        direccion: "Av. Siempre Viva 123",
        clave: "admin123"
    },
    {
        id: 2,
        run: "123456785",
        nombre: "Cliente",
        apellido: "Frecuente",
        correo: "jugador@duoc.cl",
        fechaNacimiento: "1995-05-15",
        rol: "cliente",
        region: "Región de Valparaíso",
        comuna: "Viña del Mar",
        direccion: "Calle Falsa 456",
        clave: "user123"
    }
];

// Objeto con las regiones y comunas que usamos en los selects
const regionesYComunas = {
    "Región Metropolitana": ["Santiago", "Puente Alto", "Maipú", "Providencia"],
    "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
    "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles"]
};

// Función para validar que el correo sea de los dominios permitidos
function validarDominioCorreo(correo) {
    const correoMin = correo.toLowerCase(); // Lo pasamos a minúsculas por si acaso
    // Verificamos si termina en alguno de los dominios autorizados
    if (correoMin.endsWith("@duoc.cl") || 
        correoMin.endsWith("@profesor.duoc.cl") || 
        correoMin.endsWith("@gmail.com")) {
        return true;
    }
    return false;
}

// Guardo los usuarios de prueba en el localStorage si es la primera vez que se carga la página
function inicializarUsuarios() {
    if (!localStorage.getItem("usuariosDb")) {
        localStorage.setItem("usuariosDb", JSON.stringify(usuariosIniciales));
    }
}

// Función auxiliar para traer los usuarios guardados (o un arreglo vacío si no hay nada)
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuariosDb")) || [];
}

// Función auxiliar para guardar el arreglo actualizado en el localStorage
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuariosDb", JSON.stringify(usuarios));
}

// Manejo del formulario de login
function configurarLogin() {
    const formularioLogin = document.getElementById("loginForm");
    
    // Si no estamos en la página de login, salimos de la función
    if (!formularioLogin) return; 

    formularioLogin.addEventListener("submit", function (evento) {
        evento.preventDefault(); // Evito que la página se recargue al mandar el form

        const correo = document.getElementById("correoInput").value.trim();
        const clave = document.getElementById("passwordInput").value.trim();
        
        // Valido el dominio del correo antes de buscar en la base de datos
        if (!validarDominioCorreo(correo)) {
            alert("Error: Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return; 
        }

        const usuarios = obtenerUsuarios();

        // Busco si hay algún usuario que coincida con los datos ingresados
        const usuario = usuarios.find(function (usuario) {
            return usuario.correo === correo && usuario.clave === clave;
        });

        if (!usuario) {
            alert("Correo o contraseña incorrectos.");
            return;
        }

        // Guardo el usuario logueado en la sesión
        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));

        // Redirijo dependiendo de si es admin o cliente normal
        if (usuario.rol === "administrador") {
            alert("¡Bienvenido administrador " + usuario.nombre + "!");
            window.location.href = "admin.html";
        } else {
            alert("¡Bienvenido " + usuario.nombre + "!");
            window.location.href = "index.html";
        }
    });
}

// Armar la tablita de usuarios en el HTML
function mostrarUsuarios() {
    const tabla = document.getElementById("tabla-usuarios");
    if (!tabla) return; // Si no hay tabla en esta vista, no hacemos nada

    const usuarios = obtenerUsuarios();
    tabla.innerHTML = "";

    // Mensaje por si borramos todos los usuarios
    if (usuarios.length === 0) {
        tabla.innerHTML = `<tr><td colspan="6">No hay usuarios registrados.</td></tr>`;
        return;
    }

    // Recorro el arreglo y voy inyectando las filas en la tabla
    usuarios.forEach(function (usuario) {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.run}</td>
            <td>${usuario.nombre} ${usuario.apellido}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.rol}</td>
            <td>
                <a href="admin-editar-usuario.html" class="btn btn-warning btn-sm" onclick="seleccionarUsuarioParaEditar(${usuario.id})">Editar</a>
                <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

// Guardo el ID en session para saber a quién voy a editar en la otra página
function seleccionarUsuarioParaEditar(id) {
    sessionStorage.setItem("usuarioAEditar", id);
}

// Configuración del form para crear un usuario nuevo
function configurarFormularioAgregar() {
    const formulario = document.getElementById("formNuevoUsuario");
    if (!formulario) return;

    const regionInput = document.getElementById("regionInput");
    const comunaInput = document.getElementById("comunaInput");

    // Lleno el select de regiones al cargar
    cargarRegiones(regionInput);

    // Cuando cambian la región, actualizo las comunas correspondientes
    regionInput.addEventListener("change", function () {
        cargarComunas(regionInput, comunaInput);
    });

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        
        const correo = document.getElementById("correoInput").value.trim();

        // Valido el dominio del correo antes de registrar al nuevo usuario
        if (!validarDominioCorreo(correo)) {
            alert("No se puede registrar: El dominio del correo no está autorizado. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return;
        }

        const usuarios = obtenerUsuarios();

        // Armo el objeto con los datos del form
        const nuevoUsuario = {
            id: obtenerNuevoId(usuarios),
            run: document.getElementById("runInput").value.trim(),
            nombre: document.getElementById("nombreInput").value.trim(),
            apellido: document.getElementById("apellidoInput").value.trim(),
            correo: correo,
            fechaNacimiento: document.getElementById("fechaNacInput").value,
            rol: document.getElementById("rolInput").value,
            region: document.getElementById("regionInput").value,
            comuna: document.getElementById("comunaInput").value,
            direccion: document.getElementById("direccionInput").value.trim(),
            clave: "123456" // Contraseña por defecto para los nuevos
        };

        usuarios.push(nuevoUsuario);
        guardarUsuarios(usuarios);
        alert("Usuario agregado correctamente.");
        window.location.href = "admin-mostrar-usuario.html";
    });
}

// Llenar el formulario de edición con los datos del usuario seleccionado
function configurarFormularioEditar() {
    const formulario = document.getElementById("formEditarUsuario");
    if (!formulario) return;

    // Saco el ID que guardé antes en seleccionarUsuarioParaEditar()
    const id = Number(sessionStorage.getItem("usuarioAEditar"));

    if (!id) {
        alert("No se ha seleccionado ningún usuario.");
        window.location.href = "admin-mostrar-usuario.html";
        return;
    }

    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find(function (usuario) {
        return usuario.id === id;
    });

    if (!usuario) {
        alert("Usuario no encontrado.");
        window.location.href = "admin-mostrar-usuario.html";
        return;
    }

    // Pongo los datos del usuario en los inputs del HTML
    document.getElementById("editIdInput").value = usuario.id;
    document.getElementById("editRunInput").value = usuario.run;
    document.getElementById("editNombreInput").value = usuario.nombre;
    document.getElementById("editApellidoInput").value = usuario.apellido;
    document.getElementById("editCorreoInput").value = usuario.correo;
    document.getElementById("editFechaNacInput").value = usuario.fechaNacimiento;
    document.getElementById("editRolInput").value = usuario.rol;
    document.getElementById("editDireccionInput").value = usuario.direccion;

    const regionInput = document.getElementById("editRegionInput");
    const comunaInput = document.getElementById("editComunaInput");

    // Configuro las regiones y comunas en los selects
    cargarRegiones(regionInput);
    regionInput.value = usuario.region;
    cargarComunas(regionInput, comunaInput);
    comunaInput.value = usuario.comuna;

    regionInput.addEventListener("change", function () {
        cargarComunas(regionInput, comunaInput);
    });

    // Al enviar el form, actualizo los datos del objeto
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const correo = document.getElementById("editCorreoInput").value.trim();

        // Valido el dominio del correo también en la edición, por si acaso
        if (!validarDominioCorreo(correo)) {
            alert("No se puede guardar: El dominio del correo no está autorizado. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return;
        }

        usuario.run = document.getElementById("editRunInput").value.trim();
        usuario.nombre = document.getElementById("editNombreInput").value.trim();
        usuario.apellido = document.getElementById("editApellidoInput").value.trim();
        usuario.correo = correo;
        usuario.fechaNacimiento = document.getElementById("editFechaNacInput").value;
        usuario.rol = document.getElementById("editRolInput").value;
        usuario.region = document.getElementById("editRegionInput").value;
        usuario.comuna = document.getElementById("editComunaInput").value;
        usuario.direccion = document.getElementById("editDireccionInput").value.trim();

        guardarUsuarios(usuarios);
        sessionStorage.removeItem("usuarioAEditar"); // Limpio el ID guardado
        alert("Usuario actualizado correctamente.");
        window.location.href = "admin-mostrar-usuario.html";
    });
}

// Llena el select de regiones leyendo las llaves del objeto regionesYComunas
function cargarRegiones(selectRegion) {
    selectRegion.innerHTML = `<option value="" disabled selected>Seleccione una región...</option>`;
    Object.keys(regionesYComunas).forEach(function (region) {
        const opcion = document.createElement("option");
        opcion.value = region;
        opcion.textContent = region;
        selectRegion.appendChild(opcion);
    });
}

// Llena el select de comunas dependiendo de la región que hayan elegido
function cargarComunas(selectRegion, selectComuna) {
    const region = selectRegion.value;
    const comunas = regionesYComunas[region] || [];

    selectComuna.innerHTML = `<option value="" disabled selected>Seleccione una comuna...</option>`;
    
    comunas.forEach(function (comuna) {
        const opcion = document.createElement("option");
        opcion.value = comuna;
        opcion.textContent = comuna;
        selectComuna.appendChild(opcion);
    });

    // Si no hay comunas (ej. no han seleccionado región), deshabilito el select para que no cliquen por error
    selectComuna.disabled = comunas.length === 0;
}

// Función para calcular el ID del nuevo usuario sumándole 1 al más alto
function obtenerNuevoId(usuarios) {
    if (usuarios.length === 0) return 1; // Si no hay usuarios, empezamos en 1
    
    const ids = usuarios.map(function (usuario) {
        return usuario.id;
    });
    
    return Math.max(...ids) + 1;
}

// Borro un usuario usando filter para dejar todos menos el que coincida con el ID
function eliminarUsuario(id) {
    const confirmar = confirm("¿Está seguro de que desea eliminar este usuario?");
    if (!confirmar) return;

    let usuarios = obtenerUsuarios();
    usuarios = usuarios.filter(function (usuario) {
        return usuario.id !== id;
    });

    guardarUsuarios(usuarios);
    mostrarUsuarios(); // Refresco la tabla para que desaparezca
    alert("Usuario eliminado correctamente.");
}

// Ejecuto todas las configuraciones cuando el DOM (HTML) termine de cargar
document.addEventListener("DOMContentLoaded", function () {
    inicializarUsuarios();
    configurarLogin();
    mostrarUsuarios();
    configurarFormularioAgregar();
    configurarFormularioEditar();
});