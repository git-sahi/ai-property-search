import { useState } from "react";
import properties from "../data/properties";

// Encapsulates all search and chip filter logic.
// App.jsx stays focused on state wiring and rendering.
function usePropertyFilter() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeChip, setActiveChip] = useState("all");

  function handleSearch() {
    setSubmittedQuery(query);
  }

  function matchesSearch(property) {
    if (!submittedQuery.trim()) return true;
    const q = submittedQuery.toLowerCase();
    return (
      property.location.toLowerCase().includes(q) ||
      property.bhk.toLowerCase().includes(q) ||
      property.features.some((f) => f.toLowerCase().includes(q))
    );
  }

  function matchesChip(property) {
    if (activeChip === "all") return true;
    if (activeChip === "4BHK+") {
      const bedrooms = parseInt(property.bhk);
      return !isNaN(bedrooms) && bedrooms >= 4;
    }
    return property.bhk === activeChip;
  }

  const filteredProperties = properties.filter(
    (property) => matchesSearch(property) && matchesChip(property)
  );

  return {
    query,
    setQuery,
    activeChip,
    setActiveChip,
    handleSearch,
    filteredProperties,
  };
}

export default usePropertyFilter;
