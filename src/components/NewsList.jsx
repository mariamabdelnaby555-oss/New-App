import '../css/NewsList.css'
import NewsCard from './NewsCard.jsx'

// Shows the right thing for each situation (UI states):
// no key → nothing chosen → loading → error → empty → success
function NewsList({ news, selected, isLoading, error, hasKey }) {
  let content

  if (!hasKey) {
    content = (
      <p className="message error">
        API key not found. Create a <code>.env</code> file next to <code>package.json</code> with{' '}
        <code>VITE_NEWS_API_KEY=your_key</code>, then stop and restart <code>npm run dev</code>.
      </p>
    )
  } else if (!selected) {
    content = <p className="message">👆 Choose a category to see the news</p>
  } else if (isLoading) {
    content = <p className="message">Loading…</p>
  } else if (error) {
    content = <p className="message error">😕 {error}</p>
  } else if (news.length === 0) {
    content = <p className="message">No news found.</p>
  } else {
    content = (
      <ul className="card-list">
        {news.map((newsItem) => (
          <NewsCard key={newsItem.url} item={newsItem} />
        ))}
      </ul>
    )
  }

  return <main className="mn">{content}</main>
}

export default NewsList
