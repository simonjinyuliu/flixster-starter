import { useState } from "react"
import MovieList from "../presentational/MovieList"
import CardModal from "../moviecardmodal.jsx"
import { useModal } from "../../hooks/useModal"

export default function MovieListContainer({
    movies,
    onToggleFavorite,
    onToggleWatched
}) {
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
        <>
            <MovieList
                movies={movies}
                onToggleFavorite={onToggleFavorite}
                onToggleWatched={onToggleWatched}
                onMovieClick={handleOpenModal}
            />
            {isOpen && selectedMovie && (
                <CardModal
                    movie={selectedMovie}
                    onClose={handleCloseModal}
                    isOpen={isOpen}
                />
            )}
        </>
    )
}