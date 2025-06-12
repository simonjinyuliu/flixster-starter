import { useState, useEffect} from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import MovieList from "./components/movielist";
import Search from "./components/Search.jsx";
import Footer from "./components/Footer.jsx";
export default function App() {
  // I declared all the state variables that handled logic of my app.
  const [sortOption, setSortOption] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page,setPage] = useState(1)
  const [selectedMovie, setSelectedMovie] = useState({})
  const [clearSignal, setClearSignal] = useState(0)
  // This is used when fetching data from the TMDb api
  const options = {
      method: 'GET',
      headers: {
        Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGQ0Y2IxMGM0ZDk2YzE3ZTA1ZjllZWM3YTQ2ZjRkYiIsIm5iZiI6MTc0OTMzMTM4MS4xMzkwMDAyLCJzdWIiOiI2ODQ0YWRiNTk5NjZiOTZhZmNkZTY4Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qnXUxKkypgwqRges9xbxMxj0r5GfFfg3knk-9VjtIck",
        accept: "application/json",
      },
    }
    async function fetchNowPlaying(pageNum){
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${pageNum}`, options);
      const data = await response.json()
      // console awareness check
      console.log(data.results);
      setMovies((prevMovies) =>[...prevMovies, ...data.results])
    } catch (error) {
      console.error("Now playing movies fetch failed: ",error)
    }
  };
  // This function handles the logic behind search results
  async function handleSearch(input){
    setIsSearching(true)
    setSearchTerm(input)
    setPage(1)
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${input}`,options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Searching error: ", error);
    }
  }
  //This function is called after a search is displayed and user wants to clear the results which automatically takes them back to the home page(nowplaying)
  function clearSearch(){
    setIsSearching(false)
    setSearchTerm("")
    setPage(1)
    setMovies([])
    fetchNowPlaying(1)
    setClearSignal((prev) => prev + 1)

  }
  //This function handles the logic behind loading more movies that are "nowplaying"
  function loadMore(){
    const nextPage = page + 1;
    setPage(nextPage)
    fetchNowPlaying(nextPage);
  }
  const sortedMovies = [...movies];
  if(sortOption==="title"){
    sortedMovies.sort((a,b) => a.title.localeCompare(b.title))
  }
  else if(sortOption==="release_date"){
    sortedMovies.sort((a,b) => new Date(b.release_date) - new Date(a.release_date))
  }
  // This basically ensures that our home page is the first page of "nowplaying" movies
  useEffect(() => {
    fetchNowPlaying(1);
  }, [])
  // rendering major components
  return (
    <div className="App">
      <Header onSortChange={setSortOption} />
      {/* <NavBar/> */}
      {/* I created a div for the form input field, clear button and search button for better styling. */}
      <div className="searching">
        <Search searched={handleSearch} clearSignal={clearSignal}/>
        <div className="clear-container">
          {isSearching && <button onClick={clearSearch} className="clear-btn">
            Now Playing
          </button>}
        </div>
      </div>
      <div className="wrapper">
        <MovieList
          results={sortedMovies}
          sortBy={sortOption}
        />
      </div>
      {/* I used conditional rendering to prevent load more button from appearing on the search results page */}
      <div className="load-more-container">{!isSearching && (<button onClick={loadMore} className="load-more">Load More</button>)}</div>
      <Footer />
    </div>
  );
}
