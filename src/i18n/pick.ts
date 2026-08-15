import type { Lang } from '@/i18n/config'
import type { LocalizedString } from '@/i18n/content'

/** Resolve a localized string with fallback: lang → en → zh */
export function pickLocalized(pair: LocalizedString, lang: Lang): string {
    if (pair[lang]) return pair[lang] as string
    if (lang !== 'en' && pair.en) return pair.en
    return pair.zh
}
