import type { Pair } from '../content'

export interface TimelineEntry {
  id: string
  era: Pair
  title: Pair
  image: string
  paragraphs: Pair[]
}

export const historyPage = {
  heroKicker: { zh: '卷三', en: 'Volume III' } as Pair,
  heroTitle: { zh: '史之卷', en: 'History' } as Pair,
  heroSub: {
    zh: '一个地方的姓名，如何成为一座都城的名字。',
    en: 'How a town’s name became the name of a capital.',
  } as Pair,
  intro: {
    zh: '临安的历史绕不开一个姓氏：钱。唐末乱世中，临安人钱镠建立吴越国，保境安民八十余年；他的后人把国土和平交给宋朝，把家训留给了千年。再往后，"临安"这个名字被南宋借去做了都城之名——直到今天，这个名字才重新回到这片土地身上。',
    en: 'Lin’an’s history turns on a single surname: Qian. Amid the chaos of the late Tang, Qian Liu of Lin’an founded the kingdom of Wuyue and kept his corner of the country at peace for eighty years; his grandson handed the realm to the Song without a war and left a family precept that has lasted a millennium. Later, the Southern Song borrowed the very name “Lin’an” for its capital — and only in our own time has the name returned to the land it came from.',
  } as Pair,
  timeline: [
    {
      id: 'birth',
      era: { zh: '唐 · 大中六年（852）', en: '852 · Tang dynasty' },
      title: { zh: '钱镠生于临安', en: 'Qian Liu is born in Lin’an' },
      image: '/images/cover-history.png',
      paragraphs: [
        {
          zh: '钱镠出生在临安石镜乡（今锦城街道一带）的一个农家。传说他出生时有异象，父亲欲弃之，祖母留下他的命——乡人因此称他"婆留"。今天的临安城里还留着婆留井。',
          en: 'Qian Liu was born to a farming family in Shijing township, in what is now central Lin’an. Legend says strange signs attended his birth and his father meant to abandon him; his grandmother saved him, and villagers nicknamed him “Poliu” — kept by grandma. A well by that name still exists in town.',
        },
        {
          zh: '他少年时贩过私盐，后来从军。乱世之中，这个临安人一路打成了两浙之主。',
          en: 'He smuggled salt as a youth, then took up arms. In an age of collapse, the man from Lin’an fought his way to rule over the whole of Liangzhe.',
        },
      ],
    },
    {
      id: 'kingdom',
      era: { zh: '五代 · 907', en: '907 · Five Dynasties' },
      title: { zh: '吴越国：保境安民', en: 'Wuyue: peace held close' },
      image: '/images/hero-tianmu.png',
      paragraphs: [
        {
          zh: '907年，钱镠受封吴越王，建立吴越国，定都杭州。当中原战火连天，吴越国却几十年不闻兵戈。钱氏修筑钱塘江海塘，疏浚西湖，兴修水利——今天杭州的城市格局，底子是那个时期打下的。',
          en: 'In 907 Qian Liu was enfeoffed as King of Wuyue, founding a kingdom with its capital at Hangzhou. While the Central Plains burned, Wuyue heard no drums of war for decades. The Qians walled the Qiantang tides, dredged West Lake, and built waterworks — the groundwork of Hangzhou’s cityscape was laid in those years.',
        },
        {
          zh: '"保境安民，善事中原"是钱镠定下的国策：守好自己的土地，对中原王朝始终称臣。这个选择让东南富庶之地躲过了五代十国的兵祸。',
          en: '“Guard the land, keep the people at peace, serve the Central Plain” was his state policy: hold your own ground, and always acknowledge the northern court. The choice spared the wealthy southeast the wars of the Five Dynasties.',
        },
      ],
    },
    {
      id: 'song',
      era: { zh: '北宋 · 太平兴国三年（978）', en: '978 · Northern Song' },
      title: { zh: '纳土归宋', en: 'The peaceful handover' },
      image: '/images/cover-scenic.png',
      paragraphs: [
        {
          zh: '978年，钱镠之孙钱俶遵从祖父遗训，将吴越国十三州一军、八十六县和平献予宋朝，史称"纳土归宋"。一国之地，未经一战，完成统一。',
          en: 'In 978 Qian Liu’s grandson Qian Chu, honouring his grandfather’s dying instruction, offered the kingdom — thirteen prefectures, eighty-six counties — to the Song without a fight. A whole realm, unified without a single battle.',
        },
        {
          zh: '《百家姓》以"赵钱孙李"开头，钱姓紧随国姓之后，正是宋人对吴越钱氏保境安民的敬意。',
          en: 'The classic Hundred Family Surnames opens “Zhao, Qian, Sun, Li” — Qian ranked second only to the imperial surname, the Song’s tribute to what Wuyue had spared its people.',
        },
      ],
    },
    {
      id: 'precept',
      era: { zh: '千年家训', en: 'A thousand-year precept' },
      title: { zh: '《钱氏家训》', en: 'The Qian family precept' },
      image: '/images/cover-culture.png',
      paragraphs: [
        {
          zh: '钱镠留下家训，核心一句是："利在一身勿谋也，利在天下者必谋之。"——只为一人之利的事不做，利在天下的事必须去做。',
          en: 'Qian Liu left a family precept whose heart is one line: “Seek nothing that profits only yourself; what profits all under heaven, you must do.”',
        },
        {
          zh: '千年之后，钱氏后裔中走出了钱学森、钱三强、钱钟书……一个家族的文化基因，比王朝长寿得多。临安的钱王陵与吴越国王陵考古遗址公园，今天仍在讲述这段历史。',
          en: 'A millennium on, Qian descendants include Qian Xuesen, Qian Sanqiang, Qian Zhongshu — a family’s culture outliving dynasties. The Qian Kings’ Mausoleum and the Wuyue royal tomb archaeological park in Lin’an still tell the story.',
        },
      ],
    },
    {
      id: 'name',
      era: { zh: '南宋 · 1138 — 当代 · 2017', en: '1138 — 2017' },
      title: { zh: '名字的流转', en: 'The travels of a name' },
      image: '/images/hero-lake.png',
      paragraphs: [
        {
          zh: '南宋定都杭州，升杭州为临安府——"临安"二字自此成为一个王朝都城的名字，在史书里代指那座"山外青山楼外楼"的城市。名字借出去了近八百年。',
          en: 'When the Southern Song made Hangzhou its capital, it raised the city to “Lin’an Prefecture” — and the two characters became the name of an imperial capital, standing in verse for that city of “hills beyond hills and towers beyond towers.” The name was away for nearly eight centuries.',
        },
        {
          zh: '1996年临安设市，2017年撤市设区，成为杭州市临安区。名字回家了。',
          en: 'In 1996 Lin’an became a city, and in 2017 a district of Hangzhou. The name has come home.',
        },
      ],
    },
  ] as TimelineEntry[],
  colophon: {
    zh: '武能安邦，文能传家，知进退，善始终——这是临安给历史的第一份答卷。',
    en: 'Force to secure a realm, letters to sustain a family, wisdom to know when to yield — Lin’an’s first answer to history.',
  } as Pair,
}
