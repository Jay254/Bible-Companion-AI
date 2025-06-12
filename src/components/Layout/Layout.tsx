import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <header className="header">
        <h1>Bible Companion AI</h1>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/explain">Explain</Link>
          <Link to="/resources">Resources</Link>
        </nav>
      </header>
      
      <main className="main">
        {children}
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Bible Companion AI. All rights reserved.</p>
      </footer>
    </div>
  )
} 