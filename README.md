## Prompt Design Notes

The application uses OpenRouter to power two AI-driven features:

1. **Natural Language Property Search** – converts user search queries into structured filters.
2. **AI Match Summary** – generates a personalized explanation describing why a selected property matches the user's search intent.

For query parsing, the initial prompt asked the model to interpret the user's request in natural language. While the responses were generally accurate, they often included explanations and conversational text that could not be reliably used for property filtering.

To solve this, the prompt was redesigned to return only valid JSON following a fixed schema:

* `intent`
* `preferred_bhk`
* `budget`
* `location`
* `required_features`

The model was explicitly instructed to return structured JSON without markdown, code fences, or additional commentary. This made the output predictable and easy to integrate with the frontend filtering logic.

For the AI Match Summary feature, a separate prompt was used. It receives the user's original search query along with the selected property's details and generates a concise 2–3 sentence explanation highlighting why that property is a relevant match.

A lightweight OpenRouter model from the free tier was chosen because the application primarily requires information extraction and concise text generation rather than advanced reasoning. In this project, response consistency, structured output, low latency, and ease of integration were more important than using a larger model.

The final prompt design focuses on reliability, predictable formatting, and seamless integration with the React frontend, allowing natural language queries to be converted into meaningful property recommendations and explanations.
