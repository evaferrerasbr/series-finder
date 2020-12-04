'use strict';

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
  if (favoriteShows.length === 0 && savedFavorites !== null) {
    favoritesList.innerHTML = '';
    notFavoritesYet();
  }
}

getLocalStorage();
