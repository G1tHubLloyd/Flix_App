import React, { useState, useEffect } from 'react'
import MoviesList from './components/MoviesList'

export default function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    async function loadMovies() {
      try {
        setLoading(true)
        const res = await fetch('http://localhost:8080/movies', { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setMovies(data)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadMovies()
    return () => controller.abort()
  }, [])

  return (
    <div className="app">
      <header>
        <h1>myFlix</h1>
      </header>
      {loading && <div>Loading movies…</div>}
      {error && <div className="error">Error: {error}</div>}
      {!loading && !error && <MoviesList movies={movies} />}
    </div>
  )
}
