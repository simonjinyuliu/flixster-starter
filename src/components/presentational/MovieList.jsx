import MovieCardContainer from "../containers/MovieCardContainer"

export default function MovieList({
    movies,
    onToggleFavorite,
    onToggleWatched,
    onMovieClick
}) {
    return (
        <section className="movie-list">
            {movies.map((movie, index) => (
                <MovieCardContainer
                    key={movie.id || index}
                    movie={movie}
                    onClick={() => onMovieClick(movie)}
                    onFavorite={onToggleFavorite}
                    onWatched={onToggleWatched}
                />
            ))}
        </section>
    )
}