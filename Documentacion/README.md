# Colorfly Generator

Aplicación web interactiva que permite generar paletas de colores aleatorias y visualizar sus códigos en distintos formatos: HEX, HSL y RGBA.

El proyecto fue desarrollado como parte del **Proyecto Integrador 1 de Henry**, utilizando HTML, CSS y JavaScript.

## 1. Tecnologías utilizadas

- **HTML5:** estructura y contenido semántico.
- **CSS3:** estilos, distribución y diseño responsive.
- **JavaScript:** lógica de generación, conversión y manipulación dinámica del DOM.
- **Git y GitHub:** control de versiones y alojamiento del repositorio.
- **GitHub Actions:** automatización del despliegue en GitHub Pages.

## 2. Funcionalidades principales

- Generación aleatoria de paletas de colores.
- Selección de cantidad de colores: 6, 8 o 9.
- Visualización de códigos en formatos HEX, HSL y RGBA.
- Cambio de formato sin generar nuevos colores.
- Actualización automática de la cantidad de tarjetas al modificar el selector.
- Interfaz responsive para distintos tamaños de pantalla.
- Mensajes de confirmación para mejorar la interacción con el usuario.

## 3. Decisiones técnicas

- **Representación RGB:** los colores se almacenan internamente como valores RGB, lo que permite convertirlos fácilmente a los distintos formatos disponibles.
- **Conversión de formatos:** se desarrollaron funciones independientes para convertir los colores a HEX, HSL y RGBA.
- **Generación dinámica:** las tarjetas de colores se crean y actualizan mediante JavaScript, utilizando manipulación del DOM.
- **Actualización de la paleta:** se utiliza un array para conservar los colores actuales y permitir cambiar su formato o cantidad sin perder los colores existentes.
- **Diseño responsive:** se utilizaron Flexbox, Grid y media queries para adaptar la interfaz a diferentes dispositivos.
- **Accesibilidad:** se incorporaron etiquetas semánticas y mensajes dinámicos con `aria-live` para mejorar la experiencia de uso.

## 4. Estructura del proyecto

```text
ProyectoM1_KevinAlanis/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
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

## 5. Ejecución local

Para ejecutar el proyecto en una computadora:

1. Clonar el repositorio o descargarlo.
2. Ingresar a la carpeta `Desarrollo`.
3. Abrir el archivo `index.html` en un navegador.

También se puede utilizar la extensión **Live Server** de Visual Studio Code para ejecutar la aplicación durante el desarrollo.

## 6. Instrucciones de uso

1. Ingresar a Colorfly Generator.
2. Seleccionar la cantidad de colores deseada.
3. Elegir el formato de visualización: HEX, HSL o RGBA.
4. Presionar **Generar paleta** para crear una nueva combinación de colores.
5. Cambiar el formato o la cantidad para actualizar la visualización de la paleta actual.

## 7. Pruebas realizadas

Se realizaron pruebas para verificar:

- Generación correcta de paletas con 6, 8 y 9 colores.
- Visualización correcta de los tres formatos de color.
- Conservación de los colores al cambiar de formato.
- Actualización automática al modificar la cantidad de colores.
- Adaptación de la interfaz a pantallas de escritorio y dispositivos móviles.
- Funcionamiento de la aplicación publicada en GitHub Pages.

## 8. Publicación

**Demo online:**

https://kevinalanis2.github.io/ProyectoM1_KevinAlanis/

**Repositorio de GitHub:**

https://github.com/kevinalanis2/ProyectoM1_KevinAlanis

**Método de despliegue:**

La aplicación se publica mediante GitHub Pages y GitHub Actions. El flujo de trabajo automatizado utiliza los archivos de la carpeta `Desarrollo` y actualiza la demo cada vez que se realizan cambios en la rama `main`.

## 9. Autor

**Kevin Alanis**

Proyecto Integrador 1 — Henry