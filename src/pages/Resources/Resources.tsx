import { useState } from 'react'
import './Resources.css'

const resources = [
  {
    title: 'Bible Gateway',
    url: 'https://www.biblegateway.com/',
    description: 'Read, search, and compare dozens of Bible translations. Includes audio, commentaries, and reading plans.',
    icon: '📖',
  },
  {
    title: 'Blue Letter Bible',
    url: 'https://www.blueletterbible.org/',
    description: 'Deep study tools: Greek/Hebrew, commentaries, cross-references, maps, and more.',
    icon: '🔍',
  },
  {
    title: 'Bible Hub',
    url: 'https://biblehub.com/',
    description: 'Parallel translations, commentaries, concordances, and topical studies.',
    icon: '🗂️',
  },
  {
    title: 'ESV Reading Plans',
    url: 'https://www.esv.org/resources/reading-plans/',
    description: 'Printable and digital Bible reading plans for every schedule.',
    icon: '📅',
  },
  {
    title: 'How to Study the Bible (Desiring God)',
    url: 'https://www.desiringgod.org/articles/how-to-study-the-bible',
    description: 'A practical guide to reading and understanding the Bible.',
    icon: '📝',
  },
  {
    title: 'The Bible Project',
    url: 'https://bibleproject.com/',
    description: 'Animated videos, podcasts, and study guides to help you see the Bible as a unified story.',
    icon: '🎥',
  },
]

export function Resources() {
  const [showModal, setShowModal] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    setIsSubmitted(true)
    setFormData({ name: '', url: '', description: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const closeModal = () => {
    setShowModal(false)
    setIsSubmitted(false)
  }

  return (
    <div className="resources-page">
      <h2>Study Tools & Resources</h2>
      <p className="resources-intro">Explore trusted tools, reading plans, and guides to deepen your Bible study.</p>
      <div className="resources-list">
        {resources.map((r, i) => (
          <a key={i} className="resource-card" href={r.url} target="_blank" rel="noopener noreferrer">
            <span className="resource-icon">{r.icon}</span>
            <div className="resource-info">
              <h3>{r.title}</h3>
              <p>{r.description}</p>
            </div>
            <span className="resource-arrow">↗</span>
          </a>
        ))}
      </div>
      <div className="suggest-resource">
        <button className="suggest-btn" onClick={() => setShowModal(true)}>Suggest a Resource</button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {!isSubmitted ? (
              <>
                <h3>Suggest a Resource</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Resource Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Bible Study Tools"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="url">Website URL</label>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                      required
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      placeholder="Brief description of the resource..."
                      rows={4}
                    />
                  </div>
                  <div className="modal-buttons">
                    <button type="button" className="cancel-btn" onClick={closeModal}>
                      Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="success-message">
                <span className="success-icon">✓</span>
                <h3>Thank You!</h3>
                <p>Your resource suggestion has been submitted. We will review it soon.</p>
                <button className="close-success-btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 