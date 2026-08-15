import { scenicPage } from '@/i18n/pages/scenic'
import { useLanguage } from '@/i18n/LanguageContext'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
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

      <section className="mx-auto max-w-7xl px-6 md:px-16 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {scenicPage.spots.map((spot, i) => (
            <Reveal key={spot.id} delay={(i % 2) * 80}>
              <article className="group">
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={spot.image}
                    alt={pick(spot.name)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="font-display text-[#b03a2e] text-xl">{spot.no}</span>
                  <p className="micro-label text-[#8ca693]">{spot.latin}</p>
                </div>
                <h2 className="mt-3 font-display text-2xl md:text-3xl font-semibold leading-snug">
                  {pick(spot.name)}
                </h2>
                <p className="mt-2 text-sm text-[#8ca693]">{pick(spot.region)}</p>
                <p className="mt-5 leading-8 text-[#3d4842]">{pick(spot.essence)}</p>
                <div className="mt-6 flex flex-col gap-2 border-t border-[#1f2a26]/10 pt-5 text-sm text-[#3d4842]/80">
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
              </article>
            </Reveal>
          ))}
        </div>
      </section>

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
