import { ArrowRight } from 'lucide-react'
import { linanVolumes } from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import Reveal from '@/components/Reveal'
import MiniTitle from '@/components/MiniTitle'
import ParallaxImage from '@/components/ParallaxImage'
import Seal from '@/components/Seal'
import { withLocale } from '@/lib/i18n-path'

const heroImages = ['/images/hero-tianmu.webp', '/images/hero-lake.webp', '/images/hero-village.webp']

export default function LinanHome({ lang }: { lang: Lang }) {
    const { t, tList } = messages(lang)
    const href = (p: string) => withLocale(p, lang)

    return (
        <main>
            <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#1f2a26]">
                {heroImages.map((src, i) => (
                    <div className="ken-burns-slide" key={i}>
                        <img src={src} alt={t('home.heroTitle')} />
                    </div>
                ))}
                <div
                    className="absolute inset-0 bg-linear-to-t from-[#1f2a26]/80 via-[#1f2a26]/20 to-[#1f2a26]/30"
                    aria-hidden
                />

                <div className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 hidden md:block">
                    <p className="vertical-rl font-display text-[#f7f5ee]/60 tracking-[0.5em] text-sm">
                        {t('ui.beneathTianmu')}
                    </p>
                </div>

                <div className="relative h-full mx-auto max-w-7xl px-6 md:px-16 flex flex-col justify-end pb-24 md:pb-28">
                    <Reveal>
                        <p className="micro-label text-[#b0c6b3]">{t('home.heroKicker')}</p>
                    </Reveal>
                    <Reveal delay={150}>
                        <h1 className="mt-5 font-display font-semibold text-[#f7f5ee] leading-none tracking-wide text-6xl md:text-8xl">
                            {t('home.heroTitle')}
                        </h1>
                    </Reveal>
                    <Reveal delay={300}>
                        <p className="mt-6 max-w-xl font-display text-lg md:text-2xl text-[#f7f5ee]/85 leading-relaxed">
                            {t('home.heroSub')}
                        </p>
                    </Reveal>
                    <Reveal delay={450}>
                        <div className="mt-10 flex items-center gap-4 text-[#f7f5ee]/70">
                            <span className="h-px w-16 bg-[#b0c6b3]/70" aria-hidden />
                            <span className="text-xs tracking-[0.35em]">{t('home.heroScroll')}</span>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 md:px-16 py-24 md:py-36">
                <Reveal>
                    <MiniTitle i18nKey="home.manifestoLabel" lang={lang} />
                </Reveal>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
                    <Reveal className="md:col-span-5" delay={100}>
                        <h2 className="font-display text-4xl md:text-5xl font-semibold leading-snug">
                            {t('home.manifestoTitle')}
                        </h2>
                        <div className="mt-8">
                            <Seal char="临" />
                        </div>
                    </Reveal>
                    <div className="md:col-span-6 md:col-start-7 flex flex-col gap-7">
                        {tList('home.manifesto').map((p, i) => (
                            <Reveal key={i} delay={180 + i * 120}>
                                <p className="text-base md:text-lg leading-8 md:leading-9 text-[#3d4842]">{p}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <ParallaxImage
                src="/images/spot-qingliang.webp"
                alt={t('ui.alt.qingliangClouds')}
                caption={t('ui.caption.qingliangClouds')}
            />

            <section className="mx-auto max-w-7xl px-6 md:px-16 py-24 md:py-36">
                <Reveal>
                    <MiniTitle i18nKey="home.volumesLabel" lang={lang} />
                </Reveal>
                <Reveal delay={100}>
                    <h2 className="mt-10 font-display text-4xl md:text-5xl font-semibold">
                        {t('home.volumesTitle')}
                    </h2>
                </Reveal>

                <div className="mt-16 flex flex-col">
                    {linanVolumes.map((v, i) => (
                        <Reveal key={v.key} delay={i * 80}>
                            <a
                                href={href(v.route)}
                                className={`group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center py-10 md:py-14 border-t hairline ${
                                    i === linanVolumes.length - 1 ? 'border-b' : ''
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
                                            alt={t(`linan.volumes.${v.key}.title`)}
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
                                        {t(`linan.volumes.${v.key}.title`)}
                                    </h3>
                                    <p className="mt-4 max-w-md text-[#5a665e] leading-7">
                                        {t(`linan.volumes.${v.key}.desc`)}
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
            </section>

            <section className="bg-[#edeae0]">
                <div className="mx-auto max-w-4xl px-6 py-24 md:py-36 text-center">
                    <Reveal>
                        <blockquote className="font-display text-3xl md:text-5xl leading-snug font-medium">
                            {t('home.closingQuote')}
                        </blockquote>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="mt-8 text-sm tracking-[0.3em] text-[#5a665e]">{t('home.closingSource')}</p>
                    </Reveal>
                </div>
            </section>
        </main>
    )
}
