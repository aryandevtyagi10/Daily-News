const NEWS_API_ENDPOINT = 'http://localhost:5000/api/news';
const SUMMARY_API_ENDPOINT = 'http://localhost:5000/api/summarize';

const container = document.getElementById('news-container');
const categorySelect = document.getElementById('category-select');
const themeToggle = document.getElementById('toggle-theme');

// Fetch and render news articles
async function fetchNews(category = 'general') {
  try {
    const res = await fetch(`${NEWS_API_ENDPOINT}?category=${category}`);
    const data = await res.json();
    container.innerHTML = '';

    data.articles.slice(0, 8).forEach(article => {
      const card = document.createElement('div');
      card.className = 'news-card';

      card.innerHTML = `
        ${article.urlToImage ? `<img src="${article.urlToImage}" alt="News Image" />` : ''}
        <h3>${article.title}</h3>
        <p>${article.description || 'No description available.'}</p>
        <a href="${article.url}" target="_blank">Read Full Article</a><br/>
        <button onclick="summarize('${encodeURIComponent(article.url)}', this)">Short Summary</button>
        <div class="summary"></div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = `<p>Failed to load news. Please try again later.</p>`;
    console.error('Error fetching news:', error);
  }
}

// Generate summary for a given article URL
async function summarize(url, button) {
  const summaryBox = button.nextElementSibling;

  if (summaryBox.textContent.trim() !== '') {
    summaryBox.textContent = '';
    return;
  }

  button.disabled = true;
  button.textContent = 'Summarizing...';

  try {
    const res = await fetch(`${SUMMARY_API_ENDPOINT}?url=${url}`);
    const data = await res.json();
    summaryBox.textContent = data.summary;
  } catch (error) {
    summaryBox.textContent = 'Failed to summarize article.';
    console.error('Error summarizing article:', error);
  }

  button.disabled = false;
  button.textContent = 'Short Summary';
}

// Change category
categorySelect.addEventListener('change', () => {
  fetchNews(categorySelect.value);
});

// Toggle dark mode
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});

// Load initial news
fetchNews();
