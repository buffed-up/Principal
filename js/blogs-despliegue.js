(function diagnosticarError() {
    const boton = document.querySelector('button[onclick="toggleOverlay(this)"]');
    if (!boton) {
        console.error("❌ ERROR: No se encontró ningún botón con onclick='toggleOverlay(this)'.");
        return;
    }

    const card = boton.closest('.card');
    if (!card) {
        console.error("❌ ERROR: El botón está fuera del contenedor '.card'.");
        return;
    }

    const overlay = card.querySelector('.card-overlay');
    if (!overlay) {
        console.error("❌ ERROR CRÍTICO: El '.card-overlay' NO ESTÁ DENTRO de '.card'. Revisa tu HTML.");
        console.log("📍 Estructura actual de tu tarjeta:", card);
        return;
    }

    if (getComputedStyle(overlay).display === 'none') {
        console.error("❌ ERROR CSS: El overlay tiene 'display: none' por defecto y no se puede desplegar.");
        return;
    }

    console.log("✅ ESTRUCTURA CORRECTA. Al presionar el botón debería funcionar.");
})();