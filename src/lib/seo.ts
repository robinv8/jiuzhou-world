import { DEFAULT_LANG, LANG_META, LOCALES, type Lang } from '@/i18n/config'
import { withLocale } from '@/lib/i18n-path'
import type { LocalizedString } from '@/i18n/content'
import { pickLocalized } from '@/i18n/pick'

export const SITE_URL = 'https://jiuzhou.world'
export const SITE_NAME = '九州志'
export const SITE_NAME_EN = 'Jiuzhou'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-tianmu.webp`

export type PageSeo = {
    path: string
    title: LocalizedString
    description: LocalizedString
    image?: string
    type?: 'website' | 'article' | 'collection'
}

export const pages: PageSeo[] = [
    {
        path: '/',
        type: 'website',
        title: {
            zh: '九州志 · 一卷一城，线上的中国地方志',
            en: 'Jiuzhou — An online gazetteer of Chinese cities',
        },
        description: {
            zh: '九州志是一部线上的方志：一卷一城，慢慢写。第一卷临安——天目山下，吴越故里。',
            en: 'Jiuzhou is an online gazetteer: one city, one volume, written slowly. Volume I: Lin’an, beneath Mount Tianmu.',
        },
        image: `${SITE_URL}/images/hero-lake.webp`,
    },
    {
        path: '/about',
        type: 'article',
        title: {
            zh: '缘起 · 九州志',
            en: 'About · Jiuzhou',
        },
        description: {
            zh: '为什么做九州志：把方志传统搬到线上，一座城市一座城市地走访、阅读、写作。',
            en: 'Why Jiuzhou exists: bringing the gazetteer tradition online, one city at a time.',
        },
        image: `${SITE_URL}/images/hero-village.webp`,
    },
    {
        path: '/linan',
        type: 'collection',
        title: {
            zh: '临安卷 · 九州志',
            en: "Lin'an · Jiuzhou",
        },
        description: {
            zh: '临安山水志：天目之荫，吴越之故。记山水、历史与风物，不写攻略。',
            en: "Lin'an Anthology: mountains, memory and craft beneath Tianmu — no itineraries, only place.",
        },
        image: `${SITE_URL}/images/hero-tianmu.webp`,
    },
    {
        path: '/linan/mountains',
        type: 'collection',
        title: {
            zh: '山之卷 · 临安 · 九州志',
            en: "Mountains · Lin'an · Jiuzhou",
        },
        description: {
            zh: '临安的山属天目山系：天目山、大明山、清凉峰，以及山作为水之源头。',
            en: "Lin'an's mountains of the Tianmu range: Tianmu, Daming, Qingliang, and water as the mountain's sequel.",
        },
        image: `${SITE_URL}/images/cover-mountains.webp`,
    },
    {
        path: '/linan/scenic',
        type: 'collection',
        title: {
            zh: '景之卷 · 临安 · 九州志',
            en: "Places · Lin'an · Jiuzhou",
        },
        description: {
            zh: '临安八处去处小传：天目山、大明山、青山湖、浙西大峡谷、太湖源、指南村、河桥古镇、清凉峰。每处一篇，先写它是什么，再写走进去会遇见什么。',
            en: "Eight place biographies in Lin'an: Tianmu, Daming, Qingshan Lake, Zhexi Canyon, Source of Taihu, Zhinan, Heqiao, Qingliang — what each place is, and what you meet when you walk in.",
        },
        image: `${SITE_URL}/images/cover-scenic.webp`,
    },
    {
        path: '/linan/history',
        type: 'collection',
        title: {
            zh: '史之卷 · 临安 · 九州志',
            en: "History · Lin'an · Jiuzhou",
        },
        description: {
            zh: '临安历史时间线：从钱镠到吴越故里，读一座山城怎样成为杭州的西大门。',
            en: "A timeline of Lin'an: from Qian Liu to the homeland of Wuyue, how a mountain city became Hangzhou's western gate.",
        },
        image: `${SITE_URL}/images/cover-history.webp`,
    },
    {
        path: '/linan/culture',
        type: 'collection',
        title: {
            zh: '物之卷 · 临安 · 九州志',
            en: "Craft · Lin'an · Jiuzhou",
        },
        description: {
            zh: '临安风物：山核桃、茶叶与地方物产背后的人与时节。',
            en: "Lin'an craft and produce: hickory nuts, tea, and the seasons behind local things.",
        },
        image: `${SITE_URL}/images/cover-culture.webp`,
    },
]

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
    const name = pickLocalized(seo.title, lang)
    const description = pickLocalized(seo.description, lang)
    const image = seo.image ?? DEFAULT_OG_IMAGE
    const inLanguage = LANG_META[lang].htmlLang

    const publisher = {
        '@type': 'Organization',
        name: lang === 'zh' ? SITE_NAME : SITE_NAME_EN,
        url: SITE_URL,
        logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/favicon.svg`,
        },
    }

    const webSite = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: lang === 'zh' ? SITE_NAME : SITE_NAME_EN,
        alternateName: lang === 'zh' ? SITE_NAME_EN : SITE_NAME,
        url: SITE_URL,
        description:
            lang === 'zh'
                ? '一卷一城，线上的中国地方志。'
                : 'An online gazetteer of Chinese cities — one volume at a time.',
        inLanguage: LOCALES.map((l) => LANG_META[l].htmlLang),
        publisher,
    }

    if (seo.path === '/') {
        return [webSite, { ...publisher, '@context': 'https://schema.org' }]
    }

    const pageType =
        seo.type === 'article'
            ? 'AboutPage'
            : seo.type === 'collection'
              ? 'CollectionPage'
              : 'WebPage'

    const webPage: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': pageType,
        name,
        description,
        url,
        inLanguage,
        isPartOf: {
            '@type': 'WebSite',
            name: lang === 'zh' ? SITE_NAME : SITE_NAME_EN,
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
            name: pickLocalized({ zh: '临安', en: "Lin'an", ja: '臨安', ko: '임안' }, lang),
            address: {
                '@type': 'PostalAddress',
                addressLocality: pickLocalized({ zh: '临安', en: "Lin'an" }, lang),
                addressRegion: pickLocalized({ zh: '浙江', en: 'Zhejiang' }, lang),
                addressCountry: 'CN',
            },
        }
    }

    return [webPage]
}
