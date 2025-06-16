export default function Search({
    input,
    onInputChange,
    onSubmit
}) {
    return (
        <div id="search-bar-container">
            <form id="search-bar">
                <input
                    type="text"
                    placeholder="Explore netflizzy..."
                    name="Search movies"
                    value={input}
                    onChange={onInputChange}
                />
                <button type="submit" onClick={onSubmit}>Search</button>
            </form>
        </div>
    )
}