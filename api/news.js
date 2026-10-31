// Vercel serverless function: the browser calls /api/news, this file calls NewsAPI.
// NewsAPI's free plan blocks requests that come from a browser on a real website,
// but it allows requests that come from a server — so we ask on the browser's behalf.
// The key is read from the NEWS_API_KEY environment variable (set in Vercel), so it is never exposed.
export default async function handler(req, res) {
  const { path, ...params } = req.query

  // Only allow the two endpoints this app uses
  if (path !== 'top-headlines' && path !== 'everything') {
    return res.status(400).json({ status: 'error', message: 'Invalid path' })
  }

  if (!process.env.NEWS_API_KEY) {
    return res.status(500).json({
      status: 'error',
      message: 'NEWS_API_KEY is not set. Add it in Vercel: Settings → Environment Variables, then Redeploy.',
    })
  }

  try {
    const query = new URLSearchParams({ ...params, apiKey: process.env.NEWS_API_KEY })
    const response = await fetch(`https://newsapi.org/v2/${path}?${query}`)
    const data = await response.json()
    res.status(response.status).json(data)
  } catch {
    res.status(502).json({ status: 'error', message: 'Could not reach NewsAPI' })
  }
}
