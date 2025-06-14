import { useState } from "react";
export default function CardModal({movie, closeModal}){
  const[key, setKey] = useState("")
  const[genre, setGenre] = useState("")
  const[runTime, setRunTime] = useState()
  const API_KEY = import.meta.env.VITE_ACCESS_TOKEN_AUTH
  const options = {
      method: 'GET',
      headers: {
        Authorization:`Bearer ${API_KEY }`,
        accept: "application/json",
      },
    }
    async function youtubeTrailer(movie_id){
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos`, options);
      const data = await response.json()
      const ytKey = data.results;
      const newArray= ytKey.filter(obj => obj.type==="Trailer")
      const videoKey = newArray[0].key 
      setKey(videoKey)
    } catch (error) {
      console.error("YouTube trailer fetch failed: ",error)
    }
  };
  youtubeTrailer(movie.id)
  async function fetchMovieDetails(movie_id){
    try{
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}`, options);
      const data = await response.json()
      const gen = data.genres[0].name
      setGenre(gen)
      setRunTime(data.runtime)
    }
    catch (error){
      console.error("Fetch failed: ", error);
    }
  }
  fetchMovieDetails(movie.id)
  return(
    <>
      <div id="modal" onClick={closeModal}>
        <div id="modal-content-container">
          <div id="modal-content">
            <span>{movie.title}</span>
            <div id="modal-movie-image-container">
              <img id="modal-movie-image" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt= {`${movie.title}`} /></div>
            <span><strong>Release date: </strong>{movie.release_date}</span>
            <span><strong>Overview: </strong>{movie.overview}</span>
            <span><strong>Movie genre: </strong>{genre}</span>
            <iframe id="trailer"width="560" height="315" src={`https://www.youtube.com/embed/${key}`} title="YouTube video player"></iframe>
            <span><strong>Movie runtime: </strong>{runTime} mins</span>
            <button id="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    </>
  )
}
