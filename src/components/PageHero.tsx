import type { Pair } from '@/i18n/content'
import { useLanguage } from '@/i18n/LanguageContext'
import Reveal from './Reveal'

interface PageHeroProps {
  kicker: Pair
  title: Pair
  sub: Pair
  image: string
}

/** Interior page hero: tall image band with ink-gradient and serif title. */
export default function PageHero({ kicker, title, sub, image }: PageHeroProps) {
  const { lang, pick } = useLanguage()
  return (
    <header className="relative h-[78vh] min-h-[520px] overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#1f2a26]/85 via-[#1f2a26]/25 to-[#1f2a26]/20"
        aria-hidden
      />
      <div className="relative h-full mx-auto max-w-7xl px-6 md:px-16 flex flex-col justify-end pb-16 md:pb-24">
        <Reveal>
          <p className="micro-label text-[#b0c6b3]">
            {lang === 'zh' ? kicker.en : kicker.zh} · {pick(kicker)}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-semibold tracking-wide text-[#f7f5ee]">
            {pick(title)}
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-5 max-w-xl font-display text-lg md:text-xl text-[#f7f5ee]/85">{pick(sub)}</p>
        </Reveal>
      </div>
    </header>
  )
}
