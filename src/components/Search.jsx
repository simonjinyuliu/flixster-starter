import { useState } from "react";

export default function Search({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(input);
  };

  return (
    <div id="search-bar-container">
      <form id="search-bar">
        <input
          type="text"
          placeholder="Explore netflizzy..."
          name="Search movies"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>Search</button>
      </form>
    </div>
  );
}