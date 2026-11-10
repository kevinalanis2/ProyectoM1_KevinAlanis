# Colorfly Generator

Generador interactivo de paletas de colores aleatorias.

## 1. Descripción del proyecto

Colorfly Generator es una aplicación web desarrollada como Proyecto Integrador 1 de Henry.

Permite generar paletas de colores aleatorias, seleccionar la cantidad de colores que se desean visualizar y consultar sus códigos en distintos formatos: HEX, HSL y RGBA.

El objetivo es ofrecer una herramienta sencilla, intuitiva y adaptable a diferentes dispositivos, que facilite la exploración de combinaciones de colores.

## 2. Tecnologías utilizadas

- **HTML5:** estructura y contenido semántico de la aplicación.
- **CSS3:** diseño visual, distribución de elementos y adaptación responsive.
- **JavaScript:** generación aleatoria de colores, conversiones de formatos, manipulación del DOM e interactividad.
- **Git y GitHub:** control de versiones y almacenamiento del código fuente.

## 3. Funcionalidades principales

- Generación aleatoria de paletas de colores.
- Selección de 6, 8 o 9 colores.
- Visualización de códigos en formatos HEX, HSL y RGBA.
- Cambio de formato sin perder los colores generados.
- Actualización dinámica de la cantidad de colores seleccionados.
- Visualización de cada color mediante una tarjeta con su muestra y código.
- Mensaje de confirmación al generar una nueva paleta.
- Diseño responsive para computadoras, tablets y dispositivos móviles.
- Navegación mediante teclado.

## 4. Decisiones técnicas y funcionamiento

En esta sección se explican las principales decisiones de desarrollo, cómo funcionan dentro de la aplicación y por qué se eligieron estas soluciones.

### 4.1. Utilización de RGB como formato interno

Una de las primeras decisiones fue utilizar el modelo RGB como formato interno para generar y almacenar los colores.

RGB representa cada color mediante tres canales:

- Rojo (Red).
- Verde (Green).
- Azul (Blue).

Cada canal puede tomar un valor entero entre 0 y 255. La combinación de estos tres valores determina el color resultante.

Para generar estos valores se utiliza `Math.random()` junto con `Math.floor()`.

Por ejemplo:

```javascript
const rojo = Math.floor(Math.random() * 256);
```

`Math.random()` genera un número decimal aleatorio entre 0 (incluido) y 1 (excluido). Al multiplicarlo por 256 y aplicar `Math.floor()`, obtenemos un número entero entre 0 y 255.

El mismo procedimiento se aplica a los tres canales.

La función `generarColor()` devuelve un objeto con las propiedades `rojo`, `verde` y `azul`.

Se eligió RGB como formato interno porque permite utilizar una única representación del color para todas las operaciones de la aplicación. A partir de esos mismos valores se pueden obtener las representaciones HEX, HSL y RGBA.

De esta manera, no es necesario generar un color diferente cada vez que el usuario cambia el formato de visualización.

### 4.2. Almacenamiento de los colores mediante un arreglo

Para conservar los colores generados se utiliza la variable:

```javascript
let coloresActuales = [];
```

Esta variable contiene un arreglo de objetos RGB. Cada objeto representa un color de la paleta.

Se eligió un arreglo porque permite almacenar una cantidad variable de colores y recorrerlos fácilmente para mostrarlos en pantalla.

También permite agregar nuevos elementos mediante `push()` y modificar la cantidad de elementos mediante la propiedad `length`.

Esta estructura es fundamental para que los selectores de cantidad y formato puedan modificar la presentación sin perder innecesariamente los colores que ya fueron generados.

### 4.3. Conversión de RGB a HEX

Para obtener el formato HEX se utiliza la función `convertirRGBaHEX()`.

El formato hexadecimal representa los canales rojo, verde y azul mediante dos caracteres hexadecimales para cada canal.

Por ejemplo, un color RGB con valores 255, 0 y 128 se representa como `#ff0080`.

Para realizar la conversión se utiliza:

```javascript
color.rojo.toString(16).padStart(2, "0");
```

- `toString(16)` convierte el número decimal a hexadecimal.
- `padStart(2, "0")` agrega un cero al comienzo cuando el resultado tiene un solo carácter.
- El símbolo `#` se agrega al principio para completar el formato CSS.

Se utiliza esta conversión porque permite obtener directamente el código hexadecimal de cada canal sin recurrir a librerías externas.

### 4.4. Conversión de RGB a HSL

Para convertir un color RGB a HSL se utiliza la función `convertirRGBaHSL()`.

HSL representa los colores mediante tres componentes:

- **Hue (tono):** determina el tipo de color y se expresa en grados, de 0 a 360.
- **Saturation (saturación):** representa la intensidad del color y se expresa en porcentaje.
- **Lightness (luminosidad):** representa qué tan claro u oscuro es el color y también se expresa en porcentaje.

El procedimiento de conversión se divide en varias operaciones:

1. Se normalizan los valores RGB dividiendo cada canal por 255, para obtener valores entre 0 y 1.
2. Se identifica el valor máximo y el mínimo entre los tres canales utilizando `Math.max()` y `Math.min()`.
3. Se calcula la diferencia entre ambos valores.
4. Se obtiene la luminosidad calculando el promedio entre el máximo y el mínimo.
5. Si existe una diferencia entre los canales, se calcula el tono según cuál de los tres canales tenga el valor máximo.
6. Se calcula la saturación utilizando la diferencia entre los canales y la luminosidad.
7. Finalmente, se redondean los resultados y se construye la cadena con el formato HSL.

Cuando los tres canales RGB tienen el mismo valor, el color es un tono de gris. En ese caso, la diferencia es cero y el tono y la saturación permanecen en cero.

Se implementó esta conversión mediante una función independiente para poder mostrar los mismos colores en HSL sin modificar los valores originales almacenados en RGB.

### 4.5. Conversión de RGB a RGBA

Para generar el formato RGBA se utiliza la función `convertirRGBaRGBA()`.

RGBA incorpora un cuarto componente llamado Alpha, que representa la opacidad del color.

Los tres primeros valores corresponden a los canales rojo, verde y azul. El cuarto valor representa la transparencia, donde 0 es completamente transparente y 1 es completamente opaco.

En este proyecto se utiliza un valor de alpha igual a 1, ya que las tarjetas muestran colores completamente opacos.

Se eligió esta implementación para cumplir con la visualización del formato RGBA manteniendo una estructura sencilla y sin alterar los colores originales.

### 4.6. Selección del formato mediante switch

La función `obtenerCodigoColor()` utiliza una estructura `switch` para determinar qué conversión debe aplicarse según el formato elegido por el usuario.

Las opciones disponibles son HEX, HSL y RGBA.

Se eligió `switch` porque permite organizar de manera clara las distintas alternativas de conversión y facilita la incorporación de nuevos formatos en el futuro.

Además, esta función centraliza la decisión sobre qué código mostrar, evitando repetir esa lógica en diferentes partes del programa.

### 4.7. Renderizado dinámico mediante el DOM

Para mostrar los colores se utiliza la función `mostrarPaleta()`.

En lugar de escribir manualmente las tarjetas en HTML, JavaScript las crea dinámicamente utilizando métodos del DOM.

El procedimiento es el siguiente:

1. Se limpia el contenido anterior de la galería mediante `innerHTML = ""`.
2. Se recorren los objetos del arreglo de colores utilizando un bucle `for...of`.
3. Se crea un elemento `div` para cada tarjeta mediante `document.createElement()`.
4. Se agregan las clases CSS correspondientes con `classList.add()`.
5. Se crea otro elemento para representar visualmente el color.
6. Se asigna el color de fondo utilizando `style.backgroundColor`.
7. Se crea el elemento que contiene el código y se completa mediante `textContent`.
8. Finalmente, se unen los elementos con `appendChild()` y se agrega cada tarjeta a la galería.

Se eligió la creación dinámica porque la cantidad de tarjetas depende de la selección del usuario y puede cambiar durante la ejecución de la aplicación.

También se utiliza `textContent` para insertar los códigos de color como texto, en lugar de interpretarlos como contenido HTML.

Esta solución permite mantener separado el contenido inicial de la página y los elementos que JavaScript genera según las acciones del usuario.

### 4.8. Separación de responsabilidades mediante funciones

El código se organizó en funciones independientes para que cada una tenga una responsabilidad concreta.

Por ejemplo:

- `generarColor()` se encarga de crear un color aleatorio.
- Las funciones de conversión transforman los valores RGB a otros formatos.
- `obtenerCodigoColor()` selecciona la conversión correspondiente.
- `mostrarPaleta()` construye y actualiza las tarjetas en pantalla.

Se eligió esta organización para facilitar la lectura, las pruebas y el mantenimiento del código.

También permite modificar una parte de la aplicación sin tener que reescribir toda la lógica.

### 4.9. Gestión de eventos e interactividad

La aplicación utiliza `addEventListener()` para detectar las acciones del usuario.

Se implementaron tres eventos principales:

**Evento del botón Generar paleta (`click`):**

Cuando el usuario presiona el botón, se obtiene la cantidad seleccionada, se limpia el arreglo anterior y se generan nuevos colores mediante un bucle `for`.

Después se muestra la paleta utilizando el formato elegido y se actualiza el mensaje de confirmación.

**Evento del selector de formato (`change`):**

Cuando el usuario cambia entre HEX, HSL y RGBA, se vuelve a ejecutar `mostrarPaleta()` utilizando los colores que ya están almacenados.

De esta manera, se actualiza la representación de los códigos sin generar nuevos colores.

**Evento del selector de cantidad (`change`):**

Cuando el usuario selecciona otra cantidad, primero se comprueba si ya existe una paleta generada.

Si se necesitan más colores, se utiliza un bucle `while` junto con `push()` para agregar los faltantes.

Si hay más colores de los seleccionados, se modifica la propiedad `length` del arreglo para eliminar los sobrantes.

Finalmente, se actualiza la galería conservando el formato elegido.

Se eligió esta lógica para que los cambios de cantidad no obliguen al usuario a generar una paleta completamente nueva.

### 4.10. Microfeedback para el usuario

Se incorporó un elemento HTML identificado como `mensaje-feedback`, que utiliza el atributo `aria-live="polite"`.

Cuando el usuario genera una nueva paleta, JavaScript actualiza su contenido mediante `textContent` para mostrar el mensaje de confirmación.

El objetivo es proporcionar una respuesta visual después de una acción y mejorar la experiencia de uso.

El atributo `aria-live="polite"` permite que las tecnologías de asistencia anuncien el contenido actualizado sin interrumpir inmediatamente lo que están comunicando.

### 4.11. Diseño responsive y organización visual

Se utilizaron herramientas de CSS Grid y Flexbox para distribuir los controles y las tarjetas de colores.

En pantallas de escritorio, la galería utiliza Flexbox para mantener las tarjetas en una fila, centradas y con una separación uniforme.

En pantallas pequeñas se utiliza una regla `@media` para modificar la distribución:

- Los controles se organizan en dos columnas.
- Los selectores ocupan el ancho disponible.
- El botón se adapta al contenedor.
- La galería pasa a utilizar CSS Grid con tres columnas.
- Las muestras de color reducen su altura.
- Los códigos utilizan un tamaño de fuente y un espaciado adecuados para mejorar su lectura.

Se eligió esta adaptación porque mantener nueve tarjetas en una sola fila en un celular reduce demasiado su ancho y dificulta la lectura de los códigos.

La reorganización en tres columnas permite aprovechar mejor el espacio disponible y mantener las tarjetas proporcionadas.

### 4.12. Accesibilidad y estructura HTML

Se utilizó HTML semántico mediante elementos como `header`, `main` y `section`, para organizar el contenido de acuerdo con su función.

Los controles cuentan con elementos `label` asociados mediante los atributos `for` e `id`, lo que facilita su identificación y utilización.

También se comprobó la navegación mediante teclado utilizando la tecla Tab, verificando que los selectores y el botón puedan utilizarse sin depender exclusivamente del mouse.

Se mantuvo el comportamiento de foco del navegador para que el usuario pueda identificar qué elemento está seleccionado.

## 5. Estructura del proyecto

```text
ProyectoM1_KevinAlanis/
│
├── Desarrollo/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── JavaScript/
│       └── script.js
│
└── Documentacion/
    ├── README.md
    ├── capturas/
    └── uso de IA/
```

## 6. Cómo ejecutar la aplicación

1. Descargar o clonar el repositorio de GitHub.
2. Ingresar a la carpeta `Desarrollo`.
3. Abrir el archivo `index.html` en un navegador web.

También se puede utilizar la extensión Live Server de Visual Studio Code para ejecutar la aplicación durante el desarrollo.

No requiere instalación de dependencias ni configuración de un servidor backend.

## 7. Cómo utilizar Colorfly

1. Ingresar a la aplicación.
2. Seleccionar la cantidad de colores: 6, 8 o 9.
3. Elegir el formato de visualización: HEX, HSL o RGBA.
4. Presionar el botón **Generar paleta**.
5. Visualizar las muestras de color y sus respectivos códigos.
6. Cambiar el formato o la cantidad de colores para actualizar la paleta.
7. Presionar nuevamente el botón para generar una nueva combinación aleatoria.

## 8. Pruebas realizadas

Durante la revisión del proyecto se verificó:

- La generación de paletas de 6, 8 y 9 colores.
- La conversión y visualización de los formatos HEX, HSL y RGBA.
- El cambio de formato sin perder los colores existentes.
- El aumento y la reducción de la cantidad de tarjetas.
- La generación de nuevas combinaciones aleatorias.
- La actualización del mensaje de confirmación.
- La navegación mediante teclado.
- La adaptación de la interfaz a diferentes tamaños de pantalla.

## 9. Publicación

La aplicación está preparada para su publicación mediante GitHub Pages.

**Demo online:** [Agregar aquí el enlace de GitHub Pages una vez publicada la aplicación].

**Repositorio:** [Agregar aquí el enlace al repositorio de GitHub].

## 10. Autor

Proyecto Integrador 1 - Henry.

Desarrollado por: Kevin Alanis.