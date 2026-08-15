import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import { anthology, nav } from '@/i18n/content'
import { useLanguage } from '@/i18n/LanguageContext'

const linanLinks = [
  { to: '/linan/mountains', label: nav.mountains },
  { to: '/linan/scenic', label: nav.scenic },
  { to: '/linan/history', label: nav.history },
  { to: '/linan/culture', label: nav.culture },
]

export default function SiteHeader() {
  const { lang, setLang, pick } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const inLinan = location.pathname.startsWith('/linan')

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > lastY && y > 300)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const onDark = !scrolled

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${scrolled ? 'bg-[#f7f5ee]/92 backdrop-blur-sm border-b hairline' : 'bg-transparent'}`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 md:px-16 transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-7'
        }`}
      >
        {/* brand: 九州志 + current volume */}
        <div className="flex items-baseline gap-3">
          <Link to="/" className="group flex items-baseline gap-3">
            <span
              className={`font-display text-xl md:text-2xl font-semibold tracking-wide transition-colors ${
                onDark ? 'text-[#f7f5ee]' : 'text-[#1f2a26]'
              }`}
            >
              {pick(anthology.name)}
            </span>
            <span
              className={`micro-label hidden sm:inline transition-colors ${
                onDark ? 'text-[#f7f5ee]/70' : 'text-[#5a665e]'
              }`}
            >
              Jiuzhou
            </span>
          </Link>
          {inLinan && (
            <>
              <span className={onDark ? 'text-[#f7f5ee]/40' : 'text-[#1f2a26]/30'}>/</span>
              <Link
                to="/linan"
                className={`font-display text-base tracking-[0.15em] transition-colors ${
                  onDark ? 'text-[#f7f5ee]/85 hover:text-[#f7f5ee]' : 'text-[#1f2a26]/70 hover:text-[#1f2a26]'
                }`}
              >
                {lang === 'zh' ? '临安卷' : "Lin'an"}
              </Link>
            </>
          )}
        </div>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {inLinan &&
            linanLinks.map((l) => (
              <NavLink key={l.to} to={l.to}>
                {({ isActive }) => (
                  <span
                    className={`flex flex-col items-start transition-colors ${
                      onDark ? 'text-[#f7f5ee]' : 'text-[#1f2a26]'
                    } ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <span className="micro-label">{l.label.en}</span>
                    <span className="font-display text-base tracking-[0.2em]">{l.label.zh}</span>
                    {isActive && <span className="mt-1 h-px w-full bg-[#b03a2e]" aria-hidden />}
                  </span>
                )}
              </NavLink>
            ))}
          {!inLinan && (
            <NavLink to="/about">
              <span
                className={`flex flex-col items-start transition-colors opacity-70 hover:opacity-100 ${
                  onDark ? 'text-[#f7f5ee]' : 'text-[#1f2a26]'
                }`}
              >
                <span className="micro-label">{anthology.about.en}</span>
                <span className="font-display text-base tracking-[0.2em]">{anthology.about.zh}</span>
              </span>
            </NavLink>
          )}
          <button
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className={`ml-4 border px-3 py-1.5 text-xs tracking-[0.25em] transition-colors font-display ${
              onDark
                ? 'border-[#f7f5ee]/40 text-[#f7f5ee] hover:bg-[#f7f5ee] hover:text-[#1f2a26]'
                : 'border-[#1f2a26]/30 text-[#1f2a26] hover:bg-[#1f2a26] hover:text-[#f7f5ee]'
            }`}
            aria-label="Switch language"
          >
            {lang === 'zh' ? 'EN' : '中文'}
          </button>
        </nav>

        <button
          className={`md:hidden ${onDark ? 'text-[#f7f5ee]' : 'text-[#1f2a26]'}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* mobile nav */}
      {open && (
        <nav className="md:hidden bg-[#f7f5ee] border-t hairline px-6 py-6 flex flex-col gap-5">
          <NavLink to="/" className="flex items-baseline gap-3 text-[#1f2a26]">
            <span className="font-display text-lg">{pick(anthology.name)}</span>
            <span className="micro-label text-[#5a665e]">Home</span>
          </NavLink>
          <NavLink to="/linan" className="flex items-baseline gap-3 text-[#1f2a26]">
            <span className="font-display text-lg">{lang === 'zh' ? '临安卷' : "Lin'an"}</span>
            <span className="micro-label text-[#5a665e]">Vol. I</span>
          </NavLink>
          {inLinan &&
            linanLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className="flex items-baseline gap-3 pl-4 text-[#1f2a26]">
                <span className="font-display text-base">{l.label.zh}</span>
                <span className="micro-label text-[#5a665e]">{l.label.en}</span>
              </NavLink>
            ))}
          <button
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="self-start border border-[#1f2a26]/30 px-3 py-1.5 text-xs tracking-[0.25em] font-display"
          >
            {lang === 'zh' ? 'EN' : '中文'}
          </button>
        </nav>
      )}
    </header>
  )
}
