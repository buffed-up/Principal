// 1. Usuarios por defecto unificados con la estructura COMPLETA (incluyendo RUN, nombre, etc.)
const usuariosIniciales = [
    { 
        id: 1, 
        run: "19011022K", 
        nombre: "Admin", 
        apellido: "Principal", 
        correo: "admin@profesor.duoc.cl", 
        fechaNacimiento: "1980-01-01",
        rol: "administrador", // Actualizado para coincidir con tu select
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

// 2. Intentar obtener la lista guardada en localStorage
let listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));

// Validamos que exista y que tenga la estructura nueva (revisando si tiene 'run')
if (!listaUsuarios || !Array.isArray(listaUsuarios) || !('run' in listaUsuarios[0])) {
    listaUsuarios = usuariosIniciales;
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
}

console.log("Lista de usuarios cargada:", listaUsuarios);

// 3. Capturar elementos del HTML mediante los nuevos IDs
const formulario = document.getElementById('loginForm');
const correoInput = document.getElementById('correoInput');
const passwordInput = document.getElementById('passwordInput');

// 4. Evento principal de inicio de sesión con validaciones
if (formulario) {
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

            // 2. Redirigir según el rol (ahora valida 'administrador' en lugar de 'admin')
            if (usuarioValido.rol === 'administrador') {
                window.location.href = "admin.html"; 
            } else if (usuarioValido.rol === 'vendedor') {
                window.location.href = "vendedor.html"; // Por si a futuro creas la vista del vendedor
            } else {
                window.location.href = "index.html"; 
            }
        } else {
            alert(`¡Inicio de sesión Erróneo! Correo o contraseña incorrectos.`);
        }
    });
}