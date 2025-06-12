import {useState} from "react"
import MovieCard from "./moviecard"
import CardModal from "./moviecardmodal"
export default function MovieList({sortBy, results}){
  const [selectedMovie, setSelectedMovie] = useState({})
  const [showModal, setShowModal] = useState(false);
  function closeModal(){
    setSelectedMovie({})
    setShowModal(false);
  }
  function openModal(movie){
    setSelectedMovie(movie)
    setShowModal(true)
  }
  const movieCardElements = results.map((element, index) => (
        <MovieCard key={index} movie={element} clicked={() => openModal(element)}/>
      ))
  return (
     <>
      <main className="movie-list">
        {movieCardElements}
        {showModal &&  selectedMovie && (<CardModal movie={selectedMovie} closeModal={closeModal}/>)}
      </main>
    </>
  )
}