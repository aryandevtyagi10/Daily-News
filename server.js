const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 5000;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Route: Get top headlines
app.get('/api/news', async (req, res) => {
  const category = req.query.category || 'general';

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${NEWS_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Route: Summarize article (placeholder)
app.get('/api/summarize', async (req, res) => {
  const articleUrl = req.query.url;

  if (!articleUrl) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  // Mock summary since there's no free public summarization API without signup
  res.json({ summary: `This is a short summary of the article at: ${decodeURIComponent(articleUrl)}` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
