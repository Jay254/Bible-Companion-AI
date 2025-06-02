import './VerseDisplay.css'

interface VerseDisplayProps {
  reference: string
  text: string
  translation: string
  isLoading?: boolean
  error?: string
}

export function VerseDisplay({ reference, text, translation, isLoading, error }: VerseDisplayProps) {
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
        <h3 className="verse-reference">{reference}</h3>
        <p className="verse-text">{text}</p>
        <p className="verse-translation">{translation}</p>
      </div>
    </div>
  )
} 