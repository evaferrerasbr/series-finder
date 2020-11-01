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

//EVENTS
button.addEventListener('click', handlerEvent);
buttonReset.addEventListener('click', resetFavorites);
