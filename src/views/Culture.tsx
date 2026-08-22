import { getVolume, getVolumeContent } from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ParallaxImage from '@/components/ParallaxImage'
import ChapterClose from '@/components/ChapterClose'
import { withLocale } from '@/lib/i18n-path'

const parallaxImages: Record<string, { src: string; captionKey: string }> = {
    linan: { src: '/images/spot-heqiao.webp', captionKey: 'ui.caption.heqiaoStream' },
    hangzhou: { src: '/images/hangzhou-canal.webp', captionKey: 'ui.caption.hangzhouCanal' },
}

export default function Culture({ lang, volume }: { lang: Lang; volume: string }) {
    const { t, tList } = messages(lang)
    const vol = getVolume(volume)
    const content = getVolumeContent(volume)
    const parallax = parallaxImages[volume] ?? parallaxImages.linan

    if (!vol || !content) return null

    const next = vol.chapters[3]

    return (
        <main>
            <PageHero
                lang={lang}
                kicker={`${volume}.culture.heroKicker`}
                title={`${volume}.culture.heroTitle`}
                sub={`${volume}.culture.heroSub`}
                image={vol.chapters[2].image}
            />

            <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
                <Reveal>
                    <p className="text-lg md:text-xl leading-9 md:leading-10 text-[#3d4842] font-display">
                        {t(`${volume}.culture.intro`)}
                    </p>
                </Reveal>
            </section>

            {content.culture.map((item, i) => (
                <div key={item.id}>
                    <section className="mx-auto max-w-7xl px-6 md:px-16 py-14 md:py-20">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                            <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-2 md:col-start-8' : ''}`}>
                                <Reveal>
                                    <div className="flex items-baseline gap-4">
                                        <span className="font-display text-[#b03a2e] text-xl">{item.no}</span>
                                        <p className="micro-label text-[#8ca693]">{item.latin}</p>
                                    </div>
                                    <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold leading-snug">
                                        {t(`${volume}.culture.items.${item.id}.title`)}
                                    </h2>
                                </Reveal>
                                {tList(`${volume}.culture.items.${item.id}.paragraphs`).map((p, j) => (
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
                                            src={item.image}
                                            alt={t(`${volume}.culture.items.${item.id}.title`)}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.04]"
                                        />
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </section>
                    {i === 1 && (
                        <ParallaxImage src={parallax.src} alt="" caption={t(parallax.captionKey)} />
                    )}
                </div>
            ))}

            <ChapterClose
                seal="物"
                colophon={t(`${volume}.culture.colophon`)}
                nextHref={withLocale(`${vol.route}/${next.key}`, lang)}
                nextLabel={`${t('ui.nextChapter')} · ${t(`${volume}.chapters.${next.key}.title`)}`}
            />
        </main>
    )
}
