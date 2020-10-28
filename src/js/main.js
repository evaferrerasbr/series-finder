'use strict';

//constants with html elements
const resultsSection = document.querySelector('.js-section--results');
const favoriteSection = document.querySelector('.js-section--favorites');
const resultsList = document.querySelector('.js-list--results');
const favoritesList = document.querySelector('.js-list--favorites');
const button = document.querySelector('.js-btn');
const buttonReset = document.querySelector('.js-reset');

//global variables that are needed in different functions
let search = '';
let searchedShows = [];
let favoriteShows = [];
let favoriteIdArray = [];
let savedFavorites = [];

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
    .then((response) => response.json())
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
    });
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
    resultsList.appendChild(liElement);
    liElement.appendChild(imgElement);
    liElement.appendChild(titleElement);
    titleElement.appendChild(titleContent);
    liElement.setAttribute('id', searchedShows[i].id);
    liElement.classList.add('list--item', 'js-list--item');
    for (const fav of favoriteShows) {
      if (parseInt(fav.id) === searchedShows[i].id) {
        //adds a different class if the show has been added to the favorites array
        liElement.classList.add('favorite');
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

//FAVORITES
//shows a message when the favorites array is empty
function notFavoritesYet() {
  const paragraph = document.createElement('p');
  const paragraphContent = document.createTextNode(
    'Todavía no tienes ninguna serie favorita'
  );
  favoriteSection.appendChild(paragraph);
  paragraph.appendChild(paragraphContent);
  paragraph.classList.add('message');
}

notFavoritesYet();

//checks if the clicked element it's in the favorites array to add it. If it's already in the array, it removes the element
function getFavorites(event) {
  const current = event.currentTarget;
  const imgCurrent = current.querySelector('.img');
  const titleCurrent = current.querySelector('h3');
  const objectFavorite = {
    //this object is filled with the info of the clicked element and it will be added or remove it from the favorites array
    name: titleCurrent.innerHTML,
    image: imgCurrent.src,
    id: event.currentTarget.id,
  };
  favoriteIdArray = favoriteShows.map(function (element) {
    return parseInt(element.id);
    //uses map method to get a new array with the ids of the favorites array in order to use indexOf
  });
  const selectedShow = parseInt(current.id);
  const indFavorite = favoriteIdArray.indexOf(selectedShow);
  if (indFavorite === -1) {
    favoriteShows.push(objectFavorite);
  } else {
    favoriteShows.splice(indFavorite, 1);
  }
  paintFavorite();
  if (favoriteShows.length === 0) {
    notFavoritesYet();
  }
  paintShows();
  listenSearch();
  setLocalStorage();
}

//paints a favorites list in html with the selected shows
function paintFavorite() {
  favoritesList.innerHTML = '';
  favoriteSection.innerHTML = '';
  for (let i = 0; i < favoriteShows.length; i++) {
    const liFav = document.createElement('li');
    const imgFav = document.createElement('img');
    const titleFav = document.createElement('h3');
    const buttonFav = document.createElement('button');
    const buttonContent = document.createTextNode('X');
    const titleFavContent = document.createTextNode(`${favoriteShows[i].name}`);
    favoritesList.appendChild(liFav);
    liFav.appendChild(imgFav);
    liFav.appendChild(buttonFav);
    liFav.appendChild(titleFav);
    buttonFav.appendChild(buttonContent);
    titleFav.appendChild(titleFavContent);
    liFav.classList.add('list--item--fav');
    titleFav.classList.add('title--show');
    imgFav.src = favoriteShows[i].image;
    imgFav.classList.add('img--fav');
    buttonFav.classList.add('btn--delete', 'js-remove');
    buttonFav.setAttribute('data-id', favoriteShows[i].id);
    //sets a data-id in the button that matches with the id of each show
    buttonFav.addEventListener('click', removeFavorites);
    //sets an event in button to remove the favorite when the user clicks it
  }
  setLocalStorage();
}

//searchs in the favorites array an id that matches with de data-id of the button and it removes that element of the array
function removeFavorites(event) {
  for (let i = 0; i < favoriteShows.length; i++) {
    if (
      parseInt(event.currentTarget.dataset.id) === parseInt(favoriteShows[i].id)
    ) {
      favoriteShows.splice([i], 1);
    }
  }
  paintFavorite();
  if (favoriteShows.length === 0) {
    notFavoritesYet();
  }
  paintShows();
  listenSearch();
}

//LOCAL STORAGE
//saves the favorites array in local storage
function setLocalStorage() {
  const setStringData = JSON.stringify(favoriteShows);
  localStorage.setItem('favorites', setStringData);
}

//gets the info from local storage if it's not empty
function getLocalStorage() {
  const getStringData = localStorage.getItem('favorites');
  savedFavorites = JSON.parse(getStringData);
  if (savedFavorites === null) {
    listenSearch();
  } else {
    favoriteShows = savedFavorites;
    paintFavorite();
    listenSearch();
  }
  if (favoriteShows.length === 0) {
    favoritesList.innerHTML = '';
    notFavoritesYet();
  }
}

getLocalStorage();

//RESET
//removes the info from local storage and reset the favorites array
function resetFavorites() {
  favoriteShows = [];
  localStorage.removeItem('favorites');
  paintFavorite();
  notFavoritesYet();
  paintShows();
  listenSearch();
}

//EVENTS
button.addEventListener('click', handlerEvent);
buttonReset.addEventListener('click', resetFavorites);
