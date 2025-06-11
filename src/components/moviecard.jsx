import { useState } from "react";
export default function MovieCard({movie, selectedMovie}){
  function clicked(){
    selectedMovie(movie)
  }
  return(
  <>
    <article className="movie-card" onClick={clicked}>
      <div className="image-container">
        <img className="movie-image" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movie-image-overlay">
          <button className="fav-btn" onClick={() => console.log('Clicked!')}>{'🤍'}</button>
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