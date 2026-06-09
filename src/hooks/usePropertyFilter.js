import { useState, useCallback, useEffect, useRef } from "react";
import properties from "../data/properties";
import { fetchAISearchResult } from "../services/openrouter";

function usePropertyFilter() {
  const initialQuery = useRef(
    new URLSearchParams(window.location.search).get("q") || ""
  ).current;
  const [query, setQuery]                   = useState(initialQuery);
  const [activeChip, setActiveChip]         = useState("all");
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [isLoading, setIsLoading]           = useState(false);
  const [searchError, setSearchError]       = useState(null);
  const [searchedQuery, setSearchedQuery]   = useState("");
  const hasRunInitialSearch = useRef(false);

  // --- chip filter (applied on top of whatever search produced) ---
  function applyChip(list, chip) {
    if (chip === "all") return list;
    if (chip === "4BHK+") return list.filter((p) => parseInt(p.bhk) >= 4);
    return list.filter((p) => p.bhk === chip);
  }

  // --- AI-driven filter ---
  function filterByAIResult(aiResult) {
    return properties.filter((property) => {
      // preferred_bhk: treat as minimum when chip is "all"
      if (aiResult.preferred_bhk) {
        if (parseInt(property.bhk) !== aiResult.preferred_bhk) return false;
      }

      // location: partial case-insensitive match
      if (aiResult.location) {
        if (!property.location.toLowerCase().includes(aiResult.location.toLowerCase())) return false;
      }

      // required_features: every extracted feature must match at least one property feature
      if (aiResult.required_features?.length) {
        const allFeatures = property.features.join(" ").toLowerCase();
        const allMatched = aiResult.required_features.every((f) =>
          allFeatures.includes(f.toLowerCase())
        );
        if (!allMatched) return false;
      }

      return true;
    });
  }

  // --- keyword fallback ---
  function filterByKeyword(q) {
    if (!q.trim()) return properties;
    const lower = q.toLowerCase();
    return properties.filter(
      (property) =>
        property.location.toLowerCase().includes(lower) ||
        property.bhk.toLowerCase().includes(lower) ||
        property.features.some((f) => f.toLowerCase().includes(lower))
    );
  }

  // --- main search handler ---
  const handleSearch = useCallback(async () => {
    const trimmedQuery = query.trim();

    const searchUrl = trimmedQuery
      ? `${window.location.pathname}?q=${encodeURIComponent(trimmedQuery)}${window.location.hash}`
      : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState({}, "", searchUrl);

    if (!trimmedQuery) {
      setFilteredProperties(applyChip(properties, activeChip));
      setSearchError(null);
      return;
    }

    setIsLoading(true);
    setSearchError(null);
    setSearchedQuery(trimmedQuery);

    let baseResults;

    try {
      const aiResult = await fetchAISearchResult(query);
      baseResults = filterByAIResult(aiResult);
    } catch (err) {
      console.warn("AI search failed, falling back to keyword search:", err.message);
      setSearchError("AI search unavailable — showing keyword results.");
      baseResults = filterByKeyword(query);
    }

    setFilteredProperties(applyChip(baseResults, activeChip));
    setIsLoading(false);
  }, [query, activeChip]);

  useEffect(() => {
    if (initialQuery && !hasRunInitialSearch.current) {
      hasRunInitialSearch.current = true;
      handleSearch();
    }
  }, [handleSearch, initialQuery]);

  // When chip changes, re-apply it to the current results without a new API call
  function handleChipSelect(chip) {
    setActiveChip(chip);
    setFilteredProperties((current) => applyChip(
      // re-filter from full list so switching chips doesn't shrink results permanently
      current.length === 0 && chip !== "all" ? current : properties,
      chip
    ));
  }

  return {
    query,
    setQuery,
    activeChip,
    handleChipSelect,
    filteredProperties,
    isLoading,
    searchError,
    searchedQuery,
    handleSearch,
  };
}

export default usePropertyFilter;
