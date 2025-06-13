import { useState } from "react"
export default function MovieCard({movie, clicked, onFavorite, onWatched}){
  const[isLiked, setIsLiked] = useState(false)
  const[isWatched, setIsWatched] = useState(false)
  function favorited(event){
    event.stopPropagation()
    setIsLiked((prev) => !prev)
    onFavorite(movie)
  }
  function watched(event){
    event.stopPropagation()
    setIsWatched((prev) => !prev)
    onWatched(movie)
  }
  return(
  <>
    {/* This just displays the details of the movie from the results of the movies.map function in movielist.jsx */}
    <article className="movie-card" onClick={clicked}>
      <div className="image-container">
        <span className="watched" onClick={watched}>{isWatched? "👀":"🫣"}</span>
        <img className="movie-image" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movie-image-overlay">
          <span className="heart-color" onClick={favorited}>{isLiked? "❤️":"🤍"}</span>
        </div>
      </div>
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-rating">⭐️rating: {movie.vote_average}</p>
      </div>
    </article>
  </>
  )
}
//The MovieCard function also has a prop named "clicked" which is triggered when the movie card is clicked; It is helpful when setting up logic for the modal of the selected movie card.