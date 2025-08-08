
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

// Proxy endpoint for restaurant menu
app.get('/api/menu', async (req, res) => {
  const resId = req.query.resId;
  if (!resId) {
    return res.status(400).json({ error: 'Missing resId parameter' });
  }
  const menuUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.51800&lng=88.38320&restaurantId=${resId}`;
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(menuUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu from Swiggy' });
  }
});

app.get('/api/restaurants', async (req, res) => {
  const swiggyUrl = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.71578267921963&lng=86.95010891508213&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(swiggyUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Swiggy' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
