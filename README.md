## Evaluación final del módulo 2

![Homepage]()

## Descripción

El ejercicio plantea desarrollar una aplicación web de búsqueda de series con **Javascript**. La aplicación busca en el **API** de [TVMaze](https://www.tvmaze.com/api#show-search) los resultados que coincidan con la búsqueda de la usuaria y permite marcar y desmarcar series como favoritas. Las series guardadas se almacenan en el **local storage**. El desarrollo se ha realizado manipulando el **DOM** de forma avanzada.

Además de Javascript, para este desarrollo hemos utilizado **npm** y **SASS**.

## Estructura

```
src
├── html
├── images
├── js
│ └── 1.main.js - constantes y variables globales y eventos que afectan a toda la aplicación
│ └── 2.search.js - renderizado de todos los elementos del array con el resultado de la búsqueda
│ └── 3.favorites.js - guarda las series favoritas en un nuevo array y renderiza de forma diferente a la seleccionada
│ └── 4.localstorage.js - almacena las series guardadas como favoritas
│ └── 5.reset.js - elimina las favoritas y las borra del local storage
└── scss

```

El proyecto tiene las ramas principales máster y dev. Además, hemos utilizado el **sistema de Issues de Github** para organizar el trabajo. Cada una de las ramas del proyecto se corresponde con un issue, que tiene detalladas las tareas realizadas. Se han marcado como "bonus" todas las tareas extra que no eran requerimientos necesarios para la evaluación, como la **gestión de errores en el fetch** o los mensajes por defecto.

## Descarga e instalación

Para usar este proyecto en tu equipo local:

1. Descarga el repositorio
2. Instala node
3. Haz **npm install** para instalar las dependencias
4. Haz **npm start**

## Demo

Para ver la aplicación en funcionamiento puedes visitar el [siguiente enlace]https://evaferrerasbr.github.io/modulo-2-evaluacion-final-evaferrerasbr/), que también se encuentra disponible en la descripción del proyecto.
