document.addEventListener('DOMContentLoaded', () => {
    // 1. Leer el usuario activo desde sessionStorage
    const usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo'));

    // 2. Verificar si no hay sesión iniciada o si el rol no es admin
    if (!usuarioActivo || usuarioActivo.rol !== 'administrador') {
        alert("Acceso denegado. Serás redirigido al inicio de sesión.");
        window.location.href = "login.html"; // Ajusta el nombre de tu archivo login
    }

    // 3. Lógica para el botón de cerrar sesión
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            sessionStorage.removeItem('usuarioActivo');
            window.location.href = "login.html"; // Ajusta al archivo correspondiente
        });
    }
});