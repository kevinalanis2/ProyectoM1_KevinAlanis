
// ==========================================
// 1. SELECCIÓN DE ELEMENTOS HTML (DOM)
// ==========================================

const paleta = document.getElementById("paleta");
const botonGenerar = document.getElementById("generar-paleta");
const selectorCantidad = document.getElementById("cantidad-colores");
const selectorFormato = document.getElementById("formato-color");
const mensajeFeedback = document.getElementById("mensaje-feedback");


// ==========================================
// 2. ESTADO DE LA APLICACIÓN
// ==========================================

// Conserva los colores actuales en formato RGB.

let coloresActuales = [];


// ==========================================
// 3. FUNCIONES DE GENERACIÓN Y CONVERSIÓN
// ==========================================

// 3.1 Genera un color aleatorio en formato RGB.

function generarColor() {
    const rojo = Math.floor(Math.random() * 256);
    const verde = Math.floor(Math.random() * 256);
    const azul = Math.floor(Math.random() * 256);

    return {
        rojo: rojo,
        verde: verde,
        azul: azul
    };
}


// 3.2 Convierte RGB a HEX.

function convertirRGBaHEX(color) {
    const rojo = color.rojo.toString(16).padStart(2, "0");
    const verde = color.verde.toString(16).padStart(2, "0");
    const azul = color.azul.toString(16).padStart(2, "0");

    return `#${rojo}${verde}${azul}`;
}


// 3.3 Convierte RGB a HSL.

function convertirRGBaHSL(color) {
    const rojo = color.rojo / 255;
    const verde = color.verde / 255;
    const azul = color.azul / 255;

    const maximo = Math.max(rojo, verde, azul);
    const minimo = Math.min(rojo, verde, azul);
    const diferencia = maximo - minimo;

    let tono = 0;
    let saturacion = 0;

    const luminosidad = (maximo + minimo) / 2;

    if (diferencia !== 0) {

        if (maximo === rojo) {
            tono = 60 * (((verde - azul) / diferencia) % 6);

        } else if (maximo === verde) {
            tono = 60 * ((azul - rojo) / diferencia + 2);

        } else {
            tono = 60 * ((rojo - verde) / diferencia + 4);
        }

        if (tono < 0) {
            tono += 360;
        }

        saturacion = diferencia / (1 - Math.abs(2 * luminosidad - 1));
    }

    const tonoFinal = Math.round(tono);
    const saturacionFinal = Math.round(saturacion * 100);
    const luminosidadFinal = Math.round(luminosidad * 100);

    return `hsl(${tonoFinal}, ${saturacionFinal}%, ${luminosidadFinal}%)`;
}


// 3.4 Convierte RGB a RGBA.

function convertirRGBaRGBA(color) {
    return `rgba(${color.rojo}, ${color.verde}, ${color.azul}, 1)`;
}


// 3.5 Obtiene la representación según el formato seleccionado.

function obtenerCodigoColor(color, formato) {

    switch (formato) {

        case "HEX":
            return convertirRGBaHEX(color);

        case "HSL":
            return convertirRGBaHSL(color);

        case "RGBA":
            return convertirRGBaRGBA(color);

        default:
            return convertirRGBaHEX(color);
    }
}


// ==========================================
// 4. FUNCIÓN PARA MOSTRAR LA PALETA
// ==========================================

function mostrarPaleta(colores, formato) {

    // Limpiar las tarjetas anteriores.
    paleta.innerHTML = "";

    // Recorrer los colores de la paleta.
    for (const color of colores) {

        // Crear la tarjeta principal.
        const nuevaTarjeta = document.createElement("div");
        nuevaTarjeta.classList.add("color-card");

        // Crear la vista previa del color.
        const vistaColor = document.createElement("div");
        vistaColor.classList.add("color-preview");

        vistaColor.style.backgroundColor =
            `rgb(${color.rojo}, ${color.verde}, ${color.azul})`;

        // Crear el espacio para mostrar el código.
        const codigoColor = document.createElement("div");
        codigoColor.classList.add("color-code");

        codigoColor.textContent = obtenerCodigoColor(color, formato);

        // Unir los elementos de la tarjeta.
        nuevaTarjeta.appendChild(vistaColor);
        nuevaTarjeta.appendChild(codigoColor);

        // Agregar la tarjeta a la galería.
        paleta.appendChild(nuevaTarjeta);
    }
}


// ==========================================
// 5. EVENTOS
// ==========================================

// 5.1 Evento del botón Generar paleta.

botonGenerar.addEventListener("click", function() {

    const cantidad = Number(selectorCantidad.value);

    // Crear una nueva paleta.
    coloresActuales = [];

    for (let i = 0; i < cantidad; i++) {
        coloresActuales.push(generarColor());
    }

    // Mostrar la paleta en el formato seleccionado.
    mostrarPaleta(coloresActuales, selectorFormato.value);
    
    // Mostrar mensaje de confirmación.
    mensajeFeedback.textContent = "¡Nueva paleta generada!";
});



// 5.2 Evento del selector de formatos.

selectorFormato.addEventListener("change", function() {

    // Si todavía no hay colores, no hay nada que actualizar.
    if (coloresActuales.length === 0) {
        return;
    }

    // Volver a mostrar los mismos colores en el nuevo formato.
    mostrarPaleta(coloresActuales, selectorFormato.value);
});
// 5.3 Evento del selector de cantidad.

selectorCantidad.addEventListener("change", function() {

    // Si todavía no hay una paleta generada, no hacemos nada.
    if (coloresActuales.length === 0) {
        return;
    }

    // Obtener la nueva cantidad seleccionada.
    const cantidad = Number(selectorCantidad.value);

    // Agregar colores si faltan.
    while (coloresActuales.length < cantidad) {
        coloresActuales.push(generarColor());
    }

    // Eliminar colores sobrantes si hay demasiados.
    coloresActuales.length = cantidad;

    // Actualizar la galería conservando el formato seleccionado.
    mostrarPaleta(coloresActuales, selectorFormato.value);
});