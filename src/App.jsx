import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import NewsList from './components/NewsList.jsx'
import Footer from './components/Footer.jsx'

// The key comes from the .env file (never write the key inside the code)
const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const IS_DEV = import.meta.env.DEV // true when you run npm run dev on your computer

// The categories shown in the Navbar.
// A category with `query` is searched by a word; the others are NewsAPI's ready-made categories.
const CATEGORIES = [
  { id: 'general', label: 'Latest News' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'sports', label: 'Sports' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'food', label: 'Food', query: 'food' },
]

// Build the API link for the chosen category
function getUrl(category) {
  const path = category.query ? 'everything' : 'top-headlines'
  const params = category.query
    ? `q=${category.query}&language=en&sortBy=publishedAt&pageSize=20`
    : `category=${category.id}&pageSize=20`

  // On your computer (npm run dev): call NewsAPI directly with the key from .env
  if (IS_DEV) return `https://newsapi.org/v2/${path}?${params}&apiKey=${API_KEY}`

  // On Vercel: call our own function (api/news.js). The key stays on the server.
  return `/api/news?path=${path}&${params}`
}

function App() {
  // State: the memory of the app
  const [selected, setSelected] = useState(null) // null = no category yet → empty page
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Day 2: useEffect + fetch + async/await
  // It runs again every time `selected` changes (the dependency array).
  useEffect(() => {
    if (!selected) return // nothing chosen yet, so don't ask the API

    const category = CATEGORIES.find((cat) => cat.id === selected)
    let ignore = false // so an old, slow answer can't overwrite a newer one

    async function getNews() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(getUrl(category))
        const data = await response.json()

        if (data.status !== 'ok') {
          throw new Error(data.message || 'Something went wrong')
        }
        if (ignore) return

        // skip articles the API has removed
        setNews(data.articles.filter((a) => a.title && a.title !== '[Removed]'))
      } catch (err) {
        if (ignore) return
        setNews([])
        setError(err.message)
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    getNews()

    return () => {
      ignore = true
    }
  }, [selected])

  return (
    <>
      {/* Day 3: the state lives here in App, and goes down as props */}
      <Header
        categories={CATEGORIES}
        selected={selected}
        onSelect={setSelected}
      />
      <NewsList
        news={news}
        selected={selected}
        isLoading={isLoading}
        error={error}
        hasKey={!IS_DEV || Boolean(API_KEY)}
      />
      <Footer />
    </>
  )
}

export default App
