import { useEffect, useState } from "react"

const STORAGE_KEY = "movie-finder:watchlist"
const listeners = new Set()

function readList() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeList(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // storage full or blocked; in-memory state is already updated
  }
  for (const listener of listeners) listener(list)
}

export function toggleWatchlist(item) {
  const list = readList()
  const exists = list.some((entry) => entry.imdbID === item.imdbID)
  writeList(exists ? list.filter((entry) => entry.imdbID !== item.imdbID) : [...list, item])
  return !exists
}

export function useWatchlist() {
  const [list, setList] = useState(readList)

  useEffect(() => {
    listeners.add(setList)
    return () => {
      listeners.delete(setList)
    }
  }, [])

  return list
}

export function isWatchlisted(list, imdbID) {
  return list.some((entry) => entry.imdbID === imdbID)
}
