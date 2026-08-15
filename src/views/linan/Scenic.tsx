import { scenicPage } from '@/i18n/pages/scenic'
import { useLanguage } from '@/i18n/LanguageContext'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import MiniTitle from '@/components/MiniTitle'
import ParallaxImage from '@/components/ParallaxImage'
import Seal from '@/components/Seal'

export default function Scenic() {
  const { pick } = useLanguage()

  return (
    <main>
      <PageHero
        kicker={scenicPage.heroKicker}
        title={scenicPage.heroTitle}
        sub={scenicPage.heroSub}
        image="/images/cover-scenic.webp"
      />

      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-lg md:text-xl leading-9 md:leading-10 text-[#3d4842] font-display">
            {pick(scenicPage.intro)}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-16 pb-8 md:pb-12">
        <Reveal>
          <MiniTitle pair={scenicPage.tocLabel} />
        </Reveal>
        <ol className="mt-10 flex flex-col">
          {scenicPage.spots.map((spot, i) => (
            <Reveal key={spot.id} delay={i * 40}>
              <li
                className={`border-t hairline ${i === scenicPage.spots.length - 1 ? 'border-b' : ''}`}
              >
                <a
                  href={`#${spot.id}`}
                  className="group grid grid-cols-[auto_1fr] md:grid-cols-12 gap-x-5 gap-y-1 items-baseline py-5 md:py-6"
                >
                  <span className="font-display text-[#b03a2e] text-lg md:col-span-1">{spot.no}</span>
                  <span className="micro-label text-[#8ca693] md:col-span-3">{spot.latin}</span>
                  <span className="col-span-2 md:col-span-4 font-display text-xl md:text-2xl font-semibold tracking-wide link-underline link-underline-faint">
                    {pick(spot.name)}
                  </span>
                  <span className="col-span-2 md:col-span-4 text-sm text-[#8b958d] md:text-right">
                    {pick(spot.region)}
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {scenicPage.spots.map((spot, i) => (
        <div key={spot.id}>
          <article id={spot.id} className="scroll-mt-28 mx-auto max-w-7xl px-6 md:px-16 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-2 md:col-start-8' : ''}`}>
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-[#b03a2e] text-xl">{spot.no}</span>
                    <p className="micro-label text-[#8ca693]">{spot.latin}</p>
                  </div>
                  <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold leading-snug">
                    {pick(spot.name)}
                  </h2>
                  <p className="mt-2 text-sm text-[#8ca693]">{pick(spot.region)}</p>
                </Reveal>
                <Reveal delay={80}>
                  <p className="mt-8 font-display text-lg md:text-xl leading-8 md:leading-9 text-[#3d4842]">
                    {pick(spot.essence)}
                  </p>
                </Reveal>
                {spot.paragraphs.map((p, j) => (
                  <Reveal key={j} delay={160 + j * 80}>
                    <p className="mt-6 leading-8 text-[#3d4842]">{pick(p)}</p>
                  </Reveal>
                ))}
                <Reveal delay={200}>
                  <div className="mt-8 flex flex-col gap-2 border-t hairline pt-5 text-sm text-[#3d4842]/80">
                    <p>
                      <span className="micro-label text-[#8ca693] mr-3">
                        {pick({ zh: '时令', en: 'Season' })}
                      </span>
                      {pick(spot.season)}
                    </p>
                    <p>
                      <span className="micro-label text-[#8ca693] mr-3">
                        {pick({ zh: '附注', en: 'Note' })}
                      </span>
                      {pick(spot.note)}
                    </p>
                  </div>
                </Reveal>
              </div>
              <div className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}>
                <Reveal delay={80}>
                  <div className="aspect-[3/2] overflow-hidden group md:sticky md:top-28">
                    <img
                      src={spot.image}
                      alt={pick(spot.name)}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </article>
          {i === 2 && (
            <ParallaxImage
              src="/images/hero-lake.webp"
              alt={pick({ zh: '青山湖水杉', en: 'Metasequoia at Qingshan Lake' })}
              caption={pick({ zh: '青山湖 · 水上森林', en: 'Qingshan Lake · flooded forest' })}
            />
          )}
          {i === 5 && (
            <ParallaxImage
              src="/images/hero-village.webp"
              alt={pick({ zh: '指南村秋色', en: 'Zhinan Village in autumn' })}
              caption={pick({ zh: '指南村 · 秋', en: 'Zhinan Village, autumn' })}
            />
          )}
        </div>
      ))}

      <section className="bg-[#1f2a26] text-[#f7f5ee]">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28 text-center">
          <Reveal>
            <Seal char="景" />
            <p className="mt-8 font-display text-xl md:text-2xl leading-relaxed text-[#f7f5ee]/85">
              {pick(scenicPage.footnote)}
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
