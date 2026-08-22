import { ArrowRight } from 'lucide-react'
import { anthologyVolumes, getVolume, getVolumeContent } from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import Reveal from '@/components/Reveal'
import MiniTitle from '@/components/MiniTitle'
import ParallaxImage from '@/components/ParallaxImage'
import Seal from '@/components/Seal'
import { withLocale } from '@/lib/i18n-path'

const heroImages: Record<string, string[]> = {
    linan: ['/images/hero-tianmu.webp', '/images/hero-lake.webp', '/images/hero-village.webp'],
    hangzhou: ['/images/hero-hangzhou.webp', '/images/hangzhou-westlake.webp', '/images/hangzhou-hills.webp'],
    fuyang: ['/images/hero-fuyang.webp', '/images/hero-fuyang.webp', '/images/hero-fuyang.webp'],
}

const parallaxImages: Record<string, { src: string; altKey: string; captionKey: string }> = {
    linan: { src: '/images/spot-qingliang.webp', altKey: 'ui.alt.qingliangClouds', captionKey: 'ui.caption.qingliangClouds' },
    hangzhou: { src: '/images/hangzhou-hills.webp', altKey: 'ui.alt.hangzhouHills', captionKey: 'ui.caption.hangzhouHills' },
    fuyang: { src: '/images/fuyang-fuchun.webp', altKey: 'ui.alt.fuchunSandbar', captionKey: 'ui.caption.fuchunSandbar' },
}

export default function VolumeHome({ lang, volume }: { lang: Lang; volume: string }) {
    const { t, tList } = messages(lang)
    const href = (p: string) => withLocale(p, lang)
    const vol = getVolume(volume)
    const content = getVolumeContent(volume)
    const heroes = heroImages[volume] ?? heroImages.linan
    const parallax = parallaxImages[volume] ?? parallaxImages.linan

    if (!vol || !content) return null

    const parentVol = vol.parent ? getVolume(vol.parent) : null
    const subVolumes = anthologyVolumes.filter((v) => v.parent === volume)

    return (
        <main>
            <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#1f2a26]">
                {heroes.map((src, i) => (
                    <div className="ken-burns-slide" key={i}>
                        <img src={src} alt={t(`${volume}.heroTitle`)} />
                    </div>
                ))}
                <div
                    className="absolute inset-0 bg-linear-to-t from-[#1f2a26]/80 via-[#1f2a26]/20 to-[#1f2a26]/30"
                    aria-hidden
                />

                <div className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 hidden md:block">
                    <p className="vertical-rl font-display text-[#f7f5ee]/60 tracking-[0.5em] text-sm">
                        {t(`${volume}.beneath`)}
                    </p>
                </div>

                <div className="relative h-full mx-auto max-w-7xl px-6 md:px-16 flex flex-col justify-end pb-24 md:pb-28">
                    <Reveal>
                        <p className="micro-label text-[#b0c6b3]">{t(`${volume}.heroKicker`)}</p>
                    </Reveal>
                    <Reveal delay={150}>
                        <h1 className="mt-5 font-display font-semibold text-[#f7f5ee] leading-none tracking-wide text-6xl md:text-8xl">
                            {t(`${volume}.heroTitle`)}
                        </h1>
                    </Reveal>
                    <Reveal delay={300}>
                        <p className="mt-6 max-w-xl font-display text-lg md:text-2xl text-[#f7f5ee]/85 leading-relaxed">
                            {t(`${volume}.heroSub`)}
                        </p>
                    </Reveal>
                    <Reveal delay={450}>
                        <div className="mt-10 flex items-center gap-4 text-[#f7f5ee]/70">
                            <span className="h-px w-16 bg-[#b0c6b3]/70" aria-hidden />
                            <span className="text-xs tracking-[0.35em]">{t(`${volume}.heroScroll`)}</span>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 md:px-16 py-24 md:py-36">
                <Reveal>
                    <MiniTitle i18nKey={`${volume}.manifestoLabel`} lang={lang} />
                </Reveal>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
                    <Reveal className="md:col-span-5" delay={100}>
                        <h2 className="font-display text-4xl md:text-5xl font-semibold leading-snug">
                            {t(`${volume}.manifestoTitle`)}
                        </h2>
                        <div className="mt-8">
                            <Seal char={t(`${volume}.seal`)} />
                        </div>
                    </Reveal>
                    <div className="md:col-span-6 md:col-start-7 flex flex-col gap-7">
                        {tList(`${volume}.manifesto`).map((p, i) => (
                            <Reveal key={i} delay={180 + i * 120}>
                                <p className="text-base md:text-lg leading-8 md:leading-9 text-[#3d4842]">{p}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <ParallaxImage src={parallax.src} alt={t(parallax.altKey)} caption={t(parallax.captionKey)} />

            <section className="mx-auto max-w-7xl px-6 md:px-16 py-24 md:py-36">
                <Reveal>
                    <MiniTitle i18nKey={`${volume}.volumesLabel`} lang={lang} />
                </Reveal>
                <Reveal delay={100}>
                    <h2 className="mt-10 font-display text-4xl md:text-5xl font-semibold">
                        {t(`${volume}.volumesTitle`)}
                    </h2>
                </Reveal>

                {parentVol && (
                    <Reveal delay={150}>
                        <p className="mt-6 text-sm text-[#5a665e]">
                            <a href={href(parentVol.route)} className="underline underline-offset-4 hover:text-[#1f2a26]">{t(`city.${parentVol.key}.title`)}</a>
                        </p>
                    </Reveal>
                )}

                <div className="mt-16 flex flex-col">
                    {vol.chapters.map((v, i) => (
                        <Reveal key={v.key} delay={i * 80}>
                            <a
                                href={href(`${vol.route}/${v.key}`)}
                                className={`group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center py-10 md:py-14 border-t hairline ${
                                    i === vol.chapters.length - 1 ? 'border-b' : ''
                                }`}
                            >
                                <div
                                    className={`md:col-span-5 overflow-hidden ${
                                        i % 2 === 1 ? 'md:order-2 md:col-start-8' : ''
                                    }`}
                                >
                                    <div className="aspect-3/2 overflow-hidden">
                                        <img
                                            src={v.image}
                                            alt={t(`${volume}.chapters.${v.key}.title`)}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.05]"
                                        />
                                    </div>
                                </div>
                                <div
                                    className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}
                                >
                                    <p className="micro-label text-[#8ca693]">{v.latin}</p>
                                    <h3 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-wide">
                                        {t(`${volume}.chapters.${v.key}.title`)}
                                    </h3>
                                    <p className="mt-4 max-w-md text-[#5a665e] leading-7">
                                        {t(`${volume}.chapters.${v.key}.desc`)}
                                    </p>
                                    <span className="mt-6 inline-flex items-center gap-2 text-sm tracking-[0.25em] text-[#1f2a26]">
                                        {t('ui.openVolume')}
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform duration-500 group-hover:translate-x-1.5"
                                        />
                                    </span>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>

                {subVolumes.length > 0 && (
                    <div className="mt-20">
                        <Reveal>
                            <h3 className="font-display text-2xl md:text-3xl font-semibold">
                                {t(`${volume}.subVolumesTitle`)}
                            </h3>
                        </Reveal>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {subVolumes.map((sub) => (
                                <Reveal key={sub.key}>
                                    <a href={href(sub.route)} className="group block">
                                        <div className="aspect-3/2 overflow-hidden">
                                            <img
                                                src={sub.image}
                                                alt={t(`${sub.key}.volumeTitle`)}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.05]"
                                            />
                                        </div>
                                        <p className="mt-4 micro-label text-[#8ca693]">{sub.latin}</p>
                                        <h4 className="mt-2 font-display text-xl md:text-2xl font-semibold">
                                            {t(`${sub.key}.volumeTitle`)}
                                        </h4>
                                        <p className="mt-2 text-sm text-[#5a665e]">
                                            {t(`${sub.key}.heroSub`)}
                                        </p>
                                    </a>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <section className="bg-[#edeae0]">
                <div className="mx-auto max-w-4xl px-6 py-24 md:py-36 text-center">
                    <Reveal>
                        <blockquote className="font-display text-3xl md:text-5xl leading-snug font-medium">
                            {t(`${volume}.closingQuote`)}
                        </blockquote>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="mt-8 text-sm tracking-[0.3em] text-[#5a665e]">{t(`${volume}.closingSource`)}</p>
                    </Reveal>
                </div>
            </section>
        </main>
    )
}
