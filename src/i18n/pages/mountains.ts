import type { Pair } from '../content'

export interface Essay {
  id: string
  no: string
  title: Pair
  latin: string
  image: string
  paragraphs: Pair[]
}

export const mountainsPage = {
  heroKicker: { zh: '卷一', en: 'Volume I' } as Pair,
  heroTitle: { zh: '山之卷', en: 'Mountains' } as Pair,
  heroSub: {
    zh: '山不是风景，山是时间。',
    en: 'Mountains are not scenery. Mountains are time.',
  } as Pair,
  intro: {
    zh: '临安的山属天目山系，自皖南入境，一路向东，在杭州城边收住脚。山里有华东最古的树林、最高的峰顶，也有太湖水最初的来处。以下四则，记山本身。',
    en: 'Lin’an’s mountains belong to the Tianmu range, entering from southern Anhui and easing eastward until they rest at the edge of Hangzhou. Within them stand some of East China’s oldest forests and highest summits, and the first trickles of Lake Tai’s water. Four essays on the mountains themselves.',
  } as Pair,
  essays: [
    {
      id: 'tianmu',
      no: '一',
      title: { zh: '天目山：大树的时间', en: 'Tianmu: the time of great trees' },
      latin: 'Mount Tianmu',
      image: '/images/hero-tianmu.webp',
      paragraphs: [
        {
          zh: '天目山以树闻名。西天目山的老树林里，活着一棵树龄逾千年的柳杉，胸径要五六人才能合抱。宋人叫它"千秋树"，今人唤它"大树王"。树比山里的任何一座庙都老，也比庙更沉默。',
          en: 'Tianmu is famous for its trees. In the old-growth forest of West Tianmu stands a Chinese cedar over a thousand years old, its trunk so wide that five or six people cannot link arms around it. The Song people called it the Thousand-Autumn Tree; today it is simply the King of Trees — older than any temple on the mountain, and more silent.',
        },
        {
          zh: '这里是世界生物圈保护区。银杏、金钱松、天目铁木……许多植物以"天目"为名，因为这里是它们最早被科学记录的地方。山脚的禅源寺钟声一起，整片林海就安静下来。',
          en: 'It is a UNESCO Biosphere Reserve. Ginkgo, golden larch, the Tianmu ironwood — many plants carry the name “Tianmu” because this is where science first recorded them. When the bell of Chanyuan Temple sounds at the mountain’s foot, the whole forest seems to settle.',
        },
      ],
    },
    {
      id: 'daming',
      no: '二',
      title: { zh: '大明山：云上高台', en: 'Daming: a terrace above the clouds' },
      latin: 'Mount Daming',
      image: '/images/cover-mountains.webp',
      paragraphs: [
        {
          zh: '大明山的高处是一片意料之外的高山台地——爬到千米之上，眼前忽然展开草甸与花海，像山把一块平原偷偷藏在了顶上。悬空栈道贴在花岗岩的崖壁上，脚下是深谷，谷中常有云海漫上来。',
          en: 'High on Daming lies an unexpected plateau — climb past a thousand metres and meadows and flower fields suddenly unfold, as if the mountain had hidden a plain on its summit. A plank walkway clings to the granite cliff, a deep valley below, and seas of cloud often rise out of it.',
        },
        {
          zh: '相传朱元璋曾在此屯兵，山因此得名。传说不必尽信，但站在栈道上看云起云落，确实会生出一点帝王读兵书的错觉。',
          en: 'Legend says the future Hongwu Emperor once garrisoned troops here, giving the mountain its name. Legends need not be believed — but standing on the walkway watching the clouds turn over, one does briefly feel like a sovereign reading the Art of War.',
        },
      ],
    },
    {
      id: 'qingliang',
      no: '三',
      title: { zh: '清凉峰：浙西的屋脊', en: 'Qingliang: the roof of western Zhejiang' },
      latin: 'Qingliang Peak',
      image: '/images/spot-qingliang.webp',
      paragraphs: [
        {
          zh: '海拔1787.4米，清凉峰是浙西第一高峰，也是国家级自然保护区。这里没有索道和商铺，只有土路、矮松和不断变换高度的杜鹃。登山的人凌晨出发，为的是在日出时分站在云海之上。',
          en: 'At 1,787.4 metres, Qingliang Peak is the highest summit in western Zhejiang and a national nature reserve. There are no cable cars or shops here — only dirt paths, dwarf pines, and azaleas shifting with altitude. Hikers set out before dawn to stand above the sea of clouds at sunrise.',
        },
        {
          zh: '山里还住着野生梅花鹿。清凉峰是它们在中国东南最后的大片栖息地之一。山的高度保护了它们，也保护了一种不被打扰的生活方式。',
          en: 'Wild sika deer still live in these mountains; Qingliang is one of their last large habitats in southeast China. The mountain’s height protects them — and protects a way of life that asks not to be disturbed.',
        },
      ],
    },
    {
      id: 'water',
      no: '四',
      title: { zh: '水：山的下文', en: 'Water: the mountain’s sequel' },
      latin: 'Headwaters',
      image: '/images/spot-taihuyuan.webp',
      paragraphs: [
        {
          zh: '山有多高，水就有多长。天目山系的溪流一路向东，在临安境内汇成苕溪，最终注入太湖。白沙村附近的一道山坞被称作"太湖源"——太湖水最初的来处之一。',
          en: 'However high the mountain, that long is its water. Streams of the Tianmu range run east, joining within Lin’an to form the Tiaoxi, which finally empties into Lake Tai. A ravine near Baisha village is called the Source of Taihu — one of the great lake’s first beginnings.',
        },
        {
          zh: '峡谷里的水有自己的脾气：浙西大峡谷的溪潭碧得发暗，河桥古镇外的昌南溪却缓得可以照见老屋。水出山之后，就成了人间。',
          en: 'Each stretch of water has its own temper: the pools of the Zhexi Grand Canyon run a dark jade, while the Changnan stream outside Heqiao town flows slow enough to mirror the old houses. Once water leaves the mountain, it becomes the human world.',
        },
      ],
    },
  ] as Essay[],
  colophon: {
    zh: '山有古木，水有源头。临安的山，是可以慢慢读完的。',
    en: 'Old trees in the mountains, sources in the water. Lin’an’s mountains reward slow reading.',
  } as Pair,
}
