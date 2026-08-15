import { mountainsPage } from '@/i18n/pages/mountains'
import { useLanguage } from '@/i18n/LanguageContext'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ParallaxImage from '@/components/ParallaxImage'
import Seal from '@/components/Seal'

export default function Mountains() {
  const { pick } = useLanguage()

  return (
    <main>
      <PageHero
        kicker={mountainsPage.heroKicker}
        title={mountainsPage.heroTitle}
        sub={mountainsPage.heroSub}
        image="/images/cover-mountains.webp"
      />

      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-lg md:text-xl leading-9 md:leading-10 text-[#3d4842] font-display">
            {pick(mountainsPage.intro)}
          </p>
        </Reveal>
      </section>

      {mountainsPage.essays.map((essay, i) => (
        <div key={essay.id}>
          <section className="mx-auto max-w-7xl px-6 md:px-16 py-14 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-2 md:col-start-8' : ''}`}>
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-[#b03a2e] text-xl">{essay.no}</span>
                    <p className="micro-label text-[#8ca693]">{essay.latin}</p>
                  </div>
                  <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold leading-snug">
                    {pick(essay.title)}
                  </h2>
                </Reveal>
                {essay.paragraphs.map((p, j) => (
                  <Reveal key={j} delay={120 + j * 100}>
                    <p className="mt-6 leading-8 text-[#3d4842]">{pick(p)}</p>
                  </Reveal>
                ))}
              </div>
              <div className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}>
                <Reveal delay={80}>
                  <div className="aspect-[3/2] overflow-hidden group">
                    <img
                      src={essay.image}
                      alt={pick(essay.title)}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
          {i === 1 && (
            <ParallaxImage
              src="/images/spot-qingliang.webp"
              alt=""
              caption={pick({ zh: '清凉峰 · 云海', en: 'Qingliang Peak · sea of clouds' })}
            />
          )}
        </div>
      ))}

      <section className="bg-[#edeae0]">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28 text-center">
          <Reveal>
            <Seal char="山" />
            <p className="mt-8 font-display text-2xl md:text-3xl leading-relaxed">
              {pick(mountainsPage.colophon)}
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
