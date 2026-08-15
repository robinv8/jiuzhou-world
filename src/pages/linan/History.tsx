import { useEffect, useRef, useState } from 'react'
import { historyPage } from '@/i18n/pages/history'
import { useLanguage } from '@/i18n/LanguageContext'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Seal from '@/components/Seal'

export default function History() {
  const { pick } = useLanguage()
  const entries = historyPage.timeline
  const [active, setActive] = useState(0)
  const anchorRefs = useRef<(HTMLDivElement | null)[]>([])

  // Sticky-steps: activate the entry whose anchor is nearest to viewport centre
  useEffect(() => {
    let raf = 0
    const update = () => {
      const centre = window.innerHeight / 2
      let best = 0
      let bestDist = Infinity
      anchorRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - centre)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      setActive(best)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <main>
      <PageHero
        kicker={historyPage.heroKicker}
        title={historyPage.heroTitle}
        sub={historyPage.heroSub}
        image="/images/cover-history.png"
      />

      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-lg md:text-xl leading-9 md:leading-10 text-[#3d4842] font-display">
            {pick(historyPage.intro)}
          </p>
        </Reveal>
      </section>

      {/* ── Sticky-scroll timeline ── */}
      <section className="mx-auto max-w-7xl px-6 md:px-16 pb-24 md:pb-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* text rail */}
          <div className="md:col-span-6 flex flex-col">
            {entries.map((entry, i) => (
              <div
                key={entry.id}
                ref={(el) => {
                  anchorRefs.current[i] = el
                }}
                className={`min-h-[70vh] md:min-h-[85vh] flex flex-col justify-center transition-opacity duration-500 ${
                  active === i ? 'opacity-100' : 'opacity-30 md:opacity-30'
                }`}
              >
                {/* mobile: show image above text */}
                <div className="md:hidden mb-8 aspect-[3/2] overflow-hidden">
                  <img src={entry.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <p className="micro-label text-[#8ca693]">{pick(entry.era)}</p>
                <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold leading-snug">
                  {pick(entry.title)}
                </h2>
                <span
                  className={`mt-5 h-px w-16 transition-colors duration-500 ${
                    active === i ? 'bg-[#b03a2e]' : 'bg-[#1f2a26]/20'
                  }`}
                  aria-hidden
                />
                {entry.paragraphs.map((p, j) => (
                  <p key={j} className="mt-6 leading-8 text-[#3d4842] max-w-lg">
                    {pick(p)}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* sticky visual (desktop) */}
          <div className="hidden md:block md:col-span-6">
            <div className="sticky top-0 h-screen flex items-center">
              <div className="relative w-full aspect-[3/4] max-h-[80vh] overflow-hidden">
                {entries.map((entry, i) => (
                  <img
                    key={entry.id}
                    src={entry.image}
                    alt={pick(entry.title)}
                    className={`sticky-visual absolute inset-0 h-full w-full object-cover ${
                      active === i ? 'is-active' : ''
                    }`}
                  />
                ))}
                <div className="absolute inset-0 ring-1 ring-inset ring-[#1f2a26]/10" aria-hidden />
                <p className="absolute bottom-4 left-4 bg-[#1f2a26]/70 px-3 py-1.5 micro-label text-[#f7f5ee]">
                  {pick(entries[active].era)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* colophon */}
      <section className="bg-[#1f2a26] text-[#f7f5ee]">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28 text-center">
          <Reveal>
            <Seal char="史" />
            <p className="mt-8 font-display text-2xl md:text-3xl leading-relaxed text-[#f7f5ee]/90">
              {pick(historyPage.colophon)}
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
