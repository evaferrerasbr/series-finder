'use strict';

//SEARCH
//it starts when the user clicks the search button
function handlerEvent() {
  search = document.querySelector('.js-input').value;
  searchedShows = [];
  if (search === '') {
    emptySearchMessage();
  } else {
    searchShows();
  }
}

//shows a message when the user has clicked the search button without writting anything
function emptySearchMessage() {
  resultsList.innerHTML = '';
  resultsSection.innerHTML = '';
  const paragraph = document.createElement('p');
  const paragraphContent = document.createTextNode(
    '¡Tienes que introducir tu búsqueda primero!'
  );
  resultsSection.appendChild(paragraph);
  paragraph.appendChild(paragraphContent);
  paragraph.classList.add('message');
}

//makes a call to the server with the user's search and fills the searchedShows array with the response
function searchShows() {
  fetch(`//api.tvmaze.com/search/shows?q=${search}`)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        notFound();
      } else {
        for (let i = 0; i < data.length; i++) {
          searchedShows.push(data[i].show);
        }
        paintShows();
        listenSearch();
      }
    })
    .catch((err) => {
      serverError(err);
    });
}

//shows a message if the server fails
function serverError() {
  resultsList.innerHTML = '';
  resultsSection.innerHTML = '';
  const paragraph = document.createElement('p');
  const paragraphContent = document.createTextNode(
    'Lo sentimos, ha ocurrido un error en el servidor. Prueba más tarde'
  );
  resultsSection.appendChild(paragraph);
  paragraph.appendChild(paragraphContent);
  paragraph.classList.add('message');
}

//shows a message if the user has searched something that it's not in the server
function notFound() {
  resultsList.innerHTML = '';
  resultsSection.innerHTML = '';
  const paragraph = document.createElement('p');
  const paragraphContent = document.createTextNode(
    'Lo sentimos, no hemos encontrado lo que buscas. ¡Prueba de nuevo!'
  );
  resultsSection.appendChild(paragraph);
  paragraph.appendChild(paragraphContent);
  paragraph.classList.add('message');
}

//paints results in html with advanced DOM
function paintShows() {
  resultsList.innerHTML = '';
  resultsSection.innerHTML = '';
  for (let i = 0; i < searchedShows.length; i++) {
    const liElement = document.createElement('li');
    const imgElement = document.createElement('img');
    const titleElement = document.createElement('h3');
    const titleContent = document.createTextNode(`${searchedShows[i].name}`);
    const heartElement = document.createElement('span');
    resultsList.appendChild(liElement);
    liElement.appendChild(imgElement);
    liElement.appendChild(heartElement);
    liElement.appendChild(titleElement);
    titleElement.appendChild(titleContent);
    liElement.setAttribute('id', searchedShows[i].id);
    heartElement.classList.add('fa', 'fa-heart-o', 'heart');
    liElement.classList.add('list--item', 'js-list--item');
    for (const fav of favoriteShows) {
      if (parseInt(fav.id) === searchedShows[i].id) {
        //adds a different class if the show has been added to the favorites array
        heartElement.classList.add('fa-heart');
        heartElement.classList.remove('fa-heart-o');
      }
    }
    titleElement.classList.add('title--show');
    if (searchedShows[i].image) {
      //adds a default image if the show doesn't have any in the server
      imgElement.setAttribute('src', searchedShows[i].image.medium);
    } else {
      imgElement.setAttribute(
        'src',
        'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
      );
    }
    imgElement.classList.add('img');
  }
}

//takes from html the results elements and adds an event to each one
function listenSearch() {
  const liItems = document.querySelectorAll('.js-list--item');
  for (const liItem of liItems) {
    liItem.addEventListener('click', getFavorites);
  }
}
