
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

let coloresActuales = [];
let temporizadorFeedback;


// ==========================================
// 3. FUNCIÓN DE MICROFEEDBACK
// ==========================================

function mostrarFeedback(mensaje) {

    clearTimeout(temporizadorFeedback);

    mensajeFeedback.textContent = mensaje;

    temporizadorFeedback = setTimeout(function() {
        mensajeFeedback.textContent = "";
    }, 4000);
}


// ==========================================
// 4. FUNCIONES DE GENERACIÓN Y CONVERSIÓN
// ==========================================

// 4.1 Genera un color aleatorio en formato RGB.

function generarColor() {
    const rojo = Math.floor(Math.random() * 256);
    const verde = Math.floor(Math.random() * 256);
    const azul = Math.floor(Math.random() * 256);

    return {
        rojo: rojo,
        verde: verde,
        azul: azul,
        bloqueado: false
    };
}


// 4.2 Convierte RGB a HEX.

function convertirRGBaHEX(color) {
    const rojo = color.rojo.toString(16).padStart(2, "0");
    const verde = color.verde.toString(16).padStart(2, "0");
    const azul = color.azul.toString(16).padStart(2, "0");

    return `#${rojo}${verde}${azul}`;
}


// 4.3 Convierte RGB a HSL.

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


// 4.4 Convierte RGB a RGBA.

function convertirRGBaRGBA(color) {
    return `rgba(${color.rojo}, ${color.verde}, ${color.azul}, 1)`;
}


// 4.5 Obtiene la representación según el formato seleccionado.

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
// 5. FUNCIÓN PARA COPIAR CÓDIGOS
// ==========================================

async function copiarCodigo(codigo) {

    try {
        await navigator.clipboard.writeText(codigo);

        mostrarFeedback(`¡Código ${codigo} copiado!`);

    } catch (error) {

        mostrarFeedback(
            "No se pudo copiar el código. Verificá los permisos del navegador."
        );
    }
}


// ==========================================
// 6. FUNCIÓN PARA MOSTRAR LA PALETA
// ==========================================

function mostrarPaleta(colores, formato) {

    paleta.innerHTML = "";

    for (const color of colores) {

        // Crear la tarjeta principal.
        const nuevaTarjeta = document.createElement("div");
        nuevaTarjeta.classList.add("color-card");

        // Crear la vista previa del color.
        const vistaColor = document.createElement("div");
        vistaColor.classList.add("color-preview");

        vistaColor.style.backgroundColor =
            `rgb(${color.rojo}, ${color.verde}, ${color.azul})`;

        // Crear la casilla para conservar el color.
        const conservarColor = document.createElement("label");
        conservarColor.classList.add("conservar-color");

        const textoConservar = document.createElement("span");
        textoConservar.textContent = "Conservar";

        const casillaConservar = document.createElement("input");
        casillaConservar.type = "checkbox";
        casillaConservar.checked = color.bloqueado;

        casillaConservar.setAttribute(
            "aria-label",
            "Conservar este color"
        );

        casillaConservar.addEventListener("change", function() {
            color.bloqueado = casillaConservar.checked;
        });

        conservarColor.appendChild(textoConservar);
        conservarColor.appendChild(casillaConservar);

        vistaColor.appendChild(conservarColor);

        // Crear el botón para mostrar y copiar el código.
        const codigoColor = document.createElement("button");
        codigoColor.type = "button";
        codigoColor.classList.add("color-code");

        const codigo = obtenerCodigoColor(color, formato);

        // Crear el texto del código.
        const textoCodigo = document.createElement("span");
        textoCodigo.classList.add("codigo-texto");
        textoCodigo.textContent = codigo;

        // Crear el ícono SVG de Lucide: Copy.
        const iconoCopiar = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

        iconoCopiar.setAttribute("viewBox", "0 0 24 24");
        iconoCopiar.setAttribute("width", "16");
        iconoCopiar.setAttribute("height", "16");
        iconoCopiar.setAttribute("fill", "none");
        iconoCopiar.setAttribute("stroke", "currentColor");
        iconoCopiar.setAttribute("stroke-width", "2");
        iconoCopiar.setAttribute("stroke-linecap", "round");
        iconoCopiar.setAttribute("stroke-linejoin", "round");
        iconoCopiar.setAttribute("aria-hidden", "true");
        iconoCopiar.classList.add("icono-copiar");

        // Parte trasera del ícono.
        const parteTrasera = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

        parteTrasera.setAttribute(
            "d",
            "M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"
        );

        // Parte delantera del ícono.
        const parteDelantera = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
        );

        parteDelantera.setAttribute("x", "8");
        parteDelantera.setAttribute("y", "8");
        parteDelantera.setAttribute("width", "13");
        parteDelantera.setAttribute("height", "13");
        parteDelantera.setAttribute("rx", "2");

        iconoCopiar.appendChild(parteTrasera);
        iconoCopiar.appendChild(parteDelantera);

        // Agregar el texto y el ícono al botón.
        codigoColor.appendChild(textoCodigo);
        codigoColor.appendChild(iconoCopiar);

        codigoColor.setAttribute(
            "aria-label",
            `Copiar código de color ${codigo}`
        );

        // Copiar el código al hacer clic.
        codigoColor.addEventListener("click", function() {
            copiarCodigo(codigo);
        });

        // Unir los elementos de la tarjeta.
        nuevaTarjeta.appendChild(vistaColor);
        nuevaTarjeta.appendChild(codigoColor);

        paleta.appendChild(nuevaTarjeta);
    }
}


// ==========================================
// 7. EVENTOS
// ==========================================

// 7.1 Evento del botón Generar paleta.

botonGenerar.addEventListener("click", function() {

    const cantidad = Number(selectorCantidad.value);

    // Evitar eliminar un color bloqueado al reducir la cantidad.
    const hayBloqueadosFueraDeRango = coloresActuales.some(
        (color, indice) => color.bloqueado && indice >= cantidad
    );

    if (hayBloqueadosFueraDeRango) {
        selectorCantidad.value = String(coloresActuales.length);

        mostrarFeedback(
            "Desbloqueá los colores que están fuera de la cantidad seleccionada."
        );

        return;
    }

    // Generar una nueva paleta respetando cada posición bloqueada.
    const nuevaPaleta = [];

    for (let indice = 0; indice < cantidad; indice++) {

        const colorActual = coloresActuales[indice];

        if (colorActual && colorActual.bloqueado) {
            nuevaPaleta.push(colorActual);

        } else {
            nuevaPaleta.push(generarColor());
        }
    }

    coloresActuales = nuevaPaleta;

    mostrarPaleta(coloresActuales, selectorFormato.value);

    mostrarFeedback("¡Nueva paleta generada!");
});


// 7.2 Evento del selector de formatos.

selectorFormato.addEventListener("change", function() {

    if (coloresActuales.length === 0) {
        return;
    }

    mostrarPaleta(coloresActuales, selectorFormato.value);
});


// 7.3 Evento del selector de cantidad.

selectorCantidad.addEventListener("change", function() {

    if (coloresActuales.length === 0) {
        return;
    }

    const cantidad = Number(selectorCantidad.value);

    // Comprobar si se intenta quitar una posición bloqueada.
    const hayBloqueadosFueraDeRango = coloresActuales.some(
        (color, indice) => color.bloqueado && indice >= cantidad
    );

    if (hayBloqueadosFueraDeRango) {

        selectorCantidad.value = String(coloresActuales.length);

        mostrarFeedback(
            "Desbloqueá los colores que están fuera de la cantidad seleccionada."
        );

        return;
    }

    // Copiar los colores existentes respetando sus posiciones.
    const nuevaPaleta = coloresActuales.slice(0, cantidad);

    // Agregar colores nuevos si aumentó la cantidad.
    while (nuevaPaleta.length < cantidad) {
        nuevaPaleta.push(generarColor());
    }

    coloresActuales = nuevaPaleta;

    mostrarPaleta(coloresActuales, selectorFormato.value);

    mostrarFeedback("¡Cantidad de colores actualizada!");
});
