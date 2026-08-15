/** Supported UI / route locales. Add a code here when opening a new language. */
export const LOCALES = ['zh', 'en', 'ja', 'ko'] as const
export type Lang = (typeof LOCALES)[number]

/** Default site language (no URL prefix). */
export const DEFAULT_LANG: Lang = 'zh'

/**
 * Locales with a full body of copy (nav, essays, SEO, about).
 * Seals, catalog numbers, and Latin names stay out of locale files.
 */
export const TRANSLATED_LOCALES: readonly Lang[] = ['zh', 'en', 'ja', 'ko']

export const LANG_META: Record<
    Lang,
    {
        label: string
        short: string
        hreflang: string
        htmlLang: string
        ogLocale: string
    }
> = {
    zh: {
        label: '中文',
        short: '中',
        hreflang: 'zh-CN',
        htmlLang: 'zh-CN',
        ogLocale: 'zh_CN',
    },
    en: {
        label: 'English',
        short: 'EN',
        hreflang: 'en',
        htmlLang: 'en',
        ogLocale: 'en_US',
    },
    ja: {
        label: '日本語',
        short: 'JA',
        hreflang: 'ja',
        htmlLang: 'ja',
        ogLocale: 'ja_JP',
    },
    ko: {
        label: '한국어',
        short: 'KO',
        hreflang: 'ko',
        htmlLang: 'ko',
        ogLocale: 'ko_KR',
    },
}

/** Prefixed locales only (everything except default zh). */
export const PREFIX_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LANG)

export function isLang(value: string): value is Lang {
    return (LOCALES as readonly string[]).includes(value)
}

export function isTranslated(lang: Lang): boolean {
    return TRANSLATED_LOCALES.includes(lang)
}

/** Bilingual pair used in micro-labels: zh ↔ en. */
export function counterpartLang(lang: Lang): Lang {
    return lang === 'zh' ? 'en' : 'zh'
}
