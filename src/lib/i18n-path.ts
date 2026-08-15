import { DEFAULT_LANG, isLang, PREFIX_LOCALES, type Lang } from '@/i18n/config'

/** Strip locale prefix; always returns a path starting with `/`. */
export function stripLocale(pathname: string): string {
    let p = pathname.split('?')[0].split('#')[0]
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)

    for (const locale of PREFIX_LOCALES) {
        if (p === `/${locale}`) return '/'
        if (p.startsWith(`/${locale}/`)) {
            const rest = p.slice(locale.length + 1)
            return rest.startsWith('/') ? rest : `/${rest}`
        }
    }
    return p || '/'
}

/** Prefix a language-neutral path with locale (zh has no prefix). */
export function withLocale(basePath: string, lang: Lang): string {
    const base = basePath === '/' ? '' : basePath.replace(/\/$/, '')
    if (lang === DEFAULT_LANG) return base || '/'
    return base ? `/${lang}${base}` : `/${lang}`
}

export function switchLocalePath(pathname: string, next: Lang): string {
    return withLocale(stripLocale(pathname), next)
}

export function detectLang(pathname: string): Lang {
    const p = pathname.split('?')[0]
    const seg = p.replace(/^\//, '').split('/')[0]
    if (seg && isLang(seg) && seg !== DEFAULT_LANG) return seg
    return DEFAULT_LANG
}

export function localeStaticPaths() {
    return PREFIX_LOCALES.map((locale) => ({ params: { locale } }))
}
