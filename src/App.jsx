import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SearchSort from "./components/SearchSort.jsx";
import SideBar from "./components/Sidebar.jsx";
import MovieList from "./components/movielist.jsx";
import { useMovies } from "./hooks/useMovies";

export default function App() {
  const {
    movies,
    isSearching,
    favoriteMovies,
    watchedMovies,
    fetchNowPlaying,
    searchMovies,
    clearSearch,
    loadMore,
    toggleFavorite,
    toggleWatched,
    sortMovies,
    setMovies
  } = useMovies();

  useEffect(() => {
    fetchNowPlaying(1);
  }, [fetchNowPlaying]);

  const handleSort = (sortOption) => {
    const sortedMovies = sortMovies(movies, sortOption);
    setMovies(sortedMovies);
  };

  const showFavorites = () => {
    setMovies(favoriteMovies);
  };

  const showWatched = () => {
    setMovies(watchedMovies);
  };

  const goHome = () => {
    setMovies([]);
    fetchNowPlaying(1);
  };

  return (
    <div className="app">
      <Header />
      <SearchSort
        onSearch={searchMovies}
        onSort={handleSort}
        isSearching={isSearching}
        onClearSearch={clearSearch}
      />
      <main className="main-content">
        <SideBar
          onShowFavorites={showFavorites}
          onGoHome={goHome}
          onShowWatched={showWatched}
        />
        <div className="content-area">
          <MovieList
            movies={movies}
            onToggleFavorite={toggleFavorite}
            onToggleWatched={toggleWatched}
          />
          {!isSearching && (
            <button className="load-more" onClick={loadMore}>
              Load More
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
