import { useState, useEffect } from "react";
import { movieApi } from "../services/movieApi";

export default function CardModal({ movie, onClose, isOpen }) {
  const [key, setKey] = useState("");
  const [genre, setGenre] = useState("");
  const [runTime, setRunTime] = useState(null);

  useEffect(() => {
    // Handle ESC key press
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    const fetchMovieDetails = async () => {
      try {
        const data = await movieApi.fetchMovieDetails(movie.id);
        setGenre(data.genres[0]?.name || "Unknown");
        setRunTime(data.runtime);
      } catch (error) {
        console.error("Fetch movie details failed: ", error);
      }
    };

    const fetchTrailer = async () => {
      try {
        const data = await movieApi.fetchMovieVideos(movie.id);
        const trailers = data.results.filter(obj => obj.type === "Trailer");
        if (trailers.length > 0) {
          setKey(trailers[0].key);
        }
      } catch (error) {
        console.error("YouTube trailer fetch failed: ", error);
      }
    };

    fetchMovieDetails();
    fetchTrailer();

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [movie.id, isOpen, onClose]);

  const handleModalClick = (e) => {
    if (e.target.id === "modal") {
      onClose();
    }
  };

  return (
    <div id="modal" onClick={handleModalClick}>
      <div id="modal-content-container">
        <div id="modal-content">
          <h2>{movie.title}</h2>
          <div id="modal-movie-image-container">
            <img
              id="modal-movie-image"
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
            />
          </div>
          <div className="movie-details">
            <p><strong>Release date: </strong>{movie.release_date}</p>
            <p><strong>Overview: </strong>{movie.overview}</p>
            <p><strong>Movie genre: </strong>{genre}</p>
            <p><strong>Movie runtime: </strong>{runTime} mins</p>
          </div>
          {key && (
            <iframe
              id="trailer"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          <button id="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
