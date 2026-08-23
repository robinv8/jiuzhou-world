import { getVolume, getVolumeContent, volumeParallaxRef, placeCaptionKey } from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import ChapterLead from '@/components/ChapterLead'
import Reveal from '@/components/Reveal'
import ParallaxImage from '@/components/ParallaxImage'
import ChapterClose from '@/components/ChapterClose'
import { withLocale } from '@/lib/i18n-path'

export default function Mountains({ lang, volume }: { lang: Lang; volume: string }) {
    const { t, tList } = messages(lang)
    const vol = getVolume(volume)
    const content = getVolumeContent(volume)
    if (!vol || !content) return null

    const parallax = volumeParallaxRef(volume)
    const next = vol.chapters[1]

    return (
        <main>
            <ChapterLead
                lang={lang}
                kicker={`${volume}.mountains.heroKicker`}
                title={`${volume}.mountains.heroTitle`}
                sub={`${volume}.mountains.heroSub`}
                intro={`${volume}.mountains.intro`}
            />

            {content.essays.map((essay, i) => (
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
                                        {t(`${volume}.mountains.essays.${essay.id}.title`)}
                                    </h2>
                                </Reveal>
                                {tList(`${volume}.mountains.essays.${essay.id}.paragraphs`).map((p, j) => (
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
                                            src={essay.image}
                                            alt={t(`${volume}.mountains.essays.${essay.id}.title`)}
                                            loading="lazy"
                                            data-imagery-slot={`${volume}.mountains.essays.${essay.id}`}
                                            className="h-full w-full object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.04]"
                                        />
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </section>
                    {i === 1 && parallax && (
                        <ParallaxImage
                            src={parallax.image}
                            alt=""
                            caption={t(placeCaptionKey(parallax))}
                            slotId={parallax.slotId}
                        />
                    )}
                </div>
            ))}

            <ChapterClose
                seal="山"
                colophon={t(`${volume}.mountains.colophon`)}
                nextHref={withLocale(`${vol.route}/${next.key}`, lang)}
                nextLabel={`${t('ui.nextChapter')} · ${t(`${volume}.chapters.${next.key}.title`)}`}
            />
        </main>
    )
}
