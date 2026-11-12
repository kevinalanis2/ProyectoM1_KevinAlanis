# Documentación del uso de Inteligencia Artificial

## Introducción

Durante el desarrollo de **Colorfly Generator** se utilizó inteligencia artificial como herramienta de apoyo para comprender errores, mejorar funcionalidades y consultar alternativas de implementación.

Los prompts de este documento presentan una versión organizada de las consultas realizadas durante el desarrollo, siguiendo los conceptos aprendidos en el módulo de prompting de Henry: contexto, objetivo, instrucciones claras, restricciones técnicas y formato esperado.

Las respuestas obtenidas fueron revisadas, probadas y adaptadas al proyecto antes de incorporarlas. La IA funcionó como asistente, mientras que las decisiones finales y la validación del código fueron realizadas durante el desarrollo.

---

## Caso 1: Corrección de un error en JavaScript

### Situación

Durante las pruebas de la aplicación apareció el error `ReferenceError: cantidad is not defined`. Esto impedía que la generación de la paleta funcionara correctamente.

### Prompt utilizado

**Contexto:** Estoy desarrollando Colorfly Generator, una aplicación web que genera paletas de colores aleatorias mediante JavaScript. La aplicación utiliza el DOM para obtener las opciones seleccionadas por el usuario y un array llamado `coloresActuales` para almacenar los colores.

**Objetivo:** Identificar y corregir el error `ReferenceError: cantidad is not defined` que aparece al generar una paleta.

**Instrucciones:**
- Analizá por qué se produce el error.
- Indicá cómo obtener la cantidad seleccionada desde el selector HTML.
- Explicá cómo utilizar ese valor para controlar la generación de colores.
- Mostrá cómo actualizar la visualización de la paleta.
- Explicá los cambios de manera sencilla.

**Restricciones técnicas:**
- Utilizar JavaScript puro.
- Mantener el uso de `addEventListener` y la manipulación del DOM.
- No incorporar librerías externas.
- Respetar la estructura actual del proyecto.

**Formato esperado:** Explicación del error y fragmento de código JavaScript corregido.

### Resultado obtenido

La IA identificó que se estaba utilizando una variable `cantidad` que no había sido declarada. La solución consistió en obtener el valor del selector mediante `selectorCantidad.value` y convertirlo a número utilizando `Number()`.

Ese valor se utilizó para controlar el ciclo que genera los colores y actualizar la paleta.

### Aplicación y validación

Se revisó el código, se corrigió la referencia a la cantidad seleccionada y se comprobó que el botón pudiera generar la cantidad de colores elegida sin producir ese error.

---

## Caso 2: Actualización dinámica de la cantidad de colores

### Situación

Inicialmente, la cantidad de tarjetas de colores solo cambiaba al presionar nuevamente el botón «Generar paleta». Se buscó mejorar la experiencia para que la paleta se actualizara automáticamente al modificar el selector de cantidad, conservando los colores existentes.

### Prompt utilizado

**Contexto:** Colorfly Generator permite seleccionar 6, 8 o 9 colores. Los colores actuales se almacenan en un array llamado `coloresActuales` y se muestran dinámicamente en el DOM mediante la función `mostrarPaleta(colores, formato)`.

**Objetivo:** Actualizar la cantidad de tarjetas automáticamente cuando el usuario modifica el selector, sin generar una paleta completamente nueva.

**Instrucciones:**
- Escuchá el evento `change` del selector de cantidad.
- Si aumenta la cantidad, agregá los colores faltantes.
- Si disminuye, eliminá los colores sobrantes.
- Conservá los colores que ya existen.
- Actualizá la visualización inmediatamente.
- Explicá cómo implementar el evento correspondiente.

**Restricciones técnicas:**
- Utilizar JavaScript puro.
- Mantener el array `coloresActuales`.
- Reutilizar la función `mostrarPaleta(coloresActuales, selectorFormato.value)`.
- No modificar innecesariamente el resto de la aplicación.

**Formato esperado:** Explicación y código JavaScript propuesto.

### Resultado obtenido

La IA propuso escuchar el evento `change` del selector de cantidad y modificar el array según el nuevo valor seleccionado.

De esta manera, se agregan colores cuando aumenta la cantidad y se eliminan los sobrantes cuando disminuye, sin reemplazar los colores que ya estaban generados.

### Aplicación y validación

Se incorporó la lógica de actualización dinámica y se realizaron pruebas seleccionando las distintas cantidades disponibles. Se verificó que las tarjetas se agregaran o quitaran inmediatamente y que los colores existentes se conservaran.

---

## Caso 3: Conversión de colores entre formatos

### Situación

La aplicación necesitaba mostrar los colores en distintos formatos. Se buscó implementar conversiones entre HEX, HSL y RGBA sin generar nuevos colores cada vez que el usuario cambiara el formato.

### Prompt utilizado

**Contexto:** Colorfly Generator almacena los colores en un array llamado `coloresActuales`, utilizando objetos con valores RGB como representación interna.

**Objetivo:** Implementar funciones que permitan convertir cada color a HEX, HSL y RGBA.

**Instrucciones:**
- Crear funciones independientes para cada conversión.
- Utilizar los valores RGB almacenados.
- Crear una función que determine qué formato mostrar según la selección del usuario.
- Permitir cambiar el formato sin modificar los colores originales.
- Explicar brevemente el funcionamiento de cada conversión.

**Restricciones técnicas:**
- Utilizar JavaScript puro.
- Mantener los valores internos en RGB.
- Utilizar los identificadores de formato `"HEX"`, `"HSL"` y `"RGBA"`.
- Reutilizar la función `mostrarPaleta(coloresActuales, selectorFormato.value)`.

**Formato esperado:** Funciones JavaScript separadas y explicación de su integración.

### Resultado obtenido

La IA propuso separar las conversiones en tres funciones:

- `convertirRGBaHEX(color)`
- `convertirRGBaHSL(color)`
- `convertirRGBaRGBA(color)`

También propuso una función `obtenerCodigoColor(color, formato)` para seleccionar la conversión correspondiente según el formato elegido.

### Aplicación y validación

Se incorporaron las funciones y se comprobó que los colores conservaran sus valores originales al cambiar entre HEX, HSL y RGBA. También se verificó que cada tarjeta mostrara el código correspondiente al formato seleccionado.

---

## Caso 4: Adaptación responsive de la aplicación

### Situación

Se buscó mejorar la visualización de Colorfly Generator en dispositivos móviles, ya que la distribución de las tarjetas y los controles estaba pensada principalmente para pantallas de escritorio.

### Prompt utilizado

**Contexto:** Colorfly Generator es una aplicación web desarrollada con HTML, CSS y JavaScript. En escritorio, la galería de colores utiliza Flexbox para distribuir las tarjetas en una fila. Los controles utilizan CSS Grid. Se necesita adaptar la distribución para dispositivos móviles.

**Objetivo:** Adaptar la interfaz para que funcione correctamente en pantallas móviles sin perjudicar la visualización en desktop.

**Instrucciones:**
- Utilizar media queries para modificar los estilos según el ancho de pantalla.
- Adaptar la distribución de la galería en dispositivos móviles.
- Reducir la altura de las tarjetas.
- Adaptar la distribución de los controles.
- Mantener una separación adecuada entre los elementos.
- Explicar los cambios realizados.

**Restricciones técnicas:**
- Utilizar CSS externo.
- Mantener Flexbox en la galería de escritorio y utilizar CSS Grid en la versión móvil.
- No utilizar estilos inline.
- Trabajar con un breakpoint de 768px.
- Considerar una altura de 80px para las tarjetas en móvil, frente a los 180px de escritorio.
- Mantener una separación de 15px en escritorio y 10px en móvil para la galería.

**Formato esperado:** Fragmento CSS responsive y explicación de su funcionamiento.

### Resultado obtenido

La IA propuso utilizar una media query para modificar la distribución y las dimensiones de los elementos en pantallas de menor tamaño.

Se mantuvo Flexbox para la galería en escritorio y se incorporó CSS Grid en dispositivos móviles, organizando las tarjetas en tres columnas.

### Aplicación y validación

Se adaptaron los estilos utilizando un breakpoint de 768px. Las tarjetas pasaron de 180px de altura en escritorio a 80px en dispositivos móviles. También se ajustó la separación entre elementos y la distribución de los controles.

Se realizaron pruebas en diferentes tamaños de pantalla para comprobar que la interfaz se adaptara correctamente.

---

## Reflexión final sobre el uso de IA

La inteligencia artificial fue una herramienta de apoyo durante distintas etapas del desarrollo de Colorfly Generator.

Permitió comprender errores, explorar soluciones y mejorar funcionalidades, pero sus respuestas no se incorporaron automáticamente. Cada propuesta fue revisada, adaptada y probada para comprobar que funcionara con la estructura real del proyecto.

Esta experiencia permitió aplicar buenas prácticas de prompting, aprender a formular instrucciones más claras y comprender la importancia de validar las respuestas de la IA antes de utilizarlas en un proyecto.