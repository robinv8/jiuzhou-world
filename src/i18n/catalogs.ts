/** Non-translated structure: ids, routes, images, latin labels. Copy lives in locales/*.json */

export const ANTHOLOGY_DOMAIN = 'jiuzhou.world'

/** Inbox for reader-submitted photographs. */
export const CONTRIBUTE_EMAIL = 'hello@jiuzhou.world'

/** Latin volume mark — not translated. */
export const VOLUME_I_LATIN = 'Vol. I'

export const anthologyVolumes = [
    {
        key: 'linan',
        route: '/linan',
        no: '卷一',
        latin: 'Vol. I — Lin’an',
        image: '/images/hero-tianmu.webp',
        status: 'open' as const,
    },
]

export const linanVolumes = [
    {
        key: 'mountains',
        route: '/linan/mountains',
        latin: 'Chapter I — Mountains',
        image: '/images/hero-tianmu.webp',
    },
    {
        key: 'scenic',
        route: '/linan/scenic',
        latin: 'Chapter II — Places',
        image: '/images/cover-scenic.webp',
    },
    {
        key: 'culture',
        route: '/linan/culture',
        latin: 'Chapter III — Craft',
        image: '/images/cover-culture.webp',
    },
    {
        key: 'history',
        route: '/linan/history',
        latin: 'Chapter IV — History',
        image: '/images/cover-history.webp',
    },
]

export const mountainEssays = [
    { id: 'tianmu', no: '一', latin: 'Mount Tianmu', image: '/images/hero-tianmu.webp' },
    { id: 'daming', no: '二', latin: 'Mount Daming', image: '/images/spot-daming.webp' },
    { id: 'qingliang', no: '三', latin: 'Qingliang Peak', image: '/images/spot-qingliang.webp' },
    { id: 'water', no: '四', latin: 'Headwaters', image: '/images/spot-taihuyuan.webp' },
]

export const scenicSpots = [
    { id: 'taihuyuan', no: '01', latin: 'Source of Taihu', image: '/images/spot-taihuyuan.webp' },
    { id: 'canyon', no: '02', latin: 'Zhexi Grand Canyon', image: '/images/spot-canyon.webp' },
    { id: 'qingshanhu', no: '03', latin: 'Qingshan Lake', image: '/images/spot-qingshanhu.webp' },
    { id: 'zhinan', no: '04', latin: 'Zhinan Village', image: '/images/hero-village.webp' },
    { id: 'heqiao', no: '05', latin: 'Heqiao Old Town', image: '/images/spot-heqiao.webp' },
]

export const historyEntries = [
    { id: 'birth', image: '/images/history-birth.webp' },
    { id: 'kingdom', image: '/images/history-kingdom.webp' },
    { id: 'song', image: '/images/history-song.webp' },
    { id: 'precept', image: '/images/history-precept.webp' },
    { id: 'name', image: '/images/history-name.webp' },
]

export const cultureItems = [
    { id: 'hickory', no: '一', latin: 'Chinese Hickory', image: '/images/culture-hickory.webp' },
    { id: 'stone', no: '二', latin: 'Changhua Bloodstone', image: '/images/culture-stone.webp' },
    { id: 'tenmoku', no: '三', latin: 'Tenmoku Ware', image: '/images/culture-tenmoku.webp' },
    { id: 'village', no: '四', latin: 'Villages', image: '/images/hero-village.webp' },
]

export const aboutSections = [{ id: 'gazetteer' }, { id: 'notPromotion' }] as const

/** Sections on each place page — “what” is the regional difference. */
export const contributePlaceSections = [
    { id: 'why' },
    { id: 'what' },
    { id: 'how' },
    { id: 'license' },
] as const

/**
 * City volumes that may accept photographs.
 * Each place has its own 收什么; hub at /contribute lists open ones.
 */
export const contributePlaces = [
    {
        key: 'linan',
        route: '/linan/contribute',
        volumeRoute: '/linan',
        latin: 'Vol. I — Lin’an',
        image: '/images/hero-village.webp',
        status: 'open' as const,
    },
    // Next city: add key + locales contribute.{key} + /{key}/contribute route
] as const

export type ContributePlaceKey = (typeof contributePlaces)[number]['key']

export function getContributePlace(key: string) {
    return contributePlaces.find((p) => p.key === key)
}

export const linanNav = [
    { base: '/linan/mountains', key: 'nav.mountains' },
    { base: '/linan/scenic', key: 'nav.scenic' },
    { base: '/linan/culture', key: 'nav.culture' },
    { base: '/linan/history', key: 'nav.history' },
] as const

export type SeoPageType = 'website' | 'article' | 'collection'

export const seoPages = [
    { path: '/', key: 'home', type: 'website' as SeoPageType, image: '/images/hero-lake.webp' },
    { path: '/about', key: 'about', type: 'article' as SeoPageType, image: '/images/hero-village.webp' },
    {
        path: '/contribute',
        key: 'contribute',
        type: 'article' as SeoPageType,
        image: '/images/hero-village.webp',
    },
    { path: '/linan', key: 'linan', type: 'collection' as SeoPageType, image: '/images/hero-tianmu.webp' },
    {
        path: '/linan/contribute',
        key: 'linan_contribute',
        type: 'article' as SeoPageType,
        image: '/images/hero-village.webp',
    },
    {
        path: '/linan/mountains',
        key: 'linan_mountains',
        type: 'collection' as SeoPageType,
        image: '/images/cover-mountains.webp',
    },
    {
        path: '/linan/scenic',
        key: 'linan_scenic',
        type: 'collection' as SeoPageType,
        image: '/images/cover-scenic.webp',
    },
    {
        path: '/linan/history',
        key: 'linan_history',
        type: 'collection' as SeoPageType,
        image: '/images/cover-history.webp',
    },
    {
        path: '/linan/culture',
        key: 'linan_culture',
        type: 'collection' as SeoPageType,
        image: '/images/cover-culture.webp',
    },
]
