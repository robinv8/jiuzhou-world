import { ANTHOLOGY_DOMAIN, getProvince, openDistricts } from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import { withLocale } from '@/lib/i18n-path'
import { Colophon } from '@/components/TitlePage'
import SectionMark from '@/components/SectionMark'
import ImageCaption from '@/components/ImageCaption'
import Stamp from '@/components/Stamp'
import Reveal from '@/components/Reveal'

export default function ProvinceHome({ lang, province }: { lang: Lang; province: string }) {
    const { t } = messages(lang)
    const href = (p: string) => withLocale(p, lang)
    const prov = getProvince(province)

    if (!prov) return null

    const openCities = prov.cities.filter((c) => c.status === 'open')
    const heroSub = t(`province.${province}.heroSub`)
    const [first, rest] = heroSub.split('。')
    const second = (rest ?? '').split('，')[0]
    const coupletA = first
    const coupletB = second ? second.replace('到', '\u3000到') : ''

    return (
        <main className="font-display bg-[#F1ECE0] text-[#1F2A26]">
            <section className="relative h-[min(100svh,980px)] min-h-[640px] overflow-hidden bg-[#EFE9DC]">
                <img
                    src="/images/hero-zhejiang-fuchun.webp"
                    alt={t('book.maps.fuchun')}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(to bottom, #EFE9DCE6 0%, #EFE9DC66 30%, #EFE9DC66 75%, #EFE9DCE0 100%)',
                    }}
                    aria-hidden
                />
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                    <Reveal>
                        <p className="flex items-center justify-center gap-4 text-[13px] tracking-[0.45em] text-[#1F2A26]/80">
                            <span className="h-px w-10 bg-[#1F2A26]/40" aria-hidden />
                            {t(`province.${province}.heroKicker`)}
                            <span className="h-px w-10 bg-[#1F2A26]/40" aria-hidden />
                        </p>
                    </Reveal>
                    <Reveal delay={120}>
                        <h1 className="mt-8 font-bold leading-none tracking-[0.22em] text-[clamp(4.2rem,14vw,13.75rem)]">
                            {t(`province.${province}.heroTitle`)}
                        </h1>
                    </Reveal>
                    <Reveal delay={240}>
                        <p
                            className="mt-8 max-w-3xl px-5 py-2.5 text-base md:text-xl leading-relaxed text-[#1F2A26]"
                            style={{ background: '#EFE9DCE0' }}
                        >
                            {heroSub}
                        </p>
                    </Reveal>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-3 px-6 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4 md:px-16">
                    <ImageCaption>{t('book.maps.fuchun')}</ImageCaption>
                    <a
                        href="#cities"
                        className="hidden sm:flex flex-col items-center gap-2 text-[12px] tracking-[0.35em] text-[#1F2A26]/70"
                    >
                        {t('book.scrollCities')}
                        <span className="h-8 w-px bg-[#1F2A26]/40" aria-hidden />
                    </a>
                    <p className="text-[12px] tracking-[0.28em] text-[#1F2A26]/70">
                        {t('book.openedHangzhou')}
                    </p>
                </div>
            </section>

            <section className="px-5 py-14 md:px-16 md:py-20">
                <div className="mx-auto grid max-w-[1312px] grid-cols-1 gap-8 lg:grid-cols-[400px_1fr] lg:items-stretch">
                    <div className="flex flex-col lg:h-[688px] lg:w-[400px]">
                        <p className="text-sm tracking-[0.35em] text-[#4A514B]">
                            {t(`province.${province}.heroKicker`)}
                        </p>
                        <p className="mt-2 text-sm tracking-[0.3em] text-[#B03A2E]">
                            {t('book.coldDew')}
                        </p>
                        <div className="mt-8 flex h-[376px] w-full max-w-[318px] items-start gap-4">
                            <div className="h-full p-[5px] border border-[#1F2A26]">
                                <div className="flex h-full w-[7.5rem] flex-col items-center border border-[#1F2A26] py-6">
                                    <h2 className="vertical-rl text-[clamp(3.2rem,7.639vw,110px)] font-bold tracking-[0.12em] leading-none">
                                        {t(`province.${province}.heroTitle`)}
                                    </h2>
                                    <p className="mt-auto text-sm tracking-[0.4em]">
                                        {t(`province.${province}.citiesLabel`)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex h-full items-center gap-4">
                                {coupletA && (
                                    <p className="vertical-rl text-[13px] tracking-[0.4em] text-[#4A514B]">
                                        {coupletA}
                                    </p>
                                )}
                                {coupletB && (
                                    <p className="vertical-rl text-[13px] tracking-[0.4em] text-[#4A514B]">
                                        {coupletB}
                                    </p>
                                )}
                                <Stamp char={t('book.titleSealZhejiang')} size={32} />
                            </div>
                        </div>
                        <a
                            href={href('/hangzhou')}
                            className="mt-auto pt-10 flex items-center gap-3 text-sm tracking-[0.4em]"
                        >
                            <span className="h-px w-10 bg-[#1F2A26]" aria-hidden />
                            {t('book.openIntoHangzhou')}
                        </a>
                    </div>
                    <figure className="w-full max-w-[880px]">
                        <div className="aspect-[880/688] w-full p-[5px] border border-[#1F2A26]/70">
                            <div className="flex h-full items-center justify-center border border-[#1F2A26]/70 bg-[#E8E0D0]">
                                <div
                                    className="relative"
                                    style={{ width: 'min(860px, 100%)', height: 'min(637px, 100%)' }}
                                >
                                    <img
                                        src="/images/map-zhejiang-1754.webp"
                                        alt={t('book.maps.zhejiang')}
                                        className="h-full w-full object-contain"
                                    />
                                    <span
                                        aria-hidden
                                        className="pointer-events-none absolute border-2 border-[#B03A2E]"
                                        style={{
                                            left: '38.8%',
                                            top: '31.6%',
                                            width: '4.6%',
                                            height: '5.2%',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <figcaption className="mt-4 flex items-start justify-between gap-4">
                            <ImageCaption size="card">{t('book.maps.zhejiang')}</ImageCaption>
                            <ImageCaption size="card" align="right">
                                {t('book.maps.zhejiangSource')}
                            </ImageCaption>
                        </figcaption>
                    </figure>
                </div>
            </section>

            <section id="cities" className="scroll-mt-24 px-6 py-16 md:px-16 md:py-20">
                <div className="mx-auto max-w-[1312px]">
                    <SectionMark
                        mark="市"
                        kicker={t('book.openedOneCity')}
                        aside={t('book.oneCity')}
                    />
                    <div className="mt-10 flex flex-col gap-12">
                        {openCities.map((city) => {
                            const districts = openDistricts(city)
                            const cardSrc =
                                city.key === 'hangzhou'
                                    ? '/images/card-hangzhou-lisong.webp'
                                    : city.image
                            const cardCaption =
                                city.key === 'hangzhou' ? t('book.maps.lisong') : t(`city.${city.key}.title`)
                            return (
                                <article key={city.key}>
                                    <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
                                        <a href={href(city.route)} className="block w-full max-w-[520px] shrink-0 xl:w-[520px]">
                                            <div className="bg-[#F7F3E8] p-5 xl:h-[408px] xl:w-[520px]">
                                                <img
                                                    src={cardSrc}
                                                    alt={t(`city.${city.key}.title`)}
                                                    className="aspect-3/2 w-full object-cover xl:aspect-auto xl:h-[320px] xl:w-[480px]"
                                                />
                                                <div className="mt-3">
                                                    <ImageCaption size="card">{cardCaption}</ImageCaption>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="w-full pt-1 xl:w-[632px] xl:flex-none">
                                            <p className="text-sm tracking-[0.3em] text-[#B03A2E]">
                                                {`卷一 · ${city.latin}`}
                                            </p>
                                            <h3 className="mt-3 text-4xl font-semibold tracking-wide">
                                                <a href={href(city.route)}>{t(`city.${city.key}.title`)}</a>
                                            </h3>
                                            <p className="mt-4 max-w-md text-[#4A514B] leading-7">
                                                {t(`city.${city.key}.desc`)}
                                            </p>
                                            <a
                                                href={href(city.route)}
                                                className="mt-5 inline-flex items-center gap-2 text-sm tracking-[0.35em]"
                                            >
                                                {t('book.openScroll')}
                                                <span aria-hidden>→</span>
                                            </a>
                                            {districts.length > 0 && (
                                                <div className="mt-10 border-t border-[#1F2A26]/15 pt-5">
                                                    <p className="text-xs tracking-[0.4em] text-[#8A8270]">
                                                        {t('book.under')}
                                                    </p>
                                                    {districts.map((d) => (
                                                        <a
                                                            key={d.key}
                                                            href={href(d.route)}
                                                            className="mt-3 flex flex-wrap items-baseline justify-between gap-3"
                                                        >
                                                            <span className="text-xl tracking-[0.2em]">
                                                                {t(`district.${d.key}.title`)}
                                                            </span>
                                                            <span className="flex-1 text-sm text-[#4A514B] leading-6">
                                                                {t(`district.${d.key}.desc`)}
                                                            </span>
                                                            <span className="text-sm tracking-[0.3em] text-[#B03A2E]">
                                                                {t('book.opened')}
                                                                <span aria-hidden> →</span>
                                                            </span>
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            <Colophon
                title={`${t('anthology.name')}\u3000${t(`province.${province}.title`)}`}
                line={`${t('book.publishedLine')}\u3000${ANTHOLOGY_DOMAIN}\u3000${t('book.online')}`}
                credit={t('book.colophonCredit')}
            />
        </main>
    )
}
