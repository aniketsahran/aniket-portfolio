import { Routes, Route } from 'react-router-dom'
import SmoothScroll from './components/SmoothScroll.jsx'
import Nav from './components/Nav.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'

// Placeholder Home — replaced by real Home in Task 13.
function Home() {
  return (
    <main id="top">
      <h1>Aniket Sahran</h1>
    </main>
  )
}

export default function App() {
  return (
    <SmoothScroll>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </SmoothScroll>
  )
}
