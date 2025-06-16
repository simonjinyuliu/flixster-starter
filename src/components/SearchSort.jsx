import Search from "./Search.jsx";
import SortDropDown from "./Sort.jsx";

export default function SearchSort({
  onSearch,
  onSort,
  isSearching,
  onClearSearch
}) {
  return (
    <nav className="search-sort">
      <div className="search-container">
        <Search onSearch={onSearch} />
        {isSearching && (
          <button className="clear-btn" onClick={onClearSearch}>
            Clear
          </button>
        )}
      </div>
      <SortDropDown onSort={onSort} />
    </nav>
  );
}