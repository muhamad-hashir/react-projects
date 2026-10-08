export const API_KEY = import.meta.env.VITE_OMDB_API_KEY

export function searchMovies(query) {
  return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`)
    .then((response) => response.json())
}

export function getMovieDetails(imdbID) {
  return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}`)
    .then((response) => response.json())
}
