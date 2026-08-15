/** Non-translated structure: ids, routes, images, latin labels. Copy lives in locales/*.json */

export const ANTHOLOGY_DOMAIN = 'jiuzhou.world'

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
        key: 'history',
        route: '/linan/history',
        latin: 'Chapter III — History',
        image: '/images/cover-history.webp',
    },
    {
        key: 'culture',
        route: '/linan/culture',
        latin: 'Chapter IV — Craft',
        image: '/images/cover-culture.webp',
    },
]

export const mountainEssays = [
    { id: 'tianmu', no: '一', latin: 'Mount Tianmu', image: '/images/hero-tianmu.webp' },
    { id: 'daming', no: '二', latin: 'Mount Daming', image: '/images/cover-mountains.webp' },
    { id: 'qingliang', no: '三', latin: 'Qingliang Peak', image: '/images/spot-qingliang.webp' },
    { id: 'water', no: '四', latin: 'Headwaters', image: '/images/spot-taihuyuan.webp' },
]

export const scenicSpots = [
    { id: 'tianmu', no: '01', latin: 'Mount Tianmu', image: '/images/hero-tianmu.webp' },
    { id: 'daming', no: '02', latin: 'Mount Daming', image: '/images/cover-mountains.webp' },
    { id: 'qingshanhu', no: '03', latin: 'Qingshan Lake', image: '/images/hero-lake.webp' },
    { id: 'canyon', no: '04', latin: 'Zhexi Grand Canyon', image: '/images/cover-scenic.webp' },
    { id: 'taihuyuan', no: '05', latin: 'Source of Taihu', image: '/images/spot-taihuyuan.webp' },
    { id: 'zhinan', no: '06', latin: 'Zhinan Village', image: '/images/hero-village.webp' },
    { id: 'heqiao', no: '07', latin: 'Heqiao Old Town', image: '/images/spot-heqiao.webp' },
    { id: 'qingliang', no: '08', latin: 'Qingliang Peak', image: '/images/spot-qingliang.webp' },
]

export const historyEntries = [
    { id: 'birth', image: '/images/cover-history.webp' },
    { id: 'kingdom', image: '/images/hero-tianmu.webp' },
    { id: 'song', image: '/images/cover-scenic.webp' },
    { id: 'precept', image: '/images/cover-culture.webp' },
    { id: 'name', image: '/images/hero-lake.webp' },
]

export const cultureItems = [
    { id: 'hickory', no: '一', latin: 'Chinese Hickory', image: '/images/cover-culture.webp' },
    { id: 'stone', no: '二', latin: 'Changhua Bloodstone', image: '/images/cover-history.webp' },
    { id: 'tenmoku', no: '三', latin: 'Tenmoku Ware', image: '/images/spot-taihuyuan.webp' },
    { id: 'village', no: '四', latin: 'Villages', image: '/images/hero-village.webp' },
]

export const aboutSections = [{ id: 'gazetteer' }, { id: 'notPromotion' }] as const

export const linanNav = [
    { base: '/linan/mountains', key: 'nav.mountains' },
    { base: '/linan/scenic', key: 'nav.scenic' },
    { base: '/linan/history', key: 'nav.history' },
    { base: '/linan/culture', key: 'nav.culture' },
] as const

export type SeoPageType = 'website' | 'article' | 'collection'

export const seoPages = [
    { path: '/', key: 'home', type: 'website' as SeoPageType, image: '/images/hero-lake.webp' },
    { path: '/about', key: 'about', type: 'article' as SeoPageType, image: '/images/hero-village.webp' },
    { path: '/linan', key: 'linan', type: 'collection' as SeoPageType, image: '/images/hero-tianmu.webp' },
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
