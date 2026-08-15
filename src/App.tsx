import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { LanguageProvider } from '@/i18n/LanguageContext'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Home from '@/pages/Home'
import LinanHome from '@/pages/linan/LinanHome'
import Mountains from '@/pages/linan/Mountains'
import Scenic from '@/pages/linan/Scenic'
import History from '@/pages/linan/History'
import Culture from '@/pages/linan/Culture'
import About from '@/pages/About'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        {/* 九州志 · 总入口 */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* 临安卷 */}
        <Route path="/linan" element={<LinanHome />} />
        <Route path="/linan/mountains" element={<Mountains />} />
        <Route path="/linan/scenic" element={<Scenic />} />
        <Route path="/linan/history" element={<History />} />
        <Route path="/linan/culture" element={<Culture />} />

        {/* 旧路径重定向 */}
        <Route path="/mountains" element={<Mountains />} />
        <Route path="/scenic" element={<Scenic />} />
        <Route path="/history" element={<History />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <SiteFooter />
    </LanguageProvider>
  )
}
