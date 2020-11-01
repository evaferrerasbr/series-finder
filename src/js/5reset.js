'use strict';

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
