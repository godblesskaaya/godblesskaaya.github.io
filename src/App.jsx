import { useEffect } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ExperiencePage from './pages/ExperiencePage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'
import ResearchIndexPage from './pages/ResearchIndexPage'
import LabourMarket from './LabourMarket'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function PortfolioLayout() {
  return (
    <div className="bg-[#050d1f] text-white min-h-screen overflow-x-hidden font-sans">
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </div>
  )
}

function ResearchArticleLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden font-sans">
      <Navbar solid />
      <LabourMarket />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PortfolioLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/research" element={<ResearchIndexPage />} />
        </Route>
        <Route path="/research/labour-market" element={<ResearchArticleLayout />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  )
}
