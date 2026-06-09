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
              "You are a helpful real estate assistant. " +
              "Given a natural language property search query, respond with a concise, " +
              "friendly summary of what the user is looking for. " +
              "Keep responses under 3 sentences.",
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
    const message = data.choices?.[0]?.message?.content ?? "";

    return res.json({ message });

  } catch (err) {
    console.error("OpenRouter error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
