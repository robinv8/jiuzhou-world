import { scenicSpots } from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ChapterClose from '@/components/ChapterClose'
import { withLocale } from '@/lib/i18n-path'

export default function Scenic({ lang }: { lang: Lang }) {
    const { t } = messages(lang)

    return (
        <main>
            <PageHero
                lang={lang}
                kicker="scenic.heroKicker"
                title="scenic.heroTitle"
                sub="scenic.heroSub"
                image="/images/cover-scenic.webp"
            />

            <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
                <Reveal>
                    <p className="text-lg md:text-xl leading-9 md:leading-10 text-[#3d4842] font-display">
                        {t('scenic.intro')}
                    </p>
                </Reveal>
            </section>

            <section className="mx-auto max-w-7xl px-6 md:px-16 pb-20 md:pb-28">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                    {scenicSpots.map((spot, i) => (
                        <Reveal key={spot.id} delay={(i % 2) * 80}>
                            <article className="group">
                                <div className="aspect-3/2 overflow-hidden">
                                    <img
                                        src={spot.image}
                                        alt={t(`scenic.spots.${spot.id}.name`)}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.04]"
                                    />
                                </div>
                                <div className="mt-6 flex items-baseline gap-4">
                                    <span className="font-display text-[#b03a2e] text-xl">{spot.no}</span>
                                    <p className="micro-label text-[#8ca693]">{spot.latin}</p>
                                </div>
                                <h2 className="mt-3 font-display text-2xl md:text-3xl font-semibold leading-snug">
                                    {t(`scenic.spots.${spot.id}.name`)}
                                </h2>
                                <p className="mt-2 text-sm text-[#8ca693]">{t(`scenic.spots.${spot.id}.region`)}</p>
                                <p className="mt-5 leading-8 text-[#3d4842]">{t(`scenic.spots.${spot.id}.essence`)}</p>
                                <div className="mt-6 flex flex-col gap-2 border-t border-[#1f2a26]/10 pt-5 text-sm text-[#3d4842]/80">
                                    <p>
                                        <span className="micro-label text-[#8ca693] mr-3">{t('ui.season')}</span>
                                        {t(`scenic.spots.${spot.id}.season`)}
                                    </p>
                                    <p>
                                        <span className="micro-label text-[#8ca693] mr-3">{t('ui.note')}</span>
                                        {t(`scenic.spots.${spot.id}.note`)}
                                    </p>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </section>

            <ChapterClose
                seal="景"
                tone="ink"
                colophon={t('scenic.colophon')}
                nextHref={withLocale('/linan/culture', lang)}
                nextLabel={`${t('ui.nextChapter')} · ${t('linan.volumes.culture.title')}`}
                footnote={t('scenic.footnote')}
            />
        </main>
    )
}
