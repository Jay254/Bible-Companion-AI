import { useEffect, useState } from 'react'
import { VerseDisplay } from '../../components/VerseDisplay/VerseDisplay'
import { fetchBibleVerse } from '../../services/bibleApi'
import './Search.css'

// List of Bible books
const BIBLE_BOOKS = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
  'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
  'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
  'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
  'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
  'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts',
  'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
  'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy',
  '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James',
  '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
  'Jude', 'Revelation'
]

const RECENT_SEARCHES_KEY = 'bible-companion-recent-searches'
const MAX_RECENT = 10

interface SearchFormData {
  book: string
  chapter: string
  verse: string
}

interface VerseData {
  reference: string
  text: string
  translation: string
}

interface RecentSearch extends SearchFormData {
  timestamp: number
}

function getRecentSearches(): RecentSearch[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]') as RecentSearch[]
  } catch {
    return []
  }
}

function saveRecentSearches(searches: RecentSearch[]) {
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches))
}

export function Search() {
  const [formData, setFormData] = useState<SearchFormData>({
    book: '',
    chapter: '',
    verse: ''
  })
  const [errors, setErrors] = useState<Partial<SearchFormData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [verseData, setVerseData] = useState<VerseData>()
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(getRecentSearches())

  useEffect(() => {
    saveRecentSearches(recentSearches)
  }, [recentSearches])

  const validateForm = (): boolean => {
    const newErrors: Partial<SearchFormData> = {}
    
    if (!formData.book) {
      newErrors.book = 'Please select a book'
    }
    if (!formData.chapter) {
      newErrors.chapter = 'Chapter is required'
    } else if (isNaN(Number(formData.chapter)) || Number(formData.chapter) < 1) {
      newErrors.chapter = 'Please enter a valid chapter number'
    }
    if (!formData.verse) {
      newErrors.verse = 'Verse is required'
    } else if (isNaN(Number(formData.verse)) || Number(formData.verse) < 1) {
      newErrors.verse = 'Please enter a valid verse number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    setVerseData(undefined)

    if (validateForm()) {
      setIsLoading(true)
      try {
        const verse = await fetchBibleVerse(formData.book, formData.chapter, formData.verse)
        setVerseData(verse)
        // Add to recent searches
        const newSearch: RecentSearch = {
          ...formData,
          timestamp: Date.now()
        }
        setRecentSearches(prev => {
          // Remove duplicates (same book, chapter, verse)
          const filtered = prev.filter(s => !(s.book === newSearch.book && s.chapter === newSearch.chapter && s.verse === newSearch.verse))
          return [newSearch, ...filtered].slice(0, MAX_RECENT)
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name as keyof SearchFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleRecentClick = (search: RecentSearch) => {
    setFormData({ book: search.book, chapter: search.chapter, verse: search.verse })
    // Optionally, auto-search:
    // handleSubmit(new Event('submit') as any)
  }

  const handleClearRecent = () => {
    setRecentSearches([])
  }

  return (
    <div className="search-page">
      <h2>Search Bible Verses</h2>
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <div className="recent-header">
            <span>Recent Searches</span>
            <button className="clear-recent-btn" onClick={handleClearRecent} title="Clear recent searches">Clear</button>
          </div>
          <ul className="recent-list">
            {recentSearches.map((s, i) => (
              <li key={i}>
                <button className="recent-item" onClick={() => handleRecentClick(s)}>
                  {s.book} {s.chapter}:{s.verse}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="book">Book</label>
          <select
            id="book"
            name="book"
            value={formData.book}
            onChange={handleChange}
            className={errors.book ? 'error' : ''}
          >
            <option value="">Select a book</option>
            {BIBLE_BOOKS.map(book => (
              <option key={book} value={book}>{book}</option>
            ))}
          </select>
          {errors.book && <span className="error-message">{errors.book}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="chapter">Chapter</label>
          <input
            type="number"
            id="chapter"
            name="chapter"
            value={formData.chapter}
            onChange={handleChange}
            min="1"
            className={errors.chapter ? 'error' : ''}
          />
          {errors.chapter && <span className="error-message">{errors.chapter}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="verse">Verse</label>
          <input
            type="number"
            id="verse"
            name="verse"
            value={formData.verse}
            onChange={handleChange}
            min="1"
            className={errors.verse ? 'error' : ''}
          />
          {errors.verse && <span className="error-message">{errors.verse}</span>}
        </div>

        <button type="submit" className="search-button" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search Verse'}
        </button>
      </form>

      {verseData && (
        <VerseDisplay
          reference={verseData.reference}
          text={verseData.text}
          translation={verseData.translation}
        />
      )}

      <VerseDisplay
        isLoading={isLoading}
        error={error}
        reference=""
        text=""
        translation=""
      />
    </div>
  )
} 