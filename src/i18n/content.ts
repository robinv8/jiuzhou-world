/**
 * 临安山水志 — bilingual content model (zh / en).
 * All copy lives here; components only render.
 */

export interface Pair {
  zh: string
  en: string
}

export const site = {
  name: { zh: '临安山水志', en: "Lin'an Anthology" } as Pair,
  nameEn: "Lin'an — A Mountain–Water Anthology",
  tagline: {
    zh: '一部关于山水、历史与风物的线上方志',
    en: 'An online anthology of mountains, memory and craft',
  } as Pair,
}

export const nav = {
  home: { zh: '卷首', en: 'Opening' } as Pair,
  mountains: { zh: '山之卷', en: 'Mountains' } as Pair,
  scenic: { zh: '景之卷', en: 'Places' } as Pair,
  history: { zh: '史之卷', en: 'History' } as Pair,
  culture: { zh: '物之卷', en: 'Craft' } as Pair,
}

/* ── 九州志 · 总品牌 ─────────────────────────────── */

export const anthology = {
  name: { zh: '九州志', en: 'Jiuzhou' } as Pair,
  nameEn: 'Jiuzhou — An Anthology of the Nine Lands',
  domain: 'jiuzhou.world',
  volumesLabel: { zh: '诸卷', en: 'The volumes' } as Pair,
  volumesTitle: { zh: '开卷', en: 'Open a volume' } as Pair,
  about: { zh: '缘起', en: 'About' } as Pair,
  intro: [
    {
      zh: '古分中国为九州。冀、兖、青、徐、扬、荆、豫、梁、雍——州是山川，是风土，是一方人怎样过日子。九州志是一部线上的方志：一卷一城，慢慢写。',
      en: 'Ancient China was divided into Nine Lands — Jiuzhou. Each land was its mountains and rivers, its customs, the way its people lived. Jiuzhou is an online gazetteer of these lands: one city, one volume, written slowly.',
    },
    {
      zh: '第一卷是临安——天目山下，吴越故里。',
      en: 'The first volume is Lin’an — beneath Mount Tianmu, the old homeland of Wuyue.',
    },
  ] as Pair[],
  heroKicker: { zh: '一卷一城 · 慢慢写', en: 'One city, one volume' } as Pair,
}

export interface AnthologyVolume {
  key: string
  route: string
  no: string
  title: Pair
  latin: string
  place: Pair
  desc: Pair
  image: string
  status: 'open' | 'planned'
}

export const anthologyVolumes: AnthologyVolume[] = [
  {
    key: 'linan',
    route: '/linan',
    no: '卷一',
    title: { zh: '临安卷', en: "Lin'an" },
    latin: 'Vol. I — Lin’an',
    place: { zh: '浙江 · 杭州', en: 'Hangzhou, Zhejiang' },
    desc: {
      zh: '天目之荫，吴越之故。山水、历史与风物。',
      en: 'Beneath Tianmu’s canopy, in the old homeland of Wuyue — mountains, memory and craft.',
    },
    image: '/images/hero-tianmu.png',
    status: 'open',
  },
]

export const aboutPage = {
  heroTitle: { zh: '缘起', en: 'About' } as Pair,
  heroSub: {
    zh: '为什么做九州志。',
    en: 'Why Jiuzhou exists.',
  } as Pair,
  sections: [
    {
      title: { zh: '一部慢慢写的方志', en: 'A gazetteer, written slowly' } as Pair,
      paragraphs: [
        {
          zh: '方志是中国最古老的地方书写传统：一个地方的山水、建制、人物、物产，被一代代人记下来。九州志想把这个传统搬到线上——不是百科全书的写法，而是一座城市一座城市地走访、阅读、写作。',
          en: 'The gazetteer is China’s oldest tradition of local writing: a place’s mountains, its history, its people and its produce, recorded generation after generation. Jiuzhou brings this tradition online — not as an encyclopedia, but as one city at a time: visited, read, and written.',
        },
      ],
    },
    {
      title: { zh: '不为营销', en: 'Not promotion' } as Pair,
      paragraphs: [
        {
          zh: '这些页面不卖门票，不推线路。如果你读完心里长出了一座山，或者想去一个地方看看，它们就完成了使命。',
          en: 'These pages sell no tickets and push no routes. If a mountain takes root in your mind, or you find yourself wanting to see a place, they have done their work.',
        },
        {
          zh: '全站图片均为 AI 生成的意境示意，非实景拍摄；文中信息如有出入，以官方发布为准。',
          en: 'All images are AI-generated impressions, not photographs of the actual places; where details differ, official publications prevail.',
        },
      ],
    },
  ] as { title: Pair; paragraphs: Pair[] }[],
}

export const home = {
  heroKicker: { zh: '浙江 · 杭州 · 临安', en: "Lin'an · Hangzhou · Zhejiang" } as Pair,
  heroTitle: { zh: '临安山水志', en: "Lin'an Anthology" } as Pair,
  heroSub: {
    zh: '天目之荫，吴越之故。这里不写攻略，只记山水。',
    en: 'Beneath Tianmu’s canopy, in the old homeland of Wuyue. No itineraries here — only mountains, remembered.',
  } as Pair,
  heroScroll: { zh: '向下，入山', en: 'Scroll, into the hills' } as Pair,
  manifestoLabel: { zh: '缘起', en: 'Why this site' } as Pair,
  manifestoTitle: {
    zh: '不为营销，只为记念',
    en: 'Not promotion — remembrance',
  } as Pair,
  manifesto: [
    {
      zh: '临安在杭州之西，是山的临安。天目山、大明山、清凉峰自西北迤逦而来，把这座小城围在云雾与竹林之间。这里也是史的临安——一千一百年前，钱镠从此地走出，建立吴越国；后来，"临安"二字被南宋借去，成了一个王朝都城的名字。',
      en: 'West of Hangzhou lies Lin’an, a town of mountains. Tianmu, Daming and Qingliang Peak fold in from the northwest, wrapping it in cloud and bamboo. It is also a town of history — eleven centuries ago Qian Liu walked out of these hills to found the kingdom of Wuyue, and centuries later the name “Lin’an” itself was borrowed by the Southern Song as the name of its capital.',
    },
    {
      zh: '这个网站不卖门票，不推线路。它更像一部翻开的方志：记山，记史，记一村一物。如果你读完心里长出了一座山，它就完成了使命。',
      en: 'This site sells no tickets and pushes no routes. It reads like an open local gazetteer: mountains, memory, one village and one craft at a time. If a mountain takes root in your mind after reading, it has done its work.',
    },
  ] as Pair[],
  volumesLabel: { zh: '四卷', en: 'Four volumes' } as Pair,
  volumesTitle: { zh: '开卷', en: 'Open the volumes' } as Pair,
  closingQuote: {
    zh: '「大树华盖闻九州。」',
    en: '“A canopy of great trees, famed across the land.”',
  } as Pair,
  closingSource: {
    zh: '—— 古人咏天目山',
    en: '— An old verse on Mount Tianmu',
  } as Pair,
}

export interface Volume {
  key: string
  route: string
  title: Pair
  latin: string
  desc: Pair
  image: string
}

export const volumes: Volume[] = [
  {
    key: 'mountains',
    route: '/linan/mountains',
    title: { zh: '山之卷', en: 'Mountains' },
    latin: 'Chapter I — Mountains',
    desc: {
      zh: '天目的大树、大明的云海、清凉峰的极顶，与山中流下的水。',
      en: 'Tianmu’s ancient trees, Daming’s sea of clouds, Qingliang’s summit — and the water that leaves the mountains.',
    },
    image: '/images/hero-tianmu.png',
  },
  {
    key: 'scenic',
    route: '/linan/scenic',
    title: { zh: '景之卷', en: 'Places' },
    latin: 'Chapter II — Places',
    desc: {
      zh: '八处去处，一景一篇小传。实用信息收在文末，不喧宾夺主。',
      en: 'Eight places, each a short biography. Practical notes kept quiet at the end.',
    },
    image: '/images/cover-scenic.png',
  },
  {
    key: 'history',
    route: '/linan/history',
    title: { zh: '史之卷', en: 'History' },
    latin: 'Chapter III — History',
    desc: {
      zh: '从钱镠到纳土归宋，一个地方的姓名如何成为一座都城的名字。',
      en: 'From Qian Liu to the peaceful handover to Song — how a town’s name became a capital’s name.',
    },
    image: '/images/cover-history.png',
  },
  {
    key: 'culture',
    route: '/linan/culture',
    title: { zh: '物之卷', en: 'Craft' },
    latin: 'Chapter IV — Craft',
    desc: {
      zh: '山核桃、鸡血石、天目盏，与山里人的四季生计。',
      en: 'Hickory nuts, chicken-blood stone, tenmoku bowls — the working seasons of mountain people.',
    },
    image: '/images/cover-culture.png',
  },
]
