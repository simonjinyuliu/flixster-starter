export default function CardModal({movie, closeModal}){
  return(
    <>
      <div className="modal" onClick={closeModal}>
        <div className="modal-content-container">
          <div className="modal-content">
            <span className="modal-movie-title">{movie.title}</span>
            <img className="modal-movie-image" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
            <span className="modal-movie-release"><strong>Release date: </strong>{movie.release_date}</span>
            <span className="modal-movie-overview"><strong>Overview: </strong>{movie.overview}</span>
            <span className="modal-movie-genres">{movie.genre_ids}</span>
            <div className="trailer-container"><link className="trailer"></link></div>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    </>
  )
}