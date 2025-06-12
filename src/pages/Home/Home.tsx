import { useNavigate } from 'react-router-dom'
import './Home.css'

export function Home() {
  const navigate = useNavigate()

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
          onClick={() => navigate('/resources')}
          tabIndex={0}
          role="button"
          aria-label="Study Tools"
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/resources')}
        >
          <h3>Study Tools</h3>
          <p>Access cross-references and multiple translations</p>
        </div>
      </section>
    </div>
  )
} 