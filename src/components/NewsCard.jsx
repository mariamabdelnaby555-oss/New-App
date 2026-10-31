import { useState } from 'react'
import '../css/NewsCard.css'

// One article. App → NewsList → NewsCard, one `item` prop per card.
function NewsCard({ item }) {
  // If the image link is broken, show a placeholder instead
  const [imgError, setImgError] = useState(false)

  const date = new Date(item.publishedAt).toLocaleDateString()

  return (
    <li className="card">
      {item.urlToImage && !imgError ? (
        <img
          src={item.urlToImage}
          alt="News"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="no-image">📰</div>
      )}

      <div className="card-body">
        <p className="meta">
          {item.source.name} · {date}
        </p>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <a href={item.url} target="_blank" rel="noreferrer">
          Read more ↗
        </a>
      </div>
    </li>
  )
}

export default NewsCard
