import { useState } from 'react'
import './Explain.css'

interface ExplanationFormData {
  scripture: string
  question: string
}

interface ExplanationData {
  answer: string
  scripture: string
}

export function Explain() {
  const [formData, setFormData] = useState<ExplanationFormData>({
    scripture: '',
    question: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [explanation, setExplanation] = useState<ExplanationData>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    setExplanation(undefined)

    if (!formData.scripture.trim() || !formData.question.trim()) {
      setError('Please provide both scripture and your question')
      return
    }

    setIsLoading(true)
    try {
      // TODO: Replace with actual AI API call
      // Simulating API call for now
      await new Promise(resolve => setTimeout(resolve, 1500))
      setExplanation({
        answer: `This is a simulated explanation for the scripture: "${formData.scripture}"\n\nQuestion: ${formData.question}\n\nIn the next step, we'll integrate with an actual AI service to provide meaningful explanations.`,
        scripture: formData.scripture
      })
    } catch (err) {
      setError('Failed to get explanation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="explain-page">
      <h2>Get Scripture Explanations</h2>
      <p className="explain-intro">
        Enter a Bible verse and your question to receive an AI-powered explanation.
      </p>

      <form className="explain-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="scripture">Bible Verse</label>
          <textarea
            id="scripture"
            name="scripture"
            value={formData.scripture}
            onChange={handleChange}
            placeholder="Enter the Bible verse you want explained..."
            rows={3}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="question">Your Question</label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="What would you like to understand about this verse?"
            rows={4}
            required
          />
        </div>

        <button type="submit" className="explain-button" disabled={isLoading}>
          {isLoading ? 'Getting Explanation...' : 'Get Explanation'}
        </button>
      </form>

      {isLoading && (
        <div className="explanation-display loading">
          <div className="loading-spinner"></div>
          <p>Generating explanation...</p>
        </div>
      )}

      {error && (
        <div className="explanation-display error">
          <p>{error}</p>
        </div>
      )}

      {explanation && (
        <div className="explanation-display">
          <div className="explanation-content">
            <h3>Explanation</h3>
            <div className="scripture-reference">
              <strong>Scripture:</strong> {explanation.scripture}
            </div>
            <div className="explanation-text">
              {explanation.answer.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 