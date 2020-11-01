![Adalab](https://beta.adalab.es/resources/images/adalab-logo-155x61-bg-white.png)

## Evaluación final del módulo 2

El ejercicio plantea crear una aplicación web de búsqueda de series que nos permite marcar y desmarcar series como favoritas y almacenar las series guardadas en el local storage.

A continuación describimos los hitos marcados en el ejercicio y explicamos cómo los hemos resuelto. Hemos utilizado el **sistema de issues de Github** para desglosar las principales tareas de cada uno de los hitos; cada una de nuestras ramas se corresponde con un issue.

1. **Estructura**

- Header con logo.
- Main maquetado de forma **responsive** haciendo uso de **flex**:

  - H1 con el título de la aplicación.
  - Formulario con un campo de texto y botón de submit que muestra los resultados de la búsqueda cuando la usuaria hace click en él.
  - Dos listas vacías, una para los resultados de búsqueda y otra para las series marcadas como favoritas.

  El resto de elementos que se visualizan en la página se han añadido con javascript manipulando el DOM.

2. **Búsqueda**

- La aplicación recoge el término de búsqueda de la usuaria y hace una petición al **API** abierto de TVMaze mediante el uso de **fetch y promesas** y guarda los resultados del **json** en un array.
- El programa recorre dicho array y pinta en html cada uno de los elementos de la búsqueda. Hemos introducido una imagen por defecto si la serie no tiene imagen propia en el servidor.
- Hemos incluido **gestión de errores** en la petición fetch, de modo que si ocurre un error en el servidor se mostrará un mensaje a la usuaria para avisarla.

3. **Favoritos**

- Cuando la usuaria hace click una serie se ejecuta una función que comprueba si dicha serie se encuentra en un array previamente declarado para introducirla. En caso de que ya se encuentre, la elimina.
- Una función recorre el array de favoritas para pintar los objetos que se encuentran en él en la lista de series favoritas.
- Tras modificar el array de favoritas, volvemos a llamar a la función que pinta los resultados en pantalla para que se modifique el aspecto del icono de corazón que tiene cada serie (vacío si no es favorita y relleno si lo es).

4. **Almacenamiento local**

- Las series favoritas **se almacenan en el local storage**, que se actualiza cada vez que la usuaria añade o quita una serie como favorita.

En caso de que la usuaria refresque la página y haga una búsqueda en la que había añadido una favorita previamente, la serie aparecerá destacada, ya que nuestra clase que da estilos a las favoritas depende exclusivamente de que el elemento se encuentre en el array de favoritos.

### Bonus

- Icono con una 'x' junto a cada favorita para que la usuaria pueda eliminar sus series favoritas de esta forma. Esto lo hemos hecho añadiendo un **atributo de tipo data-id** a los botones que coincide con el atributo id de cada una de las series del array. Cuando el data-id y el id coinciden, la serie se elimina del array de favoritos.

- **Botón de reset** para eliminar todas las series favoritas a la vez.

- Mensaje por defecto para mostrar a la usuaria cuando su campo de búsqueda está vacío.

- Mensaje por defecto para mostrar a la usuaria cuando su búsqueda no devuelve resultados del servidor.

- Mensaje por defecto cuando el array de favoritos está vacío.

- Maquetación. A pesar de no ser objeto de evaluación, hemos dado estilos a la aplicación para que la experiencia de la usuaria sea más agradable.
