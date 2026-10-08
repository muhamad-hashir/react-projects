import { useState, useEffect, useCallback } from "react"
import SearchBar from "./components/SearchBar"
import MovieList from "./components/MovieList"
import MovieModal from "./components/MovieModal"
import "./App.css"

import { searchMovies as fetchSearch } from "./api"
import { useWatchlist } from "./watchlist"

function ClapperboardIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 11h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Z" />
      <path d="m4 11 -1.5-5 17-3 1 4.5" />
      <path d="m8.5 9.5 2-5" />
      <path d="m13.5 8.5 2-5" />
    </svg>
  )
}

function SearchOffIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
      <path d="M8.5 11h5" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 10v4" />
      <path d="M12 17.2v.1" />
    </svg>
  )
}

const SUGGESTIONS = ["Inception", "Studio Ghibli", "Star Wars", "Amélie"]

function BookmarkIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3h12v18l-6-4-6 4V3Z" />
    </svg>
  )
}

export default function App() {
  const [query, setQuery] = useState("Batman")
  const [submittedQuery, setSubmittedQuery] = useState("Batman")
  const [movies, setMovies] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [view, setView] = useState("search") // search | watchlist
  const watchlist = useWatchlist()

  async function searchMovies(searchTerm) {
    const trimmed = searchTerm.trim()
    if (!trimmed) return

    setLoading(true)
    setError("")
    setSubmittedQuery(trimmed)

    try {
      const data = await fetchSearch(trimmed)

      if (data.Response === "True") {
        setMovies(data.Search)
        setTotalResults(Number(data.totalResults) || data.Search.length)
      } else {
        setMovies([])
        setTotalResults(0)
        setError(
          data.Error === "Movie not found!"
            ? `No titles matched “${trimmed}”. Check the spelling or try a broader name.`
            : data.Error || "Something went wrong while fetching data."
        )
      }
    } catch {
      setMovies([])
      setError("Couldn't reach the movie database. Check your connection and try again.")
    } finally {
      setLoading(false)
      setIsInitialLoad(false)
    }
  }

  useEffect(() => {
    // Initial fetch on mount: loading into an external system (the OMDb API).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    searchMovies("Batman")
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      searchMovies(query)
    },
    [query]
  )

  const hasResults = movies.length > 0

  return (
    <div className="app">
      <header className="site-header">
        <a href="/" className="wordmark" aria-label="Movie Finder home">
          <ClapperboardIcon />
          Movie Finder
        </a>
        <nav className="header-nav" aria-label="Views">
          <button
            type="button"
            className={`nav-tab${view === "search" ? " active" : ""}`}
            onClick={() => setView("search")}
            aria-current={view === "search" ? "page" : undefined}
          >
            Search
          </button>
          <button
            type="button"
            className={`nav-tab${view === "watchlist" ? " active" : ""}`}
            onClick={() => setView("watchlist")}
            aria-current={view === "watchlist" ? "page" : undefined}
          >
            Watchlist
            {watchlist.length > 0 && <span className="nav-count">{watchlist.length}</span>}
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" aria-label="Search" hidden={view === "watchlist"}>
          <h1>
            Find your next <em>movie night</em>
          </h1>
          <p className="hero-sub">
            Search thousands of films and series by title. Poster, year, and type —
            everything you need to pick.
          </p>

          <SearchBar query={query} setQuery={setQuery} onSearch={handleSubmit} loading={loading} />

          <p className="search-hint">
            Try{" "}
            {SUGGESTIONS.map((suggestion, i) => (
              <span key={suggestion}>
                {i > 0 && " · "}
                <button type="button" onClick={() => { setQuery(suggestion); searchMovies(suggestion) }}>
                  {suggestion}
                </button>
              </span>
            ))}
          </p>
        </section>

        <section className="results" aria-live="polite">
          {view === "watchlist" ? (
            <>
              <div className="results-meta">
                <h2>Your watchlist</h2>
                <span className="results-count">{watchlist.length} saved</span>
              </div>
              {watchlist.length > 0 ? (
                <MovieList
                  movies={watchlist}
                  watchlist={watchlist}
                  onSelect={setSelectedMovie}
                />
              ) : (
                <div className="status">
                  <BookmarkIcon />
                  <h3>Nothing saved yet</h3>
                  <p>
                    Tap the heart on any movie or series to keep it here — it stays on this
                    device, no account needed.
                  </p>
                  <button
                    type="button"
                    className="retry"
                    onClick={() => setView("search")}
                  >
                    Browse movies
                  </button>
                </div>
              )}
            </>
          ) : loading ? (
            <MovieList movies={Array.from({ length: 10 }, (_, i) => i)} skeleton />
          ) : error ? (
            <div className="status error">
              <AlertIcon />
              <h3>Nothing came back</h3>
              <p>{error}</p>
              <button type="button" className="retry" onClick={() => searchMovies(submittedQuery)}>
                Try again
              </button>
            </div>
          ) : hasResults ? (
            <>
              <div className="results-meta">
                <h2>
                  Results for <q>{submittedQuery}</q>
                </h2>
                <span className="results-count">
                  {movies.length} shown of {totalResults}
                </span>
              </div>
              <MovieList
                movies={movies}
                watchlist={watchlist}
                onSelect={setSelectedMovie}
              />
            </>
          ) : !isInitialLoad ? (
            <div className="status">
              <SearchOffIcon />
              <h3>Start with a title</h3>
              <p>Type a movie or series name above, or pick one of the suggestions to browse.</p>
            </div>
          ) : null}
        </section>
      </main>

      <footer className="site-footer">
        Data from the Open Movie Database (OMDb)
      </footer>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}
