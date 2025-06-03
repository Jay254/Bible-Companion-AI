import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import type { ChatHistoryMessage } from '../../services/aiService'
import { getScriptureExplanation } from '../../services/aiService'
import './Explain.css'

interface ChatMessage {
  role: 'user' | 'ai'
  content: string
}

export function Explain() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [chat, setChat] = useState<ChatMessage[]>([])
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat, isLoading])

  const handleCopy = (content: string, idx: number) => {
    navigator.clipboard.writeText(content)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 1500)
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
      <h2>Bible Companion Chat</h2>
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
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(msg.content, idx)}
                    title="Copy explanation"
                    style={{ marginTop: '0.5rem' }}
                  >
                    📋
                  </button>
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
    </div>
  )
} 