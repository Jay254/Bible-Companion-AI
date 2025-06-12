import type { ReactNode } from 'react'
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
          <a href="/">Home</a>
          <a href="/search">Search</a>
          <a href="/explain">Explain</a>
          <a href="/resources">Resources</a>
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