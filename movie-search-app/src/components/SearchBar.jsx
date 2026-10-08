export default function SearchBar({ query, setQuery, onSearch, loading }) {
  return (
    <form className="search-form" onSubmit={onSearch} role="search">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <label htmlFor="movie-search" className="visually-hidden">
        Search movies and series
      </label>
      <input
        id="movie-search"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search movies or series…"
        autoComplete="off"
        enterKeyHint="search"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Searching…" : "Search"}
      </button>
    </form>
  )
}
