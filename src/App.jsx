import { Routes, Route } from 'react-router-dom'
import SmoothScroll from './components/SmoothScroll.jsx'
import Nav from './components/Nav.jsx'

// Placeholder pages — replaced by real Home (Task 13) and ProjectDetail (Task 9).
function Home() {
  return (
    <main id="top">
      <h1>Aniket Sahran</h1>
    </main>
  )
}

function ProjectDetail() {
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
