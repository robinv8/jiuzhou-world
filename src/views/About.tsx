import { aboutPage } from '@/i18n/content'
import { useLanguage } from '@/i18n/LanguageContext'
import Reveal from '@/components/Reveal'
import Seal from '@/components/Seal'

export default function About() {
  const { pick } = useLanguage()

  return (
    <main>
      <header className="mx-auto max-w-3xl px-6 pt-40 md:pt-52 pb-16 md:pb-24">
        <Reveal>
          <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-wide">
            {pick(aboutPage.heroTitle)}
          </h1>
          <p className="mt-6 font-display text-lg md:text-xl text-[#5a665e]">
            {pick(aboutPage.heroSub)}
          </p>
        </Reveal>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-24 md:pb-36 flex flex-col gap-16 md:gap-20">
        {aboutPage.sections.map((s, i) => (
          <Reveal key={i}>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">{pick(s.title)}</h2>
            <span className="mt-5 block h-px w-16 bg-[#b03a2e]" aria-hidden />
            {s.paragraphs.map((p, j) => (
              <p key={j} className="mt-6 leading-8 md:leading-9 text-[#3d4842]">
                {pick(p)}
              </p>
            ))}
          </Reveal>
        ))}
        <Reveal>
          <Seal char="志" />
        </Reveal>
      </section>
    </main>
  )
}
