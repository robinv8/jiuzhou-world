import type { Pair } from '../content'

export interface CraftItem {
  id: string
  no: string
  title: Pair
  latin: string
  image: string
  paragraphs: Pair[]
}

export const culturePage = {
  heroKicker: { zh: '卷四', en: 'Volume IV' } as Pair,
  heroTitle: { zh: '物之卷', en: 'Craft' } as Pair,
  heroSub: {
    zh: '物是人和山水之间的连接点。',
    en: 'Objects are the joints between people and their mountains.',
  } as Pair,
  intro: {
    zh: '一方水土长出一方物产。临安的山核桃、昌化的鸡血石、天目山的茶盏，都不是摆在博物馆里的遗产，而是至今仍在山里人手中的生计与日常。',
    en: 'Every soil grows its own goods. Lin’an’s hickory nuts, Changhua’s chicken-blood stone, Tianmu’s tea bowls — none are museum relics; all remain livelihoods and daily objects in mountain hands.',
  } as Pair,
  items: [
    {
      id: 'hickory',
      no: '一',
      title: { zh: '山核桃：白露开竿', en: 'Hickory: the White Dew harvest' },
      latin: 'Chinese Hickory',
      image: '/images/cover-culture.png',
      paragraphs: [
        {
          zh: '临安是"中国山核桃之乡"，天目山区出产的壳薄肉香。每年白露节气，山里人持竿上树打核桃，称为"开竿"。这一天前后，整座山都是竹竿敲打枝叶的声音。',
          en: 'Lin’an is the home of the Chinese hickory; the nuts from the Tianmu range are thin-shelled and fragrant. At the White Dew solar term, mountain people climb the trees with long poles to knock the nuts down — “the opening of the poles.” For those days, the whole mountain rings with bamboo against branches.',
        },
        {
          zh: '这是一年中最危险也最丰厚的收获。山核桃树长在陡坡上，打核桃是技术活，也是山里人家一年的指望。',
          en: 'It is the year’s most dangerous and most generous harvest. Hickory trees grow on steep slopes; striking them is skilled work, and a mountain family’s year hangs on it.',
        },
      ],
    },
    {
      id: 'stone',
      no: '二',
      title: { zh: '昌化鸡血石：石上朱砂', en: 'Chicken-blood stone: cinnabar in rock' },
      latin: 'Changhua Bloodstone',
      image: '/images/cover-history.png',
      paragraphs: [
        {
          zh: '临安昌化镇出产的鸡血石，石质温润，上有鲜红如血的辰砂纹理，与田黄、芙蓉并称"印石三宝"。明清以来，它是印章石中的上品。',
          en: 'From Changhua town comes chicken-blood stone — a warm, fine-grained stone veined with cinnabar red as fresh blood, counted with Tianhuang and Furong among the “three treasures” of seal stones. Since the Ming and Qing, it has been the seal-carver’s prize.',
        },
        {
          zh: '好石头越来越少，雕刻的手艺还在。一方鸡血石印章，是山里挖出的朱砂，也是案头的一寸山河。',
          en: 'Fine stones grow rarer; the carving craft endures. A bloodstone seal is cinnabar dug from the mountain — and an inch of landscape on a scholar’s desk.',
        },
      ],
    },
    {
      id: 'tenmoku',
      no: '三',
      title: { zh: '天目盏：一盏星空', en: 'Tenmoku: a night sky in a bowl' },
      latin: 'Tenmoku Ware',
      image: '/images/spot-taihuyuan.png',
      paragraphs: [
        {
          zh: '宋代，天目山一带的窑口烧制黑釉茶盏。日本僧人来天目山参禅，把茶盏带回国，称之为"天目"——至今日语中"天目"仍是黑釉茶盏的通称。一只茶盏的名字，成了一类器物的名字。',
          en: 'In the Song dynasty, kilns around Tianmu fired black-glazed tea bowls. Japanese monks came to the mountain for Chan study and carried the bowls home as “tenmoku” — to this day the word means black-glazed tea ware in Japanese. One bowl’s name became the name of a whole class of vessels.',
        },
        {
          zh: '兔毫、油滴、曜变——黑釉在窑火中结晶出星空般的斑纹。今天天目窑遗址仍在，山里的窑火也在重新燃起。',
          en: 'Hare’s fur, oil-spot, yohen — the black glaze crystallises in the kiln into patterns like a night sky. The kiln sites remain on the mountain, and its fires are being lit again.',
        },
      ],
    },
    {
      id: 'village',
      no: '四',
      title: { zh: '村落：山里的人', en: 'Villages: the mountain people' },
      latin: 'Villages',
      image: '/images/hero-village.png',
      paragraphs: [
        {
          zh: '指南村的梯田、河桥的老街、湍口的温泉村落……临安的村庄依山而建，四季各有生计：春采茶，夏纳凉，秋收山核桃与香榧，冬晒腊肉与笋干。',
          en: 'The terraces of Zhinan, the old street of Heqiao, the hot-spring hamlets of Tuankou — Lin’an’s villages lean against the mountains, each season with its own work: tea in spring, cool air in summer, hickory and torreya in autumn, cured pork and dried bamboo shoots in winter.',
        },
        {
          zh: '风物最终是人的风物。山还在，人还在，四季的秩序还在。',
          en: 'In the end, local goods are local people. The mountains remain, the people remain, and the order of the seasons remains.',
        },
      ],
    },
  ] as CraftItem[],
  colophon: {
    zh: '一村一物，皆有其时。',
    en: 'Every village, every craft, has its season.',
  } as Pair,
}

export const footer = {
  colophonLabel: { zh: '跋', en: 'Colophon' } as Pair,
  colophon: {
    zh: '本站为非营利的文化宣传项目，不设商业功能。文中信息如有出入，以官方发布为准。全站图片均为 AI 生成的意境示意，非实景拍摄。',
    en: 'A non-profit cultural project with no commercial function. Where details differ, official publications prevail. All images on this site are AI-generated impressions, not photographs of the actual places.',
  } as Pair,
  credit: {
    zh: '临安山水志 · 一部线上方志',
    en: "Lin'an Anthology · an online gazetteer",
  } as Pair,
}
