import { useState } from 'react'
import './VerseDisplay.css'

interface VerseDisplayProps {
  reference: string
  text: string
  translation: string
  isLoading?: boolean
  error?: string
}

export function VerseDisplay({ reference, text, translation, isLoading, error }: VerseDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`${reference}\n${text}\n(${translation})`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
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
          {copied && <span className="copy-tooltip">Copied!</span>}
        </div>
        <p className="verse-text">{text}</p>
        <p className="verse-translation">{translation}</p>
      </div>
    </div>
  )
} 