'use strict';

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
