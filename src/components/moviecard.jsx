import { useState } from "react"

export default function MovieCard({ movie, onClick, onFavorite, onWatched }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isWatched, setIsWatched] = useState(false)

  const handleFavorite = (event) => {
    event.stopPropagation()
    setIsLiked((prev) => !prev)
    onFavorite(movie)
  }

  const handleWatched = (event) => {
    event.stopPropagation()
    setIsWatched((prev) => !prev)
    onWatched(movie)
  }

  return (
    <article className="movie-card" onClick={onClick}>
      <div className="image-container">
        <span
          className="watched"
          onClick={handleWatched}
          title={isWatched ? "Mark as unwatched" : "Mark as watched"}
        >
          {isWatched ? "👁️" : "🫣"}
        </span>
        <img className="movie-image" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movie-image-overlay">
          <span
            className="heart-color"
            onClick={handleFavorite}
            title={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            {isLiked ? "❤️" : "🤍"}
          </span>
        </div>
      </div>
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-rating">⭐️ {movie.vote_average.toFixed(1)}</p>
      </div>
    </article>
  )
}