import {useEffect, useState} from "react"
import MovieCard from "./moviecard"
import CardModal from "./moviecardmodal"
export default function MovieList({sortBy, searchResult, clearClicked}){
  const[movies, setMovies] = useState([])
  const[page, setPage] = useState(1)
  const[selectedMovie, setSelectedMovie] = useState({})
  const[isSearching, setIsSearching] = useState(false)
  useEffect(()=>{
    console.log(clearClicked)
    if (clearClicked) {
      setMovies([])
      fetchNowPlaying(1)
      setIsSearching(false)
    }
  }, [clearClicked])

  async function fetchNowPlaying(pageNum){
    const options = {
      method: 'GET',
      headers: {
        Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGQ0Y2IxMGM0ZDk2YzE3ZTA1ZjllZWM3YTQ2ZjRkYiIsIm5iZiI6MTc0OTMzMTM4MS4xMzkwMDAyLCJzdWIiOiI2ODQ0YWRiNTk5NjZiOTZhZmNkZTY4Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qnXUxKkypgwqRges9xbxMxj0r5GfFfg3knk-9VjtIck",
        accept: "application/json",
      },
    }
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${pageNum}`, options);
      const data = await response.json()
      console.log(data.results);
      setMovies((prevMovies) =>[...prevMovies, ...data.results])
    } catch (error) {
      console.error("Fetch failed: ",error)
    }
  };
    useEffect(() => {
      if(!searchResult.length){
        fetchNowPlaying(page);
      }
      else{
        console.log("About to search")
        console.log(searchResult)
        setMovies(searchResult)
        setIsSearching(true)
      }
  }, [page, searchResult]);
  const movieCardElements = movies.map((element, index) => (
        <MovieCard key={index} movie={element} selectedMovie={setSelectedMovie}/>
      ))
  function closeModal(){
    setSelectedMovie({})
  }
  return (
     <>
      <main className="movie-list">
        {movieCardElements}
        {console.log(selectedMovie)}
        <CardModal movie={selectedMovie} closeModal={closeModal}/>
      </main>
      <div className="load-more-container">{!isSearching && (<button onClick={() => setPage((prev) => prev + 1)} className="load-more">Load More</button>)}</div>
    </>
  )
}