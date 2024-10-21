# overcrowding_simulator

## Datos

### Descripción

Este proyecto simula la sobrepoblación en espacios cerrados, específicamente diseñado para la tesis `"Análisis de las formas de ocupación doméstica para recintos habitacionales en Estación Yuma: Aplicación de simuladores virtuales para la comprensión de sitios industriales en abandono"`.

### Contribuyentes

* **Taira Chiang Ancaten (taichiang@uc.cl)**: Diseño, Gestión y Propietaria.
* **Víctor Mendez Muñoz (victor.mendez@uc.cl)**: Docente Guia.

### Licencia

* Este proyecto utiliza la librería `p5.js` bajo la licencia `LGPL-2.1`.

## Instalación y Uso

1. Clona el repositorio: 
    > git clone https://github.com/royarzun95/overcrowding_simulator.git
2. Instalar VS Code: Descarga e instala Visual Studio Code desde https://code.visualstudio.com/
3. Instala la extensión: [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) En VS Code, ve a Extensiones y busca "Live Server". Instala la extensión de Ritwick Dey.
4. Inicia el servidor: Abre el archivo index.html en VS Code y presiona `Ctrl` + `Shift` + `P` Busca y selecciona "Live Server: Start".

## Configuración

> Mapa: Debes modificar el archivo `dungeon.json` para alterar el mapa, la visualizacion del mapa es de 1 celda = 1 m2

> Tamaño del canvas: Debes modificar el parametro `gridSize` en el archivo `main.js` para modificar el tamaño del canvas (area de dibujo)

## Controles
- Pausa: [Barra espaciadora]

## Funcionalidades

- Simulación de movimiento: Las "pelotas" representan personas, se mueven aleatoriamente por el espacio.
- Colisiones: Las "pelotas" chocan entre sí y rebotan en las paredes.
- Visualización de trayectorias: Se muestran las trayectorias de las "pelotas" con diferentes colores.

## Próximos pasos

- Mejoras visuales: Refinar la apariencia de `index.html`

## Log de Cambios

- Pelotas choquen
- Pausa (con barra espaciadora)
- Traza de colores (la traza se mantiene)
- Pelotas choquen con pared en el diametro no en el punto 0
- Rebote aleatorio
- Paredes con borde blanco
- Matriz de dungeon en `dungeon.json`
