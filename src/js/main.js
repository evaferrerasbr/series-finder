'use strict';

const button = document.querySelector('.js-btn');
const results = document.querySelector('.js-list');
let search = '';
let shows = [];

function handlerEvent() {
  search = document.querySelector('.js-input').value;
  searchShows();
  paintShows();
}

function searchShows() {
  fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        shows.push(data[i].show);
      }
    });
}

//me pinta los elementos bien la primera vez, pero el resto me añade los mismos elementos a la lista, no me cambia de búsqueda.
function paintShows() {
  for (let i = 0; i < shows.length; i++) {
    const liElement = document.createElement('li');
    results.appendChild(liElement);
    const divElement = document.createElement('div');
    liElement.appendChild(divElement);
    const imgElement = document.createElement('img');
    if (shows[i].image) {
      imgElement.setAttribute('src', shows[i].image.medium);
    } else {
      imgElement.setAttribute(
        'src',
        'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
      );
    }
    divElement.appendChild(imgElement);
    const titleElement = document.createElement('h3');
    const titleContent = document.createTextNode(`${shows[i].name}`);
    titleElement.appendChild(titleContent);
    divElement.appendChild(titleElement);
  }
}

button.addEventListener('click', handlerEvent);
