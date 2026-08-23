import { getVolume, getVolumeContent } from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import ChapterLead from '@/components/ChapterLead'
import Reveal from '@/components/Reveal'
import ChapterClose from '@/components/ChapterClose'
import { withLocale } from '@/lib/i18n-path'

export default function History({ lang, volume }: { lang: Lang; volume: string }) {
    const { t, tList } = messages(lang)
    const vol = getVolume(volume)
    const content = getVolumeContent(volume)

    if (!vol || !content) return null

    return (
        <main>
            <ChapterLead
                lang={lang}
                kicker={`${volume}.history.heroKicker`}
                title={`${volume}.history.heroTitle`}
                sub={`${volume}.history.heroSub`}
                intro={`${volume}.history.intro`}
            />

            {content.history.map((entry, i) => (
                <section key={entry.id} className="mx-auto max-w-7xl px-6 md:px-16 py-14 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                        <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-2 md:col-start-8' : ''}`}>
                            <Reveal>
                                <p className="micro-label text-[#8ca693]">{t(`${volume}.history.entries.${entry.id}.era`)}</p>
                                <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold leading-snug">
                                    {t(`${volume}.history.entries.${entry.id}.title`)}
                                </h2>
                                <span className="mt-5 block h-px w-16 bg-[#b03a2e]" aria-hidden />
                            </Reveal>
                            {tList(`${volume}.history.entries.${entry.id}.paragraphs`).map((p, j) => (
                                <Reveal key={j} delay={120 + j * 100}>
                                    <p className="mt-6 leading-8 text-[#3d4842]">{p}</p>
                                </Reveal>
                            ))}
                        </div>
                        <div
                            className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}
                        >
                            <Reveal delay={80}>
                                <div className="aspect-3/2 overflow-hidden group">
                                    <img
                                        src={entry.image}
                                        alt={t(`${volume}.history.entries.${entry.id}.title`)}
                                        loading="lazy"
                                        data-imagery-slot={`${volume}.history.entries.${entry.id}`}
                                        className="h-full w-full object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.04]"
                                    />
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            ))}

            <ChapterClose
                seal="史"
                tone="ink"
                colophon={t(`${volume}.history.colophon`)}
                nextHref={withLocale(vol.route, lang)}
                nextLabel={t('ui.backToOpening')}
            />
        </main>
    )
}
