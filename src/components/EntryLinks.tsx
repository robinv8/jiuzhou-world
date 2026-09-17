import { ArrowRight } from 'lucide-react'
import type { GazetteerEntry } from '@/i18n/entries'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import { withLocale } from '@/lib/i18n-path'

export default function EntryLinks({
    lang,
    entries,
}: {
    lang: Lang
    entries: GazetteerEntry[]
}) {
    const { t } = messages(lang)
    if (!entries.length) return null

    return (
        <div className="mt-8 flex flex-col gap-3">
            {entries.map((entry) => (
                <a
                    key={entry.slug}
                    href={withLocale(entry.path, lang)}
                    className="inline-flex items-center gap-2 font-display text-[#b03a2e] tracking-[0.12em] transition-opacity hover:opacity-70"
                >
                    <span>
                        {t('ui.readEntry')}
                        {' · '}
                        {t(`entries.${entry.slug}.title`)}
                    </span>
                    <ArrowRight size={16} />
                </a>
            ))}
        </div>
    )
}
