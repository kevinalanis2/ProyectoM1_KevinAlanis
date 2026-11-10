
// ==========================================
// 1. SELECCIÓN DE ELEMENTOS HTML (DOM)
// ==========================================

const paleta = document.getElementById("paleta");
const botonGenerar = document.getElementById("generar-paleta");
const selectorCantidad = document.getElementById("cantidad-colores");


// ==========================================
// 2. FUNCIONES
// ==========================================

// Genera un color hexadecimal aleatorio

function generarColor() {
    const rojo = Math.floor(Math.random() * 256);
    const verde = Math.floor(Math.random() * 256);
    const azul = Math.floor(Math.random() * 256);

    const r = rojo.toString(16).padStart(2, "0");
    const g = verde.toString(16).padStart(2, "0");
    const b = azul.toString(16).padStart(2, "0");

    return `#${r}${g}${b}`;
}


// ==========================================

// ==========================================
// 3. EVENTOS
// ==========================================

// Detecta el clic en el botón Generar paleta

botonGenerar.addEventListener("click", function() {

    // 3.1 Obtener la cantidad seleccionada
    const cantidad = Number(selectorCantidad.value);
    
    console.log("Cantidad seleccionada:", cantidad);
    // 3.2 Preparar el array de colores
    const colores = [];

    // 3.3 Limpiar la galería anterior
    paleta.innerHTML = "";

    // 3.4 Generar y mostrar las tarjetas
    for (let i = 0; i < cantidad; i++) {

        // Generar un color aleatorio
        const color = generarColor();

        // Guardar el color en el array
        colores.push(color);

        // Crear la tarjeta principal
        const nuevaTarjeta = document.createElement("div");
        nuevaTarjeta.classList.add("color-card");

        // Crear la superficie de color
        const vistaColor = document.createElement("div");
        vistaColor.classList.add("color-preview");
        vistaColor.style.backgroundColor = color;

        // Crear el espacio para el código HEX
        const codigoColor = document.createElement("div");
        codigoColor.classList.add("color-code");
        codigoColor.textContent = color;

        // Unir los elementos
        nuevaTarjeta.appendChild(vistaColor);
        nuevaTarjeta.appendChild(codigoColor);

        // Incorporar la tarjeta a la galería
        paleta.appendChild(nuevaTarjeta);
    }

    // 3.5 Mostrar los colores generados en consola
    console.log(colores);

});

