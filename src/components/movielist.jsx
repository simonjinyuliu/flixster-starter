import { useState } from "react"
import MovieCard from "./moviecard"
import CardModal from "./moviecardmodal"
import { useModal } from "../hooks/useModal"

export default function MovieList({ movies, onToggleFavorite, onToggleWatched }) {
  const [selectedMovie, setSelectedMovie] = useState({})
  const { isOpen, openModal, closeModal } = useModal()

  const handleCloseModal = () => {
    setSelectedMovie({})
    closeModal()
  }

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie)
    openModal()
  }

  return (
    <section className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id || index}
          movie={movie}
          onClick={() => handleOpenModal(movie)}
          onFavorite={onToggleFavorite}
          onWatched={onToggleWatched}
        />
      ))}
      {isOpen && selectedMovie && (
        <CardModal
          movie={selectedMovie}
          onClose={handleCloseModal}
          isOpen={isOpen}
        />
      )}
    </section>
  )
}