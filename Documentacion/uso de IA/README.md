# Uso de inteligencia artificial

## Introducción

Durante el desarrollo de **Colorfly Generator** utilicé ChatGPT como herramienta de apoyo para resolver errores, implementar funcionalidades y mejorar la experiencia de usuario.

La IA funcionó como asistente de aprendizaje y desarrollo. Las propuestas se revisaron, probaron y adaptaron antes de incorporarlas al proyecto.

Los prompts se organizaron siguiendo las pautas del módulo **“Aprendiendo a conversar con la IA”** de Henry, incorporando contexto, objetivo, instrucciones, restricciones y formato de respuesta.

---

## 1. Corrección de errores en JavaScript

### Situación

Durante la implementación de la generación de paletas, las tarjetas se mostraban correctamente, pero siempre aparecían seis, independientemente de la cantidad seleccionada. En la consola también aparecía el error `Uncaught ReferenceError: cantidad is not defined`.

### Prompt

```text
CONTEXTO:
Estoy desarrollando Colorfly Generator para un proyecto de Henry. Utilizo HTML, CSS y JavaScript puro. Mi nivel de JavaScript es principiante.

OBJETIVO:
Corregir el error que impide generar la cantidad de tarjetas seleccionada.

INSTRUCCIONES:
1. Analiza el código JavaScript que te proporcionaré.
2. Identifica por qué la variable `cantidad` no está definida.
3. Corrige el problema para que se generen 6, 8 o 9 tarjetas según el selector.
4. Explícame qué causaba el error.

RESTRICCIONES:
- No utilices frameworks ni librerías externas.
- Conserva la estructura existente siempre que sea posible.
- Evita agregar código innecesario.

FORMATO DE RESPUESTA:
Primero explica el error en palabras simples y después muestra la corrección indicando dónde aplicarla.
```

### Respuesta de la IA

El error `cantidad is not defined` significa que JavaScript está intentando utilizar una variable llamada `cantidad` que no existe en el ámbito donde se está ejecutando ese código.

Para solucionarlo, hay que obtener el valor del selector y guardarlo en una variable dentro de la función que genera la paleta. Como el valor del `<select>` llega como texto, conviene convertirlo a número con `Number()`.

La lógica de generación puede organizarse así:

```javascript
botonGenerar.addEventListener("click", () => {
    const cantidad = Number(selectorCantidad.value);

    coloresActuales = [];

    for (let i = 0; i < cantidad; i++) {
        coloresActuales.push(generarColor());
    }

    mostrarPaleta(coloresActuales, selectorFormato.value);
});
```

**Explicación:**

- `selectorCantidad.value` obtiene la opción elegida por el usuario.
- `Number()` convierte ese valor en un número.
- `coloresActuales = []` prepara un arreglo nuevo para la nueva paleta.
- El bucle `for` genera exactamente la cantidad de colores seleccionada.
- `mostrarPaleta()` recibe el arreglo de colores y el formato seleccionado para actualizar las tarjetas.

Es importante que la variable `cantidad` se declare en el mismo bloque donde se utiliza. Así evitamos errores de alcance de variables.

### Aplicación y validación en Colorfly

Se corrigió la lectura de la cantidad seleccionada y la generación de tarjetas. Después comprobé las tres opciones disponibles: 6, 8 y 9 colores.

---

## 2. Actualización automática de la cantidad de colores

### Situación

Al probar la aplicación, observé que cambiar la cantidad en el selector no modificaba visualmente la galería hasta volver a presionar el botón para generar. Quería que la interfaz respondiera inmediatamente y conservara los colores existentes.

### Prompt

```text
CONTEXTO:
Estoy desarrollando Colorfly Generator con JavaScript puro. La aplicación permite generar paletas de 6, 8 o 9 colores.

OBJETIVO:
Actualizar automáticamente la cantidad de tarjetas cuando el usuario modifica el selector, conservando los colores que ya existen.

INSTRUCCIONES:
1. Detecta el evento de cambio del selector de cantidad.
2. Si aumenta la cantidad, agrega únicamente las tarjetas faltantes.
3. Si disminuye, elimina las tarjetas sobrantes.
4. Conserva los colores existentes.
5. Explica cómo funciona la solución.

RESTRICCIONES:
- No utilices frameworks ni librerías externas.
- No generes una paleta completamente nueva al cambiar la cantidad.
- Mantén el botón Generar para crear una paleta nueva cuando el usuario lo solicite.

FORMATO DE RESPUESTA:
Explica brevemente la lógica y proporciona el código JavaScript necesario, indicando dónde incorporarlo.
```

### Respuesta de la IA

Para conseguir ese comportamiento, necesitamos conservar los colores generados en un arreglo que pueda utilizarse desde distintos eventos. En Colorfly ese arreglo es `coloresActuales`.

El selector de cantidad debe escuchar el evento `change`. Cuando cambia su valor, comparamos la cantidad elegida con la cantidad de elementos que ya tiene el arreglo.

La lógica aplicada es la siguiente:

```javascript
selectorCantidad.addEventListener("change", () => {
    if (coloresActuales.length === 0) {
        return;
    }

    const cantidad = Number(selectorCantidad.value);

    while (coloresActuales.length < cantidad) {
        coloresActuales.push(generarColor());
    }

    coloresActuales.length = cantidad;

    mostrarPaleta(coloresActuales, selectorFormato.value);
});
```

**Explicación:**

- `change` detecta cuándo el usuario selecciona otra cantidad.
- Si todavía no existe una paleta generada, no hay colores que actualizar.
- El bucle `while` agrega colores solamente cuando hacen falta.
- Al asignar un nuevo valor a `coloresActuales.length`, se eliminan los elementos sobrantes cuando la cantidad seleccionada disminuye.
- Finalmente, `mostrarPaleta()` vuelve a dibujar las tarjetas con el contenido actualizado y el formato seleccionado.

Esta solución conserva los colores que ya estaban en el arreglo. Por eso, cambiar de 6 a 9 agrega tres colores, y volver de 9 a 6 elimina los últimos tres, sin reemplazar toda la paleta.

### Aplicación y validación en Colorfly

Se incorporó el evento `change` al selector de cantidad. La galería pasó a actualizarse automáticamente y a conservar los colores existentes.

**Prueba realizada:** seleccioné 6, luego 9 y nuevamente 6 colores. En los tres casos la cantidad de tarjetas se actualizó sin presionar otra vez el botón Generar.

---

## 3. Conversión de formatos de color

### Situación

Quería que el usuario pudiera visualizar una misma paleta en diferentes formatos: HEX, HSL y RGBA. El cambio de formato no debía generar colores nuevos, sino modificar únicamente los códigos mostrados.

### Prompt

```text
CONTEXTO:
Estoy desarrollando Colorfly Generator en JavaScript puro. La aplicación genera paletas de colores y permite seleccionar diferentes formatos de visualización.

OBJETIVO:
Implementar la conversión de colores entre HEX, HSL y RGBA sin modificar los colores originales de la paleta.

INSTRUCCIONES:
1. Utiliza una representación interna de los colores que permita convertirlos a los tres formatos.
2. Crea funciones independientes para cada conversión.
3. Actualiza los códigos mostrados cuando cambie el selector de formato.
4. Conserva los mismos colores al cambiar de formato.

RESTRICCIONES:
- No utilices librerías externas.
- No generes colores nuevos al cambiar el formato.
- Mantén el código organizado y fácil de comprender.

FORMATO DE RESPUESTA:
Explica la lógica de conversión y muestra el código necesario, separado en funciones para facilitar su comprensión.
```

### Respuesta de la IA

La solución consiste en separar el color de su representación visual. En Colorfly utilizamos RGB como formato interno: cada color se guarda como un objeto con sus tres componentes, rojo, verde y azul.

Por ejemplo:

```javascript
const color = {
    rojo: 255,
    verde: 0,
    azul: 128
};
```

A partir de ese mismo objeto podemos calcular los tres formatos. Así evitamos generar un color diferente cada vez que cambia el selector.

Se utilizan funciones independientes:

- `convertirRGBaHEX(color)`: convierte los canales RGB a hexadecimal. Para cada canal se utiliza `toString(16)` y `padStart(2, "0")` para asegurar que tenga dos caracteres.
- `convertirRGBaHSL(color)`: normaliza los canales dividiéndolos por 255 y calcula tono, saturación y luminosidad.
- `convertirRGBaRGBA(color)`: conserva los tres canales y agrega el valor de opacidad. En este proyecto se utiliza `1`, que representa opacidad completa.

La selección de la conversión se centraliza en `obtenerCodigoColor()` mediante una estructura `switch`:

```javascript
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
```

Cuando cambia el selector de formato, se vuelve a mostrar la paleta utilizando los colores que ya están almacenados:

```javascript
selectorFormato.addEventListener("change", () => {
    mostrarPaleta(coloresActuales, selectorFormato.value);
});
```

La función que muestra las tarjetas consulta el formato seleccionado y obtiene el código correspondiente para cada color. De esta manera, cambia el texto que se ve en las tarjetas, pero no los valores RGB guardados.

### Aplicación y validación en Colorfly

Se implementó RGB como representación interna y se organizaron las conversiones en funciones independientes. La función `obtenerCodigoColor()` decide qué formato mostrar, mientras que `mostrarPaleta()` actualiza las tarjetas.

**Prueba realizada:** cambié entre HEX, HSL y RGBA y comprobé que los códigos se modificaran sin cambiar las muestras de color de la paleta.

---

## 4. Mejora del diseño responsive

### Situación

Al probar Colorfly en dispositivos móviles, observé que los selectores ocupaban demasiado espacio y las tarjetas de colores necesitaban una distribución más cómoda. Quería mejorar la presentación para que la galería fuera fácil de utilizar en pantallas pequeñas.

### Prompt

```text
CONTEXTO:
Estoy desarrollando Colorfly Generator con HTML y CSS. La interfaz funciona en escritorio, pero necesito mejorar su presentación en dispositivos móviles.

OBJETIVO:
Optimizar la distribución de los controles y las tarjetas de colores para pantallas pequeñas.

INSTRUCCIONES:
1. Ajusta los selectores para que se adapten al ancho disponible.
2. Organiza la galería en tres columnas.
3. Reduce la altura de las tarjetas de 180px a aproximadamente 80px.
4. Mantén los códigos de color legibles.
5. Utiliza una media query para aplicar los cambios solamente en pantallas pequeñas.

RESTRICCIONES:
- No utilices frameworks CSS.
- Conserva el diseño de escritorio.
- Evita que los elementos sobresalgan del contenedor.

FORMATO DE RESPUESTA:
Muestra los cambios CSS necesarios y explica brevemente qué modifica cada regla.
```

### Respuesta de la IA

Para adaptar la interfaz sin modificar su apariencia en escritorio, podemos utilizar una media query. Esta regla permite aplicar estilos específicos cuando el ancho de la pantalla es igual o inferior a un determinado valor.

En Colorfly se utiliza el punto de corte de 768 píxeles para reorganizar la presentación en pantallas pequeñas.

La galería utiliza el selector `#paleta` y se organiza mediante una cuadrícula:

```css
@media (max-width: 768px) {
    #paleta {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
    }
}
```

**Explicación:**

- `@media (max-width: 768px)` aplica las reglas en pantallas de hasta 768 píxeles.
- `#paleta` identifica el contenedor de la galería.
- `display: grid` organiza las tarjetas mediante CSS Grid.
- `repeat(3, minmax(0, 1fr))` crea tres columnas que se distribuyen el espacio disponible.
- `gap: 10px` establece la separación entre las tarjetas.

Además, dentro de esa misma media query se ajustan los controles para que aprovechen el ancho disponible y se reduce la altura de las tarjetas de 180px a 80px, manteniendo los códigos legibles.

### Aplicación y validación en Colorfly

Se ajustaron los estilos responsive utilizando CSS Grid, Flexbox y una media query. En pantallas pequeñas, los controles se reorganizan y la galería utiliza tres columnas. También se ajustaron las dimensiones de las muestras y los códigos para mejorar su lectura.

**Prueba realizada:** utilicé la vista de dispositivo móvil de las herramientas de desarrollo del navegador y comprobé que la interfaz se adaptara al ancho de pantalla.

---

## Reflexión final

La utilización de inteligencia artificial fue útil durante distintas etapas del desarrollo de Colorfly Generator. Permitió identificar errores, comprender conceptos de JavaScript, implementar nuevas funcionalidades y mejorar la presentación de la aplicación.

La aplicación de una estructura de prompting —contexto, objetivo, instrucciones, restricciones y formato de respuesta— ayudó a formular solicitudes más claras y obtener respuestas mejor adaptadas a las necesidades del proyecto.

También aprendí que la primera respuesta de la IA no siempre es definitiva. Fue necesario probar las soluciones, detectar problemas, realizar nuevas consultas y ajustar el código hasta conseguir el resultado esperado.

La IA no reemplazó mi participación en el desarrollo: funcionó como una herramienta de apoyo para aprender, resolver dificultades y mejorar progresivamente el proyecto. La decisión de incorporar cada cambio y comprobar su funcionamiento quedó bajo mi responsabilidad.