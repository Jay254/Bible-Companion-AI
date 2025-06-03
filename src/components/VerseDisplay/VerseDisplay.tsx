import { useState } from 'react'
import './VerseDisplay.css'

const VERSE_BOOKMARKS_KEY = 'bible-companion-verse-bookmarks'

interface VerseBookmark {
  reference: string
  text: string
  translation: string
  date: string
}

function getVerseBookmarks(): VerseBookmark[] {
  try {
    return JSON.parse(localStorage.getItem(VERSE_BOOKMARKS_KEY) || '[]') as VerseBookmark[]
  } catch {
    return []
  }
}

function saveVerseBookmarks(bookmarks: VerseBookmark[]) {
  localStorage.setItem(VERSE_BOOKMARKS_KEY, JSON.stringify(bookmarks))
}

interface VerseDisplayProps {
  reference: string
  text: string
  translation: string
  isLoading?: boolean
  error?: string
}

export function VerseDisplay({ reference, text, translation, isLoading, error }: VerseDisplayProps) {
  const [copied, setCopied] = useState(false)
  const [bookmarks, setBookmarks] = useState<VerseBookmark[]>(getVerseBookmarks())
  const [showBookmarks, setShowBookmarks] = useState(false)

  const verseObj = { reference, text, translation }
  const isBookmarked = bookmarks.some((b) => b.reference === reference && b.text === text)

  const handleCopy = () => {
    navigator.clipboard.writeText(`${reference}\n${text}\n(${translation})`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleBookmark = () => {
    if (isBookmarked) return
    const newBookmarks = [{ ...verseObj, date: new Date().toISOString() }, ...bookmarks]
    setBookmarks(newBookmarks)
    saveVerseBookmarks(newBookmarks)
  }

  const handleRemoveBookmark = (ref: string, txt: string) => {
    const newBookmarks = bookmarks.filter((b) => !(b.reference === ref && b.text === txt))
    setBookmarks(newBookmarks)
    saveVerseBookmarks(newBookmarks)
  }

  if (isLoading) {
    return (
      <div className="verse-display loading">
        <div className="loading-spinner"></div>
        <p>Loading verse...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="verse-display error">
        <p>{error}</p>
      </div>
    )
  }

  if (!text) {
    return null
  }

  return (
    <div className="verse-display">
      <div className="verse-content">
        <div className="verse-header">
          <h3 className="verse-reference">{reference}</h3>
          <button className="copy-btn" onClick={handleCopy} title="Copy verse">
            📋
          </button>
          <button
            className="bookmark-btn"
            onClick={handleBookmark}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark verse'}
            style={{ color: isBookmarked ? '#f1c40f' : '#bbb' }}
            disabled={isBookmarked}
          >
            {isBookmarked ? '⭐' : '☆'}
          </button>
          {copied && <span className="copy-tooltip">Copied!</span>}
        </div>
        <p className="verse-text">{text}</p>
        <p className="verse-translation">{translation}</p>
      </div>
      <button
        className="bookmark-modal-btn"
        onClick={() => setShowBookmarks(true)}
        title="View Verse Bookmarks"
        style={{ margin: '1rem auto 0 auto', display: 'block', fontSize: '1.1rem' }}
      >
        ⭐ View Bookmarks
      </button>
      {showBookmarks && (
        <div className="bookmark-modal">
          <div className="bookmark-modal-content">
            <h3>Your Verse Bookmarks</h3>
            {bookmarks.length === 0 ? (
              <p className="bookmark-empty">No verse bookmarks yet.</p>
            ) : (
              <ul className="bookmark-list">
                {bookmarks.map((b, i) => (
                  <li key={i} className="bookmark-item">
                    <div className="bookmark-markdown">
                      <strong>{b.reference}</strong>
                      <div>{b.text}</div>
                      <div style={{ fontSize: '0.95em', color: '#888' }}>{b.translation}</div>
                    </div>
                    <button className="copy-btn" onClick={() => {navigator.clipboard.writeText(`${b.reference}\n${b.text}\n(${b.translation})`)}} title="Copy bookmark">📋</button>
                    <button className="remove-btn" onClick={() => handleRemoveBookmark(b.reference, b.text)} title="Remove bookmark">🗑️</button>
                  </li>
                ))}
              </ul>
            )}
            <button className="close-btn" onClick={() => setShowBookmarks(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
} 