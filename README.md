#Evaluación final del módulo 2

El ejercicio plantea crear una aplicación web de búsqueda de series que nos permite marcar y desmarcar series como favoritas y almacenar las series guardadas en el local storage.

A continuación describimos los hitos marcados en el ejercicio y explicamos cómo los hemos resuelto. Hemos utilizado el sistema de issues de Github para desglosar las principales tareas de cada uno de los hitos; cada una de nuestras ramas se corresponde con un issue.

1. Estructura. La aplicación consta de un formulario con un campo de texto y un botón que muestra los resultados de la búsqueda cuando la usuaria hace click en él. Además del logo y el título de la página, el html contiene dos listas vacías, una para los resultados principales y otra para los favoritos. El resto de los elementos que se visualizan se han añadido con javascript manipulando el DOM.

2. Búsqueda. La aplicación se conecta al API abierto de TVMaze mediante fetch y guarda los resultados del objeto json en el array searchedShows. Utilizaremos dicho array para recorrerlo y pintar en html cada uno de los elementos de la búsqueda en una tarjeta que consta de título e imagen. Hemos introducido una imagen por defecto si la serie no contiene imagen propia en el servidor.

3. Favoritos. Cuando la usuaria hace click en cada una de las series se ejecuta una función que comprueba si el array de series favoritas contiene la serie elegida para introducirla. En caso de que ya se encuentre, la quita. Posteriormente, una función se encarga de pintar en el html los objetos que se encuentran en el array de favoritas en la lista de favoritas que se encuentra en la parte izquierda de la aplicación. Además, volvemos a llamar a la función que pinta los resultados principales para que añada o quite una clase que haga destacar el estilo de la serie elegida.

4. Almacenamiento local. Las series favoritas se almacenan en el local storage, que se actualiza cada vez que la usuaria añade o quita una serie como favorita. En caso de que la usuaria refresque la página y haga una búsqueda en la que había añadido una favorita previamente, la serie aparecerá destacada, ya que nuestra clase que da estilos a las favoritas depende exclusivamente de que el elemento se encuentre en el array de favoritos.

5. Bonus.

- Icono con una 'x' junto a cada favorita para que la usuaria pueda quitar las series de esta forma. Esto lo hemos hecho añadiendo un atributo de tipo data-id a los botones que coinciden con los atributos id de cada una de las series del array. Cuando el data-id y el id coinciden, la serie se elimina del array de favoritos.

- Botón de reset para eliminar todas las series favoritas a la vez.

- Mensaje por defecto para mostrar a la usuaria cuando su campo de búsqueda está vacío.

- Mensaje por defecto para mostrar a la usuaria cuando su búsqueda no devuelve resultados del servidor.

- Maquetación. A pesar de no ser objeto de evaluación, hemos dado estilos a la aplicación para que la experiencia de la usuaria sea más agradable.
