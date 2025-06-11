import {useState} from "react";
export default function Search({searched, setClearClicked}){
  const[input, setInput] = useState("");
  async function handleSubmbit(event){
    event.preventDefault()
    console.log("SUBMIT CALLED from search.jsx")
    setClearClicked(false)
    searched(input);
  }
  function searchResult(event){
    const value = event.target.value
    return setInput(value)
  }
  return(
    <>
      <div id="search-bar-container">
        <form id="search-bar">
          <input 
            type="text"
            placeholder="Explore netflizzy..."
            name="Search movies"
            value={input}
            onChange={searchResult}
          />
          <button type="submit" onClick={handleSubmbit}>Search</button>
        </form>
      </div>
    </>
  )
}