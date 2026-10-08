import { useEffect, useRef, useState } from "react"
import { getMovieDetails } from "../api"
import { toggleWatchlist, useWatchlist, isWatchlisted } from "../watchlist"

function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5L2.5 9.4l6.6-.9 2.9-6Z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

function HeartIcon({ filled = false }) {
  return (
    <svg
      width="18"
      height="18"
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

export default function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null)
  const [status, setStatus] = useState("loading") // loading | ready | error
  const closeRef = useRef(null)
  const watchlist = useWatchlist()
  const saved = isWatchlisted(watchlist, movie.imdbID)

  useEffect(() => {
    let cancelled = false

    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset before the async fetch; resolved states come from the subscription callback
    setDetails(null)
    setStatus("loading")

    getMovieDetails(movie.imdbID)
      .then((data) => {
        if (cancelled) return
        if (data.Response === "True") {
          setDetails(data)
          setStatus("ready")
        } else {
          setStatus("error")
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error")
      })

    return () => {
      cancelled = true
    }
  }, [movie.imdbID])

  useEffect(() => {
    function handleKeydown(event) {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeydown)
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", handleKeydown)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const imdbRating = details?.Ratings?.find((r) => r.Source === "Internet Movie Database")
  const genres = details?.Genre && details.Genre !== "N/A" ? details.Genre.split(", ") : []

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={movie.Title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-actions">
          <button
            type="button"
            ref={closeRef}
            className="modal-close"
            onClick={onClose}
            aria-label="Close details"
          >
            <CloseIcon />
          </button>
          <button
            type="button"
            className={`watchlist-btn${saved ? " saved" : ""}`}
            onClick={() =>
              toggleWatchlist({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Type: movie.Type,
                Poster: movie.Poster,
              })
            }
            aria-pressed={saved}
            aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
          >
            <HeartIcon filled={saved} />
          </button>
        </div>

        <div className="modal-poster">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : undefined}
            alt=""
            onError={(event) => {
              event.currentTarget.style.display = "none"
            }}
          />
        </div>

        <div className="modal-body">
          <h2>{movie.Title}</h2>

          <div className="modal-meta">
            <span className="modal-year">{movie.Year}</span>
            <span className="modal-dot" aria-hidden="true">
              ·
            </span>
            <span className="modal-type">{movie.Type}</span>
            {imdbRating && (
              <>
                <span className="modal-dot" aria-hidden="true">
                  ·
                </span>
                <span className="modal-rating">
                  <StarIcon /> {imdbRating.Value.split(" ")[0]}
                </span>
              </>
            )}
          </div>

          {status === "loading" && (
            <div className="modal-loading">
              <div className="skeleton" style={{ height: "1rem", width: "60%" }} />
              <div className="skeleton" style={{ height: "1rem", width: "85%" }} />
              <div className="skeleton" style={{ height: "1rem", width: "75%" }} />
              <div className="skeleton" style={{ height: "1rem", width: "40%" }} />
            </div>
          )}

          {status === "error" && (
            <p className="modal-error-text">
              Couldn't load the full details for this title. Check your connection and try again.
            </p>
          )}

          {status === "ready" && details && (
            <>
              {genres.length > 0 && (
                <ul className="genre-list" aria-label="Genres">
                  {genres.map((genre) => (
                    <li key={genre} className="genre-pill">
                      {genre}
                    </li>
                  ))}
                </ul>
              )}

              <p className="modal-plot">{details.Plot !== "N/A" ? details.Plot : "No synopsis available."}</p>

              <dl className="modal-facts">
                {details.Director && details.Director !== "N/A" && (
                  <div>
                    <dt>Director</dt>
                    <dd>{details.Director}</dd>
                  </div>
                )}
                {details.Actors && details.Actors !== "N/A" && (
                  <div>
                    <dt>Main cast</dt>
                    <dd>{details.Actors}</dd>
                  </div>
                )}
                {details.Runtime && details.Runtime !== "N/A" && (
                  <div>
                    <dt>Runtime</dt>
                    <dd>{details.Runtime}</dd>
                  </div>
                )}
              </dl>

              <a
                className="modal-imdb"
                href={`https://www.imdb.com/title/${movie.imdbID}`}
                target="_blank"
                rel="noreferrer"
              >
                View on IMDb ↗
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
