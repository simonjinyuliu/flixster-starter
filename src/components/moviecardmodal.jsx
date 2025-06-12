import { useState } from "react";
export default function CardModal({movie, closeModal}){
  const[key, setKey] = useState("")
  const[genre, setGenre] = useState("")
  const[runTime, setRunTime] = useState()
  const options = {
      method: 'GET',
      headers: {
        Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGQ0Y2IxMGM0ZDk2YzE3ZTA1ZjllZWM3YTQ2ZjRkYiIsIm5iZiI6MTc0OTMzMTM4MS4xMzkwMDAyLCJzdWIiOiI2ODQ0YWRiNTk5NjZiOTZhZmNkZTY4Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qnXUxKkypgwqRges9xbxMxj0r5GfFfg3knk-9VjtIck",
        accept: "application/json",
      },
    }
    async function youtubeTrailer(movie_id){
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos`, options);
      const data = await response.json()
      // console awareness check
      const ytKey = data.results;
      console.log(ytKey)
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
      <div className="modal" onClick={closeModal}>
        <div className="modal-content-container">
          <div className="modal-content">
            <span className="modal-movie-title">{movie.title}</span>
            <img className="modal-movie-image" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
            {/* add runtime to modal*/}
            <span className="modal-movie-release"><strong>Release date: </strong>{movie.release_date}</span>
            <span className="modal-movie-overview"><strong>Overview: </strong>{movie.overview}</span>
            <span className="modal-movie-genres"><strong>Movie genre: </strong>{genre}</span>
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <span className="modal-movie-runtime"><strong>Movie runtime: </strong>{runTime} mins</span>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    </>
  )
}
