import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// .env is one level up at the project root
dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" })); // Vite dev server
app.use(express.json());

app.post("/api/search", async (req, res) => {
  const { query } = req.body;

  if (!query || !query.trim()) {
    return res.status(400).json({ error: "Query is required." });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ error: "API key not configured." });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a real estate search assistant. " +
              "Extract structured information from the user's property search query. " +
              "Respond with ONLY a valid JSON object — no markdown, no code fences, no explanation. " +
              "Use exactly these fields:\n" +
              "  intent         (string)  – e.g. 'family', 'investment', 'bachelor'\n" +
              "  preferred_bhk  (number)  – bedroom count, or null if unspecified\n" +
              "  budget         (number)  – amount in rupees, or null if unspecified\n" +
              "  location       (string)  – area/sector name, or null if unspecified\n" +
              "  required_features (array of strings) – amenities or keywords mentioned\n" +
              "Budget conversion: '1 lac' = 100000, '1 crore' = 10000000.\n" +
              "If a field is not mentioned, set it to null or [] for required_features.",
          },
          {
            role: "user",
            content: query,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error: error.message || "OpenRouter request failed." });
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content ?? "";

    // Strip markdown fences if the model wraps output despite instructions
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse model response as JSON:", raw);
      return res.status(502).json({ error: "Model returned invalid JSON.", raw });
    }

    return res.json({ result: parsed });

  } catch (err) {
    console.error("OpenRouter error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});