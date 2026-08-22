/** Non-translated structure: ids, routes, images, latin labels. Copy lives in locales/*.json */

export const ANTHOLOGY_DOMAIN = 'jiuzhou.world'

/** Inbox for reader-submitted photographs. */
export const CONTRIBUTE_EMAIL = 'hello@jiuzhou.world'

/** Latin volume mark — not translated. */
export const VOLUME_I_LATIN = 'Vol. I'

export type ChapterKey = 'mountains' | 'scenic' | 'culture' | 'history'

const nestedChapters = (hero: string): VolumeChapter[] => [
    { key: 'mountains', latin: 'Chapter I — Landscape', image: hero },
    { key: 'scenic', latin: 'Chapter II — Places', image: '/images/cover-scenic.webp' },
    { key: 'culture', latin: 'Chapter III — Craft', image: '/images/cover-culture.webp' },
    { key: 'history', latin: 'Chapter IV — History', image: '/images/cover-history.webp' },
]

export type VolumeChapter = {
    key: ChapterKey
    latin: string
    image: string
}

export type Volume = {
    key: string
    route: string
    no?: string
    latin: string
    image: string
    status: 'open' | 'planned'
    chapters: VolumeChapter[]
    /** Parent volume key, if this is a sub-volume (e.g. linan under hangzhou). */
    parent?: string
    /** Show ancient-zhou identity line on the home volume card. */
    zhou?: boolean
}

export type Province = {
    key: string
    route: string
    latin: string
    image: string
    cities: City[]
}

export type City = {
    key: string
    route: string
    latin: string
    image: string
    status: 'open' | 'planned'
    districts: District[]
}

export type District = {
    key: string
    route: string
    latin: string
    image: string
    status: 'open' | 'planned'
}

export const provinces: Province[] = [
    {
        key: 'zhejiang',
        route: '/zhejiang',
        latin: 'Zhejiang',
        image: '/images/hero-hangzhou.webp',
        cities: [
            {
                key: 'hangzhou',
                route: '/hangzhou',
                latin: 'Hangzhou',
                image: '/images/hero-hangzhou.webp',
                status: 'open',
                districts: [
                    {
                        key: 'linan',
                        route: '/hangzhou/linan',
                        latin: 'Lin’an',
                        image: '/images/hero-tianmu.webp',
                        status: 'open',
                    },
                    {
                        key: 'fuyang',
                        route: '/hangzhou/fuyang',
                        latin: 'Fuyang',
                        image: '/images/hero-fuyang.webp',
                        status: 'open',
                    },
                    {
                        key: 'tonglu',
                        route: '/hangzhou/tonglu',
                        latin: 'Tonglu',
                        image: '/images/spot-canyon.webp',
                        status: 'open',
                    },
                    {
                        key: 'jiande',
                        route: '/hangzhou/jiande',
                        latin: 'Jiande',
                        image: '/images/hangzhou-canal.webp',
                        status: 'open',
                    },
                    {
                        key: 'chunan',
                        route: '/hangzhou/chunan',
                        latin: 'Chun’an',
                        image: '/images/hero-lake.webp',
                        status: 'open',
                    },
                    {
                        key: 'xiaoshan',
                        route: '/hangzhou/xiaoshan',
                        latin: 'Xiaoshan',
                        image: '/images/hangzhou-hills.webp',
                        status: 'open',
                    },
                ],
            },
        ],
    },
]

export const anthologyVolumes: Volume[] = [
    {
        key: 'linan',
        route: '/hangzhou/linan',
        latin: 'Lin’an',
        image: '/images/hero-tianmu.webp',
        status: 'open',
        parent: 'hangzhou',
        chapters: [
            { key: 'mountains', latin: 'Chapter I — Landscape', image: '/images/hero-tianmu.webp' },
            { key: 'scenic', latin: 'Chapter II — Places', image: '/images/cover-scenic.webp' },
            { key: 'culture', latin: 'Chapter III — Craft', image: '/images/cover-culture.webp' },
            { key: 'history', latin: 'Chapter IV — History', image: '/images/cover-history.webp' },
        ],
    },
    {
        key: 'fuyang',
        route: '/hangzhou/fuyang',
        latin: 'Fuyang',
        image: '/images/hero-fuyang.webp',
        status: 'open',
        parent: 'hangzhou',
        chapters: nestedChapters('/images/hero-fuyang.webp'),
    },
    {
        key: 'tonglu',
        route: '/hangzhou/tonglu',
        latin: 'Tonglu',
        image: '/images/spot-canyon.webp',
        status: 'open',
        parent: 'hangzhou',
        chapters: nestedChapters('/images/spot-canyon.webp'),
    },
    {
        key: 'jiande',
        route: '/hangzhou/jiande',
        latin: 'Jiande',
        image: '/images/hangzhou-canal.webp',
        status: 'open',
        parent: 'hangzhou',
        chapters: nestedChapters('/images/hangzhou-canal.webp'),
    },
    {
        key: 'chunan',
        route: '/hangzhou/chunan',
        latin: 'Chun’an',
        image: '/images/hero-lake.webp',
        status: 'open',
        parent: 'hangzhou',
        chapters: nestedChapters('/images/hero-lake.webp'),
    },
    {
        key: 'xiaoshan',
        route: '/hangzhou/xiaoshan',
        latin: 'Xiaoshan',
        image: '/images/hangzhou-hills.webp',
        status: 'open',
        parent: 'hangzhou',
        chapters: nestedChapters('/images/hangzhou-hills.webp'),
    },
    {
        key: 'hangzhou',
        route: '/hangzhou',
        no: '卷一',
        latin: 'Vol. I — Hangzhou',
        image: '/images/hero-hangzhou.webp',
        status: 'open',
        zhou: true,
        chapters: [
            { key: 'mountains', latin: 'Chapter I — Landscape', image: '/images/hangzhou-mountains.webp' },
            { key: 'scenic', latin: 'Chapter II — Places', image: '/images/hangzhou-scenic.webp' },
            { key: 'culture', latin: 'Chapter III — Craft', image: '/images/hangzhou-culture.webp' },
            { key: 'history', latin: 'Chapter IV — History', image: '/images/hangzhou-history.webp' },
        ],
    },
]

export function getVolume(key: string): Volume | undefined {
    return anthologyVolumes.find((v) => v.key === key)
}

export function getVolumeByRoute(route: string): Volume | undefined {
    return anthologyVolumes.find((v) => v.route === route)
}

/** Longest route first so /hangzhou/fuyang is not swallowed by /hangzhou. */
export function volumeForPath(path: string): Volume | undefined {
    return [...anthologyVolumes]
        .sort((a, b) => b.route.length - a.route.length)
        .find((v) => path === v.route || path.startsWith(`${v.route}/`))
}

export function getProvince(key: string): Province | undefined {
    return provinces.find((p) => p.key === key)
}

export function getCity(provinceKey: string, cityKey: string): City | undefined {
    return getProvince(provinceKey)?.cities.find((c) => c.key === cityKey)
}

export function getDistrict(provinceKey: string, cityKey: string, districtKey: string): District | undefined {
    return getCity(provinceKey, cityKey)?.districts.find((d) => d.key === districtKey)
}

export type Essay = { id: string; no: string; latin: string; image: string }
export type Spot = { id: string; no: string; latin: string; image: string }
export type HistoryEntry = { id: string; image: string }
export type CultureItem = { id: string; no: string; latin: string; image: string }

export type VolumeContent = {
    essays: Essay[]
    spots: Spot[]
    history: HistoryEntry[]
    culture: CultureItem[]
}

export const volumeContent: Record<string, VolumeContent> = {
    linan: {
        essays: [
            { id: 'tianmu', no: '一', latin: 'Mount Tianmu', image: '/images/hero-tianmu.webp' },
            { id: 'daming', no: '二', latin: 'Mount Daming', image: '/images/spot-daming.webp' },
            { id: 'qingliang', no: '三', latin: 'Qingliang Peak', image: '/images/spot-qingliang.webp' },
            { id: 'water', no: '四', latin: 'Headwaters', image: '/images/spot-taihuyuan.webp' },
        ],
        spots: [
            { id: 'taihuyuan', no: '01', latin: 'Source of Taihu', image: '/images/spot-taihuyuan.webp' },
            { id: 'canyon', no: '02', latin: 'Zhexi Grand Canyon', image: '/images/spot-canyon.webp' },
            { id: 'qingshanhu', no: '03', latin: 'Qingshan Lake', image: '/images/spot-qingshanhu.webp' },
            { id: 'zhinan', no: '04', latin: 'Zhinan Village', image: '/images/spot-zhinan.webp' },
            { id: 'heqiao', no: '05', latin: 'Heqiao Old Town', image: '/images/spot-heqiao.webp' },
        ],
        history: [
            { id: 'birth', image: '/images/history-birth.webp' },
            { id: 'kingdom', image: '/images/history-kingdom.webp' },
            { id: 'song', image: '/images/history-song.webp' },
            { id: 'precept', image: '/images/history-precept.webp' },
            { id: 'name', image: '/images/history-name.webp' },
        ],
        culture: [
            { id: 'hickory', no: '一', latin: 'Chinese Hickory', image: '/images/culture-hickory.webp' },
            { id: 'stone', no: '二', latin: 'Changhua Bloodstone', image: '/images/culture-stone.webp' },
            { id: 'tenmoku', no: '三', latin: 'Tenmoku Ware', image: '/images/culture-tenmoku.webp' },
            { id: 'village', no: '四', latin: 'Villages', image: '/images/culture-village.webp' },
        ],
    },
    hangzhou: {
        essays: [
            { id: 'westlake', no: '一', latin: 'West Lake', image: '/images/hangzhou-westlake.webp' },
            { id: 'hills', no: '二', latin: 'Hills around the Lake', image: '/images/hangzhou-hills.webp' },
            { id: 'tea', no: '三', latin: 'Tea Hills', image: '/images/hangzhou-tea.webp' },
            { id: 'water', no: '四', latin: 'Rivers and the Canal', image: '/images/hangzhou-water.webp' },
        ],
        spots: [
            { id: 'lingyin', no: '01', latin: 'Lingyin Temple', image: '/images/hangzhou-lingyin.webp' },
            { id: 'xixi', no: '02', latin: 'Xixi Wetland', image: '/images/hangzhou-xixi.webp' },
            { id: 'canal', no: '03', latin: 'Grand Canal', image: '/images/hangzhou-canal.webp' },
            { id: 'qiantang', no: '04', latin: 'Qiantang River', image: '/images/hangzhou-qiantang.webp' },
            { id: 'wushan', no: '05', latin: 'Wu Hill', image: '/images/hangzhou-wushan.webp' },
        ],
        history: [
            { id: 'liangzhu', image: '/images/hangzhou-history-liangzhu.webp' },
            { id: 'wuyue', image: '/images/hangzhou-history-wuyue.webp' },
            { id: 'southern-song', image: '/images/hangzhou-history-song.webp' },
            { id: 'modern', image: '/images/hangzhou-history-modern.webp' },
        ],
        culture: [
            { id: 'tea', no: '一', latin: 'Longjing Tea', image: '/images/hangzhou-tea.webp' },
            { id: 'silk', no: '二', latin: 'Silk', image: '/images/hangzhou-silk.webp' },
            { id: 'craft', no: '三', latin: 'Craft', image: '/images/hangzhou-craft.webp' },
            { id: 'food', no: '四', latin: 'Food', image: '/images/hangzhou-food.webp' },
        ],
    },
    fuyang: {
        essays: [
            { id: 'fuchun', no: '一', latin: 'The Fuchun', image: '/images/fuyang-fuchun.webp' },
            { id: 'ranges', no: '二', latin: 'Two Ranges', image: '/images/hangzhou-hills.webp' },
            { id: 'stork', no: '三', latin: 'Stork Hill', image: '/images/hangzhou-hills.webp' },
            { id: 'water', no: '四', latin: 'Midstream', image: '/images/fuyang-fuchun.webp' },
        ],
        spots: [
            { id: 'stork', no: '01', latin: 'Stork Hill', image: '/images/hangzhou-hills.webp' },
            { id: 'longmen', no: '02', latin: 'Longmen', image: '/images/culture-village.webp' },
            { id: 'dongzhou', no: '03', latin: 'Dongzhou', image: '/images/fuyang-fuchun.webp' },
            { id: 'miaoshan', no: '04', latin: 'Miaoshanwu', image: '/images/hangzhou-hills.webp' },
            { id: 'xindeng', no: '05', latin: 'Xindeng', image: '/images/spot-heqiao.webp' },
        ],
        history: [
            { id: 'name', image: '/images/history-name.webp' },
            { id: 'sun', image: '/images/history-kingdom.webp' },
            { id: 'painting', image: '/images/hangzhou-hills.webp' },
            { id: 'paper', image: '/images/hangzhou-craft.webp' },
        ],
        culture: [
            { id: 'paper', no: '一', latin: 'Bamboo Paper', image: '/images/hangzhou-craft.webp' },
            { id: 'longmen', no: '二', latin: 'Longmen People', image: '/images/culture-village.webp' },
            { id: 'islet', no: '三', latin: 'Sandbars', image: '/images/fuyang-fuchun.webp' },
            { id: 'village', no: '四', latin: 'Villages', image: '/images/culture-village.webp' },
        ],
    },
    tonglu: {
        essays: [
            { id: 'rivers', no: '一', latin: 'Two Rivers', image: '/images/hangzhou-water.webp' },
            { id: 'yanling', no: '二', latin: 'Yanling', image: '/images/spot-canyon.webp' },
            { id: 'tongjun', no: '三', latin: 'Tongjun Hill', image: '/images/hangzhou-hills.webp' },
            { id: 'water', no: '四', latin: 'The Tong', image: '/images/spot-taihuyuan.webp' },
        ],
        spots: [
            { id: 'diaotai', no: '01', latin: 'Fishing Terrace', image: '/images/spot-canyon.webp' },
            { id: 'yaolin', no: '02', latin: 'Yaolin', image: '/images/hangzhou-lingyin.webp' },
            { id: 'tianzi', no: '03', latin: 'Tianzi Di', image: '/images/hero-tianmu.webp' },
            { id: 'tongjun', no: '04', latin: 'Tongjun Hill', image: '/images/hangzhou-hills.webp' },
            { id: 'fenshui', no: '05', latin: 'Fenshui', image: '/images/spot-heqiao.webp' },
        ],
        history: [
            { id: 'county', image: '/images/history-name.webp' },
            { id: 'yanguang', image: '/images/history-precept.webp' },
            { id: 'fan', image: '/images/history-song.webp' },
            { id: 'liuyu', image: '/images/history-birth.webp' },
        ],
        culture: [
            { id: 'tea', no: '一', latin: 'Tonglu Tea', image: '/images/hangzhou-tea.webp' },
            { id: 'pen', no: '二', latin: 'Fenshui Pens', image: '/images/hangzhou-craft.webp' },
            { id: 'herb', no: '三', latin: 'Tongjun', image: '/images/culture-tenmoku.webp' },
            { id: 'village', no: '四', latin: 'Villages', image: '/images/culture-village.webp' },
        ],
    },
    jiande: {
        essays: [
            { id: 'confluence', no: '一', latin: 'Three Rivers', image: '/images/hangzhou-water.webp' },
            { id: 'wulong', no: '二', latin: 'Wulong Hill', image: '/images/hangzhou-hills.webp' },
            { id: 'xinan', no: '三', latin: 'Below the Dam', image: '/images/hangzhou-canal.webp' },
            { id: 'water', no: '四', latin: 'The Mouth', image: '/images/hangzhou-qiantang.webp' },
        ],
        spots: [
            { id: 'meicheng', no: '01', latin: 'Meicheng', image: '/images/spot-heqiao.webp' },
            { id: 'yandongguan', no: '02', latin: 'Yandongguan', image: '/images/hangzhou-canal.webp' },
            { id: 'dam', no: '03', latin: 'Tongguan Dam', image: '/images/hangzhou-water.webp' },
            { id: 'mist', no: '04', latin: 'Mist Town', image: '/images/hero-lake.webp' },
            { id: 'gorge', no: '05', latin: 'Into the Gorge', image: '/images/spot-canyon.webp' },
        ],
        history: [
            { id: 'county', image: '/images/history-name.webp' },
            { id: 'yanzhou', image: '/images/history-kingdom.webp' },
            { id: 'dam', image: '/images/hangzhou-history-modern.webp' },
            { id: 'move', image: '/images/history-song.webp' },
        ],
        culture: [
            { id: 'baocha', no: '一', latin: 'Baocha Tea', image: '/images/hangzhou-tea.webp' },
            { id: 'wujiapi', no: '二', latin: 'Wujiapi', image: '/images/hangzhou-food.webp' },
            { id: 'fishers', no: '三', latin: 'Boat People', image: '/images/hangzhou-water.webp' },
            { id: 'pear', no: '四', latin: 'Pears', image: '/images/culture-village.webp' },
        ],
    },
    chunan: {
        essays: [
            { id: 'xinan', no: '一', latin: 'The Xin’an', image: '/images/hangzhou-water.webp' },
            { id: 'reservoir', no: '二', latin: 'A Dammed Valley', image: '/images/hero-lake.webp' },
            { id: 'islands', no: '三', latin: 'Drowned Hills', image: '/images/hangzhou-xixi.webp' },
            { id: 'water', no: '四', latin: 'After the Cutoff', image: '/images/hangzhou-water.webp' },
        ],
        spots: [
            { id: 'lake', no: '01', latin: 'Qiandao Lake', image: '/images/hero-lake.webp' },
            { id: 'shicheng', no: '02', latin: 'Lion City', image: '/images/spot-heqiao.webp' },
            { id: 'pailing', no: '03', latin: 'Pailing', image: '/images/hangzhou-history-modern.webp' },
            { id: 'weiping', no: '04', latin: 'Weiping', image: '/images/hero-tianmu.webp' },
            { id: 'jukeng', no: '05', latin: 'Jiukeng', image: '/images/hangzhou-tea.webp' },
        ],
        history: [
            { id: 'cutoff', image: '/images/hangzhou-history-modern.webp' },
            { id: 'drown', image: '/images/hero-lake.webp' },
            { id: 'suian', image: '/images/history-name.webp' },
            { id: 'name', image: '/images/history-song.webp' },
        ],
        culture: [
            { id: 'jiukeng', no: '一', latin: 'Jiukeng Tea', image: '/images/hangzhou-tea.webp' },
            { id: 'fish', no: '二', latin: 'Reservoir Fish', image: '/images/hangzhou-food.webp' },
            { id: 'timber', no: '三', latin: 'Timber', image: '/images/hero-tianmu.webp' },
            { id: 'village', no: '四', latin: 'Villages', image: '/images/culture-village.webp' },
        ],
    },
    xiaoshan: {
        essays: [
            { id: 'puyang', no: '一', latin: 'The Puyang', image: '/images/hangzhou-water.webp' },
            { id: 'xianghu', no: '二', latin: 'Xianghu', image: '/images/hangzhou-xixi.webp' },
            { id: 'south', no: '三', latin: 'South Bank', image: '/images/hangzhou-hills.webp' },
            { id: 'water', no: '四', latin: 'Two Channels', image: '/images/hangzhou-qiantang.webp' },
        ],
        spots: [
            { id: 'xianghu', no: '01', latin: 'Xianghu', image: '/images/hangzhou-xixi.webp' },
            { id: 'qiyan', no: '02', latin: 'Qiyan', image: '/images/spot-canyon.webp' },
            { id: 'yupu', no: '03', latin: 'Yupu', image: '/images/hangzhou-water.webp' },
            { id: 'linpu', no: '04', latin: 'Linpu', image: '/images/spot-heqiao.webp' },
            { id: 'chengshan', no: '05', latin: 'Yuewangcheng', image: '/images/hangzhou-wushan.webp' },
        ],
        history: [
            { id: 'name', image: '/images/history-name.webp' },
            { id: 'kuahuqiao', image: '/images/hangzhou-history-liangzhu.webp' },
            { id: 'diversion', image: '/images/hangzhou-water.webp' },
            { id: 'yue', image: '/images/history-kingdom.webp' },
        ],
        culture: [
            { id: 'ware', no: '一', latin: 'Stamped Ware', image: '/images/hangzhou-craft.webp' },
            { id: 'lakeside', no: '二', latin: 'Lakeside', image: '/images/hangzhou-xixi.webp' },
            { id: 'fields', no: '三', latin: 'Fields', image: '/images/culture-village.webp' },
            { id: 'village', no: '四', latin: 'Villages', image: '/images/culture-village.webp' },
        ],
    },
}

export function getVolumeContent(key: string): VolumeContent | undefined {
    return volumeContent[key]
}

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
        key: 'hangzhou',
        route: '/hangzhou/contribute',
        volumeRoute: '/hangzhou',
        latin: 'Vol. I — Hangzhou',
        image: '/images/hangzhou-westlake.webp',
        status: 'open' as const,
    },
    {
        key: 'linan',
        route: '/hangzhou/linan/contribute',
        volumeRoute: '/hangzhou/linan',
        latin: 'Lin’an',
        image: '/images/hero-village.webp',
        status: 'open' as const,
    },
] as const

export type ContributePlaceKey = (typeof contributePlaces)[number]['key']

export function getContributePlace(key: string) {
    return contributePlaces.find((p) => p.key === key)
}

export function volumeNav(volumeKey: string) {
    const volume = getVolume(volumeKey)
    if (!volume) return []
    return volume.chapters.map((c) => ({
        base: `${volume.route}/${c.key}`,
        key: `nav.${c.key}`,
    }))
}

export type SeoPageType = 'website' | 'article' | 'collection'

export const seoPages = [
    { path: '/', key: 'home', type: 'website' as SeoPageType, image: '/images/hero-jiuzhou.webp' },
    { path: '/about', key: 'about', type: 'article' as SeoPageType, image: '/images/hero-village.webp' },
    {
        path: '/contribute',
        key: 'contribute',
        type: 'article' as SeoPageType,
        image: '/images/hero-village.webp',
    },
    { path: '/zhejiang', key: 'zhejiang', type: 'collection' as SeoPageType, image: '/images/hero-hangzhou.webp' },
    { path: '/hangzhou', key: 'hangzhou', type: 'collection' as SeoPageType, image: '/images/hero-hangzhou.webp' },
    {
        path: '/hangzhou/linan',
        key: 'linan',
        type: 'collection' as SeoPageType,
        image: '/images/hero-tianmu.webp',
    },
    {
        path: '/hangzhou/linan/contribute',
        key: 'linan_contribute',
        type: 'article' as SeoPageType,
        image: '/images/hero-village.webp',
    },
    {
        path: '/hangzhou/contribute',
        key: 'hangzhou_contribute',
        type: 'article' as SeoPageType,
        image: '/images/hangzhou-westlake.webp',
    },
    {
        path: '/hangzhou/linan/mountains',
        key: 'linan_mountains',
        type: 'collection' as SeoPageType,
        image: '/images/cover-mountains.webp',
    },
    {
        path: '/hangzhou/linan/scenic',
        key: 'linan_scenic',
        type: 'collection' as SeoPageType,
        image: '/images/cover-scenic.webp',
    },
    {
        path: '/hangzhou/linan/history',
        key: 'linan_history',
        type: 'collection' as SeoPageType,
        image: '/images/cover-history.webp',
    },
    {
        path: '/hangzhou/linan/culture',
        key: 'linan_culture',
        type: 'collection' as SeoPageType,
        image: '/images/cover-culture.webp',
    },
    {
        path: '/hangzhou/mountains',
        key: 'hangzhou_mountains',
        type: 'collection' as SeoPageType,
        image: '/images/hangzhou-mountains.webp',
    },
    {
        path: '/hangzhou/scenic',
        key: 'hangzhou_scenic',
        type: 'collection' as SeoPageType,
        image: '/images/hangzhou-scenic.webp',
    },
    {
        path: '/hangzhou/history',
        key: 'hangzhou_history',
        type: 'collection' as SeoPageType,
        image: '/images/hangzhou-history.webp',
    },
    {
        path: '/hangzhou/culture',
        key: 'hangzhou_culture',
        type: 'collection' as SeoPageType,
        image: '/images/hangzhou-culture.webp',
    },
    ...(['fuyang', 'tonglu', 'jiande', 'chunan', 'xiaoshan'] as const).flatMap((key) => {
        const vol = anthologyVolumes.find((v) => v.key === key)!
        return [
            { path: vol.route, key, type: 'collection' as SeoPageType, image: vol.image },
            ...vol.chapters.map((c) => ({
                path: `${vol.route}/${c.key}`,
                key: `${key}_${c.key}`,
                type: 'collection' as SeoPageType,
                image: c.image,
            })),
        ]
    }),
]
