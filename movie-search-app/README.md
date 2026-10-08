# 🎬 Movie Finder

A fast, responsive movie & series search app built with **React** and **Vite**, powered by the [OMDb API](https://www.omdbapi.com).

**Author:** Muhammad Hashir

## Features

- 🔍 **Instant search** — search thousands of movies and series by title, with loading skeletons and quick suggestion chips
- 🎞️ **Detail dialog** — click any card for the IMDb rating, plot summary, genres, director, main cast, runtime, and a direct IMDb link
- ❤️ **Watchlist** — save titles with a heart tap; stored in your browser's localStorage, no account or database needed
- 🌙 **Dark cinema UI** — custom design system with Bricolage Grotesque + Instrument Sans typography, themed scrollbars and selection, smooth staggered animations
- 📱 **Fully responsive** — works from small phones to wide desktops, with keyboard and screen-reader support

## Tech Stack

- [React 19](https://react.dev)
- [Vite](https://vite.dev)
- Plain CSS with design tokens (no UI framework)
- [OMDb API](https://www.omdbapi.com)

## Getting Started

1. **Clone the repo**

   ```bash
   git clone <your-repo-url>
   cd movie-search-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Add your OMDb API key** (free at [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx))

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local`:

   ```
   VITE_OMDB_API_KEY=your_api_key_here
   ```

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open http://localhost:5173 in your browser.


## Project Structure

```
src/
├── api.js                  # OMDb API helpers (key comes from .env.local)
├── watchlist.js            # localStorage watchlist store + hook
├── App.jsx                 # App shell, search, watchlist view
├── App.css                 # Component styles
├── index.css               # Design tokens, reset, browser surfaces
└── components/
    ├── SearchBar.jsx       # Search input with loading state
    ├── MovieList.jsx       # Responsive poster grid
    ├── MovieCard.jsx       # Poster card with watchlist heart
    └── MovieModal.jsx      # Detail dialog: rating, plot, cast, genres
```

## Notes

- The API key is read from `VITE_OMDB_API_KEY` and is never committed — `.env.local` is gitignored.
- The watchlist lives entirely in the browser under the `movie-finder:watchlist` localStorage key. Clearing site data clears the list.

---

Made by **Muhammad Hashir**
