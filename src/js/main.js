'use strict';

const button = document.querySelector('.js-btn');
const results = document.querySelector('.js-list');
let search = '';
let shows = [];
let favoriteShows = [];

function handlerEvent() {
  shows = [];
  search = document.querySelector('.js-input').value;
  searchShows();
}

function searchShows() {
  fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
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
    const liElement = document.createElement('li');
    liElement.classList.add('list--item', 'js-list--item');
    liElement.setAttribute('id', i);
    results.appendChild(liElement);
    const imgElement = document.createElement('img');
    if (shows[i].image) {
      imgElement.setAttribute('src', shows[i].image.medium);
    } else {
      imgElement.setAttribute(
        'src',
        'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
      );
    }
    liElement.appendChild(imgElement);
    const titleElement = document.createElement('h3');
    const titleContent = document.createTextNode(`${shows[i].name}`);
    titleElement.appendChild(titleContent);
    liElement.appendChild(titleElement);
  }
}

function getFavorites(event) {
  const selectedShow = parseInt(event.currentTarget.id);
  const indFavorite = favoriteShows.indexOf(selectedShow);
  console.log(indFavorite);
  if (indFavorite === -1) {
    favoriteShows.push(selectedShow);
  } else {
    favoriteShows.splice(indFavorite, 1);
  }
}

function listenSearch() {
  const liItems = document.querySelectorAll('.js-list--item');
  for (const liItem of liItems) {
    liItem.addEventListener('click', getFavorites);
  }
}

button.addEventListener('click', handlerEvent);
