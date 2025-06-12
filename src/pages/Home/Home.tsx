import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

export function Home() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="home">
      <section className="hero">
        <h2>Welcome to Bible Companion AI</h2>
        <p>Your intelligent guide to understanding the Bible</p>
      </section>

      <section className="features">
        <div
          className="feature-card clickable"
          onClick={() => navigate('/search')}
          tabIndex={0}
          role="button"
          aria-label="Search Bible Verses"
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/search')}
        >
          <h3>Search Verses</h3>
          <p>Quickly find any Bible verse with our intuitive search interface</p>
        </div>
        <div
          className="feature-card clickable"
          onClick={() => navigate('/explain')}
          tabIndex={0}
          role="button"
          aria-label="Get Explanations"
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/explain')}
        >
          <h3>Get Explanations</h3>
          <p>Understand scripture better with AI-powered explanations</p>
        </div>
        <div
          className="feature-card clickable"
          onClick={() => setShowModal(true)}
          tabIndex={0}
          role="button"
          aria-label="Study Tools"
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setShowModal(true)}
        >
          <h3>Study Tools</h3>
          <p>Access cross-references and multiple translations</p>
        </div>
      </section>
      {showModal && (
        <div className="home-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="home-modal" onClick={e => e.stopPropagation()}>
            <h3>Study Tools & Resources</h3>
            <p>More study tools and resources are coming soon! Stay tuned.</p>
            <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
} 