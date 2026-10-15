import {
    ANTHOLOGY_DOMAIN,
    findCity,
    getVolume,
    getVolumeContent,
    openDistricts,
    type ChapterKey,
} from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import { withLocale } from '@/lib/i18n-path'
import { shortTitle, volumeTheme } from '@/lib/book'
import { BookEssay, Colophon } from '@/components/TitlePage'
import JacketColophon from '@/components/JacketColophon'
import SectionMark from '@/components/SectionMark'
import ImageCaption from '@/components/ImageCaption'
import Reveal from '@/components/Reveal'

const JACKET: Record<
    string,
    { src: string; caption: string; paper: string; slip: string; wash: string; washX?: string }
> = {
    hangzhou: {
        src: '/images/hero-hangzhou-lisong.webp',
        caption: 'book.maps.lisong',
        paper: '#EFE9DC',
        slip: '#EFE9DCE0',
        wash: 'linear-gradient(to bottom, #EFE9DCE6 0%, #EFE9DC59 30%, #EFE9DC59 75%, #EFE9DCE0 100%)',
    },
    linan: {
        src: '/images/hero-linan-tianmu-1876.webp',
        caption: 'book.maps.tianmuZushan',
        paper: '#EFE6CF',
        slip: '#EFE6CFE0',
        wash: 'linear-gradient(to bottom, #EFE6CFE6 0%, #EFE6CF40 20%, #EFE6CF4D 45%, #EFE6CFCC 75%, #EFE6CFF7 92%, #EFE6CFFA 100%)',
        washX:
            'linear-gradient(to right, #EFE6CFE0 0%, #EFE6CF8C 30%, transparent 55%, transparent 85%, #EFE6CF99 100%)',
    },
}

const MAP: Record<
    string,
    { src: string; caption: string; source: string; alt: string }
> = {
    hangzhou: {
        src: '/images/map-hangzhou-fucheng-1784.webp',
        caption: 'book.maps.hangzhou',
        source: 'book.maps.hangzhouSource',
        alt: 'book.maps.hangzhou',
    },
    linan: {
        src: '/images/map-linan-xingsheng-1759.webp',
        caption: 'book.maps.linan',
        source: 'book.maps.linanSource',
        alt: 'book.maps.linan',
    },
}

function chapterItems(
    volume: string,
    chapter: ChapterKey,
    t: (key: string) => string,
): string[] {
    const content = getVolumeContent(volume)
    if (!content) return []
    if (chapter === 'mountains') {
        return content.essays.map((e) =>
            shortTitle(t(`${volume}.mountains.essays.${e.id}.title`)),
        )
    }
    if (chapter === 'scenic') {
        return content.spots.map((s) => t(`${volume}.scenic.spots.${s.id}.name`))
    }
    if (chapter === 'culture') {
        return content.culture.map((c) =>
            shortTitle(t(`${volume}.culture.items.${c.id}.title`)),
        )
    }
    return content.history.map((h) =>
        shortTitle(t(`${volume}.history.entries.${h.id}.title`)),
    )
}

export default function VolumeHome({ lang, volume }: { lang: Lang; volume: string }) {
    const { t, tList } = messages(lang)
    const href = (p: string) => withLocale(p, lang)
    const vol = getVolume(volume)
    const content = getVolumeContent(volume)
    const theme = volumeTheme(volume)

    if (!vol || !content) return null

    const city = findCity(volume)
    const districts = city ? openDistricts(city) : []
    const juan = tList('book.juan')
    const map = MAP[volume]
    const jacket = JACKET[volume] ?? JACKET.hangzhou
    const kicker =
        volume === 'linan'
            ? `${t('city.hangzhou.title')} · ${t('district.linan.title')}`
            : t(`${volume}.heroKicker`)
    const colophonAffiliation = theme.stele
        ? `${t('anthology.name')}\u3000${t('book.underHangzhou')}`
        : `${t('anthology.name')}\u3000${vol.no ?? juan[0]}`
    const colophonSeal = t(theme.stele ? 'book.titleSealLinan' : 'book.titleSealHangzhou')
    const colophonSealSize = theme.stele ? 48 : 50

    return (
        <main className="font-display" style={{ background: theme.paper, color: theme.paperInk }}>
            <section
                className="relative h-[min(100svh,900px)] min-h-[600px] overflow-hidden"
                style={{ background: jacket.paper }}
            >
                <img
                    src={jacket.src}
                    alt={t(`${volume}.heroTitle`)}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: jacket.wash }}
                    aria-hidden
                />
                {jacket.washX && (
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{ background: jacket.washX }}
                        aria-hidden
                    />
                )}
                <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 md:px-16 md:pb-28">
                    <Reveal>
                        <p className="flex items-center gap-2 text-sm tracking-[0.4em] text-[#1F2A26]/85">
                            <span className="inline-block h-1.5 w-1.5 bg-[#B03A2E]" aria-hidden />
                            {kicker}
                        </p>
                    </Reveal>
                    <Reveal delay={120}>
                        <h1 className="mt-5 font-semibold leading-none tracking-wide text-[#1F2A26] text-[clamp(2.4rem,7vw,6rem)]">
                            {t(`${volume}.heroTitle`)}
                        </h1>
                    </Reveal>
                    <Reveal delay={240}>
                        <p
                            className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-[#1F2A26]"
                            style={{
                                background: jacket.slip,
                                boxShadow: 'inset 0 0.75px 0 #1E232033, inset 0 -0.75px 0 #1E232033',
                                padding: '12px 28px',
                            }}
                        >
                            {t(`${volume}.heroSub`)}
                        </p>
                    </Reveal>
                    <div className="mt-6 self-start md:hidden">
                        <JacketColophon
                            affiliation={colophonAffiliation}
                            published={t('book.published')}
                            seal={colophonSeal}
                            sealSize={colophonSealSize}
                            slip={jacket.slip}
                            compact
                        />
                    </div>
                    <Reveal delay={360}>
                        <a
                            href="#read"
                            className="mt-8 inline-flex items-center gap-4 text-[12px] tracking-[0.35em] text-[#1F2A26]/75"
                        >
                            <span className="h-px w-10 bg-[#1F2A26]/50" aria-hidden />
                            {t(`${volume}.heroScroll`)}
                        </a>
                    </Reveal>
                </div>
                <div className="pointer-events-none absolute right-6 bottom-28 z-10 hidden md:block md:right-16">
                    <JacketColophon
                        affiliation={colophonAffiliation}
                        published={t('book.published')}
                        seal={colophonSeal}
                        sealSize={colophonSealSize}
                        slip={jacket.slip}
                    />
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-8 md:px-16">
                    <ImageCaption>{t(jacket.caption)}</ImageCaption>
                </div>
            </section>

            <div id="read">
                <BookEssay
                    mouth={`${t(`${volume}.volumeTitle`)}\u3000${t(`${volume}.manifestoLabel`)}`}
                    kicker={t(`${volume}.manifestoLabel`)}
                    title={t(`${volume}.manifestoTitle`)}
                    paragraphs={tList(`${volume}.manifesto`)}
                    note={t(`${volume}.prefaceNote`)}
                    paper={theme.paper}
                    ink={theme.paperInk}
                    muted={theme.paperMuted}
                />
            </div>

            {map && (
                <section className="px-5 py-12 md:px-16 md:py-16" style={{ background: theme.paper }}>
                    <figure className="mx-auto max-w-5xl">
                        <div className="p-[5px] border" style={{ borderColor: `${theme.paperInk}99` }}>
                            <div className="border bg-[#F3EEE8]" style={{ borderColor: `${theme.paperInk}99` }}>
                                <img
                                    src={map.src}
                                    alt={t(map.alt)}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <figcaption className="mt-4 flex items-start justify-between gap-4">
                            <ImageCaption size="card">{t(map.caption)}</ImageCaption>
                            <ImageCaption size="card" align="right">
                                {t(map.source)}
                            </ImageCaption>
                        </figcaption>
                    </figure>
                </section>
            )}

            <section
                className="scroll-mt-24 px-6 py-16 md:px-16 md:py-24"
                style={{ background: theme.toc, color: theme.tocInk }}
            >
                <div className="mx-auto max-w-5xl">
                    <SectionMark
                        mark="目"
                        kicker={
                            <>
                                {t(`${volume}.volumeTitle`)}
                                <span className="mx-3">{t('book.fourPian')}</span>
                                {districts.length > 0 && t('book.oneSub')}
                            </>
                        }
                        aside={t('book.tocNote')}
                        ink={theme.tocInk}
                        muted={theme.tocMuted}
                    />
                    <ol className="mt-4">
                        {vol.chapters.map((ch, i) => (
                            <li key={ch.key}>
                                <a
                                    href={href(`${vol.route}/${ch.key}`)}
                                    className="flex gap-5 md:gap-8 items-start border-b py-8"
                                    style={{ borderColor: `${theme.tocInk}22` }}
                                >
                                    <p
                                        className="w-14 shrink-0 pt-1 text-sm tracking-[0.2em]"
                                        style={{ color: theme.juan }}
                                    >
                                        {juan[i]}
                                    </p>
                                    <span
                                        className="mt-1.5 h-11 w-[6px] shrink-0"
                                        style={{ background: theme.rail[ch.key] }}
                                        aria-hidden
                                    />
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-2xl md:text-[1.75rem] font-semibold tracking-wide">
                                            {t(`${volume}.chapters.${ch.key}.title`)}
                                        </h3>
                                        <p
                                            className="mt-2 text-sm leading-6"
                                            style={{ color: theme.tocMuted }}
                                        >
                                            {t(`${volume}.chapters.${ch.key}.desc`)}
                                        </p>
                                        <p className="mt-2 text-sm tracking-wide">
                                            {chapterItems(volume, ch.key, t).join(' · ')}
                                        </p>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ol>
                    {districts.length > 0 && (
                        <div
                            className="mt-2 flex flex-col gap-4 border-b py-8 md:flex-row md:items-center"
                            style={{ borderColor: `${theme.tocInk}22` }}
                        >
                            <p
                                className="w-14 shrink-0 text-sm tracking-[0.3em]"
                                style={{ color: theme.juan }}
                            >
                                {t('book.under')}
                            </p>
                            {districts.map((d) => (
                                <a
                                    key={d.key}
                                    href={href(d.route)}
                                    className="flex flex-1 flex-wrap items-center gap-5"
                                >
                                    <span
                                        className="inline-flex h-16 w-10 items-center justify-center border font-display text-sm tracking-[0.3em]"
                                        style={{
                                            background: '#1E2120',
                                            color: '#ECE7D9',
                                            borderColor: '#ECE7D9',
                                            borderRadius: '18px 18px 0 0',
                                        }}
                                    >
                                        <span className="vertical-rl">{t(`district.${d.key}.title`)}</span>
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-lg tracking-[0.2em]">
                                            {t(`anthology.volumes.${d.key}.title`)}
                                            <span className="ml-3 text-base opacity-80">
                                                {t('book.underHangzhou')}
                                            </span>
                                        </p>
                                        <p
                                            className="mt-1 text-sm leading-6"
                                            style={{ color: theme.tocMuted }}
                                        >
                                            {t(`district.${d.key}.desc`)}
                                        </p>
                                    </div>
                                    <span className="text-sm tracking-[0.3em]">
                                        {t('book.enterVolume')}
                                        <span aria-hidden> →</span>
                                    </span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="px-6 py-20 md:py-28 text-center" style={{ background: theme.paper }}>
                <blockquote className="mx-auto max-w-3xl text-2xl md:text-4xl leading-snug font-medium">
                    {t(`${volume}.closingQuote`)}
                </blockquote>
                <p
                    className="mt-8 text-sm tracking-[0.3em]"
                    style={{ color: theme.paperMuted }}
                >
                    {t(`${volume}.closingSource`)}
                </p>
            </section>

            <Colophon
                title={`${t('anthology.name')}\u3000${t(`${volume}.volumeTitle`)}`}
                line={`${t('book.publishedLine')}\u3000${ANTHOLOGY_DOMAIN}\u3000${t('book.online')}`}
                credit={t('book.colophonCredit')}
                stele={theme.colophonStele}
                bg={theme.colophonStele ? '#16181A' : '#1F2A26'}
            />
        </main>
    )
}
