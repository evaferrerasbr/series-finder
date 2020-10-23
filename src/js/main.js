'use strict';

const button = document.querySelector('.js-btn');
const results = document.querySelector('.js-list--results');
const favoriteList = document.querySelector('.js-list--favorites');
let search = '';
let shows = [];
let favoriteShows = [];
let favoriteId = [];
let liElement;

function handlerEvent() {
  shows = [];
  search = document.querySelector('.js-input').value;
  searchShows();
}

function searchShows() {
  fetch(`//api.tvmaze.com/search/shows?q=${search}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        shows.push(data[i].show);
      }
      paintShows();
      listenSearch();
    });
}

function paintShows() {
  results.innerHTML = '';
  for (let i = 0; i < shows.length; i++) {
    liElement = document.createElement('li');
    liElement.classList.add('list--item', 'js-list--item');
    liElement.setAttribute('id', shows[i].id);
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
  paintFavorite();
}

function paintFavorite() {
  for (let i = 0; i < favoriteShows.length; i++) {
    favoriteList.innerHTML += `<li><img src="${favoriteShows[i].image}" class="img"/><h3>${favoriteShows[i].name}</h3></li>`;

    // const liFav = document.createElement('li');
    // const imgFav = document.createElement('img');
    // imgFav.src = favoriteShows[i].image;
    // imgFav.classList.add('img');
    // liFav.appendChild(imgFav);
    // const titleFav = document.createElement('h3');
    // const titleFavContent = document.createTextNode(`${favoriteShows[i].name}`);
    // titleFav.appendChild(titleFavContent);
    // liFav.appendChild(titleFav);
    // favoriteList.appendChild(liFav);
  }
}

function getFavorites(event) {
  const current = event.currentTarget;
  let imgCurrent = current.querySelector('.img');
  let titleCurrent = current.querySelector('h3');
  const objectFavorite = {
    name: titleCurrent.innerHTML,
    image: imgCurrent.src,
    id: event.currentTarget.id,
  };
  const selectedShow = parseInt(event.currentTarget.id);
  favoriteId = favoriteShows.map(function (element) {
    return parseInt(element.id);
  }); //creamos un nuevo array a partir del array de favoritos que solo contenga los id para poder buscar en el indexOf
  const indFavorite = favoriteId.indexOf(selectedShow);
  if (indFavorite === -1) {
    favoriteShows.push(objectFavorite);
  } else {
    favoriteShows.splice(indFavorite, 1);
  }
  paintShows();
  listenSearch();
}

function listenSearch() {
  const liItems = document.querySelectorAll('.js-list--item');
  for (const liItem of liItems) {
    liItem.addEventListener('click', getFavorites);
  }
}

button.addEventListener('click', handlerEvent);
button.click();
