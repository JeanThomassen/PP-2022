// Config
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = `https://image.tmdb.org/t/p/w500`;
const API_KEY = 'api_key=11c6235831bfcf4e28ee2f286f7ef58e';
const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=11c6235831bfcf4e28ee2f286f7ef58e`;
const API_SEARCH2 = `https://api.themoviedb.org/3/discover/movie?api_key=11c6235831bfcf4e28ee2f286f7ef58e`;
const API_PP = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const API_RL = BASE_URL + '/discover/movie?sort_by=release_dates&' + API_KEY;

//var element = document.getElementById('div');

//Clean
//while(element.firstChild){

  //element.removeChild(element.firstChild);

//}

//SEARCH
function searchMovies(query) {
  return fetch(API_SEARCH + '&query=' + query)
    .then(response => response.json())
}

function SearchMov() {

  const query = document.getElementById("query").value;

  searchMovies(query)
    .then((data) => {

      if (data && data.results) {

        data.results.forEach((movie) => {
          renderMovie(movie.original_title, movie.overview, movie.poster_path)
        })
      }
    })
}
function renderMovie(title, overview, poster_path) {
  const moviesDiv = document.getElementById("movies-list");
  const html = `
    <div class="movie-box">
      <img class="imagec" src="${IMG_URL+poster_path}" alt="">
      <div class="details">
        <div class="title">${title}</div>
        <div class="overview">${overview}</div>
      </div>
    </div>
  `;
  moviesDiv.insertAdjacentHTML("afterend", html);
}

//Filters Release Year & Popularity
function SearchMovRL() {

  function searchMovRl(query) {
    return fetch(API_SEARCH + '&query=1&primary_release_year=' + query)
      .then(response => response.json())
  }

  const query = document.getElementById("query").value;

  searchMovRl(query)
    .then((data) => {

      if (data && data.results) {

        data.results.forEach((movie) => {
          renderMovie(movie.original_title, movie.overview, movie.poster_path, movie.release_date)
        })
      }
    })
}
function renderMovie(title, overview, poster_path, release_date) {
  const moviesDiv = document.getElementById("movies-list");
  const html = `
    <div class="movie-box">
      <img class="imagec" src="${IMG_URL+poster_path}" alt="">
      <div class="details">
        <div class="title">${title}</div>
        <div class="overview">${overview}</div>
        <div class="overview">${release_date}</div>
      </div>
    </div>
  `;
  moviesDiv.insertAdjacentHTML("afterend", html);
}

//Popularity Filter

function SearchMovPP() {

  function searchMovPp(query) {
    return fetch(API_SEARCH2 + '&query=1&=sort_by=vote_average.desc' + query)
      .then(response => response.json())
  }

  const query = document.getElementById("query").value;

  searchMovPp(query)
    .then((data) => {

      if (data && data.results) {

        data.results.forEach((movie) => {
          renderMovie(movie.original_title, movie.overview, movie.poster_path, movie.release_date)
        })
      }
    })
}
function renderMovie(title, overview, poster_path, release_date) {
  const moviesDiv = document.getElementById("movies-list");
  const html = `
    <div class="movie-box">
      <img class="imagec" src="${IMG_URL+poster_path}" alt="">
      <div class="details">
        <div class="title">${title}</div>
        <div class="overview">${overview}</div>
        <div class="overview">${release_date}</div>
      </div>
    </div>
  `;
  moviesDiv.insertAdjacentHTML("afterend", html);
}

//POPULARITY MAIN
getMovies(API_PP);

function getMovies(url) {

  fetch(url).then(res => res.json()).then(data =>{

    showMovies(data.results);
  })
}

function showMovies(data){
  main.innerHTML = '';

  data.forEach(movie => {
    const{title, poster_path, vote_average} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <div>
        <img src="${IMG_URL+poster_path}" alt="">
        <div class="movie-info">
        <h3>${title}</h3>
        <h3 class="points">Score: ${vote_average}</h3>
        </div>
      </div>
    `;

    main.appendChild(movieEl);
  })
}