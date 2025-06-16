export default function MovieCard({
    movie,
    isLiked,
    isWatched,
    onClick,
    onFavorite,
    onWatched
}) {
    return (
        <article className="movie-card" onClick={onClick}>
            <div className="image-container">
                <span
                    className="watched"
                    onClick={onWatched}
                    title={isWatched ? "Mark as unwatched" : "Mark as watched"}
                >
                    {isWatched ? "👁️" : "🫣"}
                </span>
                <img
                    className="movie-image"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <div className="movie-image-overlay">
                    <span
                        className="heart-color"
                        onClick={onFavorite}
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