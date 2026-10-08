import { useState } from "react"
import { toggleWatchlist, isWatchlisted } from "../watchlist"

const FALLBACK_POSTER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">
      <rect width="300" height="450" fill="#17171d"/>
      <g fill="none" stroke="#33333d" stroke-width="8">
        <rect x="96" y="150" width="108" height="150" rx="10"/>
        <path d="M96 185h108M96 220h108M96 255h108"/>
      </g>
    </svg>`
  )

function HeartIcon({ filled = false }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-7.5-4.6-10-9.3C.7 8.8 2.4 5 6 5c2.2 0 3.6 1.2 4.5 2.5L12 9l1.5-1.5C14.4 6.2 15.8 5 18 5c3.6 0 5.3 3.8 3.5 6.7-2.5 4.7-9.5 9.3-9.5 9.3Z" />
    </svg>
  )
}

export default function MovieCard({ movie, index = 0, skeleton = false, onSelect, watchlist = [] }) {
  const [imgSrc, setImgSrc] = useState(
    movie?.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER
  )

  if (skeleton) {
    return (
      <div className="skeleton-card" aria-hidden="true">
        <div className="poster-wrap">
          <div className="skeleton" />
        </div>
        <div className="movie-info">
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line" />
        </div>
      </div>
    )
  }

  function handleError() {
    if (imgSrc !== FALLBACK_POSTER) {
      setImgSrc(FALLBACK_POSTER)
    }
  }

  const saved = isWatchlisted(watchlist, movie.imdbID)

  return (
    <button
      type="button"
      className="movie-card"
      style={{ "--i": Math.min(index, 11) }}
      onClick={() => onSelect(movie)}
      aria-label={`Show details for ${movie.Title} (${movie.Year})`}
    >
      <div className="poster-wrap">
        <img
          src={imgSrc}
          alt={`${movie.Title} (${movie.Year}) poster`}
          loading="lazy"
          onError={handleError}
        />
        <span className="type-pill">{movie.Type}</span>
        <span
          className={`heart-btn${saved ? " saved" : ""}`}
          role="button"
          tabIndex={0}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${movie.Title} from watchlist` : `Add ${movie.Title} to watchlist`}
          onClick={(event) => {
            event.stopPropagation()
            toggleWatchlist({
              imdbID: movie.imdbID,
              Title: movie.Title,
              Year: movie.Year,
              Type: movie.Type,
              Poster: movie.Poster,
            })
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              event.stopPropagation()
              toggleWatchlist({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Type: movie.Type,
                Poster: movie.Poster,
              })
            }
          }}
        >
          <HeartIcon filled={saved} />
        </span>
      </div>
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
      </div>
    </button>
  )
}
