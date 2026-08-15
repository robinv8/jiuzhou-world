/** Supported UI / route locales. Add a code here when opening a new language. */
export const LOCALES = ['zh', 'en', 'ja', 'ko'] as const
export type Lang = (typeof LOCALES)[number]

/** Default site language (no URL prefix). */
export const DEFAULT_LANG: Lang = 'zh'

export const LANG_META: Record<
    Lang,
    {
        label: string
        short: string
        hreflang: string
        htmlLang: string
        ogLocale: string
        /** Display + body CJK serif for this locale (Google Fonts CSS2). */
        fontHref: string
    }
> = {
    zh: {
        label: '中文',
        short: '中',
        hreflang: 'zh-CN',
        htmlLang: 'zh-CN',
        ogLocale: 'zh_CN',
        fontHref:
            'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Noto+Serif+SC:wght@400;600;700&display=swap',
    },
    en: {
        label: 'English',
        short: 'EN',
        hreflang: 'en',
        htmlLang: 'en',
        ogLocale: 'en_US',
        // Counterpart labels are Chinese; seals are CJK.
        fontHref:
            'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Noto+Serif+SC:wght@400;600;700&display=swap',
    },
    ja: {
        label: '日本語',
        short: 'JA',
        hreflang: 'ja',
        htmlLang: 'ja',
        ogLocale: 'ja_JP',
        fontHref:
            'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Noto+Serif+JP:wght@400;600;700&family=Noto+Serif+SC:wght@400;600;700&display=swap',
    },
    ko: {
        label: '한국어',
        short: 'KO',
        hreflang: 'ko',
        htmlLang: 'ko',
        ogLocale: 'ko_KR',
        fontHref:
            'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Noto+Serif+KR:wght@400;600;700&family=Noto+Serif+SC:wght@400;600;700&display=swap',
    },
}

/** Prefixed locales only (everything except default zh). */
export const PREFIX_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LANG)

export function isLang(value: string): value is Lang {
    return (LOCALES as readonly string[]).includes(value)
}

/**
 * Bilingual micro-label pair.
 * Chinese is the default gloss; Chinese pages gloss in English.
 */
export function counterpartLang(lang: Lang): Lang {
    return lang === 'zh' ? 'en' : 'zh'
}
