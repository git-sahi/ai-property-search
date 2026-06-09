import { useState } from "react";
import usePropertyFilter from "./hooks/usePropertyFilter";
import SearchBar from "./components/SearchBar";
import FilterChips from "./components/FilterChips";
import PropertyGrid from "./components/PropertyGrid";
import PropertyModal from "./components/PropertyModal";
import "./App.css";

function App() {
  // Search, chip filter, and derived filteredProperties
const {
  query,
  setQuery,
  activeChip,
  handleChipSelect,
  handleSearch,
  filteredProperties,
  searchedQuery,
} = usePropertyFilter();

  // Modal state
  const [selectedProperty, setSelectedProperty] = useState(null);

  function handleSelectProperty(property) {
    setSelectedProperty(property);
  }

  function handleCloseModal() {
    setSelectedProperty(null);
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">AI Property Search</h1>
        <p className="app__subtitle">Find your perfect home</p>
        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
        <FilterChips
  activeChip={activeChip}
  onChipSelect={handleChipSelect}
/>
      </header>

      <main className="app__main">
        <div className="results-count">
          Showing {filteredProperties.length} properties
        </div>
        <PropertyGrid
          filteredProperties={filteredProperties}
          onSelectProperty={handleSelectProperty}
        />
      </main>

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          query={searchedQuery}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
