import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout/Layout'
import { Explain } from './pages/Explain/Explain'
import { Home } from './pages/Home/Home'
import { Resources } from './pages/Resources/Resources'
import { Search } from './pages/Search/Search'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explain" element={<Explain />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
