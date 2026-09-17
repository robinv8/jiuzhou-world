import { CHAPTER_SEAL, getEntry } from '@/i18n/entries'
import { LANG_META, counterpartLang, type Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import Reveal from '@/components/Reveal'
import ChapterClose from '@/components/ChapterClose'
import { loadEntryMarkdown, parseEntryMarkdown, type InlineNode } from '@/lib/entry-markdown'
import { withLocale } from '@/lib/i18n-path'

function Inline({ nodes }: { nodes: InlineNode[] }) {
    return (
        <>
            {nodes.map((node, i) => {
                if (node.type === 'strong') return <strong key={i}>{node.text}</strong>
                if (node.type === 'a') {
                    return (
                        <a
                            key={i}
                            href={node.href}
                            className="link-underline link-underline-faint text-[#1f2a26]"
                        >
                            {node.text}
                        </a>
                    )
                }
                return <span key={i}>{node.text}</span>
            })}
        </>
    )
}

export default function Entry({ lang, slug }: { lang: Lang; slug: string }) {
    const entry = getEntry(slug)
    if (!entry) return null

    const { t } = messages(lang)
    const gloss = counterpartLang(lang)
    const parsed = parseEntryMarkdown(loadEntryMarkdown(entry.slug), lang)
    const parentTitle = t(`${entry.volume}.chapters.${entry.chapter}.title`)
    const parentGloss = t(`${entry.volume}.chapters.${entry.chapter}.title`, gloss)
    const parentHref = withLocale(entry.parentPath, lang)
    const title = t(`entries.${entry.slug}.title`)
    const excerpt = t(`entries.${entry.slug}.excerpt`)
    const showHero = Boolean(entry.heroSlot && entry.imagerySlotId)

    return (
        <main>
            <header className="mx-auto max-w-3xl px-6 pt-24 pb-12 md:pt-32 md:pb-16">
                <Reveal>
                    <p className="micro-label text-[#8ca693]">
                        <a href={parentHref} className="transition-opacity hover:opacity-70">
                            <span lang={LANG_META[gloss].htmlLang}>{parentGloss}</span>
                            {' · '}
                            {parentTitle}
                        </a>
                    </p>
                </Reveal>
                <Reveal delay={80}>
                    <h1 className="mt-5 font-display text-5xl md:text-7xl font-semibold tracking-wide text-[#1f2a26]">
                        {title}
                    </h1>
                </Reveal>
                {entry.latin && (
                    <Reveal delay={120}>
                        <p className="mt-5 max-w-xl font-display text-lg md:text-xl text-[#5a665e]">
                            {entry.latin}
                        </p>
                    </Reveal>
                )}
                <Reveal delay={160}>
                    <p className="mt-10 text-lg md:text-xl leading-9 md:leading-10 text-[#3d4842] font-display">
                        {excerpt}
                    </p>
                </Reveal>
            </header>

            {showHero && (
                <section className="mx-auto max-w-3xl px-6 pb-8 md:pb-12">
                    <Reveal>
                        <div className="aspect-3/2 overflow-hidden">
                            <img
                                src={entry.image}
                                alt={title}
                                data-imagery-slot={entry.imagerySlotId ?? undefined}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </Reveal>
                </section>
            )}

            <article
                className="mx-auto max-w-3xl px-6 pb-24 md:pb-36"
                lang={LANG_META.zh.htmlLang}
            >
                {parsed.blocks.map((block, i) => {
                    if (block.type === 'h2') {
                        return (
                            <Reveal key={i}>
                                <h2 className="mt-16 font-display text-2xl md:text-3xl font-semibold">
                                    {block.text}
                                </h2>
                                <span className="mt-5 block h-px w-16 bg-[#b03a2e]" aria-hidden />
                            </Reveal>
                        )
                    }
                    if (block.type === 'h3') {
                        return (
                            <Reveal key={i}>
                                <h3 className="mt-12 font-display text-xl md:text-2xl font-semibold">
                                    {block.text}
                                </h3>
                            </Reveal>
                        )
                    }
                    if (block.type === 'ul') {
                        return (
                            <Reveal key={i}>
                                <ul className="mt-6 list-disc space-y-3 pl-6 leading-8 md:leading-9 text-[#3d4842]">
                                    {block.items.map((item, j) => (
                                        <li key={j}>
                                            <Inline nodes={item} />
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        )
                    }
                    if (block.type === 'p') {
                        return (
                            <Reveal key={i}>
                                <p className="mt-6 leading-8 md:leading-9 text-[#3d4842]">
                                    <Inline nodes={block.children} />
                                </p>
                            </Reveal>
                        )
                    }
                    return null
                })}
            </article>

            <ChapterClose
                seal={CHAPTER_SEAL[entry.chapter]}
                colophon={t(`${entry.volume}.${entry.chapter}.colophon`)}
                nextHref={parentHref}
                nextLabel={`${t('ui.backToChapter')} · ${parentTitle}`}
            />
        </main>
    )
}
