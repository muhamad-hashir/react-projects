import MovieCard from "./MovieCard"

export default function MovieList({ movies, skeleton = false, onSelect, watchlist }) {
  return (
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <MovieCard
          key={skeleton ? `skeleton-${index}` : movie.imdbID}
          movie={movie}
          index={index}
          skeleton={skeleton}
          onSelect={onSelect}
          watchlist={watchlist}
        />
      ))}
    </div>
  )
}
