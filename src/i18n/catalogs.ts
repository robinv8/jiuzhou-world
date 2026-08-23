/** Non-translated structure: ids, routes, images, latin labels. Copy lives in locales/*.json */

export const ANTHOLOGY_DOMAIN = 'jiuzhou.world'

/** Inbox for reader-submitted photographs. */
export const CONTRIBUTE_EMAIL = 'hello@jiuzhou.world'

/** Latin volume mark — not translated. */
export const VOLUME_I_LATIN = 'Vol. I'

export type ChapterKey = 'mountains' | 'scenic' | 'culture' | 'history'

const defaultChapters = (): VolumeChapter[] => [
    { key: 'mountains', latin: 'Chapter I — Landscape' },
    { key: 'scenic', latin: 'Chapter II — Places' },
    { key: 'culture', latin: 'Chapter III — Craft' },
    { key: 'history', latin: 'Chapter IV — History' },
]

export type VolumeChapter = {
    key: ChapterKey
    latin: string
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
        image: '/images/hangzhou-westlake.webp',
        cities: [
            {
                key: 'hangzhou',
                route: '/hangzhou',
                latin: 'Hangzhou',
                image: '/images/hangzhou-westlake.webp',
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
                        image: '/images/fuyang-fuchun.webp',
                        status: 'planned',
                    },
                    {
                        key: 'tonglu',
                        route: '/hangzhou/tonglu',
                        latin: 'Tonglu',
                        image: '/images/spot-canyon.webp',
                        status: 'planned',
                    },
                    {
                        key: 'jiande',
                        route: '/hangzhou/jiande',
                        latin: 'Jiande',
                        image: '/images/hangzhou-water.webp',
                        status: 'planned',
                    },
                    {
                        key: 'chunan',
                        route: '/hangzhou/chunan',
                        latin: 'Chun’an',
                        image: '/images/hero-lake.webp',
                        status: 'planned',
                    },
                    {
                        key: 'xiaoshan',
                        route: '/hangzhou/xiaoshan',
                        latin: 'Xiaoshan',
                        image: '/images/hangzhou-water.webp',
                        status: 'planned',
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
        chapters: defaultChapters(),
    },
    {
        key: 'fuyang',
        route: '/hangzhou/fuyang',
        latin: 'Fuyang',
        image: '/images/fuyang-fuchun.webp',
        status: 'planned',
        parent: 'hangzhou',
        chapters: defaultChapters(),
    },
    {
        key: 'tonglu',
        route: '/hangzhou/tonglu',
        latin: 'Tonglu',
        image: '/images/spot-canyon.webp',
        status: 'planned',
        parent: 'hangzhou',
        chapters: defaultChapters(),
    },
    {
        key: 'jiande',
        route: '/hangzhou/jiande',
        latin: 'Jiande',
        image: '/images/hangzhou-water.webp',
        status: 'planned',
        parent: 'hangzhou',
        chapters: defaultChapters(),
    },
    {
        key: 'chunan',
        route: '/hangzhou/chunan',
        latin: 'Chun’an',
        image: '/images/hero-lake.webp',
        status: 'planned',
        parent: 'hangzhou',
        chapters: defaultChapters(),
    },
    {
        key: 'xiaoshan',
        route: '/hangzhou/xiaoshan',
        latin: 'Xiaoshan',
        image: '/images/hangzhou-water.webp',
        status: 'planned',
        parent: 'hangzhou',
        chapters: defaultChapters(),
    },
    {
        key: 'hangzhou',
        route: '/hangzhou',
        no: '卷一',
        latin: 'Vol. I — Hangzhou',
        image: '/images/hangzhou-westlake.webp',
        status: 'open',
        zhou: true,
        chapters: defaultChapters(),
    },
]

export function getVolume(key: string): Volume | undefined {
    return anthologyVolumes.find((v) => v.key === key)
}

export function isPublishedVolume(volume: Volume | undefined): boolean {
    return volume?.status === 'open'
}

export function isPublishedPath(path: string): boolean {
    const vol = volumeForPath(path)
    if (!vol) return true
    return isPublishedVolume(vol)
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

/**
 * `place` is the default Bing query (one real toponym).
 * `places` lists the other named locations in the same essay — studio switches one at a time.
 * Not shown on reader pages.
 */
export type PlaceFields = { place: string; places?: string[] }
export type Essay = { id: string; no: string; latin: string; image: string } & PlaceFields
export type Spot = { id: string; no: string; latin: string; image: string } & PlaceFields
export type HistoryEntry = { id: string; image: string } & PlaceFields
export type CultureItem = { id: string; no: string; latin: string; image: string } & PlaceFields

export type VolumeContent = {
    essays: Essay[]
    spots: Spot[]
    history: HistoryEntry[]
    culture: CultureItem[]
}

export const volumeContent: Record<string, VolumeContent> = {
    linan: {
        essays: [
            { id: 'tianmu', no: '一', latin: 'Mount Tianmu', image: '/images/hero-tianmu.webp', place: '临安西天目山' },
            { id: 'daming', no: '二', latin: 'Mount Daming', image: '/images/spot-daming.webp', place: '临安大明山' },
            { id: 'qingliang', no: '三', latin: 'Qingliang Peak', image: '/images/spot-qingliang.webp', place: '临安清凉峰' },
            { id: 'water', no: '四', latin: 'Headwaters', image: '/images/spot-taihuyuan.webp', place: '临安苕溪', places: ['临安昌化溪'] },
        ],
        spots: [
            { id: 'taihuyuan', no: '01', latin: 'Source of Taihu', image: '/images/spot-taihuyuan.webp', place: '临安太湖源' },
            { id: 'canyon', no: '02', latin: 'Zhexi Grand Canyon', image: '/images/spot-canyon.webp', place: '临安浙西大峡谷' },
            { id: 'qingshanhu', no: '03', latin: 'Qingshan Lake', image: '/images/spot-qingshanhu.webp', place: '临安青山湖' },
            { id: 'zhinan', no: '04', latin: 'Zhinan Village', image: '/images/spot-zhinan.webp', place: '临安指南村' },
            { id: 'heqiao', no: '05', latin: 'Heqiao Old Town', image: '/images/spot-heqiao.webp', place: '临安河桥古镇' },
        ],
        history: [
            { id: 'birth', image: '/images/history-birth.webp', place: '临安婆留井' },
            { id: 'kingdom', image: '/images/history-kingdom.webp', place: '临安衣锦城' },
            { id: 'song', image: '/images/history-song.webp', place: '临安钱王陵' },
            { id: 'precept', image: '/images/history-precept.webp', place: '临安钱王陵' },
            { id: 'name', image: '/images/history-name.webp', place: '临安功臣山' },
        ],
        culture: [
            { id: 'hickory', no: '一', latin: 'Chinese Hickory', image: '/images/culture-hickory.webp', place: '临安岛石镇' },
            { id: 'stone', no: '二', latin: 'Changhua Bloodstone', image: '/images/culture-stone.webp', place: '临安玉岩山', places: ['临安昌化镇'] },
            { id: 'tenmoku', no: '三', latin: 'Tenmoku Ware', image: '/images/culture-tenmoku.webp', place: '临安天目窑' },
            { id: 'village', no: '四', latin: 'Villages', image: '/images/spot-zhinan.webp', place: '临安指南村', places: ['临安河桥古镇'] },
        ],
    },
    hangzhou: {
        essays: [
            { id: 'westlake', no: '一', latin: 'West Lake', image: '/images/hangzhou-westlake.webp', place: '杭州西湖', places: ['杭州苏堤', '杭州三潭印月'] },
            { id: 'hills', no: '二', latin: 'Hills around the Lake', image: '/images/hangzhou-hills.webp', place: '杭州宝石山', places: ['杭州葛岭', '杭州北高峰', '杭州吴山'] },
            { id: 'tea', no: '三', latin: 'Tea Hills', image: '/images/hangzhou-tea.webp', place: '杭州狮峰山', places: ['杭州翁家山', '杭州满觉陇'] },
            { id: 'water', no: '四', latin: 'Rivers and the Canal', image: '/images/hangzhou-water.webp', place: '杭州虎跑泉', places: ['杭州钱塘江'] },
        ],
        spots: [
            { id: 'lingyin', no: '01', latin: 'Lingyin Temple', image: '/images/hangzhou-lingyin.webp', place: '杭州灵隐寺', places: ['杭州飞来峰'] },
            { id: 'xixi', no: '02', latin: 'Xixi Wetland', image: '/images/hangzhou-xixi.webp', place: '杭州西溪国家湿地公园' },
            { id: 'canal', no: '03', latin: 'Grand Canal', image: '/images/hangzhou-canal.webp', place: '杭州拱宸桥', places: ['杭州塘栖'] },
            { id: 'qiantang', no: '04', latin: 'Qiantang River', image: '/images/hangzhou-qiantang.webp', place: '海宁盐官' },
            { id: 'wushan', no: '05', latin: 'Wu Hill', image: '/images/hangzhou-wushan.webp', place: '杭州吴山城隍阁' },
        ],
        history: [
            { id: 'liangzhu', image: '/images/hangzhou-history-liangzhu.webp', place: '杭州良渚古城' },
            { id: 'wuyue', image: '/images/hangzhou-westlake.webp', place: '杭州西湖', places: ['杭州钱塘江海塘'] },
            { id: 'southern-song', image: '/images/hangzhou-history-song.webp', place: '杭州南宋御街', places: ['杭州凤凰山'] },
            { id: 'modern', image: '/images/hangzhou-modern.webp', place: '杭州西湖', places: ['杭州拱宸桥'] },
        ],
        culture: [
            { id: 'tea', no: '一', latin: 'Longjing Tea', image: '/images/hangzhou-longjing.webp', place: '杭州龙井村', places: ['杭州狮峰山', '杭州翁家山', '杭州满觉陇'] },
            { id: 'silk', no: '二', latin: 'Silk', image: '/images/hangzhou-silk.webp', place: '杭州中国丝绸博物馆' },
            { id: 'craft', no: '三', latin: 'Craft', image: '/images/hangzhou-craft.webp', place: '杭州王星记扇庄', places: ['杭州西湖绸伞厂', '杭州张小泉剪刀博物馆'] },
            { id: 'food', no: '四', latin: 'Food', image: '/images/hangzhou-food.webp', place: '杭州楼外楼' },
        ],
    },
    fuyang: {
        essays: [
            { id: 'fuchun', no: '一', latin: 'The Fuchun', image: '/images/fuyang-fuchun.webp', place: '富阳富春江' },
            { id: 'ranges', no: '二', latin: 'Two Ranges', image: '/images/hangzhou-hills.webp', place: '富阳杏梅尖', places: ['富阳龙门山'] },
            { id: 'stork', no: '三', latin: 'Stork Hill', image: '/images/hangzhou-hills.webp', place: '富阳鹳山' },
            { id: 'water', no: '四', latin: 'Midstream', image: '/images/fuyang-fuchun.webp', place: '富阳渌渚江', places: ['富阳壶源江'] },
        ],
        spots: [
            { id: 'stork', no: '01', latin: 'Stork Hill', image: '/images/hangzhou-hills.webp', place: '富阳鹳山公园' },
            { id: 'longmen', no: '02', latin: 'Longmen', image: '/images/culture-village.webp', place: '富阳龙门古镇' },
            { id: 'dongzhou', no: '03', latin: 'Dongzhou', image: '/images/fuyang-fuchun.webp', place: '富阳东洲岛' },
            { id: 'miaoshan', no: '04', latin: 'Miaoshanwu', image: '/images/hangzhou-hills.webp', place: '富阳庙山坞' },
            { id: 'xindeng', no: '05', latin: 'Xindeng', image: '/images/spot-heqiao.webp', place: '富阳新登古镇' },
        ],
        history: [
            { id: 'name', image: '/images/fuyang-fuchun.webp', place: '富阳富春江' },
            { id: 'sun', image: '/images/culture-village.webp', place: '富阳龙门古镇' },
            { id: 'painting', image: '/images/fuyang-fuchun.webp', place: '富阳富春江' },
            { id: 'paper', image: '/images/hangzhou-craft.webp', place: '富阳泗洲造纸作坊遗址' },
        ],
        culture: [
            { id: 'paper', no: '一', latin: 'Bamboo Paper', image: '/images/hangzhou-craft.webp', place: '富阳大源', places: ['富阳湖源'] },
            { id: 'longmen', no: '二', latin: 'Longmen People', image: '/images/culture-village.webp', place: '富阳龙门古镇' },
            { id: 'islet', no: '三', latin: 'Sandbars', image: '/images/fuyang-fuchun.webp', place: '富阳东洲岛' },
            { id: 'village', no: '四', latin: 'Villages', image: '/images/hangzhou-craft.webp', place: '富阳大源' },
        ],
    },
    tonglu: {
        essays: [
            { id: 'rivers', no: '一', latin: 'Two Rivers', image: '/images/hangzhou-water.webp', place: '桐庐桐君山', places: ['桐庐桐江', '桐庐分水江'] },
            { id: 'yanling', no: '二', latin: 'Yanling', image: '/images/spot-canyon.webp', place: '桐庐严陵山', places: ['桐庐七里泷'] },
            { id: 'tongjun', no: '三', latin: 'Tongjun Hill', image: '/images/hangzhou-water.webp', place: '桐庐桐君山' },
            { id: 'water', no: '四', latin: 'The Tong', image: '/images/spot-taihuyuan.webp', place: '桐庐七里泷' },
        ],
        spots: [
            { id: 'diaotai', no: '01', latin: 'Fishing Terrace', image: '/images/spot-canyon.webp', place: '桐庐严子陵钓台' },
            { id: 'yaolin', no: '02', latin: 'Yaolin', image: '/images/hangzhou-lingyin.webp', place: '桐庐瑶琳仙境' },
            { id: 'tianzi', no: '03', latin: 'Tianzi Di', image: '/images/hero-tianmu.webp', place: '桐庐天子地' },
            { id: 'tongjun', no: '04', latin: 'Tongjun Hill', image: '/images/hangzhou-water.webp', place: '桐庐桐君山' },
            { id: 'fenshui', no: '05', latin: 'Fenshui', image: '/images/spot-heqiao.webp', place: '桐庐分水' },
        ],
        history: [
            { id: 'county', image: '/images/hangzhou-water.webp', place: '桐庐桐君山' },
            { id: 'yanguang', image: '/images/spot-canyon.webp', place: '桐庐严子陵钓台' },
            { id: 'fan', image: '/images/history-name.webp', place: '建德梅城', places: ['桐庐严子陵钓台'] },
            { id: 'liuyu', image: '/images/hero-tianmu.webp', place: '桐庐天子地' },
        ],
        culture: [
            { id: 'tea', no: '一', latin: 'Tonglu Tea', image: '/images/hangzhou-tea.webp', place: '桐庐雪水岭', places: ['桐庐天尊岩'] },
            { id: 'pen', no: '二', latin: 'Fenshui Pens', image: '/images/spot-heqiao.webp', place: '桐庐分水' },
            { id: 'herb', no: '三', latin: 'Tongjun', image: '/images/hangzhou-water.webp', place: '桐庐桐君山' },
            { id: 'village', no: '四', latin: 'Villages', image: '/images/spot-taihuyuan.webp', place: '桐庐七里泷', places: ['桐庐桐君山', '桐庐分水'] },
        ],
    },
    jiande: {
        essays: [
            { id: 'confluence', no: '一', latin: 'Three Rivers', image: '/images/hangzhou-water.webp', place: '建德梅城三江口' },
            { id: 'wulong', no: '二', latin: 'Wulong Hill', image: '/images/hangzhou-hills.webp', place: '建德乌龙山' },
            { id: 'xinan', no: '三', latin: 'Below the Dam', image: '/images/hangzhou-canal.webp', place: '建德新安江大坝' },
            { id: 'water', no: '四', latin: 'The Mouth', image: '/images/hangzhou-qiantang.webp', place: '建德寿昌江' },
        ],
        spots: [
            { id: 'meicheng', no: '01', latin: 'Meicheng', image: '/images/spot-heqiao.webp', place: '建德梅城古镇' },
            { id: 'yandongguan', no: '02', latin: 'Yandongguan', image: '/images/hangzhou-canal.webp', place: '建德严东关' },
            { id: 'dam', no: '03', latin: 'Tongguan Dam', image: '/images/hangzhou-water.webp', place: '建德新安江水电站' },
            { id: 'mist', no: '04', latin: 'Mist Town', image: '/images/hero-lake.webp', place: '建德白沙' },
            { id: 'gorge', no: '05', latin: 'Into the Gorge', image: '/images/spot-canyon.webp', place: '建德七里泷' },
        ],
        history: [
            { id: 'county', image: '/images/history-name.webp', place: '建德梅城' },
            { id: 'yanzhou', image: '/images/history-name.webp', place: '建德梅城' },
            { id: 'dam', image: '/images/hangzhou-water.webp', place: '建德新安江水电站' },
            { id: 'move', image: '/images/hero-lake.webp', place: '建德白沙' },
        ],
        culture: [
            { id: 'baocha', no: '一', latin: 'Baocha Tea', image: '/images/history-name.webp', place: '建德梅城', places: ['建德三都'] },
            { id: 'wujiapi', no: '二', latin: 'Wujiapi', image: '/images/hangzhou-canal.webp', place: '建德严东关' },
            { id: 'fishers', no: '三', latin: 'Boat People', image: '/images/hangzhou-water.webp', place: '建德三都' },
            { id: 'pear', no: '四', latin: 'Pears', image: '/images/culture-village.webp', place: '建德杨村桥' },
        ],
    },
    chunan: {
        essays: [
            { id: 'xinan', no: '一', latin: 'The Xin’an', image: '/images/hangzhou-water.webp', place: '淳安街口' },
            { id: 'reservoir', no: '二', latin: 'A Dammed Valley', image: '/images/hero-lake.webp', place: '淳安千岛湖' },
            { id: 'islands', no: '三', latin: 'Drowned Hills', image: '/images/hero-lake.webp', place: '淳安千岛湖' },
            { id: 'water', no: '四', latin: 'After the Cutoff', image: '/images/hero-lake.webp', place: '淳安千岛湖' },
        ],
        spots: [
            { id: 'lake', no: '01', latin: 'Qiandao Lake', image: '/images/hero-lake.webp', place: '淳安千岛湖' },
            { id: 'shicheng', no: '02', latin: 'Lion City', image: '/images/spot-heqiao.webp', place: '淳安狮城' },
            { id: 'pailing', no: '03', latin: 'Pailing', image: '/images/hangzhou-history-modern.webp', place: '淳安千岛湖镇' },
            { id: 'weiping', no: '04', latin: 'Weiping', image: '/images/hero-tianmu.webp', place: '淳安方腊洞', places: ['淳安威坪'] },
            { id: 'jukeng', no: '05', latin: 'Jiukeng', image: '/images/hangzhou-tea.webp', place: '淳安鸠坑乡' },
        ],
        history: [
            { id: 'cutoff', image: '/images/hangzhou-water.webp', place: '建德新安江水电站' },
            { id: 'drown', image: '/images/spot-heqiao.webp', place: '淳安狮城', places: ['淳安贺城'] },
            { id: 'suian', image: '/images/spot-heqiao.webp', place: '淳安狮城' },
            { id: 'name', image: '/images/history-song.webp', place: '淳安贺城' },
        ],
        culture: [
            { id: 'jiukeng', no: '一', latin: 'Jiukeng Tea', image: '/images/hangzhou-tea.webp', place: '淳安鸠坑乡' },
            { id: 'fish', no: '二', latin: 'Reservoir Fish', image: '/images/hero-lake.webp', place: '淳安千岛湖' },
            { id: 'timber', no: '三', latin: 'Timber', image: '/images/hero-tianmu.webp', place: '淳安千里岗' },
            { id: 'village', no: '四', latin: 'Villages', image: '/images/culture-village.webp', place: '淳安姜家镇' },
        ],
    },
    xiaoshan: {
        essays: [
            { id: 'puyang', no: '一', latin: 'The Puyang', image: '/images/hangzhou-water.webp', place: '萧山浦阳江' },
            { id: 'xianghu', no: '二', latin: 'Xianghu', image: '/images/hangzhou-xixi.webp', place: '萧山湘湖' },
            { id: 'south', no: '三', latin: 'South Bank', image: '/images/hangzhou-hills.webp', place: '萧山小砾山', places: ['萧山闻堰'] },
            { id: 'water', no: '四', latin: 'Two Channels', image: '/images/hangzhou-qiantang.webp', place: '萧山碛堰', places: ['萧山西小江'] },
        ],
        spots: [
            { id: 'xianghu', no: '01', latin: 'Xianghu', image: '/images/hangzhou-xixi.webp', place: '萧山湘湖' },
            { id: 'qiyan', no: '02', latin: 'Qiyan', image: '/images/hangzhou-qiantang.webp', place: '萧山碛堰' },
            { id: 'yupu', no: '03', latin: 'Yupu', image: '/images/hangzhou-water.webp', place: '萧山渔浦' },
            { id: 'linpu', no: '04', latin: 'Linpu', image: '/images/spot-heqiao.webp', place: '萧山临浦' },
            { id: 'chengshan', no: '05', latin: 'Yuewangcheng', image: '/images/hangzhou-wushan.webp', place: '萧山城山越王城' },
        ],
        history: [
            { id: 'name', image: '/images/history-name.webp', place: '萧山萧然山' },
            { id: 'kuahuqiao', image: '/images/hangzhou-history-liangzhu.webp', place: '萧山跨湖桥遗址' },
            { id: 'diversion', image: '/images/hangzhou-qiantang.webp', place: '萧山碛堰' },
            { id: 'yue', image: '/images/history-kingdom.webp', place: '萧山城山', places: ['萧山湘湖'] },
        ],
        culture: [
            { id: 'ware', no: '一', latin: 'Stamped Ware', image: '/images/hangzhou-craft.webp', place: '萧山茅湾里窑址' },
            { id: 'lakeside', no: '二', latin: 'Lakeside', image: '/images/hangzhou-xixi.webp', place: '萧山湘湖' },
            { id: 'fields', no: '三', latin: 'Fields', image: '/images/culture-village.webp', place: '萧山西江塘', places: ['萧山麻溪坝'] },
            { id: 'village', no: '四', latin: 'Villages', image: '/images/culture-village.webp', place: '萧山里畈' },
        ],
    },
}

export function getVolumeContent(key: string): VolumeContent | undefined {
    return volumeContent[key]
}

/** Volume cover / 山川章卡 = this place. Must match an item `place`. */
export const VOLUME_KERNEL_PLACE: Record<string, string> = {
    hangzhou: '杭州西湖',
    linan: '临安西天目山',
    fuyang: '富阳富春江',
    tonglu: '桐庐严子陵钓台',
    jiande: '建德梅城三江口',
    chunan: '淳安千岛湖',
    xiaoshan: '萧山浦阳江',
}

export type PlaceKind = 'essay' | 'spot' | 'history' | 'culture'

export type PlaceRef = {
    volKey: string
    kind: PlaceKind
    id: string
    slotId: string
    image: string
    place: string
    places?: string[]
}

function essayRef(volKey: string, item: Essay): PlaceRef {
    return {
        volKey,
        kind: 'essay',
        id: item.id,
        slotId: `${volKey}.mountains.essays.${item.id}`,
        image: item.image,
        place: item.place,
        places: item.places,
    }
}

function spotRef(volKey: string, item: Spot): PlaceRef {
    return {
        volKey,
        kind: 'spot',
        id: item.id,
        slotId: `${volKey}.scenic.spots.${item.id}`,
        image: item.image,
        place: item.place,
        places: item.places,
    }
}

function historyRef(volKey: string, item: HistoryEntry): PlaceRef {
    return {
        volKey,
        kind: 'history',
        id: item.id,
        slotId: `${volKey}.history.entries.${item.id}`,
        image: item.image,
        place: item.place,
        places: item.places,
    }
}

function cultureRef(volKey: string, item: CultureItem): PlaceRef {
    return {
        volKey,
        kind: 'culture',
        id: item.id,
        slotId: `${volKey}.culture.items.${item.id}`,
        image: item.image,
        place: item.place,
        places: item.places,
    }
}

export function allPlaceRefs(volKey: string): PlaceRef[] {
    const content = volumeContent[volKey]
    if (!content) return []
    return [
        ...content.essays.map((item) => essayRef(volKey, item)),
        ...content.spots.map((item) => spotRef(volKey, item)),
        ...content.history.map((item) => historyRef(volKey, item)),
        ...content.culture.map((item) => cultureRef(volKey, item)),
    ]
}

export function placeRefByPlace(volKey: string, place: string): PlaceRef | undefined {
    const items = allPlaceRefs(volKey)
    return items.find((item) => item.place === place) ?? items.find((item) => item.places?.includes(place))
}

export function volumeKernel(volKey: string): PlaceRef | undefined {
    const place = VOLUME_KERNEL_PLACE[volKey]
    if (place) return placeRefByPlace(volKey, place)
    return allPlaceRefs(volKey)[0]
}

export function chapterCoverRef(volKey: string, chapter: ChapterKey): PlaceRef | undefined {
    const content = volumeContent[volKey]
    if (chapter === 'mountains') {
        const kernel = volumeKernel(volKey)
        if (kernel?.kind === 'essay') return kernel
        if (content?.essays[0]) return essayRef(volKey, content.essays[0])
        return kernel
    }
    if (!content) return volumeKernel(volKey)
    if (chapter === 'scenic' && content.spots[0]) return spotRef(volKey, content.spots[0])
    if (chapter === 'culture' && content.culture[0]) return cultureRef(volKey, content.culture[0])
    if (chapter === 'history' && content.history[0]) return historyRef(volKey, content.history[0])
    return volumeKernel(volKey)
}

const VOLUME_PARALLAX_PLACE: Record<string, string> = {
    linan: '临安清凉峰',
    hangzhou: '杭州宝石山',
    fuyang: '富阳杏梅尖',
}

const CULTURE_PARALLAX_PLACE: Record<string, string> = {
    linan: '临安河桥古镇',
    hangzhou: '杭州拱宸桥',
}

export function volumeParallaxRef(volKey: string): PlaceRef | undefined {
    const named = VOLUME_PARALLAX_PLACE[volKey]
    if (named) return placeRefByPlace(volKey, named)
    const kernel = volumeKernel(volKey)
    const other = volumeContent[volKey]?.essays.find((item) => !kernel || item.image !== kernel.image)
    return other ? essayRef(volKey, other) : undefined
}

export function cultureParallaxRef(volKey: string): PlaceRef | undefined {
    const named = CULTURE_PARALLAX_PLACE[volKey]
    if (named) return placeRefByPlace(volKey, named)
    return undefined
}

export function placeCaptionKey(ref: PlaceRef): string {
    if (ref.kind === 'essay') return `${ref.volKey}.mountains.essays.${ref.id}.title`
    if (ref.kind === 'spot') return `${ref.volKey}.scenic.spots.${ref.id}.name`
    if (ref.kind === 'history') return `${ref.volKey}.history.entries.${ref.id}.title`
    return `${ref.volKey}.culture.items.${ref.id}.title`
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
    { path: '/zhejiang', key: 'zhejiang', type: 'collection' as SeoPageType, image: '/images/hangzhou-westlake.webp' },
    { path: '/hangzhou', key: 'hangzhou', type: 'collection' as SeoPageType, image: '/images/hangzhou-westlake.webp' },
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
        image: chapterCoverRef('linan', 'mountains')?.image ?? '/images/hero-tianmu.webp',
    },
    {
        path: '/hangzhou/linan/scenic',
        key: 'linan_scenic',
        type: 'collection' as SeoPageType,
        image: chapterCoverRef('linan', 'scenic')?.image ?? '/images/hero-tianmu.webp',
    },
    {
        path: '/hangzhou/linan/history',
        key: 'linan_history',
        type: 'collection' as SeoPageType,
        image: chapterCoverRef('linan', 'history')?.image ?? '/images/hero-tianmu.webp',
    },
    {
        path: '/hangzhou/linan/culture',
        key: 'linan_culture',
        type: 'collection' as SeoPageType,
        image: chapterCoverRef('linan', 'culture')?.image ?? '/images/hero-tianmu.webp',
    },
    {
        path: '/hangzhou/mountains',
        key: 'hangzhou_mountains',
        type: 'collection' as SeoPageType,
        image: chapterCoverRef('hangzhou', 'mountains')?.image ?? '/images/hangzhou-westlake.webp',
    },
    {
        path: '/hangzhou/scenic',
        key: 'hangzhou_scenic',
        type: 'collection' as SeoPageType,
        image: chapterCoverRef('hangzhou', 'scenic')?.image ?? '/images/hangzhou-westlake.webp',
    },
    {
        path: '/hangzhou/history',
        key: 'hangzhou_history',
        type: 'collection' as SeoPageType,
        image: chapterCoverRef('hangzhou', 'history')?.image ?? '/images/hangzhou-westlake.webp',
    },
    {
        path: '/hangzhou/culture',
        key: 'hangzhou_culture',
        type: 'collection' as SeoPageType,
        image: chapterCoverRef('hangzhou', 'culture')?.image ?? '/images/hangzhou-westlake.webp',
    },
    ...(['fuyang', 'tonglu', 'jiande', 'chunan', 'xiaoshan'] as const).flatMap((key) => {
        const vol = anthologyVolumes.find((v) => v.key === key)!
        return [
            { path: vol.route, key, type: 'collection' as SeoPageType, image: volumeKernel(key)?.image ?? vol.image },
            ...vol.chapters.map((c) => ({
                path: `${vol.route}/${c.key}`,
                key: `${key}_${c.key}`,
                type: 'collection' as SeoPageType,
                image: chapterCoverRef(key, c.key)?.image ?? vol.image,
            })),
        ]
    }),
]
