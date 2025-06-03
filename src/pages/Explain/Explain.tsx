import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import type { ChatHistoryMessage } from '../../services/aiService'
import { getScriptureExplanation } from '../../services/aiService'
import './Explain.css'

interface ChatMessage {
  role: 'user' | 'ai'
  content: string
}

interface Bookmark {
  content: string
  date: string
}

const BOOKMARKS_KEY = 'bible-companion-bookmarks'

function getBookmarks(): Bookmark[] {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveBookmarks(bookmarks: Bookmark[]) {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
}

function cleanEchoedPrompt(aiContent: string, lastUserPrompt: string): string {
  if (!lastUserPrompt) return aiContent
  // Remove if AI response starts with the prompt (optionally quoted)
  const trimmedPrompt = lastUserPrompt.trim()
  if (aiContent.trim().startsWith(trimmedPrompt)) {
    return aiContent.trim().slice(trimmedPrompt.length).trimStart()
  }
  // Remove if AI response starts with quoted prompt
  if (aiContent.trim().startsWith('"' + trimmedPrompt + '"')) {
    return aiContent.trim().slice(trimmedPrompt.length + 2).trimStart()
  }
  return aiContent
}

export function Explain() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [chat, setChat] = useState<ChatMessage[]>([])
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(getBookmarks())
  const [showBookmarks, setShowBookmarks] = useState(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat, isLoading])

  useEffect(() => {
    saveBookmarks(bookmarks)
  }, [bookmarks])

  const handleCopy = (content: string, idx: number) => {
    navigator.clipboard.writeText(content)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  const handleBookmark = (content: string, idx?: number) => {
    // Find the last user message before this AI message
    let lastUserPrompt = ''
    if (typeof idx === 'number' && idx > 0) {
      for (let i = idx - 1; i >= 0; i--) {
        if (chat[i].role === 'user') {
          lastUserPrompt = chat[i].content
          break
        }
      }
    }
    const cleanedContent = cleanEchoedPrompt(content, lastUserPrompt)
    if (bookmarks.some(b => b.content === cleanedContent)) return
    setBookmarks(prev => [
      { content: cleanedContent, date: new Date().toISOString() },
      ...prev
    ])
  }

  const handleRemoveBookmark = (content: string) => {
    setBookmarks(prev => prev.filter(b => b.content !== content))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    if (!message.trim()) {
      setError('Please enter your question or verse. For example: "What does John 3:16 mean?"')
      return
    }
    const newChat: ChatMessage[] = [
      ...chat,
      { role: 'user', content: message }
    ]
    setChat(newChat)
    setIsLoading(true)
    setMessage('')
    try {
      const response = await getScriptureExplanation(newChat as ChatHistoryMessage[])
      setChat(prev => [
        ...prev,
        { role: 'ai', content: response.answer }
      ])
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get explanation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="explain-page chat-mode">
      <h2>Bible Companion Chat
        <button className="bookmark-modal-btn" onClick={() => setShowBookmarks(true)} title="View Bookmarks">⭐</button>
      </h2>
      <p className="explain-intro">
        Ask any question about the Bible, or type a verse and your question in one message. The AI will understand and respond contextually!
      </p>
      <div className="chat-window">
        {chat.length === 0 && (
          <div className="chat-placeholder">
            <p>Try: <em>What does John 3:16 mean?</em> or <em>Explain "In the beginning God created the heavens and the earth"</em></p>
          </div>
        )}
        {chat.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.role}`}> 
            <div className="chat-avatar">
              {msg.role === 'user' ? '🧑' : '📖'}
            </div>
            <div className="bubble-content">
              <div className={`chat-meta ${msg.role === 'user' ? 'user-meta' : 'ai-meta'}`}>{msg.role === 'user' ? 'You' : 'Bible Companion AI'}</div>
              <div className="chat-content">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
                {msg.role === 'ai' && (
                  <>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(msg.content, idx)}
                      title="Copy explanation"
                      style={{ marginTop: '0.5rem' }}
                    >
                      📋
                    </button>
                    <button
                      className="bookmark-btn"
                      onClick={() => handleBookmark(msg.content, idx)}
                      title={bookmarks.some(b => b.content === msg.content) ? 'Bookmarked' : 'Bookmark explanation'}
                      style={{ marginTop: '0.5rem', marginLeft: '0.5rem', color: bookmarks.some(b => b.content === msg.content) ? '#f1c40f' : '#bbb' }}
                      disabled={bookmarks.some(b => b.content === msg.content)}
                    >
                      {bookmarks.some(b => b.content === msg.content) ? '⭐' : '☆'}
                    </button>
                  </>
                )}
                {msg.role === 'ai' && copiedIdx === idx && (
                  <span className="copy-tooltip">Copied!</span>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat-bubble ai loading">
            <div className="chat-avatar">📖</div>
            <div className="bubble-content">
              <div className="chat-meta ai-meta">
                Bible Companion AI
              </div>
              <div className="chat-content">
                <div className="loading-spinner"></div>
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form className="chat-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-row">
          <textarea
            placeholder="Type your question or verse here... (e.g. What does John 3:16 mean?)"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="chat-input question-input"
            rows={2}
            disabled={isLoading}
            required
          />
          <button type="submit" className="explain-button" disabled={isLoading}>
            <span>Send</span>
            <span className="send-icon">✈️</span>
          </button>
        </div>
        {error && <div className="explanation-display error"><p>{error}</p></div>}
      </form>
      {showBookmarks && (
        <div className="bookmark-modal">
          <div className="bookmark-modal-content">
            <h3>Your Bookmarks</h3>
            {bookmarks.length === 0 ? (
              <p className="bookmark-empty">No bookmarks yet.</p>
            ) : (
              <ul className="bookmark-list">
                {bookmarks.map((b, i) => (
                  <li key={i} className="bookmark-item">
                    <div className="bookmark-markdown">
                      <ReactMarkdown>{b.content}</ReactMarkdown>
                    </div>
                    <button className="copy-btn" onClick={() => handleCopy(b.content, -100 - i)} title="Copy bookmark">📋</button>
                    <button className="remove-btn" onClick={() => handleRemoveBookmark(b.content)} title="Remove bookmark">🗑️</button>
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