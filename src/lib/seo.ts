import { DEFAULT_LANG, LANG_META, LOCALES, type Lang } from '@/i18n/config'
import { seoPages, type SeoPageType } from '@/i18n/catalogs'
import { t } from '@/i18n/t'
import { withLocale } from '@/lib/i18n-path'

export const SITE_URL = 'https://jiuzhou.world'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-tianmu.webp`

export type PageSeo = {
    path: string
    key: string
    image?: string
    type?: SeoPageType
}

export const pages: PageSeo[] = seoPages.map((p) => ({
    path: p.path,
    key: p.key,
    type: p.type,
    image: `${SITE_URL}${p.image}`,
}))

export function absoluteUrl(path: string): string {
    if (path === '/') return SITE_URL
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function getPageSeo(basePath: string): PageSeo {
    const normalized = basePath.endsWith('/') && basePath !== '/' ? basePath.slice(0, -1) : basePath
    return pages.find((p) => p.path === normalized) ?? pages[0]
}

export function pageUrl(basePath: string, lang: Lang): string {
    return absoluteUrl(withLocale(basePath, lang))
}

export function hreflangLinks(basePath: string): { hreflang: string; href: string }[] {
    const links = LOCALES.map((lang) => ({
        hreflang: LANG_META[lang].hreflang,
        href: pageUrl(basePath, lang),
    }))
    links.push({ hreflang: 'x-default', href: pageUrl(basePath, DEFAULT_LANG) })
    return links
}

export function buildJsonLd(seo: PageSeo, lang: Lang): Record<string, unknown>[] {
    const url = pageUrl(seo.path, lang)
    const name = t(`seo.${seo.key}.title`, lang)
    const description = t(`seo.${seo.key}.description`, lang)
    const image = seo.image ?? DEFAULT_OG_IMAGE
    const inLanguage = LANG_META[lang].htmlLang

    const siteName = t('anthology.name', lang)
    const alternateName = t('anthology.name', lang === 'en' ? 'zh' : 'en')

    const publisher = {
        '@type': 'Organization',
        name: siteName,
        url: SITE_URL,
        logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/favicon.svg`,
        },
    }

    const webSite = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        alternateName,
        url: SITE_URL,
        description: t('seo.jsonld.siteDescription', lang),
        inLanguage: LOCALES.map((l) => LANG_META[l].htmlLang),
        publisher,
    }

    if (seo.path === '/') {
        return [webSite, { ...publisher, '@context': 'https://schema.org' }]
    }

    const pageType =
        seo.type === 'article' ? 'AboutPage' : seo.type === 'collection' ? 'CollectionPage' : 'WebPage'

    const webPage: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': pageType,
        name,
        description,
        url,
        inLanguage,
        isPartOf: {
            '@type': 'WebSite',
            name: siteName,
            url: SITE_URL,
        },
        primaryImageOfPage: {
            '@type': 'ImageObject',
            url: image,
        },
        publisher,
    }

    if (seo.path.startsWith('/linan')) {
        webPage.about = {
            '@type': 'Place',
            name: t('seo.place.linan', lang),
            address: {
                '@type': 'PostalAddress',
                addressLocality: t('seo.place.linan', lang),
                addressRegion: t('seo.place.zhejiang', lang),
                addressCountry: 'CN',
            },
        }
    }

    return [webPage]
}
