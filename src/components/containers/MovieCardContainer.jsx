import { useState } from "react"
import MovieCard from "../presentational/MovieCard"

export default function MovieCardContainer({ movie, onClick, onFavorite, onWatched }) {
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
        <MovieCard
            movie={movie}
            isLiked={isLiked}
            isWatched={isWatched}
            onClick={onClick}
            onFavorite={handleFavorite}
            onWatched={handleWatched}
        />
    )
}