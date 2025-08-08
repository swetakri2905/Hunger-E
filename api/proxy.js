export default async function handler(req, res) {
  const fetch = (await import('node-fetch')).default;
  const { url, query } = req;

  // /api/restaurants
  if (url.startsWith('/api/restaurants')) {
    const swiggyUrl = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.71578267921963&lng=86.95010891508213&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
    try {
      const response = await fetch(swiggyUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'application/json',
        },
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from Swiggy' });
    }
    return;
  }

  // /api/menu
  if (url.startsWith('/api/menu')) {
    const resId = query.resId;
    if (!resId) {
      res.status(400).json({ error: 'Missing resId parameter' });
      return;
    }
    const menuUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.51800&lng=88.38320&restaurantId=${resId}`;
    try {
      const response = await fetch(menuUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'application/json',
        },
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch menu from Swiggy' });
    }
    return;
  }

  res.status(404).json({ error: 'Not found' });
}
