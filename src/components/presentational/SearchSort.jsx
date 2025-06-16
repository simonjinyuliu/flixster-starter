import SearchContainer from "../containers/SearchContainer"
import SortDropDown from "../Sort"

export default function SearchSort({
    onSearch,
    onSort,
    isSearching,
    onClearSearch
}) {
    return (
        <nav className="search-sort">
            <div className="search-container">
                <SearchContainer onSearch={onSearch} />
                {isSearching && (
                    <button className="clear-btn" onClick={onClearSearch}>
                        Clear
                    </button>
                )}
            </div>
            <SortDropDown onSort={onSort} />
        </nav>
    )
}