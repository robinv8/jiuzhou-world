import { ANTHOLOGY_DOMAIN, getVolume } from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import { withLocale } from '@/lib/i18n-path'
import { BookEssay, Colophon } from '@/components/TitlePage'
import SectionMark from '@/components/SectionMark'
import ImageCaption from '@/components/ImageCaption'
import Stamp from '@/components/Stamp'
import Reveal from '@/components/Reveal'

export default function Home({ lang }: { lang: Lang }) {
    const { t, tList } = messages(lang)
    const href = (p: string) => withLocale(p, lang)
    const hangzhou = getVolume('hangzhou')

    return (
        <main className="font-display bg-[#F3EEE2] text-[#1F2A26]">
            <section className="relative h-[min(100svh,980px)] min-h-[640px] overflow-hidden bg-[#101614]">
                <img
                    src="/images/hero-jiuzhou.webp"
                    alt={t('ui.alt.thousandLi')}
                    data-imagery-slot="home.hero"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(to bottom, #10161499 0%, #1016142E 30%, #10161440 60%, #101614CC 100%)',
                    }}
                    aria-hidden
                />
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                    <Reveal>
                        <p className="flex items-center justify-center gap-4 text-[13px] tracking-[0.45em] text-[#F7F5EE]/80">
                            <span className="h-px w-10 bg-[#F7F5EE]/50" aria-hidden />
                            {t('anthology.heroKicker')}
                            <span className="h-px w-10 bg-[#F7F5EE]/50" aria-hidden />
                        </p>
                    </Reveal>
                    <Reveal delay={120}>
                        <h1 className="mt-8 font-bold leading-none tracking-[0.22em] text-[#F7F5EE] text-[clamp(4.2rem,14vw,13.75rem)]">
                            {t('anthology.name')}
                        </h1>
                    </Reveal>
                    <Reveal delay={240}>
                        <p className="mt-8 max-w-2xl text-base md:text-xl tracking-[0.18em] text-[#F7F5EE]/80">
                            {t('site.tagline')}
                        </p>
                    </Reveal>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-3 px-6 pb-8 md:flex-row md:items-end md:justify-between md:gap-4 md:px-16">
                    <ImageCaption onDark>{t('book.maps.thousandLi')}</ImageCaption>
                    <a
                        href="#jiuzhou"
                        className="hidden md:flex flex-col items-center gap-2 text-[12px] tracking-[0.35em] text-[#F7F5EE]/70"
                    >
                        {t('book.scrollOpen')}
                        <span className="h-8 w-px bg-[#F7F5EE]/45" aria-hidden />
                    </a>
                    <div className="flex max-w-full items-end gap-3 self-end md:gap-4">
                        <div className="min-w-0 text-right text-[12px] leading-relaxed tracking-[2px] text-[#F7F5EE]/60 md:tracking-[4px]">
                            <p className="break-words">{t('book.publishedHangzhou')}</p>
                            <p className="break-words">
                                {`${t('anthology.name')}\u3000${t('book.contents')}\u3000${t('book.published')}`}
                            </p>
                        </div>
                        <span className="md:hidden">
                            <Stamp char={t('book.titleSealHome')} size={36} />
                        </span>
                        <span className="hidden md:inline-flex">
                            <Stamp char={t('book.titleSealHome')} size={50} />
                        </span>
                    </div>
                </div>
            </section>

            <section id="jiuzhou" className="scroll-mt-24 bg-[#141614] px-5 py-20 md:py-28 text-[#F7F5EE]">
                <Reveal>
                    <p className="text-center text-sm tracking-[0.8em] text-[#D9826F]">
                        {t('book.jiuzhouLabel')}
                    </p>
                </Reveal>
                <Reveal delay={80}>
                    <h2 className="mx-auto mt-6 max-w-[1200px] px-2 text-center font-display text-[clamp(1.25rem,4.45vw,64px)] min-[1440px]:text-[64px] font-semibold leading-snug tracking-[clamp(0px,0.56vw,8px)] min-[1440px]:tracking-[8px] break-words whitespace-normal">
                        {t('book.jiuzhouHeadline')}
                    </h2>
                </Reveal>
                <figure className="mx-auto mt-12 w-full max-w-[800px]">
                    <div className="aspect-[800/820] w-full p-[5px] border border-[#F7F5EE]/35">
                        <div className="h-full border border-[#F7F5EE]/35">
                            <img
                                src="/images/map-yujitu-1136.webp"
                                alt={t('book.maps.yujitu')}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>
                    <figcaption className="mt-5">
                        <ImageCaption onDark align="center">
                            {t('book.maps.yujitu')}
                        </ImageCaption>
                    </figcaption>
                </figure>
                <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] md:text-base leading-8 text-[#F7F5EE]/75">
                    {t('book.jiuzhouBody')}
                </p>
            </section>

            <BookEssay
                mouth={`${t('anthology.name')}\u3000${t('book.preface')}`}
                kicker={t('book.preface')}
                title={t('book.prefaceTitle')}
                paragraphs={tList('anthology.intro')}
                note={t('book.prefaceNote')}
            />

            <section id="volumes" className="scroll-mt-24 bg-[#ECE5D2] px-6 py-16 md:px-16 md:py-24">
                <div className="mx-auto max-w-6xl">
                    <SectionMark mark="浙" aside={t('book.oneCity')} />
                    {hangzhou && (
                        <a
                            href={href(hangzhou.route)}
                            className="group mt-10 flex flex-col gap-8 md:flex-row md:items-start md:gap-14"
                        >
                            <div className="relative mx-auto w-full max-w-[22.5rem] shrink-0 md:mx-0">
                                <div className="relative aspect-3/4 overflow-hidden">
                                    <img
                                        src="/images/cover-hangzhou-lisong.webp"
                                        alt={t('hangzhou.heroTitle')}
                                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute top-6 left-0 bg-[#F3EEE2] border border-[#1F2A26] px-2 py-3">
                                        <p className="vertical-rl text-sm tracking-[0.35em]">
                                            {t('hangzhou.heroTitle')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 pt-2">
                                <p className="text-sm tracking-[0.3em] text-[#B03A2E]">
                                    {hangzhou.no
                                        ? `${hangzhou.no} · ${t('province.zhejiang.title')} · ${t('city.hangzhou.title')}`
                                        : t('anthology.volumes.hangzhou.place')}
                                </p>
                                <p className="mt-3 text-sm tracking-[0.25em] text-[#8A8270]">
                                    {t('anthology.volumes.hangzhou.identity')}
                                </p>
                                <h3 className="mt-5 text-4xl md:text-[2.75rem] font-semibold tracking-wide">
                                    {t('hangzhou.heroTitle')}
                                </h3>
                                <p className="mt-5 text-base text-[#4A514B] leading-7">
                                    {t('hangzhou.heroSub').split('。')[0] + '。'}
                                </p>
                                <div className="mt-8">
                                    <ImageCaption size="card">{t('book.maps.lisong')}</ImageCaption>
                                </div>
                            </div>
                        </a>
                    )}
                </div>
            </section>

            <section id="provinces" className="scroll-mt-24 px-6 py-16 md:px-16 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <SectionMark mark="省" kicker={t('book.openedOneProvince')} />
                    <a
                        href={href('/zhejiang')}
                        className="mt-8 flex items-center gap-6 border-b border-[#1F2A26]/20 py-6"
                    >
                        <span className="text-sm tracking-[0.35em] text-[#B03A2E]">
                            {t('book.eastChina')}
                        </span>
                        <span className="text-[#B03A2E]/70" aria-hidden>
                            →
                        </span>
                        <span className="text-2xl md:text-3xl tracking-[0.35em]">
                            {t('province.zhejiang.title')}
                        </span>
                        <Stamp char={t('book.openSeal')} size={28} />
                    </a>
                </div>
            </section>

            <Colophon
                title={`${t('anthology.name')}\u3000${t('book.contents')}`}
                line={`${t('book.publishedLine')}\u3000${ANTHOLOGY_DOMAIN}\u3000${t('book.online')}`}
                credit={t('book.colophonCredit')}
            />
        </main>
    )
}
