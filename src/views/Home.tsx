import { ArrowRight } from 'lucide-react'
import { anthology, anthologyVolumes } from '@/i18n/content'
import { useLanguage } from '@/i18n/LanguageContext'
import Reveal from '@/components/Reveal'
import MiniTitle from '@/components/MiniTitle'
import ParallaxImage from '@/components/ParallaxImage'
import Seal from '@/components/Seal'
import { withLocale } from '@/lib/i18n-path'

export default function Home() {
  const { lang, pick } = useLanguage()
  const href = (p: string) => withLocale(p, lang)

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#1f2a26]">
        <img
          src="/images/hero-lake.webp"
          alt={pick({ zh: '湖上远山', en: 'Lake and distant hills' })}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1f2a26]/85 via-[#1f2a26]/30 to-[#1f2a26]/30"
          aria-hidden
        />
        <div className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 hidden md:block">
          <p className="vertical-rl font-display text-[#f7f5ee]/60 tracking-[0.5em] text-sm">
            {pick({
              zh: '冀兖青徐扬荆豫梁雍',
              en: 'NINE LANDS, ONE ANTHOLOGY',
              ja: '九州、一志',
              ko: '구주, 한 권의 지',
            })}
          </p>
        </div>
        <div className="relative h-full mx-auto max-w-7xl px-6 md:px-16 flex flex-col justify-end pb-24 md:pb-28">
          <Reveal>
            <p className="micro-label text-[#b0c6b3]">{anthology.domain}</p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="mt-5 font-display font-semibold text-[#f7f5ee] leading-none tracking-wide text-7xl md:text-9xl">
              {pick(anthology.name)}
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-6 max-w-xl font-display text-lg md:text-2xl text-[#f7f5ee]/85 leading-relaxed">
              {pick(anthology.heroKicker)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 md:px-16 py-24 md:py-36">
        <Reveal>
          <MiniTitle pair={anthology.about} />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-5" delay={100}>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-snug">
              {pick({
                zh: '一部线上的方志',
                en: 'An online gazetteer',
                ja: 'オンラインの方志',
                ko: '온라인 방지지',
              })}
            </h2>
            <div className="mt-8">
              <Seal char="九" />
            </div>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7 flex flex-col gap-7">
            {anthology.intro.map((p, i) => (
              <Reveal key={i} delay={180 + i * 120}>
                <p className="text-base md:text-lg leading-8 md:leading-9 text-[#3d4842]">{pick(p)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ParallaxImage
        src="/images/hero-village.webp"
        alt={pick({ zh: '指南村秋色', en: 'Zhinan Village in autumn' })}
        caption={pick({ zh: '指南村 · 秋', en: 'Zhinan Village, autumn' })}
      />

      {/* ── Volumes ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 md:px-16 py-24 md:py-36">
        <Reveal>
          <MiniTitle pair={anthology.volumesLabel} />
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-10 font-display text-4xl md:text-5xl font-semibold">
            {pick(anthology.volumesTitle)}
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col">
          {anthologyVolumes.map((v) => (
            <Reveal key={v.key}>
              <a
                href={href(v.route)}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center py-10 md:py-14 border-t border-b hairline"
              >
                <div className="md:col-span-5 overflow-hidden">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={v.image}
                      alt={pick(v.title)}
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <p className="micro-label text-[#8ca693]">{v.latin}</p>
                  <h3 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-wide">
                    {pick(v.title)}
                  </h3>
                  <p className="mt-2 text-xs tracking-[0.2em] text-[#8b958d]">{pick(v.place)}</p>
                  <p className="mt-4 max-w-md text-[#5a665e] leading-7">{pick(v.desc)}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm tracking-[0.25em] text-[#1f2a26]">
                    {pick({ zh: '开卷', en: 'OPEN', ja: '開巻', ko: '개권' })}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-500 group-hover:translate-x-1.5"
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}

          {/* planned volumes placeholder */}
          <Reveal delay={100}>
            <div className="py-10 md:py-14 border-b hairline opacity-60">
              <p className="micro-label text-[#8ca693]">
                {pick({ zh: '卷二 —', en: 'Vol. II —', ja: '巻二 —', ko: '제2권 —' })}
              </p>
              <p className="mt-3 font-display text-2xl md:text-3xl text-[#5a665e]">
                {pick({
                  zh: '下一卷，在路上。',
                  en: 'The next volume is on the road.',
                  ja: '次の巻は、道の上に。',
                  ko: '다음 권은 길 위에 있습니다.',
                })}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
