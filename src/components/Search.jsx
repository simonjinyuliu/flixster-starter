import {useEffect, useState} from "react";
export default function Search({searched, clearSignal}){
  const[input, setInput] = useState("");
  // This function triggers the search based on user input.
  async function handleSubmit(event){
    event.preventDefault()
    searched(input);
  }
  function searchResult(event){
    const value = event.target.value
    return setInput(value)
  }
  // This helps with clearing input field by listening for changes to clearSignal(from App.jsx)
  useEffect(() => {
    setInput("")
  }, [clearSignal])
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
          <button type="submit" onClick={handleSubmit}>Search</button>
        </form>
      </div>
    </>
  )
}