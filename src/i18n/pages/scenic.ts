import type { Pair } from '../content'

export interface Spot {
  id: string
  no: string
  name: Pair
  latin: string
  region: Pair
  image: string
  essence: Pair
  season: Pair
  note: Pair
}

export const scenicPage = {
  heroKicker: { zh: '卷二', en: 'Volume II' } as Pair,
  heroTitle: { zh: '景之卷', en: 'Places' } as Pair,
  heroSub: {
    zh: '一景一篇小传，实用信息收在文末。',
    en: 'A short biography for each place; practical notes kept at the end.',
  } as Pair,
  intro: {
    zh: '这一卷收录八处去处。写法和别处不同：先说它是什么、为什么值得知道，再在最末一行告诉你何时去。门票与路线会过时，山不会。',
    en: 'Eight places are gathered in this volume. The approach is unusual: first what a place is and why it matters; only in the final line, when to go. Prices and routes change; mountains do not.',
  } as Pair,
  spots: [
    {
      id: 'tianmu',
      no: '01',
      name: { zh: '天目山', en: 'Mount Tianmu' },
      latin: 'Mount Tianmu',
      region: { zh: '临安西北 · 天目山镇', en: 'Northwest Lin’an' },
      image: '/images/hero-tianmu.png',
      essence: {
        zh: '世界生物圈保护区，以千年柳杉古树林与禅源寺闻名。"大树华盖闻九州"，说的就是这里。',
        en: 'A UNESCO Biosphere Reserve known for thousand-year-old cedar groves and Chanyuan Temple — the place behind the verse “a canopy of great trees, famed across the land.”',
      },
      season: { zh: '四季皆宜，夏避暑，秋观叶', en: 'All seasons; summer shade, autumn colour' },
      note: { zh: '距杭州市区约90公里，有东西天目两个景区', en: 'About 90 km from central Hangzhou; east and west scenic areas' },
    },
    {
      id: 'daming',
      no: '02',
      name: { zh: '大明山', en: 'Mount Daming' },
      latin: 'Mount Daming',
      region: { zh: '临安西部 · 清凉峰镇', en: 'Western Lin’an' },
      image: '/images/cover-mountains.png',
      essence: {
        zh: '千米之上的高山台地，悬空栈道贴着花岗岩崖壁而行，春天杜鹃漫山，冬天是滑雪场。',
        en: 'A high plateau a thousand metres up, a plank walkway bolted to granite cliffs, azaleas in spring, a ski field in winter.',
      },
      season: { zh: '春杜鹃、夏避暑、冬滑雪', en: 'Spring azaleas, summer cool, winter skiing' },
      note: { zh: '有索道与步道两种上山方式', en: 'Reachable by cable car or on foot' },
    },
    {
      id: 'qingshanhu',
      no: '03',
      name: { zh: '青山湖', en: 'Qingshan Lake' },
      latin: 'Qingshan Lake',
      region: { zh: '临安城东', en: 'East of Lin’an town' },
      image: '/images/hero-lake.png',
      essence: {
        zh: '水库成湖，水杉成林。水上森林是江南少见的景致：树从水里长出来，倒影比树更安静。环湖绿道适合骑行。',
        en: 'A reservoir turned lake, metasequoia turned forest — trees rising straight from the water, reflections calmer than the trees. A greenway circles the shore for cycling.',
      },
      season: { zh: '深秋水杉转红时最佳', en: 'Best in late autumn when the redwoods turn' },
      note: { zh: '位于城区边缘，地铁16号线可达临安城区', en: 'At the town’s edge; Metro Line 16 reaches Lin’an' },
    },
    {
      id: 'canyon',
      no: '04',
      name: { zh: '浙西大峡谷', en: 'Zhexi Grand Canyon' },
      latin: 'Zhexi Grand Canyon',
      region: { zh: '临安西部 · 龙岗镇', en: 'Western Lin’an' },
      image: '/images/cover-scenic.png',
      essence: {
        zh: '峡谷沿溪而建，柘林瀑、剑门关一线串起深潭与绝壁。这里的绿是水的颜色，不是树的颜色。',
        en: 'A canyon built along a stream — Zhelin Falls and Jiange Pass stringing together deep pools and sheer walls. The green here belongs to the water, not the trees.',
      },
      season: { zh: '夏季水势最盛', en: 'Fullest water in summer' },
      note: { zh: '适合半日至一日的徒步', en: 'A half-to-full-day walk' },
    },
    {
      id: 'taihuyuan',
      no: '05',
      name: { zh: '太湖源', en: 'Source of Taihu' },
      latin: 'Source of Taihu',
      region: { zh: '临安北部 · 白沙村', en: 'Northern Lin’an' },
      image: '/images/spot-taihuyuan.png',
      essence: {
        zh: '太湖水最初的来处之一。山坞狭长，一路都是清潭与小瀑，走到尽头才意识到：浩渺太湖，始于这样一线细流。',
        en: 'One of Lake Tai’s first sources. The ravine is narrow, strung with clear pools and small falls — only at its end do you grasp that the vast lake begins as a thread of water like this.',
      },
      season: { zh: '夏季清凉，雨后水色最佳', en: 'Coolest in summer; clearest after rain' },
      note: { zh: '峡谷步道平缓，老少咸宜', en: 'Gentle paths, easy for all ages' },
    },
    {
      id: 'zhinan',
      no: '06',
      name: { zh: '指南村', en: 'Zhinan Village' },
      latin: 'Zhinan Village',
      region: { zh: '临安东部 · 太湖源镇', en: 'Eastern Lin’an' },
      image: '/images/hero-village.png',
      essence: {
        zh: '海拔近六百米的古村落，三百余株古树环村而立。深秋时节，银杏黄、枫叶红、梯田金，被摄影爱好者称为华东最美的秋色村落之一。',
        en: 'An ancient village at nearly six hundred metres, ringed by more than three hundred old trees. In late autumn — ginkgo gold, maple red, terraces amber — photographers call it one of East China’s most beautiful autumn villages.',
      },
      season: { zh: '十一月中下旬秋色最浓', en: 'Peak colour in mid-to-late November' },
      note: { zh: '村中有民宿与农家乐', en: 'Guesthouses and farm kitchens in the village' },
    },
    {
      id: 'heqiao',
      no: '07',
      name: { zh: '河桥古镇', en: 'Heqiao Old Town' },
      latin: 'Heqiao Old Town',
      region: { zh: '临安西南 · 昌南溪畔', en: 'Southwest Lin’an' },
      image: '/images/spot-heqiao.png',
      essence: {
        zh: '因水而兴的浙西古镇。昌南溪在此拐了一个弯，老街上还留着从前水运码头的格局——前店后河，下楼即是船埠。',
        en: 'A river-born old town of western Zhejiang. The Changnan stream bends here, and the old street still keeps its wharf-town layout — shops in front, river behind, steps down to the boats.',
      },
      season: { zh: '春秋晨昏最有味道', en: 'Most evocative at dawn and dusk in spring and autumn' },
      note: { zh: '古镇免费开放，适合慢逛', en: 'Open freely; made for slow wandering' },
    },
    {
      id: 'qingliang',
      no: '08',
      name: { zh: '清凉峰', en: 'Qingliang Peak' },
      latin: 'Qingliang Peak',
      region: { zh: '临安西部 · 浙皖交界', en: 'Zhejiang–Anhui border' },
      image: '/images/spot-qingliang.png',
      essence: {
        zh: '浙西第一高峰，国家级自然保护区。没有索道，只有土路与云海。这里是野生梅花鹿在中国东南最后的大片家园。',
        en: 'The highest peak in western Zhejiang, a national nature reserve. No cable cars — dirt paths and seas of cloud. One of the last large homes of wild sika deer in southeast China.',
      },
      season: { zh: '秋季登高，云海概率最高', en: 'Autumn climbs; best odds of cloud seas' },
      note: { zh: '登山需一日，保护区有准入管理', en: 'A full-day climb; entry managed as a reserve' },
    },
  ] as Spot[],
  footnote: {
    zh: '以上信息会随季节与管理方调整而变化，出行前请以景区官方公告为准。',
    en: 'Details shift with seasons and management decisions; check official notices before travelling.',
  } as Pair,
}
