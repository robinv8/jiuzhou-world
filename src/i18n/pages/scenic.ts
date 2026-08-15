import type { Pair } from '../content'

export interface Spot {
  id: string
  no: string
  name: Pair
  latin: string
  region: Pair
  image: string
  essence: Pair
  paragraphs: Pair[]
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
    zh: '这一卷收录八处去处。每处写成一篇小传：先说它是什么、为何值得知道，再写走进去会遇见什么。门票与路线会过时，山不会。时令与附注，收在每篇最末。',
    en: 'Eight places, each given a short biography: first what it is and why it matters, then what you meet when you walk in. Prices and routes change; mountains do not. Season and a brief note sit at the end of each piece.',
  } as Pair,
  tocLabel: { zh: '目录', en: 'Contents' } as Pair,
  spots: [
    {
      id: 'tianmu',
      no: '01',
      name: { zh: '天目山', en: 'Mount Tianmu' },
      latin: 'Mount Tianmu',
      region: { zh: '临安西北 · 天目山镇', en: 'Northwest Lin’an' },
      image: '/images/hero-tianmu.webp',
      essence: {
        zh: '世界生物圈保护区，以千年柳杉古树林与禅源寺闻名。"大树华盖闻九州"，说的就是这里。',
        en: 'A UNESCO Biosphere Reserve known for thousand-year-old cedar groves and Chanyuan Temple — the place behind the verse “a canopy of great trees, famed across the land.”',
      },
      paragraphs: [
        {
          zh: '天目分东西两山，中间隔着一条深谷。西天目以古树闻名，东天目以峰峦见长。山不极高，西天目主峰仙人顶约一千五百米，可树比山更有名。老林里有一株柳杉，胸径要五六人合抱，宋人叫它「千秋树」，今人唤它「大树王」。树比山里任何一座庙都老，也比庙更沉默。',
          en: 'Tianmu is two mountains, east and west, split by a deep valley. West Tianmu is known for its trees, East Tianmu for its ridges. The range is not especially high — Xianren Ding on the west side is about 1,500 metres — but the trees are more famous than the peaks. In the old forest stands a Chinese cedar so wide that five or six people cannot link arms around it. The Song called it the Thousand-Autumn Tree; today it is the King of Trees: older than any temple on the mountain, and more silent.',
        },
        {
          zh: '一九九六年，天目山被列入世界生物圈保护区。银杏、金钱松、天目铁木……许多植物以「天目」为种加词，因为这里是它们最早被科学记录的地方。天目铁木在野外只余数株，几乎是一棵树一个物种的孤本。走进这片林子，走的不是一条观景步道，是一部还活着的植物志。',
          en: 'In 1996 Tianmu was listed as a UNESCO Biosphere Reserve. Ginkgo, golden larch, the Tianmu ironwood — many plants carry “Tianmu” in their scientific names because this is where they were first recorded. Wild Tianmu ironwood survives as a handful of trees, almost a species reduced to a few individuals. To walk this forest is not to walk a viewing path; it is to walk a flora that is still alive.',
        },
        {
          zh: '山脚的禅源寺几经兴废。钟声一起，整片林海会安静一瞬。宋代以后，日本僧人来此参禅，把山中黑釉茶盏带回国，日语里的「天目」从此成了一类器物的名字。山把树、钟与一只碗，都写进了更远的地方。',
          en: 'Chanyuan Temple at the mountain’s foot has been ruined and rebuilt more than once. When its bell sounds, the forest seems to settle for a moment. After the Song, Japanese monks came here for Chan study and carried the mountain’s black-glazed tea bowls home; in Japanese, “tenmoku” became the name of a whole class of ware. The mountain wrote its trees, its bell, and a single bowl into places far from here.',
        },
      ],
      season: { zh: '四季皆宜，夏避暑，秋观叶', en: 'All seasons; summer shade, autumn colour' },
      note: { zh: '距杭州市区约九十公里，有东西天目两个景区', en: 'About 90 km from central Hangzhou; east and west scenic areas' },
    },
    {
      id: 'daming',
      no: '02',
      name: { zh: '大明山', en: 'Mount Daming' },
      latin: 'Mount Daming',
      region: { zh: '临安西部 · 清凉峰镇', en: 'Western Lin’an' },
      image: '/images/cover-mountains.webp',
      essence: {
        zh: '千米之上的高山台地，悬空栈道贴着花岗岩崖壁而行，春天杜鹃漫山，冬天是滑雪场。',
        en: 'A high plateau a thousand metres up, a plank walkway bolted to granite cliffs, azaleas in spring, a ski field in winter.',
      },
      paragraphs: [
        {
          zh: '大明山最意外的不是高度，是顶上那一块平原。爬过千米，眼前忽然展开草甸与花海，像山把一块平地偷偷藏在了云上。花岗岩崖壁近乎直立，一条栈道贴着石壁伸出，脚下是深谷。谷中的云不往天上走，常从谷底漫上来，把栈道变成一条走在云里的窄路。',
          en: 'Daming’s surprise is not its height but the plain on top. Past a thousand metres, meadows and flower fields suddenly open, as if the mountain had hidden a flatland above the clouds. Granite cliffs drop almost sheer; a plank walkway is bolted to the rock, a deep valley below. Cloud here does not rise toward the sky so much as well up from the valley floor, turning the walkway into a narrow path through mist.',
        },
        {
          zh: '山名来自一个不必尽信的传说：朱元璋曾在此屯兵，后来做了明朝开国皇帝，山便称大明。传说是后人加上的彩，可站在栈道上看云起云落，确实会生出一点读兵书的错觉——高台利于瞭望，也利于把人从日常里抽出来。',
          en: 'The name comes from a legend that need not be believed: that Zhu Yuanzhang once garrisoned troops here, and after he founded the Ming the mountain took the dynasty’s name. The story is later colour. Still, watching cloud turn over from the walkway, one briefly feels like a reader of the Art of War — a high terrace is good for looking out, and good for lifting a person out of ordinary time.',
        },
        {
          zh: '山有四时，且反差极大。暮春杜鹃从山脚烧到山顶，一层一层换颜色；盛夏是杭州人上山避暑的地方；入冬以后，南坡会开出江南少见的滑雪道。索道与步道并存：要快，坐缆车；要知道山有多陡，走路。',
          en: 'The mountain keeps four seasons, and they contradict one another. In late spring azaleas burn from the foot to the summit, changing colour with altitude; in high summer Hangzhou comes up for cool air; in winter the southern slope opens ski runs rare in the Jiangnan. Cable car and footpath both exist: take the car if you want speed; walk if you want to know how steep the mountain is.',
        },
      ],
      season: { zh: '春杜鹃、夏避暑、冬滑雪', en: 'Spring azaleas, summer cool, winter skiing' },
      note: { zh: '有索道与步道两种上山方式', en: 'Reachable by cable car or on foot' },
    },
    {
      id: 'qingshanhu',
      no: '03',
      name: { zh: '青山湖', en: 'Qingshan Lake' },
      latin: 'Qingshan Lake',
      region: { zh: '临安城东', en: 'East of Lin’an town' },
      image: '/images/hero-lake.webp',
      essence: {
        zh: '水库成湖，水杉成林。水上森林是江南少见的景致：树从水里长出来，倒影比树更安静。环湖绿道适合骑行。',
        en: 'A reservoir turned lake, metasequoia turned forest — trees rising straight from the water, reflections calmer than the trees. A greenway circles the shore for cycling.',
      },
      paragraphs: [
        {
          zh: '青山湖不是天生的湖。上世纪中叶，南苕溪在此被拦成水库，发电、灌溉、拦洪，湖是工程的副产品。后来城区东移，湖成了临安城边的一片水。远山还在，近处已经是马路、骑行道和周末的人。它是临安诸景里最靠近日常的一处：出城即是湖。',
          en: 'Qingshan Lake was not born a lake. In the mid-twentieth century the South Tiaoxi was dammed here for power, irrigation and flood control; the lake is a by-product of that work. As the town moved east, the water became the edge of Lin’an. The distant hills remain; the near shore is now road, cycle path and weekend crowds. Of all the places in this volume it is the closest to daily life: leave town, and you are at the lake.',
        },
        {
          zh: '湖东有一片水上森林。水杉是后来种下的，水位涨起来以后，树便站在了水里。深秋，羽状的叶子转成锈红与琥珀，树干一半在水上，倒影比树更整齐。风小时，湖面像一张摊开的宣纸，红树写在纸上，一笔也不抖。江南多湖，少有这种「树从水里长出来」的景象。',
          en: 'On the eastern shore stands a flooded forest. The dawn redwoods were planted later; when the water rose, the trees found themselves standing in the lake. In late autumn their feathery leaves turn rust and amber, trunks half above the water, reflections more orderly than the trees. On a still day the surface is like a sheet of xuan paper, the red trunks written on it without a tremor. Jiangnan has many lakes; few look like trees growing out of the water.',
        },
        {
          zh: '环湖绿道把水库的堤岸折成可以慢慢走完的一圈。骑车比开车更合适：湖在左边，山在远处，中间是一行水杉。地铁十六号线已经伸到临安城区，湖不再是专程前往的目的地，也可以是傍晚绕一圈再回家的地方。',
          en: 'A greenway folds the reservoir’s shore into a loop that can be finished slowly. A bicycle is better than a car: lake on the left, hills far off, a line of redwoods in between. Metro Line 16 now reaches Lin’an town, so the lake is no longer only a destination you set out for — it can also be a circuit you ride before going home.',
        },
      ],
      season: { zh: '深秋水杉转红时最佳', en: 'Best in late autumn when the redwoods turn' },
      note: { zh: '位于城区边缘，地铁十六号线可达临安城区', en: 'At the town’s edge; Metro Line 16 reaches Lin’an' },
    },
    {
      id: 'canyon',
      no: '04',
      name: { zh: '浙西大峡谷', en: 'Zhexi Grand Canyon' },
      latin: 'Zhexi Grand Canyon',
      region: { zh: '临安西部 · 龙岗镇', en: 'Western Lin’an' },
      image: '/images/cover-scenic.webp',
      essence: {
        zh: '峡谷沿溪而建，柘林瀑、剑门关一线串起深潭与绝壁。这里的绿是水的颜色，不是树的颜色。',
        en: 'A canyon built along a stream — Zhelin Falls and Jiange Pass stringing together deep pools and sheer walls. The green here belongs to the water, not the trees.',
      },
      paragraphs: [
        {
          zh: '浙西大峡谷不是一处「看完就走」的山口，而是一条沿溪展开的长卷。水从天目西脉下来，在龙岗一带切出深槽，潭、滩、瀑交替出现。谷不极宽，人几乎一直贴着水走。抬头是夹峙的岩壁，低头是自己的倒影——有时清楚，有时被泡沫打碎。',
          en: 'Zhexi Grand Canyon is not a pass you look at and leave; it is a long scroll unrolled along a stream. Water coming off the western Tianmu range cuts a deep trough near Longgang, pools, shallows and falls taking turns. The gorge is not wide; you walk almost always beside the water. Look up, and rock walls close in; look down, and you see your own reflection — sometimes whole, sometimes broken by foam.',
        },
        {
          zh: '柘林瀑从岩层上跌下来，水在空中被撕成白线，落到潭里又重新聚成深绿。再往里，剑门关把谷收成一道窄缝，人侧身而过，会听见水声忽然变响——不是水更大了，是空间变小了。一线串起的几处，名字像旧小说里的回目，走过去才知道它们都是同一条溪的脾气。',
          en: 'Zhelin Falls drops from a ledge of rock, the water torn into white threads in the air, then gathering again as dark jade in the pool. Further in, Jiange Pass pinches the gorge to a slit; as you turn sideways through it the water seems to grow louder — not because there is more of it, but because there is less room. The named spots read like chapter titles in an old novel; walk them and you find they are only moods of the same stream.',
        },
        {
          zh: '这里的绿要靠近了才认得。不是树冠那种漫反射的绿，是潭水把天光吞进去以后剩下的颜色，深、冷、近乎墨。夏季水势最盛，也最能看见峡谷是怎么被水写出来的。半日可以走完主要段落，一日则可以把脚步放慢到跟得上溪。',
          en: 'The green here has to be met at close range. It is not the scattered green of a canopy, but the colour left after a pool has swallowed the sky — deep, cold, nearly ink. In summer the water is fullest, and you see most clearly how the canyon was written by it. The main stretch can be walked in half a day; a full day lets your pace catch up with the stream.',
        },
      ],
      season: { zh: '夏季水势最盛', en: 'Fullest water in summer' },
      note: { zh: '适合半日至一日的徒步', en: 'A half-to-full-day walk' },
    },
    {
      id: 'taihuyuan',
      no: '05',
      name: { zh: '太湖源', en: 'Source of Taihu' },
      latin: 'Source of Taihu',
      region: { zh: '临安北部 · 白沙村', en: 'Northern Lin’an' },
      image: '/images/spot-taihuyuan.webp',
      essence: {
        zh: '太湖水最初的来处之一。山坞狭长，一路都是清潭与小瀑，走到尽头才意识到：浩渺太湖，始于这样一线细流。',
        en: 'One of Lake Tai’s first sources. The ravine is narrow, strung with clear pools and small falls — only at its end do you grasp that the vast lake begins as a thread of water like this.',
      },
      paragraphs: [
        {
          zh: '太湖在下游是三万六千顷的水，在临安白沙村却只是一道山坞里的细流。东苕溪的上源从这里出发，出山、过余杭、入湖。把「太湖源」三个字立在村口，不是夸张，是把一条很长的水文句子，收成可以走完的一截。',
          en: 'Downstream, Lake Tai is a vast sheet of water; at Baisha village in Lin’an it is only a thread in a ravine. The East Tiaoxi’s headwaters start here, leave the mountains, pass Yuhang, and enter the lake. To set the three characters “Source of Taihu” at the village gate is not a boast — it is to fold a long hydrological sentence into a stretch you can walk.',
        },
        {
          zh: '坞很窄，两边是竹与杂木，路几乎不爬高，只是跟着水走。清潭一个接一个，浅处见沙，深处见绿。小瀑不够壮观，却足够把空气洗凉。雨后水色最好：山里新下的水还没有来得及浑，石头上的苔也还没被踩干。',
          en: 'The ravine is narrow, bamboo and mixed woods on either side. The path hardly climbs; it only follows the water. Clear pools succeed one another — sand in the shallows, green in the deeps. The falls are not grand, but they are enough to cool the air. The colour is best after rain: the new water has not yet clouded, and the moss on the stones has not yet been walked dry.',
        },
        {
          zh: '上世纪九十年代，白沙村是江南最早做乡村旅游的村子之一。那时的想法很朴素：山里的水本身就可以请客。步道至今平缓，老少都能走到深处。走完以后，对「源」字会有一点新的敬意——大湖不是无来处的，它有一条可以被记住的出生地。',
          en: 'In the 1990s Baisha was among the first Jiangnan villages to try rural tourism. The idea was simple: the mountain water itself could receive guests. The path is still gentle; the old and the young can walk to the far end. Afterward the word “source” carries a little more weight — a great lake is not without origin; it has a birthplace that can be remembered.',
        },
      ],
      season: { zh: '夏季清凉，雨后水色最佳', en: 'Coolest in summer; clearest after rain' },
      note: { zh: '峡谷步道平缓，老少咸宜', en: 'Gentle paths, easy for all ages' },
    },
    {
      id: 'zhinan',
      no: '06',
      name: { zh: '指南村', en: 'Zhinan Village' },
      latin: 'Zhinan Village',
      region: { zh: '临安东部 · 太湖源镇', en: 'Eastern Lin’an' },
      image: '/images/hero-village.webp',
      essence: {
        zh: '海拔近六百米的古村落，三百余株古树环村而立。深秋时节，银杏黄、枫叶红、梯田金，被摄影爱好者称为华东最美的秋色村落之一。',
        en: 'An ancient village at nearly six hundred metres, ringed by more than three hundred old trees. In late autumn — ginkgo gold, maple red, terraces amber — photographers call it one of East China’s most beautiful autumn villages.',
      },
      paragraphs: [
        {
          zh: '指南村贴在太湖源镇的山腰上，海拔近六百米。村子不大，却被三百余株古树围住：香榧、枫香、银杏，树龄动辄数百年。树比屋老，屋依着树长。从远处看，先看见树冠，再看见屋脊从叶子里露出来。',
          en: 'Zhinan sits on a hillside in Taihuyuan town, nearly six hundred metres up. The village is small, but more than three hundred old trees hold it: torreya, sweetgum, ginkgo, many of them centuries old. The trees are older than the houses; the houses grew up against the trees. From a distance you see the canopy first, then roof ridges showing through the leaves.',
        },
        {
          zh: '十一月中下旬是它一年中最被看见的日子。银杏把巷子染成黄，枫叶在坡上烧红，梯田还留着收割后的金。三种颜色叠在同一块山坡上，像有人把一幅没骨画摊在田里。摄影的人来得密，村里的人仍按节气做事——秋色是他们的日常，只是恰好好看。',
          en: 'Mid-to-late November is the week the village is most seen. Ginkgo turns the lanes yellow, maple burns on the slope, and the terraces keep the gold of a finished harvest. Three colours stacked on one hillside look like a boneless painting laid out in the fields. Photographers come in numbers; the villagers still work by the solar terms. Autumn colour is their ordinary weather — it only happens to be beautiful.',
        },
        {
          zh: '村中有民宿与农家乐，烟火气比景区更近。石阶、水渠、晒场，都还在被使用，不是摆出来的布景。来的人若只为拍一张「华东最美秋色」，会错过更安静的部分：清晨雾还没散尽时，树、屋与田在同一层白里，分不清谁先醒来。',
          en: 'There are guesthouses and farm kitchens; the smoke of cooking is closer than in a ticketed park. Stone steps, irrigation channels, the threshing ground — all still in use, not set out as scenery. Visitors who come only for a picture of “East China’s finest autumn” miss the quieter part: at dawn, before the mist lifts, trees, houses and fields sit in the same white, and it is hard to tell which woke first.',
        },
      ],
      season: { zh: '十一月中下旬秋色最浓', en: 'Peak colour in mid-to-late November' },
      note: { zh: '村中有民宿与农家乐', en: 'Guesthouses and farm kitchens in the village' },
    },
    {
      id: 'heqiao',
      no: '07',
      name: { zh: '河桥古镇', en: 'Heqiao Old Town' },
      latin: 'Heqiao Old Town',
      region: { zh: '临安西南 · 昌南溪畔', en: 'Southwest Lin’an' },
      image: '/images/spot-heqiao.webp',
      essence: {
        zh: '因水而兴的浙西古镇。昌南溪在此拐了一个弯，老街上还留着从前水运码头的格局——前店后河，下楼即是船埠。',
        en: 'A river-born old town of western Zhejiang. The Changnan stream bends here, and the old street still keeps its wharf-town layout — shops in front, river behind, steps down to the boats.',
      },
      paragraphs: [
        {
          zh: '河桥因桥得名，因水得命。昌南溪在镇前拐了一个弯，水运时代，粮、木、山货从山里下来，在此换船、歇脚、成交。镇不是被设计成「古镇」的，是被船一趟一趟走出来的。老街沿河，短而密，铺面不大，却能看见从前码头的骨架。',
          en: 'Heqiao takes its name from a bridge and its life from the water. The Changnan stream bends in front of the town. In the age of river transport, grain, timber and mountain goods came down from the hills to change boats, rest, and be sold. The town was not designed as an “old town”; it was walked into being by boats. The old street follows the river, short and dense, the shops small, the skeleton of the old wharf still readable.',
        },
        {
          zh: '「前店后河」不是修辞。许多屋子出门是街，下阶是埠，后门对着水。木板门、马头墙、被踩出凹槽的石阶，都还在被雨淋着。昌南溪比浙西峡谷的水缓，缓到可以照见对岸的白墙。水出了山，脾气就变了：不再切割岩石，只负责把日子送走、再送回来。',
          en: '“Shop in front, river behind” is not a figure of speech. Many houses open onto the street, drop to a landing, and face the water at the back. Wooden doors, horse-head walls, stone steps worn into grooves — all still take the rain. The Changnan is slower than the water of Zhexi Canyon, slow enough to hold the white walls on the far bank. Once water leaves the mountain its temper changes: it no longer cuts rock; it only carries the day away and brings it back.',
        },
        {
          zh: '古镇免费开放，没有被修成一条只卖特产的走廊。晨昏最好：早上是淘米、开铺的声音，黄昏是溪面上最后一层光。适合把脚步放慢到无事可做——在河桥，无事可做，才是它原来的节奏。',
          en: 'The town is open without a ticket, and has not been rebuilt into a corridor of souvenir shops. Dawn and dusk are best: morning is the sound of rice being rinsed and shutters opening; evening is the last skin of light on the stream. It is a place for walking slowly enough to have nothing to do — in Heqiao, having nothing to do is the original pace.',
        },
      ],
      season: { zh: '春秋晨昏最有味道', en: 'Most evocative at dawn and dusk in spring and autumn' },
      note: { zh: '古镇免费开放，适合慢逛', en: 'Open freely; made for slow wandering' },
    },
    {
      id: 'qingliang',
      no: '08',
      name: { zh: '清凉峰', en: 'Qingliang Peak' },
      latin: 'Qingliang Peak',
      region: { zh: '临安西部 · 浙皖交界', en: 'Zhejiang–Anhui border' },
      image: '/images/spot-qingliang.webp',
      essence: {
        zh: '浙西第一高峰，国家级自然保护区。没有索道，只有土路与云海。这里是野生梅花鹿在中国东南最后的大片家园。',
        en: 'The highest peak in western Zhejiang, a national nature reserve. No cable cars — dirt paths and seas of cloud. One of the last large homes of wild sika deer in southeast China.',
      },
      paragraphs: [
        {
          zh: '清凉峰海拔一千七百八十七点四米，是浙西的屋脊，也是浙江与安徽在山脊上的一条界。山体进入国家级自然保护区，核心区不是为游览准备的。没有索道，没有沿途商铺，上山是土路、矮松，以及随着高度不断改样的杜鹃。',
          en: 'Qingliang Peak stands at 1,787.4 metres — the roof of western Zhejiang, and a ridge that is also the line between Zhejiang and Anhui. The massif is a national nature reserve; its core was not made for sightseeing. There is no cable car, no string of shops: the way up is dirt path, dwarf pine, and azaleas that change their habit with every gain in height.',
        },
        {
          zh: '登山的人常在夜里出发，为的是日出时站到云海上面。云从谷里涨起来，把次峰都盖住，只留几处岛一样的山顶。这种景象不是每天都有，秋天的概率最高。即便没有云海，山顶的风也足够把山下的名字吹远——到了这个高度，临安、绩溪，都成了同一片褶皱里的地名。',
          en: 'Climbers often set out at night, to stand above a sea of cloud at sunrise. The cloud wells out of the valleys, covering the lesser peaks, leaving only a few summits like islands. The sight is not daily; autumn offers the best odds. Even without cloud, the wind on top is enough to blow the names below far away — at this height Lin’an and Jixi are only place-names in the same fold of land.',
        },
        {
          zh: '山里还住着野生梅花鹿。清凉峰是它们在中国东南最后的大片栖息地之一。人不是这片山的主角，鹿、松与云才是。保护区有准入，登山通常需要一整天。来的人若只为「登顶打卡」，会错过山真正要保护的东西：一种不被打扰的高度。',
          en: 'Wild sika deer still live here. Qingliang is one of their last large habitats in southeast China. People are not the principals of this mountain — the deer, the pines and the cloud are. Entry is managed; a climb usually takes a full day. Those who come only to stand on the summit and leave will miss what the mountain is actually protecting: a height that asks not to be disturbed.',
        },
      ],
      season: { zh: '秋季登高，云海概率最高', en: 'Autumn climbs; best odds of cloud seas' },
      note: { zh: '登山需一日，保护区有准入管理', en: 'A full-day climb; entry managed as a reserve' },
    },
  ] as Spot[],
  footnote: {
    zh: '以上信息会随季节与管理方调整而变化，出行前请以景区官方公告为准。',
    en: 'Details shift with seasons and management decisions; check official notices before travelling.',
  } as Pair,
}
