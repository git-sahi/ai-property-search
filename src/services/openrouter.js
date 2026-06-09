const API_URL = "http://localhost:3001/api/search";
const SUMMARY_API_URL = "http://localhost:3001/api/property-summary";

// Sends the user query to the Express backend and returns
// the structured result object, or null if the request fails.
async function fetchAISearchResult(query) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) throw new Error(`Server error: ${response.status}`);

  const data = await response.json();
  return data.result; // { intent, preferred_bhk, budget, location, required_features }
}

async function fetchAIPropertySummary(query, property) {
  const response = await fetch(SUMMARY_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, property }),
  });

  if (!response.ok) throw new Error(`Server error: ${response.status}`);

  const data = await response.json();
  return data.summary;
}

export { fetchAISearchResult, fetchAIPropertySummary };
