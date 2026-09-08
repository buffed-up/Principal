
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


// ==========================================
// REGIONES Y COMUNAS
// ==========================================

const regionesYComunas = {

    "Región Metropolitana": [
        "Santiago",
        "Puente Alto",
        "Maipú",
        "Providencia"
    ],

    "Región de Valparaíso": [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué",
        "Villa Alemana"
    ],

    "Región del Biobío": [
        "Concepción",
        "Talcahuano",
        "Los Ángeles"
    ]

};


// ==========================================
// INICIALIZAR USUARIOS
// ==========================================

function inicializarUsuarios() {

    if (!localStorage.getItem("usuariosDb")) {

        localStorage.setItem(
            "usuariosDb",
            JSON.stringify(usuariosIniciales)
        );

    }

}


// ==========================================
// OBTENER USUARIOS
// ==========================================

function obtenerUsuarios() {

    return JSON.parse(
        localStorage.getItem("usuariosDb")
    ) || [];

}


// ==========================================
// GUARDAR USUARIOS
// ==========================================

function guardarUsuarios(usuarios) {

    localStorage.setItem(
        "usuariosDb",
        JSON.stringify(usuarios)
    );

}


// ==========================================
// LOGIN
// ==========================================

function configurarLogin() {

    const formularioLogin =
        document.getElementById("loginForm");

    if (!formularioLogin) {
        return;
    }


    formularioLogin.addEventListener("submit", function (evento) {

        evento.preventDefault();


        const correo =
            document.getElementById("correoInput").value.trim();

        const clave =
            document.getElementById("passwordInput").value.trim();


        const usuarios = obtenerUsuarios();


        const usuario = usuarios.find(function (usuario) {

            return usuario.correo === correo &&
                usuario.clave === clave;

        });


        if (!usuario) {

            alert("Correo o contraseña incorrectos.");

            return;
        }


        // Guardar usuario activo
        sessionStorage.setItem(
            "usuarioActivo",
            JSON.stringify(usuario)
        );


        // Redireccionar según el rol
        if (usuario.rol === "administrador") {

            alert(
                "¡Bienvenido administrador " +
                usuario.nombre +
                "!"
            );

            window.location.href = "admin.html";

        } else {

            alert(
                "¡Bienvenido " +
                usuario.nombre +
                "!"
            );

            window.location.href = "index.html";

        }

    });

}


// ==========================================
// MOSTRAR USUARIOS
// ==========================================

function mostrarUsuarios() {

    const tabla =
        document.getElementById("tabla-usuarios");

    if (!tabla) {
        return;
    }


    const usuarios = obtenerUsuarios();


    tabla.innerHTML = "";


    if (usuarios.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="6">
                    No hay usuarios registrados.
                </td>
            </tr>
        `;

        return;
    }


    usuarios.forEach(function (usuario) {

        const fila =
            document.createElement("tr");


        fila.innerHTML = `
            <td>${usuario.id}</td>

            <td>${usuario.run}</td>

            <td>
                ${usuario.nombre} ${usuario.apellido}
            </td>

            <td>${usuario.correo}</td>

            <td>${usuario.rol}</td>

            <td>

                <a
                    href="admin-editar-usuario.html"
                    class="btn btn-warning btn-sm"
                    onclick="seleccionarUsuarioParaEditar(${usuario.id})">

                    Editar

                </a>


                <button
                    class="btn btn-danger btn-sm"
                    onclick="eliminarUsuario(${usuario.id})">

                    Eliminar

                </button>

            </td>
        `;


        tabla.appendChild(fila);

    });

}


// ==========================================
// SELECCIONAR USUARIO PARA EDITAR
// ==========================================

function seleccionarUsuarioParaEditar(id) {

    sessionStorage.setItem(
        "usuarioAEditar",
        id
    );

}


// ==========================================
// CONFIGURAR FORMULARIO AGREGAR
// ==========================================

function configurarFormularioAgregar() {

    const formulario =
        document.getElementById("formNuevoUsuario");

    if (!formulario) {
        return;
    }


    const regionInput =
        document.getElementById("regionInput");

    const comunaInput =
        document.getElementById("comunaInput");


    // Cargar regiones
    cargarRegiones(regionInput);


    // Cambiar región
    regionInput.addEventListener("change", function () {

        cargarComunas(
            regionInput,
            comunaInput
        );

    });


    // Guardar usuario
    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();


        const usuarios = obtenerUsuarios();


        const nuevoUsuario = {

            id: obtenerNuevoId(usuarios),

            run:
                document.getElementById("runInput").value.trim(),

            nombre:
                document.getElementById("nombreInput").value.trim(),

            apellido:
                document.getElementById("apellidoInput").value.trim(),

            correo:
                document.getElementById("correoInput").value.trim(),

            fechaNacimiento:
                document.getElementById("fechaNacInput").value,

            rol:
                document.getElementById("rolInput").value,

            region:
                document.getElementById("regionInput").value,

            comuna:
                document.getElementById("comunaInput").value,

            direccion:
                document.getElementById("direccionInput").value.trim(),

            clave: "123456"

        };


        usuarios.push(nuevoUsuario);


        guardarUsuarios(usuarios);


        alert("Usuario agregado correctamente.");


        window.location.href =
            "admin-mostrar-usuario.html";

    });

}


// ==========================================
// CONFIGURAR FORMULARIO EDITAR
// ==========================================

function configurarFormularioEditar() {

    const formulario =
        document.getElementById("formEditarUsuario");

    if (!formulario) {
        return;
    }


    // Obtener ID seleccionado
    const id =
        Number(sessionStorage.getItem("usuarioAEditar"));


    if (!id) {

        alert("No se ha seleccionado ningún usuario.");

        window.location.href =
            "admin-mostrar-usuario.html";

        return;
    }


    const usuarios = obtenerUsuarios();


    const usuario =
        usuarios.find(function (usuario) {

            return usuario.id === id;

        });


    if (!usuario) {

        alert("Usuario no encontrado.");

        window.location.href =
            "admin-mostrar-usuario.html";

        return;
    }


    // --------------------------------------
    // CARGAR DATOS
    // --------------------------------------

    document.getElementById("editIdInput").value =
        usuario.id;

    document.getElementById("editRunInput").value =
        usuario.run;

    document.getElementById("editNombreInput").value =
        usuario.nombre;

    document.getElementById("editApellidoInput").value =
        usuario.apellido;

    document.getElementById("editCorreoInput").value =
        usuario.correo;

    document.getElementById("editFechaNacInput").value =
        usuario.fechaNacimiento;

    document.getElementById("editRolInput").value =
        usuario.rol;

    document.getElementById("editDireccionInput").value =
        usuario.direccion;


    // --------------------------------------
    // REGIÓN Y COMUNA
    // --------------------------------------

    const regionInput =
        document.getElementById("editRegionInput");

    const comunaInput =
        document.getElementById("editComunaInput");


    cargarRegiones(regionInput);


    regionInput.value =
        usuario.region;


    cargarComunas(
        regionInput,
        comunaInput
    );


    comunaInput.value =
        usuario.comuna;


    // Cambiar región
    regionInput.addEventListener("change", function () {

        cargarComunas(
            regionInput,
            comunaInput
        );

    });


    // --------------------------------------
    // ACTUALIZAR USUARIO
    // --------------------------------------

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();


        usuario.run =
            document.getElementById("editRunInput").value.trim();

        usuario.nombre =
            document.getElementById("editNombreInput").value.trim();

        usuario.apellido =
            document.getElementById("editApellidoInput").value.trim();

        usuario.correo =
            document.getElementById("editCorreoInput").value.trim();

        usuario.fechaNacimiento =
            document.getElementById("editFechaNacInput").value;

        usuario.rol =
            document.getElementById("editRolInput").value;

        usuario.region =
            document.getElementById("editRegionInput").value;

        usuario.comuna =
            document.getElementById("editComunaInput").value;

        usuario.direccion =
            document.getElementById("editDireccionInput").value.trim();


        guardarUsuarios(usuarios);


        // Limpiar selección
        sessionStorage.removeItem(
            "usuarioAEditar"
        );


        alert("Usuario actualizado correctamente.");


        window.location.href =
            "admin-mostrar-usuario.html";

    });

}


// ==========================================
// CARGAR REGIONES
// ==========================================

function cargarRegiones(selectRegion) {

    selectRegion.innerHTML = `
        <option value="" disabled selected>
            Seleccione una región...
        </option>
    `;


    Object.keys(regionesYComunas).forEach(function (region) {

        const opcion =
            document.createElement("option");


        opcion.value =
            region;

        opcion.textContent =
            region;


        selectRegion.appendChild(opcion);

    });

}


// ==========================================
// CARGAR COMUNAS
// ==========================================

function cargarComunas(selectRegion, selectComuna) {

    const region =
        selectRegion.value;


    const comunas =
        regionesYComunas[region] || [];


    selectComuna.innerHTML = `
        <option value="" disabled selected>
            Seleccione una comuna...
        </option>
    `;


    comunas.forEach(function (comuna) {

        const opcion =
            document.createElement("option");


        opcion.value =
            comuna;

        opcion.textContent =
            comuna;


        selectComuna.appendChild(opcion);

    });


    selectComuna.disabled =
        comunas.length === 0;

}


// ==========================================
// GENERAR ID
// ==========================================

function obtenerNuevoId(usuarios) {

    if (usuarios.length === 0) {
        return 1;
    }


    const ids =
        usuarios.map(function (usuario) {

            return usuario.id;

        });


    return Math.max(...ids) + 1;

}


// ==========================================
// ELIMINAR USUARIO
// ==========================================

function eliminarUsuario(id) {

    const confirmar =
        confirm(
            "¿Está seguro de que desea eliminar este usuario?"
        );


    if (!confirmar) {
        return;
    }


    let usuarios =
        obtenerUsuarios();


    usuarios =
        usuarios.filter(function (usuario) {

            return usuario.id !== id;

        });


    guardarUsuarios(usuarios);


    mostrarUsuarios();


    alert("Usuario eliminado correctamente.");

}


// ==========================================
// INICIAR APLICACIÓN
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    inicializarUsuarios();

    configurarLogin();

    mostrarUsuarios();

    configurarFormularioAgregar();

    configurarFormularioEditar();

});