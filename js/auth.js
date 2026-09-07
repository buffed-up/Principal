// 1. Usuarios por defecto ajustados a los dominios permitidos por la pauta
const usuariosIniciales = [
    {
        correo: "admin@profesor.duoc.cl",
        clave: "admin123",
        rol: "admin"
    },
    {
        correo: "jugador@duoc.cl",
        clave: "user123",
        rol: "cliente"
    }
];

// 2. Intentar obtener la lista guardada en localStorage
let listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));

if (!listaUsuarios) {
    listaUsuarios = usuariosIniciales;
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
}

console.log("Lista de usuarios cargada:", listaUsuarios);

// 3. Capturar elementos del HTML mediante los nuevos IDs
const formulario = document.getElementById('loginForm');
const correoInput = document.getElementById('correoInput');
const passwordInput = document.getElementById('passwordInput');

// 4. Evento principal de inicio de sesión con validaciones
formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const correo = correoInput.value.trim();
    const clave = passwordInput.value.trim();

    // --- VALIDACIÓN DE CORREO ---
    if (correo === "") {
        alert("El correo es requerido.");
        return;
    }

    if (correo.length > 100) {
        alert("El correo no puede tener más de 100 caracteres.");
        return;
    }

    const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const tieneDominioValido = dominiosValidos.some(dominio => correo.endsWith(dominio));

    if (!tieneDominioValido) {
        alert("Solo se permiten correos con @duoc.cl, @profesor.duoc.cl o @gmail.com");
        return;
    }

    // --- VALIDACIÓN DE CONTRASEÑA ---
    if (clave === "") {
        alert("La contraseña es requerida.");
        return;
    }

    if (clave.length < 4 || clave.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        return;
    }

    // --- BÚSQUEDA Y VERIFICACIÓN ---
    const usuarioValido = listaUsuarios.find(u => u.correo === correo && u.clave === clave);

if (usuarioValido) {
        // 1. Guardar quién inició sesión para leerlo en las demás páginas
        sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarioValido));

        alert(`¡Inicio de sesión exitoso! Bienvenido/a (${usuarioValido.rol})`);

        // 2. Redirigir según el rol o hacia el menú principal
        if (usuarioValido.rol === 'admin') {
            window.location.href = "admin.html"; // Cambia por la vista de administrador si existe
        } else {
            window.location.href = "index.html"; // Vista general para clientes/usuarios
        }
    }
});