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
        <button className="suggest-btn" onClick={() => alert('Feature coming soon!')}>Suggest a Resource</button>
      </div>
    </div>
  )
} 