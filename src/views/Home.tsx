import { ArrowRight } from 'lucide-react'
import { anthologyVolumes, ANTHOLOGY_DOMAIN, placeRefByPlace, volumeKernel } from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import Reveal from '@/components/Reveal'
import MiniTitle from '@/components/MiniTitle'
import ParallaxImage from '@/components/ParallaxImage'
import Seal from '@/components/Seal'
import { withLocale } from '@/lib/i18n-path'

export default function Home({ lang }: { lang: Lang }) {
    const { t, tList } = messages(lang)
    const href = (p: string) => withLocale(p, lang)
    const zhinan = placeRefByPlace('linan', '临安指南村')

    return (
        <main>
            <section className="relative h-screen min-h-[640px] overflow-hidden bg-[#101613]">
                <img
                    src="/images/hero-jiuzhou.webp"
                    alt={t('ui.alt.thousandLi')}
                    data-imagery-slot="home.hero"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#101613]/85 via-[#101613]/15 to-[#101613]/40"
                    aria-hidden
                />
                <div className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 hidden md:block">
                    <p className="vertical-rl font-display text-[#f7f5ee]/75 tracking-[0.6em] text-base">
                        {t('ui.nineLands')}
                    </p>
                </div>
                <div className="relative h-full mx-auto max-w-7xl px-6 md:px-16 flex flex-col justify-end pb-16 md:pb-20">
                    <Reveal>
                        <p className="micro-label text-[#d8e2d4]">{ANTHOLOGY_DOMAIN}</p>
                    </Reveal>
                    <Reveal delay={150}>
                        <div className="mt-6 flex items-start gap-4 md:gap-8">
                            <h1 className="font-display font-semibold text-[#f7f5ee] leading-[0.95] tracking-[0.1em] text-[26vw] md:text-[13rem]">
                                {t('anthology.name')}
                            </h1>
                            <span
                                aria-hidden
                                className="seal-stamp mt-[3vw] md:mt-10 inline-flex h-11 w-11 md:h-16 md:w-16 shrink-0 items-center justify-center font-display text-2xl md:text-4xl leading-none select-none rounded-[3px] -rotate-3"
                            >
                                志
                            </span>
                        </div>
                    </Reveal>
                    <Reveal delay={320}>
                        <p className="mt-7 whitespace-nowrap font-display text-[11px] md:text-lg tracking-[0.28em] md:tracking-[0.5em] text-[#f7f5ee]/65">
                            {lang === 'en'
                                ? t('ui.nineLands')
                                : [...t('ui.nineLands')].join(' · ')}
                        </p>
                    </Reveal>
                    <Reveal delay={450}>
                        <p className="mt-7 max-w-xl font-display text-lg md:text-2xl text-[#f7f5ee]/90 leading-relaxed">
                            {t('anthology.heroKicker')}
                        </p>
                    </Reveal>
                    <Reveal delay={560}>
                        <p className="mt-12 text-[11px] tracking-[0.18em] text-[#f7f5ee]/45">
                            {t('ui.caption.thousandLi')}
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 md:px-16 py-24 md:py-36">
                <Reveal>
                    <MiniTitle i18nKey="anthology.about" lang={lang} />
                </Reveal>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10">
                    <Reveal className="md:col-span-5" delay={100}>
                        <h2 className="font-display text-4xl md:text-5xl font-semibold leading-snug">
                            {t('ui.onlineGazetteer')}
                        </h2>
                        <div className="mt-8">
                            <Seal char="九" />
                        </div>
                    </Reveal>
                    <div className="md:col-span-6 md:col-start-7 flex flex-col gap-7">
                        {tList('anthology.intro').map((p, i) => (
                            <Reveal key={i} delay={180 + i * 120}>
                                <p className="text-base md:text-lg leading-8 md:leading-9 text-[#3d4842]">{p}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <ParallaxImage
                src={zhinan?.image ?? '/images/spot-zhinan.webp'}
                alt={t('ui.alt.zhinanAutumn')}
                caption={t('ui.caption.zhinanAutumn')}
                slotId={zhinan?.slotId}
            />

            <section className="mx-auto max-w-7xl px-6 md:px-16 py-24 md:py-36">
                <Reveal>
                    <MiniTitle i18nKey="anthology.volumesLabel" lang={lang} />
                </Reveal>
                <Reveal delay={100}>
                    <h2 className="mt-10 font-display text-4xl md:text-5xl font-semibold">
                        {t('anthology.volumesTitle')}
                    </h2>
                </Reveal>

                <div className="mt-16 flex flex-col">
                    {anthologyVolumes.filter((v) => !v.parent).map((v) => {
                        const kernel = volumeKernel(v.key)
                        return (
                        <Reveal key={v.key}>
                            <a
                                href={href(v.route)}
                                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center py-10 md:py-14 border-t border-b hairline"
                            >
                                <div className="md:col-span-5 overflow-hidden">
                                    <div className="aspect-3/2 overflow-hidden">
                                        <img
                                            src={kernel?.image ?? v.image}
                                            alt={t(`anthology.volumes.${v.key}.title`)}
                                            className="h-full w-full object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.05]"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-6 md:col-start-7">
                                    <p className="micro-label text-[#8ca693]">{v.latin}</p>
                                    <h3 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-wide">
                                        {t(`anthology.volumes.${v.key}.title`)}
                                    </h3>
                                    <p className="mt-2 text-xs tracking-[0.2em] text-[#8b958d]">
                                        {t(`anthology.volumes.${v.key}.place`)}
                                    </p>
                                    {v.zhou && (
                                        <p className="mt-1 text-xs tracking-[0.2em] text-[#8ca693]">
                                            {t(`anthology.volumes.${v.key}.identity`)}
                                        </p>
                                    )}
                                    <p className="mt-4 max-w-md text-[#5a665e] leading-7">
                                        {t(`anthology.volumes.${v.key}.desc`)}
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
                        )
                    })}

                    <Reveal delay={100}>
                        <div className="py-10 md:py-14 border-b hairline opacity-60">
                            <p className="micro-label text-[#8ca693]">{t('ui.volumeTwoDash')}</p>
                            <p className="mt-3 font-display text-2xl md:text-3xl text-[#5a665e]">
                                {t('ui.nextVolumeOnTheRoad')}
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    )
}
