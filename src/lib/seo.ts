export const SITE_URL = 'https://jiuzhou.world'
export const SITE_NAME = '九州志'
export const SITE_NAME_EN = 'Jiuzhou'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-tianmu.png`

export type PageSeo = {
    path: string
    title: { zh: string; en: string }
    description: { zh: string; en: string }
    image?: string
}

export const pages: PageSeo[] = [
    {
        path: '/',
        title: {
            zh: '九州志 · 一卷一城，线上的中国地方志',
            en: 'Jiuzhou — An online gazetteer of Chinese cities',
        },
        description: {
            zh: '九州志是一部线上的方志：一卷一城，慢慢写。第一卷临安——天目山下，吴越故里。',
            en: 'Jiuzhou is an online gazetteer: one city, one volume, written slowly. Volume I: Lin’an, beneath Mount Tianmu.',
        },
        image: `${SITE_URL}/images/hero-lake.png`,
    },
    {
        path: '/about',
        title: {
            zh: '缘起 · 九州志',
            en: 'About · Jiuzhou',
        },
        description: {
            zh: '为什么做九州志：把方志传统搬到线上，一座城市一座城市地走访、阅读、写作。',
            en: 'Why Jiuzhou exists: bringing the gazetteer tradition online, one city at a time.',
        },
    },
    {
        path: '/linan',
        title: {
            zh: '临安卷 · 九州志',
            en: "Lin'an · Jiuzhou",
        },
        description: {
            zh: '临安山水志：天目之荫，吴越之故。记山水、历史与风物，不写攻略。',
            en: "Lin'an Anthology: mountains, memory and craft beneath Tianmu — no itineraries, only place.",
        },
        image: `${SITE_URL}/images/hero-tianmu.png`,
    },
    {
        path: '/linan/mountains',
        title: {
            zh: '山之卷 · 临安 · 九州志',
            en: "Mountains · Lin'an · Jiuzhou",
        },
        description: {
            zh: '临安的山属天目山系：天目山、大明山、清凉峰，以及山作为水之源头。',
            en: "Lin'an's mountains of the Tianmu range: Tianmu, Daming, Qingliang, and water as the mountain's sequel.",
        },
        image: `${SITE_URL}/images/cover-mountains.png`,
    },
    {
        path: '/linan/scenic',
        title: {
            zh: '景之卷 · 临安 · 九州志',
            en: "Places · Lin'an · Jiuzhou",
        },
        description: {
            zh: '临安八处去处小传：天目山、大明山、青山湖、浙西大峡谷、太湖源、指南村、河桥古镇、清凉峰。',
            en: "Eight places in Lin'an: Tianmu, Daming, Qingshan Lake, Zhexi Canyon, Source of Taihu, Zhinan, Heqiao, Qingliang.",
        },
        image: `${SITE_URL}/images/cover-scenic.png`,
    },
    {
        path: '/linan/history',
        title: {
            zh: '史之卷 · 临安 · 九州志',
            en: "History · Lin'an · Jiuzhou",
        },
        description: {
            zh: '临安历史时间线：从钱镠到吴越故里，读一座山城怎样成为杭州的西大门。',
            en: "A timeline of Lin'an: from Qian Liu to the homeland of Wuyue, how a mountain city became Hangzhou's western gate.",
        },
        image: `${SITE_URL}/images/cover-history.png`,
    },
    {
        path: '/linan/culture',
        title: {
            zh: '物之卷 · 临安 · 九州志',
            en: "Craft · Lin'an · Jiuzhou",
        },
        description: {
            zh: '临安风物：山核桃、茶叶与地方物产背后的人与时节。',
            en: "Lin'an craft and produce: hickory nuts, tea, and the seasons behind local things.",
        },
        image: `${SITE_URL}/images/cover-culture.png`,
    },
]

export function absoluteUrl(path: string): string {
    if (path === '/') return SITE_URL
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function getPageSeo(path: string): PageSeo {
    const normalized = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
    return pages.find((p) => p.path === normalized) ?? pages[0]
}
