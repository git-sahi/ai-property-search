## Prompt Design Notes

The query parsing system was designed to convert natural language property search requests into structured JSON that could be directly used for property filtering. Instead of generating conversational responses, the model extracts key search parameters such as property type (BHK), location, budget, and required amenities.

Early prompt iterations were more open-ended and asked the model to interpret the user's intent. While the responses were generally accurate, they often included explanations, additional text, or inconsistent formatting, making them difficult to parse programmatically.

To improve reliability, the prompt was redesigned around a fixed JSON schema with predefined fields:

* `intent`
* `preferred_bhk`
* `budget`
* `location`
* `required_features`

The model was explicitly instructed to return only valid JSON with no additional commentary. This significantly reduced parsing errors and ensured consistent output across different query styles and phrasings.

A lightweight model from OpenRouter's free tier was selected because the task primarily involves information extraction rather than complex reasoning. For this use case, prompt structure, response consistency, and latency were more important than model size or advanced reasoning capabilities.

The final prompt design prioritizes structured output, predictable formatting, and seamless integration with the frontend filtering logic, resulting in a more robust and reliable property search experience.
