import { ArrowRight } from 'lucide-react'
import type { GazetteerEntry } from '@/i18n/entries'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import { withLocale } from '@/lib/i18n-path'
import Reveal from '@/components/Reveal'

export default function ChapterEntries({
    lang,
    entries,
}: {
    lang: Lang
    entries: GazetteerEntry[]
}) {
    const { t } = messages(lang)
    if (!entries.length) return null

    return (
        <section className="mx-auto max-w-3xl px-6 pb-16 md:pb-20">
            <Reveal>
                <p className="micro-label text-[#8ca693]">{t('ui.entriesOnThisChapter')}</p>
                <ul className="mt-6 flex flex-col gap-8">
                    {entries.map((entry) => (
                        <li key={entry.slug}>
                            <a
                                href={withLocale(entry.path, lang)}
                                className="group inline-flex items-baseline gap-3"
                            >
                                <h2 className="font-display text-2xl md:text-3xl font-semibold leading-snug text-[#1f2a26] transition-opacity group-hover:opacity-70">
                                    {t(`entries.${entry.slug}.title`)}
                                </h2>
                                <ArrowRight
                                    size={16}
                                    className="shrink-0 text-[#b03a2e] opacity-80"
                                />
                            </a>
                            <p className="mt-3 leading-8 text-[#3d4842]">
                                {t(`entries.${entry.slug}.excerpt`)}
                            </p>
                        </li>
                    ))}
                </ul>
            </Reveal>
        </section>
    )
}
