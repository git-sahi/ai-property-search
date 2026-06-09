import "./SearchBar.css";

function SearchBar({ query, setQuery, onSearch }) {
  function handleKeyDown(e) {
    if (e.key === "Enter") onSearch();
  }

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe your dream property..."
        aria-label="Search properties"
      />
      <button className="search-bar__button" onClick={onSearch} aria-label="Search">
        <svg className="search-bar__icon" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
        <span>Search</span>
      </button>
    </div>
  );
}

export default SearchBar;
