'use strict';

const button = document.querySelector('.js-btn');
const resetButton = document.querySelector('.js-reset');
const results = document.querySelector('.js-list--results');
const favoriteList = document.querySelector('.js-list--favorites');
let search = '';
let shows = [];
let favoriteShows = [];
let favoriteId = [];
let savedFavorites = [];

function handlerEvent() {
  shows = [];
  search = document.querySelector('.js-input').value;
  if (search !== '') {
    searchShows();
  } else {
    showWarning();
  }
}

function showWarning() {
  results.innerHTML = '';
  const paragraph = document.createElement('p');
  const paragraphContent = document.createTextNode(
    '¡Tienes que introducir tu búsqueda primero!'
  );
  paragraph.appendChild(paragraphContent);
  paragraph.classList.add('paragraph--warning');
  results.appendChild(paragraph);
}

function searchShows() {
  fetch(`//api.tvmaze.com/search/shows?q=${search}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
          shows.push(data[i].show);
        }
        paintShows();
        listenSearch();
      } else {
        notFound();
      }
    });
}

function notFound() {
  results.innerHTML = '';
  const paragraph = document.createElement('p');
  const paragraphContent = document.createTextNode(
    'Lo sentimos, no hemos encontrado lo que buscas. ¡Prueba de nuevo!'
  );
  paragraph.appendChild(paragraphContent);
  paragraph.classList.add('paragraph--notfound');
  results.appendChild(paragraph);
}

function paintShows() {
  results.innerHTML = '';
  for (let i = 0; i < shows.length; i++) {
    const liElement = document.createElement('li');
    const elementId = shows[i].id;
    liElement.setAttribute('id', elementId);
    liElement.classList.add('list--item', 'js-list--item');
    for (const fav of favoriteShows) {
      if (parseInt(fav.id) === elementId) {
        liElement.classList.add('favorite');
      }
    }
    const imgElement = document.createElement('img');
    if (shows[i].image) {
      imgElement.setAttribute('src', shows[i].image.medium);
    } else {
      imgElement.setAttribute(
        'src',
        'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
      );
    }
    imgElement.classList.add('img');
    liElement.appendChild(imgElement);
    const titleElement = document.createElement('h3');
    const titleContent = document.createTextNode(`${shows[i].name}`);
    titleElement.appendChild(titleContent);
    liElement.appendChild(titleElement);
    results.appendChild(liElement);
  }
}

function paintFavorite() {
  favoriteList.innerHTML = '';
  for (let i = 0; i < favoriteShows.length; i++) {
    const liFav = document.createElement('li');
    const imgFav = document.createElement('img');
    const titleFav = document.createElement('h3');
    const buttonFav = document.createElement('button');
    const buttonContent = document.createTextNode('X');
    const titleFavContent = document.createTextNode(`${favoriteShows[i].name}`);
    favoriteList.appendChild(liFav);
    liFav.appendChild(imgFav);
    liFav.appendChild(buttonFav);
    liFav.appendChild(titleFav);
    buttonFav.appendChild(buttonContent);
    titleFav.appendChild(titleFavContent);
    liFav.classList.add('relative');
    imgFav.src = favoriteShows[i].image;
    imgFav.classList.add('img');
    buttonFav.classList.add('btn--remove', 'js-remove');
    buttonFav.addEventListener('click', removeFavorites);
    buttonFav.setAttribute('data-id', favoriteShows[i].id);
  }
}

function removeFavorites(event) {
  const dataId = parseInt(event.currentTarget.dataset.id);
  for (let i = 0; i < favoriteShows.length; i++) {
    if (dataId === parseInt(favoriteShows[i].id)) {
      favoriteShows.splice([i], 1);
    }
  }
  paintFavorite();
  paintShows();
  listenSearch();
}

function getFavorites(event) {
  const current = event.currentTarget;
  const imgCurrent = current.querySelector('.img');
  const titleCurrent = current.querySelector('h3');
  const objectFavorite = {
    name: titleCurrent.innerHTML,
    image: imgCurrent.src,
    id: event.currentTarget.id,
  };
  const selectedShow = parseInt(current.id);
  favoriteId = favoriteShows.map(function (element) {
    return parseInt(element.id); //creamos un nuevo array a partir del array de favoritos que solo contenga los id para poder buscar en el indexOf
  });
  const indFavorite = favoriteId.indexOf(selectedShow);
  if (indFavorite === -1) {
    favoriteShows.push(objectFavorite);
  } else {
    favoriteShows.splice(indFavorite, 1);
  }
  paintFavorite();
  paintShows();
  listenSearch();
  setLocalStorage();
}

function listenSearch() {
  const liItems = document.querySelectorAll('.js-list--item');
  for (const liItem of liItems) {
    liItem.addEventListener('click', getFavorites);
  }
}

function setLocalStorage() {
  const stringData = JSON.stringify(favoriteShows);
  localStorage.setItem('favorites', stringData);
}

function getLocalStorage() {
  const localFavString = localStorage.getItem('favorites');
  savedFavorites = JSON.parse(localFavString);
  if (savedFavorites !== null) {
    favoriteShows = savedFavorites;
    paintFavorite();
    listenSearch();
  } else {
    handlerEvent();
  }
}

getLocalStorage();

function resetFavorites() {
  favoriteShows = [];
  localStorage.removeItem('favorites');
  paintFavorite();
  paintShows();
  listenSearch();
}

button.addEventListener('click', handlerEvent);
resetButton.addEventListener('click', resetFavorites);
button.click();
