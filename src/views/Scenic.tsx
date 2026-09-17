import { getVolume, getVolumeContent } from '@/i18n/catalogs'
import { entriesLinkedFrom, extraEntriesForChapter } from '@/i18n/entries'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import ChapterLead from '@/components/ChapterLead'
import Reveal from '@/components/Reveal'
import ChapterClose from '@/components/ChapterClose'
import EntryLinks from '@/components/EntryLinks'
import ChapterEntries from '@/components/ChapterEntries'
import { withLocale } from '@/lib/i18n-path'

export default function Scenic({ lang, volume }: { lang: Lang; volume: string }) {
    const { t } = messages(lang)
    const vol = getVolume(volume)
    const content = getVolumeContent(volume)

    if (!vol || !content) return null

    const next = vol.chapters[2]

    return (
        <main>
            <ChapterLead
                lang={lang}
                kicker={`${volume}.scenic.heroKicker`}
                title={`${volume}.scenic.heroTitle`}
                sub={`${volume}.scenic.heroSub`}
                intro={`${volume}.scenic.intro`}
            />

            <section className="mx-auto max-w-7xl px-6 md:px-16 pb-20 md:pb-28">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                    {content.spots.map((spot, i) => (
                        <Reveal key={spot.id} delay={(i % 2) * 80}>
                            <article className="group">
                                <div className="aspect-3/2 overflow-hidden">
                                    <img
                                        src={spot.image}
                                        alt={t(`${volume}.scenic.spots.${spot.id}.name`)}
                                        loading="lazy"
                                        data-imagery-slot={`${volume}.scenic.spots.${spot.id}`}
                                        className="h-full w-full object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.04]"
                                    />
                                </div>
                                <div className="mt-6 flex items-baseline gap-4">
                                    <span className="font-display text-[#b03a2e] text-xl">{spot.no}</span>
                                    <p className="micro-label text-[#8ca693]">{spot.latin}</p>
                                </div>
                                <h2 className="mt-3 font-display text-2xl md:text-3xl font-semibold leading-snug">
                                    {t(`${volume}.scenic.spots.${spot.id}.name`)}
                                </h2>
                                <p className="mt-2 text-sm text-[#8ca693]">{t(`${volume}.scenic.spots.${spot.id}.region`)}</p>
                                <p className="mt-5 leading-8 text-[#3d4842]">{t(`${volume}.scenic.spots.${spot.id}.essence`)}</p>
                                <div className="mt-6 flex flex-col gap-2 border-t border-[#1f2a26]/10 pt-5 text-sm text-[#3d4842]/80">
                                    <p>
                                        <span className="micro-label text-[#8ca693] mr-3">{t('ui.season')}</span>
                                        {t(`${volume}.scenic.spots.${spot.id}.season`)}
                                    </p>
                                    <p>
                                        <span className="micro-label text-[#8ca693] mr-3">{t('ui.note')}</span>
                                        {t(`${volume}.scenic.spots.${spot.id}.note`)}
                                    </p>
                                </div>
                                <EntryLinks
                                    lang={lang}
                                    entries={entriesLinkedFrom(volume, 'scenic', spot.id)}
                                />
                            </article>
                        </Reveal>
                    ))}
                </div>
            </section>

            <ChapterEntries lang={lang} entries={extraEntriesForChapter(volume, 'scenic')} />

            <ChapterClose
                seal="景"
                tone="ink"
                colophon={t(`${volume}.scenic.colophon`)}
                nextHref={withLocale(`${vol.route}/${next.key}`, lang)}
                nextLabel={`${t('ui.nextChapter')} · ${t(`${volume}.chapters.${next.key}.title`)}`}
                footnote={t(`${volume}.scenic.footnote`)}
            />
        </main>
    )
}
