import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import MovieList from "./components/movielist";
import Search from "./components/Search.jsx";
import Footer from "./components/Footer.jsx";
export default function App() {
  const [sortBy, setSortBy] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [clearClicked, setClearClicked] = useState(false);

  function sorted(sortType) {
    return setSortBy(sortType);
  }

  async function handleSubmbit(searchTerm) {
    console.log("Handle submit from app.jsx");
    const options = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGQ0Y2IxMGM0ZDk2YzE3ZTA1ZjllZWM3YTQ2ZjRkYiIsIm5iZiI6MTc0OTMzMTM4MS4xMzkwMDAyLCJzdWIiOiI2ODQ0YWRiNTk5NjZiOTZhZmNkZTY4Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qnXUxKkypgwqRges9xbxMxj0r5GfFfg3knk-9VjtIck",
        accept: "application/json",
      },
    };
    try {
      console.log(searchTerm);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
        options
      );
      const data = await response.json();
      const searched = data.results;
      console.log(searched);
      setMovies(searched);
    } catch (error) {
      console.error("Searching error: ", error);
    }
  }
  function clearSearch() {
    setClearClicked(true);
  }
  
  return (
    <div className="App">
      <Header sorted={setSortBy} />
      {/* <NavBar/> */}
      <div className="searching">
        <Search searched={handleSubmbit} setClearClicked={setClearClicked}/>
        <div className="clear-container">
          <button onClick={clearSearch} className="clear-btn">
            Clear
          </button>
        </div>
      </div>
      <div className="wrapper">
        {/* {isSearching? {searching} :<MovieList searchResult={movies} sortBy={sortBy}/>} */}
        <MovieList
          searchResult={movies}
          sortBy={sortBy}
          clearClicked={clearClicked}
        />
      </div>
      <Footer />
    </div>
  );
}
