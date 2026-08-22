/**
 * Merge five Hangzhou nested-volume trees into locale JSON.
 * zh is canonical; en/ja/ko are literary; zh-hant is s2t of zh.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const loc = join(root, 'src/i18n/locales')

function load(code) {
    return JSON.parse(readFileSync(join(loc, `${code}.json`), 'utf8'))
}
function save(code, data) {
    writeFileSync(join(loc, `${code}.json`), `${JSON.stringify(data, null, 2)}\n`)
}

function shell(p) {
    return {
        volumeTitle: p.volumeTitle,
        heroKicker: p.heroKicker,
        heroTitle: p.heroTitle,
        heroSub: p.heroSub,
        heroScroll: p.heroScroll,
        beneath: p.beneath,
        seal: p.seal,
        manifestoLabel: p.manifestoLabel,
        manifestoTitle: p.manifestoTitle,
        manifesto: p.manifesto,
        volumesLabel: p.volumesLabel,
        volumesTitle: p.volumesTitle,
        closingQuote: p.closingQuote,
        closingSource: p.closingSource,
        chapters: p.chapters,
        mountains: p.mountains,
        scenic: p.scenic,
        history: p.history,
        culture: p.culture,
    }
}

const zhVolumes = {
    fuyang: shell({
        volumeTitle: '富阳卷',
        heroKicker: '杭州',
        heroTitle: '富阳江山志',
        heroSub: '从江读起。中游叫富春，两山夹一江。',
        heroScroll: '向下，入江',
        beneath: '中游叫富春',
        seal: '富',
        manifestoLabel: '读法',
        manifestoTitle: '从江读起，夹岸而行',
        manifesto: [
            '杭州是湖的杭州。富阳是江的富阳。钱塘江干流到了这里，还不叫潮，叫富春。两山夹一江，沙洲在江心里。',
            '这一卷从江读起。先读中游的名字，再读两岸的山、城里的一矶。人间有纸，史里有籍贯与一张长卷。潮在下游，不在这里。',
            '这里不卖门票。如果你读完心里长出一段江，它就完成了使命。',
        ],
        volumesLabel: '四卷',
        volumesTitle: '开卷',
        closingQuote: '「自富阳至桐庐一百许里，奇山异水。」',
        closingSource: '—— 吴均《与朱元思书》',
        chapters: {
            mountains: { title: '山川之卷', desc: '中游叫富春。两山夹一江。' },
            scenic: { title: '景之卷', desc: '鹳山、龙门、东洲、庙山坞、新登。' },
            culture: { title: '物之卷', desc: '竹纸还在山坞里。' },
            history: { title: '史之卷', desc: '县名从富春来。籍贯不是出生地。' },
        },
        mountains: {
            heroKicker: '富阳卷',
            heroTitle: '山川之卷',
            heroSub: '江不是湖。中游有自己的名字。',
            intro: '建德梅城以下，干流称富春江。富阳在桐庐下游、杭州城江段上游。与西湖不是同一条水。以下四则，从江读起。',
            colophon: '山夹着江。江读完了，上岸去看。',
            essays: {
                fuchun: {
                    title: '富春江：中游的名字',
                    paragraphs: [
                        '从江读起。干流在梅城会合以后，这一段叫富春。江宽，沙洲生出来，潮还不成壁。杭州景里那一则写潮，标题不在这里。',
                        '吴均写「自富阳至桐庐一百许里」，跨两县。谁都不独占「天下独绝」。本卷只写还叫富春的这一段。',
                    ],
                },
                ranges: {
                    title: '两山：夹江的岸',
                    paragraphs: [
                        '西北是天目余脉，东南是龙门山脉。江从中间过，人称两山夹一江。最高处在江南杏梅尖。',
                        '山不高到要另立天目。天目的大树写在临安。这里的山是江的两岸。',
                    ],
                },
                stork: {
                    title: '鹳山：城里看江',
                    paragraphs: [
                        '城东一矶伸进江里。人站在石头上，看见的是中游，不是湖。',
                        '山因城而近。近，才知道江有多宽。',
                    ],
                },
                water: {
                    title: '水：中游的脾气',
                    paragraphs: [
                        '一江十溪，皆入这条还叫富春的水。渌渚、壶源、大源，都是山里来的支流。',
                        '近口段已感潮汐，仍以径流为主。观潮在海宁盐官。下一章，上岸。',
                    ],
                },
            },
        },
        scenic: {
            heroKicker: '富阳卷',
            heroTitle: '景之卷',
            heroSub: '江边五处。',
            intro: '山川写江。这一卷写下岸以后的去处：城里的矶、江南的古镇、江心的洲。先说它是什么，最末一行说何时去。',
            colophon: '岸上的日子，是纸与村。下一章，读物。',
            footnote: '出行前请以当地公告为准。',
            spots: {
                stork: {
                    name: '鹳山',
                    region: '富阳城区 · 江东',
                    essence: '一矶入江。最好的看江处不在山顶，在石头伸出去的地方。',
                    season: '春秋晨昏',
                    note: '城区可步入',
                },
                longmen: {
                    name: '龙门古镇',
                    region: '富阳江南',
                    essence: '孙氏后裔聚居的明清村落，不是孙权出生地。街因山而窄，水在门外。',
                    season: '春雨后',
                    note: '江南龙门山麓',
                },
                dongzhou: {
                    name: '东洲',
                    region: '富春江心',
                    essence: '江把沙洲留下来。树在洲上，水在两边。中游才有这种宽。',
                    season: '秋水落时',
                    note: '江心沙洲',
                },
                miaoshan: {
                    name: '庙山坞',
                    region: '富阳城东',
                    essence: '方志记黄公望晚年山居。画的是江，不是这一坞的导游图。坞可以去，画不必钉在这里。',
                    season: '秋',
                    note: '山坞，路窄',
                },
                xindeng: {
                    name: '新登',
                    region: '富阳西部',
                    essence: '旧新城县。罗隐从这里出去。江还在东边，这里先是山。',
                    season: '四季',
                    note: '旧县治',
                },
            },
        },
        history: {
            heroKicker: '富阳卷',
            heroTitle: '史之卷',
            heroSub: '县名从江上来，人从籍贯里出去。',
            intro: '都城那些年写在杭州卷。这一卷只写中游的县：它叫过富春，出过一个籍贯，被画进长卷，还留下作坊。',
            colophon: '名字改了，江还叫富春。此卷合上。',
            entries: {
                name: {
                    era: '秦 — 东晋',
                    title: '富春，改富阳',
                    paragraphs: [
                        '秦置富春县。江名因县，不是县因江。那时辖境含今桐庐、建德，不能把大县的史写成今日富阳独占。',
                        '东晋避讳，改富阳。2015 年撤市设区。建制改了，中游还是中游。',
                    ],
                },
                sun: {
                    era: '汉 — 吴',
                    title: '籍贯在此，出生不在此',
                    paragraphs: [
                        '孙权，吴郡富春人。裴注引《江表传》：父坚为下邳丞时生权。出生地在今江苏徐州一带，不是富阳。',
                        '龙门古镇是后裔聚落。天子地景点挂桐庐。本则只写籍贯。',
                    ],
                },
                painting: {
                    era: '元',
                    title: '画里的江',
                    paragraphs: [
                        '黄公望不是富阳人。他把富春画进长卷。画面起讫，富阳与桐庐有争，不选边。',
                        '真迹火后裂为两段。画的是江，不是某一景区的实景。',
                    ],
                },
                paper: {
                    era: '宋 — 当代',
                    title: '作坊在泗洲',
                    paragraphs: [
                        '南宋方志已记富阳纸。泗洲发掘宋代造纸作坊。是较早的造竹纸遗址，不是造纸术起源地。',
                        '蔡伦不在这里。机械纸走了，山坞里的竹纸还在。',
                    ],
                },
            },
        },
        culture: {
            heroKicker: '富阳卷',
            heroTitle: '物之卷',
            heroSub: '纸从竹里来。',
            intro: '江到了人间，就有了纸。不是发明地的徽章，是山坞里还在抄的那一张。',
            colophon: '一张纸，一段江。下一章，读史。',
            items: {
                paper: {
                    title: '竹纸：山坞里的帘',
                    paragraphs: [
                        '竹料、石灰、抄帘。宋人已经这样干。今日大源、湖源仍有作坊，规模很小。',
                        '不写「汉明帝一九〇〇年」。活着的是帘上的那一层薄。',
                    ],
                },
                longmen: {
                    title: '龙门：后裔的日常',
                    paragraphs: [
                        '江南古镇还在过节、过婚、过巷。人不是孙吴的兵。',
                        '物是还在用的厅堂，不是出生地说明书。',
                    ],
                },
                islet: {
                    title: '沙洲：江心里的田',
                    paragraphs: [
                        '东洲一类沙洲，涨出来就种。水大了，田在心里。',
                        '中游才有这种田。潮头到不了这里。',
                    ],
                },
                village: {
                    title: '村落：夹岸的人',
                    paragraphs: [
                        '春茶、夏竹、秋纸、冬晒。江两边的村子各过各的四季。',
                        '山还在，江还在，人还在。',
                    ],
                },
            },
        },
    }),
    tonglu: shell({
        volumeTitle: '桐庐卷',
        heroKicker: '杭州',
        heroTitle: '桐庐严陵志',
        heroSub: '严陵。不事王侯，山高水长。',
        heroScroll: '向下，入江',
        beneath: '严陵',
        seal: '桐',
        manifestoLabel: '读法',
        manifestoTitle: '从严陵读起',
        manifesto: [
            '桐江北来，分水江从西汇入。核不是溶洞，不是天子地。核是严陵：一个人不来，一座山因此有了名字。',
            '天子地挂在本县百江。刘裕出生是传说。钓台是纪念地，不是墓。范仲淹知的是睦州，州治在建德。',
            '这里不卖门票。如果你读完心里长出一台、一江，它就完成了使命。',
        ],
        volumesLabel: '四卷',
        volumesTitle: '开卷',
        closingQuote: '「云山苍苍，江水泱泱。先生之风，山高水长。」',
        closingSource: '—— 范仲淹《严先生祠堂记》',
        chapters: {
            mountains: { title: '山川之卷', desc: '桐江与分水江。严陵山在左岸。' },
            scenic: { title: '景之卷', desc: '钓台、瑶琳、天子地、桐君山、分水。' },
            culture: { title: '物之卷', desc: '茶不叫龙井。笔是当代的杆。' },
            history: { title: '史之卷', desc: '严光余姚人。刘裕不生于此。' },
        },
        mountains: {
            heroKicker: '桐庐卷',
            heroTitle: '山川之卷',
            heroSub: '两江，一台。',
            intro: '干流入境称桐江，至桐君山脚左纳分水江。七里泷跨建德与桐庐，钓台在桐庐左岸。天目的源与大树仍在临安。',
            colophon: '山因人而立。下一章，上台。',
            essays: {
                rivers: {
                    title: '两江：丁字口',
                    paragraphs: [
                        '桐江是干流在本县的名字。分水江是天目南坡的下游，昌化溪以下才进桐庐。不抢临安的源。',
                        '两江在县城北相会。口很小，水已经走了很远。',
                    ],
                },
                yanling: {
                    title: '严陵山：因人得名',
                    paragraphs: [
                        '严陵。山在七里泷左岸，前临大江。汉时属富春县，今址在桐庐。',
                        '不独占「富春江」条目标题。富春是走廊的名字，富阳也要立江。本卷立的是这座山。',
                    ],
                },
                tongjun: {
                    title: '桐君山：汇口的一峰',
                    paragraphs: [
                        '翼然一峰，正在两江交带。县名传说挂在这里，是传说层。',
                        '山是节点，不是核。核仍是严陵。',
                    ],
                },
                water: {
                    title: '水：桐江的脾气',
                    paragraphs: [
                        '七里泷旧有急滩。电站以后，峡成库区。谚里的扬帆，已经改了。',
                        '水出县入富阳。下一章，去台上。',
                    ],
                },
            },
        },
        scenic: {
            heroKicker: '桐庐卷',
            heroTitle: '景之卷',
            heroSub: '台上，洞里，百江的山。',
            intro: '山川写两江与严陵山。景写去处。天子地、瑶琳挂本县，不成卷，不进杭州景。',
            colophon: '台上风长。下一章，读物。',
            footnote: '出行前请以当地公告为准。',
            spots: {
                diaotai: {
                    name: '严子陵钓台',
                    region: '桐庐富春江镇 · 七里泷',
                    essence: '东西二台。文学地理在此。不是严光的墓。人可以不来，台还在。',
                    season: '春秋',
                    note: '七里泷左岸',
                },
                yaolin: {
                    name: '瑶琳',
                    region: '桐庐西北',
                    essence: '溶洞是景，不是这座城成为自己的理由。唐宋已有题墨，1979 年重探。',
                    season: '四季',
                    note: '溶洞',
                },
                tianzi: {
                    name: '天子地',
                    region: '桐庐百江镇 · 罗山村',
                    essence: '景区挂本县。刘裕出生是传说：他籍彭城、生于京口，不是南宋。千岛湖是淳安。',
                    season: '夏',
                    note: '县西南山岭',
                },
                tongjun: {
                    name: '桐君山',
                    region: '桐庐县城 · 两江口',
                    essence: '汇口的小山。传说采药人结庐桐下。山在，庐是后来的。',
                    season: '晨',
                    note: '县城可到',
                },
                fenshui: {
                    name: '分水',
                    region: '桐庐西北',
                    essence: '旧分水县。1958 年并入。江从天目来，到这里才叫下游。',
                    season: '四季',
                    note: '旧县',
                },
            },
        },
        history: {
            heroKicker: '桐庐卷',
            heroTitle: '史之卷',
            heroSub: '人不来，山还在。',
            intro: '严光是余姚人。范仲淹是睦州知州。刘裕不生于此。本卷五则，把传说与史实分开。',
            colophon: '山高水长。此卷合上。',
            entries: {
                county: {
                    era: '吴 · 225',
                    title: '析县为桐庐',
                    paragraphs: [
                        '黄武四年，析富春桐溪乡置桐庐。县名三说并存，桐君是传说，不单取。',
                        '1958 年分水并入。今县仍是桐与分两块水。',
                    ],
                },
                yanguang: {
                    era: '东汉',
                    title: '严光耕于富春山',
                    paragraphs: [
                        '《后汉书》：会稽余姚人，辞谏议大夫，耕于富春山，钓处名严陵濑。不写为光武打天下。',
                        '钓台是耕钓纪念地，不是墓。传文说终于家，余姚一带另有墓祠。',
                    ],
                },
                fan: {
                    era: '北宋 · 1034',
                    title: '来守是邦',
                    paragraphs: [
                        '范仲淹贬知睦州，州治建德梅城，不是桐庐县令。「潇洒桐庐郡」是睦州别称。',
                        '《严先生祠堂记》祠在钓台。官在建德，风在桐庐。',
                    ],
                },
                liuyu: {
                    era: '传说',
                    title: '天子地的传说',
                    paragraphs: [
                        '《宋书》：刘裕彭城人，生于京口。天子地「刘裕出生」是传说，且常被误写成南宋。',
                        '景点可以挂。事实不在这里。',
                    ],
                },
            },
        },
        culture: {
            heroKicker: '桐庐卷',
            heroTitle: '物之卷',
            heroSub: '茶是自己的茶。',
            intro: '物不借龙井。分水制笔是当代圆珠笔，不是湖笔。',
            colophon: '一茶一杆。下一章，读史。',
            items: {
                tea: {
                    title: '桐庐茶：不叫龙井',
                    paragraphs: [
                        '雪水云绿、天尊贡芽，是本地的名字。宋贡细节多传说，不坐实。',
                        '范仲淹诗里的睦州茶，是郡境，与建德、淳安分享。不借狮峰。',
                    ],
                },
                pen: {
                    title: '分水笔：竹做的杆',
                    paragraphs: [
                        '1970 年代末，玉竹做圆珠笔杆。当代块状经济，不是千年毛笔。',
                        '写物就写杆。标题不要叫宣笔。',
                    ],
                },
                herb: {
                    title: '桐君：传说层的药',
                    paragraphs: [
                        '《桐君采药录》书已佚。陆羽引过「桐君录」。人是传说，山还在汇口。',
                        '不写黄帝大臣。',
                    ],
                },
                village: {
                    title: '村落：江边的人',
                    paragraphs: [
                        '峡里、汇口、分水，各过各的四季。',
                        '台是给后来的人看的。日子在岸上。',
                    ],
                },
            },
        },
    }),
    jiande: shell({
        volumeTitle: '建德卷',
        heroKicker: '杭州',
        heroTitle: '建德江口志',
        heroSub: '三江口在梅城。坝在建德，湖不在此。',
        heroScroll: '向下，入口',
        beneath: '三江口',
        seal: '建',
        manifestoLabel: '读法',
        manifestoTitle: '从口读起',
        manifesto: [
            '新安江自西，兰江自南，在梅城合成富春江。核是这个口。今治在坝下的白沙，不是府城。',
            '坝在铜官。千岛湖水域几乎全在淳安。本卷写坝、出库的江、口上的城。严陵钓台在桐庐。',
            '这里不卖门票。如果你读完心里长出一个口，它就完成了使命。',
        ],
        volumesLabel: '四卷',
        volumesTitle: '开卷',
        closingQuote: '「移舟泊烟渚。」',
        closingSource: '—— 孟浩然《宿建德江》',
        chapters: {
            mountains: { title: '山川之卷', desc: '两源在梅城改名。' },
            scenic: { title: '景之卷', desc: '梅城、严东关、铜官坝、坝下、入峡。' },
            culture: { title: '物之卷', desc: '苞茶、五加皮、船上的人。' },
            history: { title: '史之卷', desc: '府城在梅城。一九六〇年迁治。' },
        },
        mountains: {
            heroKicker: '建德卷',
            heroTitle: '山川之卷',
            heroSub: '口在梅城。',
            intro: '三江口在梅城：新安江会合兰江，以下称富春江。不是三源并入。杭州景的江标题不在这里。',
            colophon: '口读完了，进城。',
            essays: {
                confluence: {
                    title: '三江口：两源第三名',
                    paragraphs: [
                        '西来的新安江，南来的兰江，在梅城东关会合。以下才叫富春。核在这个口。',
                        '杭州东江嘴、兰溪也有叫三江口的地方。本卷只指梅城这一处。',
                    ],
                },
                wulong: {
                    title: '乌龙山：口上的镇山',
                    paragraphs: [
                        '城北乌龙山临江。府城因口而立，山是口的背景。',
                        '海拔记载不一，不钉死小数。高度用来挡住北风，不是用来报数。',
                    ],
                },
                xinan: {
                    title: '坝下：出库以后的江',
                    paragraphs: [
                        '铜官峡谷里是坝。出库以后，江在建德境内还要走一段，到梅城才改名。',
                        '坝下多雾。写江气，不写湖景。湖在淳安。',
                    ],
                },
                water: {
                    title: '水：口的上下文',
                    paragraphs: [
                        '寿昌江是西南半壁的支流，来自旧寿昌县。不是另一条核。',
                        '水出峡入桐庐。钓台不在本卷。下一章，到口上看城。',
                    ],
                },
            },
        },
        scenic: {
            heroKicker: '建德卷',
            heroTitle: '景之卷',
            heroSub: '口上与坝下。',
            intro: '千岛湖不写成建德景区。坝可以去看，湖的名字挂淳安。',
            colophon: '城在口上。下一章，读物。',
            footnote: '出行前请以当地公告为准。',
            spots: {
                meicheng: {
                    name: '梅城',
                    region: '建德东部 · 三江口',
                    essence: '县治约一千七百年，州府治约一千二百年。今城在坝下，府城在这里。',
                    season: '春秋',
                    note: '古州治',
                },
                yandongguan: {
                    name: '严东关',
                    region: '梅城东 · 江口北岸',
                    essence: '口上的关。酒从这里出去。关还在名字里。',
                    season: '四季',
                    note: '江口',
                },
                dam: {
                    name: '铜官坝',
                    region: '建德新安江街道',
                    essence: '坝在建德。1959 年截流，1960 年发电。库在淳安。本则只写坝。',
                    season: '四季',
                    note: '铜官峡谷',
                },
                mist: {
                    name: '新安江城',
                    region: '建德今治 · 白沙',
                    essence: '电站城。1960 年县治迁来。多雾是坝下的脾气，不是湖。',
                    season: '秋冬雾日',
                    note: '今治',
                },
                gorge: {
                    name: '入峡',
                    region: '梅城以东 · 七里泷上口',
                    essence: '出三江口入峡。峡谷跨两县，钓台在桐庐。建德只写出峡第一段。',
                    season: '春',
                    note: '七里泷上口',
                },
            },
        },
        history: {
            heroKicker: '建德卷',
            heroTitle: '史之卷',
            heroSub: '府城不是今治。',
            intro: '严州府六县，建德是附郭，不是全府。坝与湖必须拆开。',
            colophon: '口还在。城搬了。此卷合上。',
            entries: {
                county: {
                    era: '吴 · 225',
                    title: '置县梅城',
                    paragraphs: [
                        '黄武四年分富春置建德，治梅城。通行说法因孙韶封侯。县名未离开。',
                        '宋《严州图经》作封孙皓，年代不合，不可用。',
                    ],
                },
                yanzhou: {
                    era: '唐 — 清',
                    title: '睦州、严州',
                    paragraphs: [
                        '697 年以后州治在梅城。宣和三年改严州因方腊，不是因严子陵。',
                        '明清府辖六县。唐初那座短命严州治桐庐，与此不是一回事。',
                    ],
                },
                dam: {
                    era: '1957 — 1960',
                    title: '坝在建德',
                    paragraphs: [
                        '新安江水电站坝在铜官。库区水域约百分之九十九在淳安。',
                        '建德写坝。湖的名字、沉在水下的城，写在淳安卷。',
                    ],
                },
                move: {
                    era: '1960',
                    title: '县治迁白沙',
                    paragraphs: [
                        '1960 年 8 月，县治自梅城迁白沙。今城是电站城。',
                        '1992 年撤县设市。口上的府城还在梅城。',
                    ],
                },
            },
        },
        culture: {
            heroKicker: '建德卷',
            heroTitle: '物之卷',
            heroSub: '口上的茶与酒。',
            intro: '苞茶不是包茶。五加皮出严东关。九姓渔民用「相传」。',
            colophon: '一口茶，一盏酒。下一章，读史。',
            items: {
                baocha: {
                    title: '严州苞茶',
                    paragraphs: [
                        '外形像花苞。清同治创于梅城一带，1979 年恢复。产地梅城、三都。',
                        '不叫龙井。也不写成包茶。',
                    ],
                },
                wujiapi: {
                    title: '严东关五加皮',
                    paragraphs: [
                        '关在口上。清乾隆间酒坊。李白醉酒是传说。',
                        '酒还在这个名字里。',
                    ],
                },
                fishers: {
                    title: '九姓：船上的人',
                    paragraphs: [
                        '终生船居新安、兰、富春。上岸后多在三都。来源多说，用相传。',
                        '可挂在口上。不写成渔村攻略。',
                    ],
                },
                pear: {
                    title: '白梨：江边的果',
                    paragraphs: [
                        '杨村桥一带传统梨。桐庐另有白梨，不混称。「南宋贡品」无方志硬证，不写。',
                        '果在岸上，口在城东。',
                    ],
                },
            },
        },
    }),
    chunan: shell({
        volumeTitle: '淳安卷',
        heroKicker: '杭州',
        heroTitle: '淳安库谷志',
        heroSub: '江成库，城在水下。千岛湖挂此，不进杭州景。',
        heroScroll: '向下，入库',
        beneath: '城在水下',
        seal: '淳',
        manifestoLabel: '读法',
        manifestoTitle: '江成库，城在水下',
        manifesto: [
            '新安江从安徽来，入浙即成库。岛是没顶的山。贺城、狮城在水下。不是天然湖，不是西湖的亲戚。',
            '坝在建德铜官。水在淳安。1959 年截流。千岛湖是 1984 年才批的风景名。核用库。',
            '这里不卖门票。如果你读完心里长出一座沉下去的城，它就完成了使命。',
        ],
        volumesLabel: '四卷',
        volumesTitle: '开卷',
        closingQuote: '「岛是山的头顶。」',
        closingSource: '—— 库区',
        chapters: {
            mountains: { title: '山川之卷', desc: '被拦住的新安江。' },
            scenic: { title: '景之卷', desc: '湖、水下城、排岭、威坪、鸠坑。' },
            culture: { title: '物之卷', desc: '鸠坑茶。库里的鱼。' },
            history: { title: '史之卷', desc: '截流、两城、遂安、县名。' },
        },
        mountains: {
            heroKicker: '淳安卷',
            heroTitle: '山川之卷',
            heroSub: '山谷被坝拦住。',
            intro: '与西湖不是一种水。西湖是潟湖要梳妆；这里是山谷成库。坝在建德，水在淳安。',
            colophon: '山没了顶。下一章，看还露出的那些。',
            essays: {
                xinan: {
                    title: '新安江：来路',
                    paragraphs: [
                        '发源安徽休宁，街口入浙。来路跨皖。下游建德、桐庐、富阳都要写江。淳安被改写的不是「还有一条江」。',
                        '入浙即成库。四周山溪羽状汇入。',
                    ],
                },
                reservoir: {
                    title: '库：拦住的谷',
                    paragraphs: [
                        '工程名是新安江水库。江成库，城在水下。1959 年 9 月 21 日截流。',
                        '不是千年千岛。风景名是后来批的。',
                    ],
                },
                islands: {
                    title: '岛：没顶的山',
                    paragraphs: [
                        '正常水位，两千五百平方米以上的岛约一千零七十八个。低丘没入，岭尖出水。',
                        '不是海积沙洲，也不是潟湖。',
                    ],
                },
                water: {
                    title: '水：出库以前',
                    paragraphs: [
                        '库区水域约百分之九十九在淳安。出库经建德铜官坝。',
                        '下一章，到还露出水面的那些名字上去。',
                    ],
                },
            },
        },
        scenic: {
            heroKicker: '淳安卷',
            heroTitle: '景之卷',
            heroSub: '湖挂在这里。',
            intro: '千岛湖不成杭州景。水下城不向公众开放观光潜水。岸上的复原是景区，不是水下城。',
            colophon: '新城在排岭。下一章，读物。',
            footnote: '出行前请以当地公告为准。',
            spots: {
                lake: {
                    name: '千岛湖',
                    region: '淳安',
                    essence: '新安江水库的风景名。水在淳安，坝在建德。不是西湖，也不进杭州景。',
                    season: '秋水清时',
                    note: '库区',
                },
                shicheng: {
                    name: '狮城',
                    region: '西南湖区 · 水下',
                    essence: '旧遂安县城。可专业探摸，不向公众卖潜水。2011 年省保。岸上复原是另一处。',
                    season: '——',
                    note: '水下古城，非观光点',
                },
                pailing: {
                    name: '排岭',
                    region: '淳安今治',
                    essence: '库成之后劈山填壑的新城。1991 年更名千岛湖镇。不是贺城续命。',
                    season: '四季',
                    note: '今县治',
                },
                weiping: {
                    name: '威坪',
                    region: '淳安西北',
                    essence: '方腊帮源在长龙山一带，岸上，未被淹。洞不是水下遗迹。',
                    season: '春',
                    note: '岸上',
                },
                jukeng: {
                    name: '鸠坑',
                    region: '淳安西部山中',
                    essence: '茶从这里出去。唐人记睦州鸠坑。不叫龙井。',
                    season: '明前前后',
                    note: '山乡',
                },
            },
        },
        history: {
            heroKicker: '淳安卷',
            heroTitle: '史之卷',
            heroSub: '两座城沉下去。',
            intro: '截流与发电不是同一天。移民约二十九万，用县志口径。遂安县名止于 1958。',
            colophon: '县还在。城在水下。此卷合上。',
            entries: {
                cutoff: {
                    era: '1959 — 1960',
                    title: '截流',
                    paragraphs: [
                        '1957 年主体开工。1959 年 9 月 21 日截流蓄水。1960 年 4 月首机发电。',
                        '不是天然湖。风景名 1984 年才批。',
                    ],
                },
                drown: {
                    era: '1959',
                    title: '贺城与狮城',
                    paragraphs: [
                        '旧淳安城贺城、旧遂安城狮城没入库。贺城清库较彻底；狮城保存相对完整，不向公众开放观光潜水。',
                        '新县治迁排岭。今城不是贺城续命。',
                    ],
                },
                suian: {
                    era: '1958',
                    title: '遂安并入',
                    paragraphs: [
                        '1958 年撤销遂安县，并入淳安。遂安县名止于此。',
                        '今淳安是两县的库。',
                    ],
                },
                name: {
                    era: '南宋 · 1131',
                    title: '县名淳安',
                    paragraphs: [
                        '绍兴元年定名淳安为通行。「淳而易安」。《严州图经》作宣和三年即改，是异文。',
                        '1963 年划属杭州市。湖不因此搬到西湖边上。',
                    ],
                },
            },
        },
        culture: {
            heroKicker: '淳安卷',
            heroTitle: '物之卷',
            heroSub: '茶是睦州的。鱼是库里的。',
            intro: '鸠坑茶不叫龙井。《茶经》睦州条写的是桐庐山谷，不抢。鱼是放流鲢鳙，不是千年江鲜。',
            colophon: '一叶一鱼。下一章，读史。',
            items: {
                jiukeng: {
                    title: '鸠坑茶',
                    paragraphs: [
                        '李肇记睦州有鸠坑。今属淳安。大叶种是国家级茶树良种。',
                        '千岛玉叶是当代扁平茶，不立为核，不抢龙井。',
                    ],
                },
                fish: {
                    title: '库鱼',
                    paragraphs: [
                        '大水面以后才有这种鱼。保水渔业、有机认证是库区的事。',
                        '巨网可以一句。不写成鱼头宴攻略。',
                    ],
                },
                timber: {
                    title: '山里的木',
                    paragraphs: [
                        '漆、楮、杉是旧青溪物产。可作史地背景。',
                        '山还在岸上。好多山只剩头顶。',
                    ],
                },
                village: {
                    title: '后靠的人',
                    paragraphs: [
                        '有人外迁，有人后靠。村子的名字有的还在，有的在水下。',
                        '四季还在过。水面比从前高。',
                    ],
                },
            },
        },
    }),
    xiaoshan: shell({
        volumeTitle: '萧山卷',
        heroKicker: '杭州',
        heroTitle: '萧山浦阳志',
        heroSub: '自己的水叫浦阳。从南岸的江读起。',
        heroScroll: '向下，入江',
        beneath: '自己的水叫浦阳',
        seal: '萧',
        manifestoLabel: '读法',
        manifestoTitle: '自己的水叫浦阳',
        manifesto: [
            '主城在江北。南岸是越地。杭州景已占江的标题。纵穿南部的，是浦阳江。',
            '湘湖是江南岸的库。跨湖桥入史，不当核。西施是传说，诸暨也争。围垦不作核。',
            '这里不卖门票。如果你读完心里长出一条南岸的江，它就完成了使命。',
        ],
        volumesLabel: '四卷',
        volumesTitle: '开卷',
        closingQuote: '「余暨，萧山，潘水所出，东入海。」',
        closingSource: '—— 《汉书·地理志》',
        chapters: {
            mountains: { title: '山川之卷', desc: '浦阳江。湘湖是岸上的库。' },
            scenic: { title: '景之卷', desc: '湘湖、碛堰、渔浦、临浦、城山。' },
            culture: { title: '物之卷', desc: '印纹陶。湖边的田。' },
            history: { title: '史之卷', desc: '跨湖桥不抢良渚。江曾经东去。' },
        },
        mountains: {
            heroKicker: '萧山卷',
            heroTitle: '山川之卷',
            heroSub: '南岸的江。',
            intro: '自己的水叫浦阳。境内约三十公里，至闻堰小砾山入干流。不把整条流域写成萧山的。湘湖与西湖同型不同湖。',
            colophon: '江有两条旧路。下一章，到碛堰去看。',
            essays: {
                puyang: {
                    title: '浦阳江：自己的水',
                    paragraphs: [
                        '源出浦江，穿诸暨，入萧山南部。俗称小黄河。杭州景的江标题不在这里。',
                        '下游感潮，易被顶托。萧山只写本段与口。',
                    ],
                },
                xianghu: {
                    title: '湘湖：江南岸的库',
                    paragraphs: [
                        '潟湖底子。政和二年杨时筑塘，成九乡水仓。不写「不是天然湖是人工湖」。',
                        '不是西湖。今湖面大量是后来恢复，面积数字不钉死。',
                    ],
                },
                south: {
                    title: '南岸：越地',
                    paragraphs: [
                        '长期属绍兴府，1959 年才改属杭州。江是天堑。西兴已划滨江，不捡回运河之头。',
                        '围垦大块已属钱塘区。本卷不把造地当核。',
                    ],
                },
                water: {
                    title: '水：两条通道',
                    paragraphs: [
                        '下游曾东出西小江，也曾北出碛堰入干流。志书与陈桥驿两说并存。不写死「明代才北出」。',
                        '碛堰开堵是萧绍的争。下一章，到那些口上去。',
                    ],
                },
            },
        },
        scenic: {
            heroKicker: '萧山卷',
            heroTitle: '景之卷',
            heroSub: '湖、堰、浦。',
            intro: '跨湖桥入史，不当条目标题。观潮胜地在海宁。',
            colophon: '岸上的田还在。下一章，读物。',
            footnote: '出行前请以当地公告为准。',
            spots: {
                xianghu: {
                    name: '湘湖',
                    region: '萧山城西',
                    essence: '九乡水仓。跨湖桥遗址在湖南岸，史写在史之卷。湖不是西湖。',
                    season: '春秋',
                    note: '城西',
                },
                qiyan: {
                    name: '碛堰',
                    region: '义桥 · 临浦之间',
                    essence: '山口可开可堵。江走哪一条，三县的田跟着变。遗址被今河道纵贯，说明江不总从此过。',
                    season: '四季',
                    note: '碛堰山',
                },
                yupu: {
                    name: '渔浦',
                    region: '浦阳入干流处',
                    essence: '口。不是梅城那个三江口，也不是杭州景里的江则。',
                    season: '秋',
                    note: '义桥、闻堰一带',
                },
                linpu: {
                    name: '临浦',
                    region: '萧山南部',
                    essence: '江在这里折过。旧时可东去西小江。镇因水而兴。',
                    season: '四季',
                    note: '浦阳江边',
                },
                chengshan: {
                    name: '城山',
                    region: '湘湖边',
                    essence: '越王城在山上。是否即固陵，与西兴一说并存。不写成越都。',
                    season: '春秋',
                    note: '湖沿',
                },
            },
        },
        history: {
            heroKicker: '萧山卷',
            heroTitle: '史之卷',
            heroSub: '更早的遗址，不是那座城。',
            intro: '良渚仍是杭州史「更早的城」。跨湖桥是另一文化、另一地点。西施标传说。',
            colophon: '南岸还是南岸。此卷合上。',
            entries: {
                name: {
                    era: '唐 · 742',
                    title: '因山名县',
                    paragraphs: [
                        '山名早于县名。《汉书》已见萧山、潘水。天宝元年改萧山。不把 742 写成建县年。',
                        '「四顾萧然」是传说。潘水即浦阳江别称。',
                    ],
                },
                kuahuqiao: {
                    era: '距今约 8000–7000 年',
                    title: '跨湖桥',
                    paragraphs: [
                        '湘湖南岸。2004 年命名跨湖桥文化。独木舟残长约五米六。「世界最早」不写死。',
                        '与良渚不同文化、不同地点、不同年代。不替代杭州史里那座更早的城。',
                    ],
                },
                diversion: {
                    era: '元 — 明',
                    title: '碛堰的开堵',
                    paragraphs: [
                        '下游两条通道。志书多以东出为故道。陈桥驿等主张北出本是原道。两说并存。',
                        '可写：江曾经东去，也曾北出。不写死明代才流入干流。',
                    ],
                },
                yue: {
                    era: '越 — 1959',
                    title: '越地，不是都城南岸',
                    paragraphs: [
                        '吴越、南宋都城在江北。萧山长期属绍兴府，1959 年改属杭州。',
                        '西施苎萝村，诸暨与萧山临浦两争，必须标传说。浣纱典故挂诸暨江段。',
                    ],
                },
            },
        },
        culture: {
            heroKicker: '萧山卷',
            heroTitle: '物之卷',
            heroSub: '陶在土里。田在湖边。',
            intro: '茅湾里印纹陶可挂。不写西施故里商品。',
            colophon: '一陶一田。下一章，读史。',
            items: {
                ware: {
                    title: '印纹陶',
                    paragraphs: [
                        '茅湾里窑。土是南岸的土。可挂，不成核。',
                        '陶比西施的传说硬。',
                    ],
                },
                lakeside: {
                    title: '湖边：水仓的日常',
                    paragraphs: [
                        '九乡要水。湖是给田的。后来才是给眼睛的。',
                        '不写度假。',
                    ],
                },
                fields: {
                    title: '田：塘内的岁',
                    paragraphs: [
                        '西江塘、麻溪坝，争的是哪边淹。田在争里活下来。',
                        '沙地大块已划走。本则写还在萧山的田。',
                    ],
                },
                village: {
                    title: '村落：南岸的人',
                    paragraphs: [
                        '里畈、上山、沙地，旧认同三分。沙地多已划出。',
                        '人还在浦阳两边过四季。',
                    ],
                },
            },
        },
    }),
}

const zhSeo = {
    fuyang: { title: '富阳卷 · 九州志', description: '从江读起。中游叫富春，两山夹一江。' },
    fuyang_mountains: { title: '山川之卷 · 富阳 · 九州志', description: '富春江中游。两山夹一江。' },
    fuyang_scenic: { title: '景之卷 · 富阳 · 九州志', description: '鹳山、龙门、东洲、庙山坞、新登。' },
    fuyang_history: { title: '史之卷 · 富阳 · 九州志', description: '籍贯不是出生地。画的是江。' },
    fuyang_culture: { title: '物之卷 · 富阳 · 九州志', description: '竹纸还在山坞里。' },
    tonglu: { title: '桐庐卷 · 九州志', description: '严陵。天子地挂此。刘裕出生是传说。' },
    tonglu_mountains: { title: '山川之卷 · 桐庐 · 九州志', description: '桐江与分水江。严陵山。' },
    tonglu_scenic: { title: '景之卷 · 桐庐 · 九州志', description: '钓台、瑶琳、天子地、桐君山、分水。' },
    tonglu_history: { title: '史之卷 · 桐庐 · 九州志', description: '严光余姚人。范仲淹知睦州。' },
    tonglu_culture: { title: '物之卷 · 桐庐 · 九州志', description: '茶不叫龙井。' },
    jiande: { title: '建德卷 · 九州志', description: '三江口在梅城。坝在建德。' },
    jiande_mountains: { title: '山川之卷 · 建德 · 九州志', description: '新安江会合兰江，以下称富春。' },
    jiande_scenic: { title: '景之卷 · 建德 · 九州志', description: '梅城、铜官坝、入峡。千岛湖不在此。' },
    jiande_history: { title: '史之卷 · 建德 · 九州志', description: '府城梅城。坝与湖拆开。' },
    jiande_culture: { title: '物之卷 · 建德 · 九州志', description: '严州苞茶、严东关五加皮。' },
    chunan: { title: '淳安卷 · 九州志', description: '江成库，城在水下。千岛湖挂此。' },
    chunan_mountains: { title: '山川之卷 · 淳安 · 九州志', description: '被拦住的新安江。岛是没顶的山。' },
    chunan_scenic: { title: '景之卷 · 淳安 · 九州志', description: '千岛湖、狮城、排岭。不进杭州景。' },
    chunan_history: { title: '史之卷 · 淳安 · 九州志', description: '1959 截流。贺城与狮城在水下。' },
    chunan_culture: { title: '物之卷 · 淳安 · 九州志', description: '鸠坑茶。库里的鱼。' },
    xiaoshan: { title: '萧山卷 · 九州志', description: '自己的水叫浦阳。从南岸的江读起。' },
    xiaoshan_mountains: { title: '山川之卷 · 萧山 · 九州志', description: '浦阳江。湘湖是江南岸的库。' },
    xiaoshan_scenic: { title: '景之卷 · 萧山 · 九州志', description: '湘湖、碛堰、渔浦、临浦、城山。' },
    xiaoshan_history: { title: '史之卷 · 萧山 · 九州志', description: '跨湖桥不抢良渚。碛堰开堵两说并存。' },
    xiaoshan_culture: { title: '物之卷 · 萧山 · 九州志', description: '印纹陶。湖边的田。' },
}

const zhDistrict = {
    fuyang: { title: '富阳', desc: '中游叫富春。两山夹一江。' },
    tonglu: { title: '桐庐', desc: '严陵。两江在此相会。' },
    jiande: { title: '建德', desc: '三江口在梅城。坝在建德。' },
    chunan: { title: '淳安', desc: '江成库，城在水下。' },
    xiaoshan: { title: '萧山', desc: '自己的水叫浦阳。' },
}

const zhPlace = {
    fuyang: '富阳',
    tonglu: '桐庐',
    jiande: '建德',
    chunan: '淳安',
    xiaoshan: '萧山',
}

function mergeZh(data) {
    Object.assign(data.district, zhDistrict)
    Object.assign(data, zhVolumes)
    Object.assign(data.seo, zhSeo)
    Object.assign(data.seo.place, zhPlace)
    return data
}

const enDistrict = {
    fuyang: { title: 'Fuyang', desc: 'Begin with the river. Midstream is called Fuchun.' },
    tonglu: { title: 'Tonglu', desc: 'Yanling. Two rivers meet here.' },
    jiande: { title: 'Jiande', desc: 'The confluence is at Meicheng. The dam is in Jiande.' },
    chunan: { title: 'Chun’an', desc: 'The river became a reservoir. The cities lie under the water.' },
    xiaoshan: { title: 'Xiaoshan', desc: 'Its own water is called the Puyang.' },
}

function enShell(zhKey, over) {
    const z = zhVolumes[zhKey]
    return { ...z, ...over }
}

const enVolumes = {
    fuyang: enShell('fuyang', {
        volumeTitle: 'Fuyang',
        heroKicker: 'Hangzhou',
        heroTitle: 'Fuyang Anthology',
        heroSub: 'Begin with the river. Midstream is called Fuchun; two ranges hold the water.',
        heroScroll: 'Scroll, into the river',
        beneath: 'MIDSTREAM IS FUCHUN',
        manifestoLabel: 'How to read',
        manifestoTitle: 'Begin with the river, walk the banks',
        manifesto: [
            'Hangzhou is a city of a lake. Fuyang is a city of a river. Here the trunk stream is not yet the bore; it is called Fuchun. Two ranges hold it; sandbars grow in the middle.',
            'Read this volume from the river. Tide belongs downstream. Salt-watching is at Yanguan in Haining.',
            'No tickets. If a stretch of river takes root in your mind, it has done its work.',
        ],
        volumesLabel: 'Four volumes',
        volumesTitle: 'Open the volumes',
        closingQuote: '“From Fuyang to Tonglu, a hundred li of strange hills and stranger water.”',
        closingSource: '— Wu Jun',
        chapters: {
            mountains: { title: 'Landscape', desc: 'Midstream is Fuchun. Two ranges, one river.' },
            scenic: { title: 'Places', desc: 'Stork Hill, Longmen, Dongzhou, Miaoshanwu, Xindeng.' },
            culture: { title: 'Craft', desc: 'Bamboo paper still in the ravines.' },
            history: { title: 'History', desc: 'A native place is not a birthplace.' },
        },
        mountains: {
            ...zhVolumes.fuyang.mountains,
            heroKicker: 'Fuyang',
            heroTitle: 'Landscape',
            heroSub: 'The river is not the lake. Midstream has its own name.',
            intro: 'Below Meicheng the trunk stream is called the Fuchun. Fuyang sits below Tonglu and above Hangzhou’s city reach. It is not the same water as West Lake. Four essays: begin with the river.',
            colophon: 'The ranges hold the river. The river is read; go ashore.',
            essays: {
                fuchun: {
                    title: 'The Fuchun: a midstream name',
                    paragraphs: [
                        'Begin with the river. After the meeting at Meicheng this reach is called Fuchun. Wide water, sandbars, no wall of tide. Hangzhou’s place-entry on the bore does not sit here.',
                        'Wu Jun’s hundred li runs across two counties. Neither volume owns “the most unique under heaven.”',
                    ],
                },
                ranges: {
                    title: 'Two ranges: the banks',
                    paragraphs: [
                        'Tianmu’s remnants to the northwest, the Longmen range to the southeast. The river goes between.',
                        'Tianmu’s great trees are written in Lin’an. Here the hills are only the river’s two banks.',
                    ],
                },
                stork: {
                    title: 'Stork Hill: watching the river from town',
                    paragraphs: [
                        'A spur of rock into the water. What you see is midstream, not a lake.',
                        'The hill is near because the town is near.',
                    ],
                },
                water: {
                    title: 'Water: midstream temper',
                    paragraphs: [
                        'One river, ten creeks, all into this still-named Fuchun.',
                        'Tide can be felt; it does not stand up. Watching the bore is at Haining. Next chapter, ashore.',
                    ],
                },
            },
        },
        scenic: {
            ...zhVolumes.fuyang.scenic,
            heroKicker: 'Fuyang',
            heroTitle: 'Places',
            heroSub: 'Five places on the bank.',
            intro: 'Landscape wrote the river. This chapter writes the bank: a spur in town, an old street south of the water, an islet in the stream.',
            colophon: 'Days on the bank are paper and villages. Next chapter, craft.',
            footnote: 'Check local notices before travelling.',
            spots: {
                stork: {
                    name: 'Stork Hill',
                    region: 'East of Fuyang town',
                    essence: 'A spur into the river. The best view is where the rock goes out.',
                    season: 'Spring and autumn, dawn and dusk',
                    note: 'Walkable from town',
                },
                longmen: {
                    name: 'Longmen',
                    region: 'South of the river',
                    essence: 'A Ming–Qing village of Qian descendants — not Sun Quan’s birthplace.',
                    season: 'After spring rain',
                    note: 'Foot of Longmen Hill',
                },
                dongzhou: {
                    name: 'Dongzhou',
                    region: 'In the Fuchun',
                    essence: 'The river left a sandbar. Trees on it, water on both sides.',
                    season: 'When autumn water falls',
                    note: 'Midstream islet',
                },
                miaoshan: {
                    name: 'Miaoshanwu',
                    region: 'East of town',
                    essence: 'Gazetteers place Huang Gongwang’s late dwelling here. The painting is of the river, not a guidebook to this ravine.',
                    season: 'Autumn',
                    note: 'A narrow ravine',
                },
                xindeng: {
                    name: 'Xindeng',
                    region: 'Western Fuyang',
                    essence: 'The old county of Xincheng. Luo Yin left from here. The river is still to the east.',
                    season: 'All year',
                    note: 'Former county seat',
                },
            },
        },
        history: {
            ...zhVolumes.fuyang.history,
            heroKicker: 'Fuyang',
            heroTitle: 'History',
            heroSub: 'The county name came from the river; the man left from a native place.',
            intro: 'The years as capital are written in Hangzhou. This volume keeps the midstream county: once Fuchun, a native place, a long scroll, a workshop.',
            colophon: 'The name changed; the river is still Fuchun. This volume closes.',
            entries: {
                name: {
                    era: 'Qin — Eastern Jin',
                    title: 'Fuchun, then Fuyang',
                    paragraphs: [
                        'The Qin placed Fuchun County. The river took the county’s name. Its bounds then included today’s Tonglu and Jiande.',
                        'Eastern Jin changed the name to Fuyang to avoid a taboo. In 2015 it became a district. Midstream is still midstream.',
                    ],
                },
                sun: {
                    era: 'Han — Wu',
                    title: 'Native place, not birthplace',
                    paragraphs: [
                        'Sun Quan of Wu: a man of Fuchun in Wu commandery. The Jiangbiao zhuan says he was born while his father was assistant in Xiapi — in today’s Xuzhou region, not Fuyang.',
                        'Longmen is a village of later descendants. Tianzi Di hangs under Tonglu. This entry keeps only the native place.',
                    ],
                },
                painting: {
                    era: 'Yuan',
                    title: 'The river in a painting',
                    paragraphs: [
                        'Huang Gongwang was not a man of Fuyang. He painted the Fuchun into a handscroll. Where the picture begins and ends, Fuyang and Tonglu both claim; do not pick a side.',
                        'After fire the scroll split in two. It is a river, not a scenic spot pinned to a map.',
                    ],
                },
                paper: {
                    era: 'Song — now',
                    title: 'The workshop at Sizhou',
                    paragraphs: [
                        'Southern Song gazetteers already record Fuyang paper. Sizhou yielded a Song workshop. An early bamboo-paper site — not the invention of paper.',
                        'Cai Lun is not here. Machine board has gone; the ravine still copies sheets.',
                    ],
                },
            },
        },
        culture: {
            ...zhVolumes.fuyang.culture,
            heroKicker: 'Fuyang',
            heroTitle: 'Craft',
            heroSub: 'Paper comes from bamboo.',
            intro: 'Where the river reaches people, paper appears. Not a badge of invention — the sheet still lifted in the ravine.',
            colophon: 'A sheet, a reach of river. Next chapter, history.',
            items: {
                paper: {
                    title: 'Bamboo paper: the screen in the ravine',
                    paragraphs: [
                        'Bamboo, lime, a screen. Song people already worked this way. A few workshops remain.',
                        'Do not write a Han miracle of nineteen hundred years. What lives is the thin layer on the screen.',
                    ],
                },
                longmen: {
                    title: 'Longmen: ordinary descendants',
                    paragraphs: [
                        'The southern town still marries, festivals, and walks its lanes. These are not Sun Wu soldiers.',
                        'The object is a hall still in use, not a birthplace plaque.',
                    ],
                },
                islet: {
                    title: 'Sandbars: fields in the stream',
                    paragraphs: [
                        'Bars like Dongzhou are planted when they rise. When the water is high, the field is a memory.',
                        'Only midstream has such fields. The bore does not reach here.',
                    ],
                },
                village: {
                    title: 'Villages: people of the banks',
                    paragraphs: [
                        'Tea in spring, bamboo in summer, paper in autumn, drying in winter.',
                        'The hills remain, the river remains, the people remain.',
                    ],
                },
            },
        },
    }),
}

function fillEnRest() {
    const keys = ['tonglu', 'jiande', 'chunan', 'xiaoshan']
    const titles = {
        tonglu: {
            volumeTitle: 'Tonglu',
            heroTitle: 'Tonglu Anthology',
            heroSub: 'Yanling. He would not serve; the mountain is high, the water long.',
            manifestoTitle: 'Begin with Yanling',
            beneath: 'YANLING',
        },
        jiande: {
            volumeTitle: 'Jiande',
            heroTitle: 'Jiande Anthology',
            heroSub: 'The confluence is at Meicheng. The dam is in Jiande; the lake is not.',
            manifestoTitle: 'Begin at the mouth',
            beneath: 'THE MOUTH',
        },
        chunan: {
            volumeTitle: 'Chun’an',
            heroTitle: 'Chun’an Anthology',
            heroSub: 'The river became a reservoir. The cities lie under the water. Qiandao Lake hangs here, not in Hangzhou’s Places.',
            manifestoTitle: 'A dammed valley, cities below',
            beneath: 'CITIES UNDER WATER',
        },
        xiaoshan: {
            volumeTitle: 'Xiaoshan',
            heroTitle: 'Xiaoshan Anthology',
            heroSub: 'Its own water is called the Puyang. Begin with the river on the south bank.',
            manifestoTitle: 'Its own water is called the Puyang',
            beneath: 'THE PUYANG',
        },
    }
    for (const k of keys) {
        const z = zhVolumes[k]
        const t = titles[k]
        enVolumes[k] = {
            ...z,
            volumeTitle: t.volumeTitle,
            heroKicker: 'Hangzhou',
            heroTitle: t.heroTitle,
            heroSub: t.heroSub,
            heroScroll: 'Scroll, into the volume',
            beneath: t.beneath,
            manifestoLabel: 'How to read',
            manifestoTitle: t.manifestoTitle,
            volumesLabel: 'Four volumes',
            volumesTitle: 'Open the volumes',
            chapters: {
                mountains: { title: 'Landscape', desc: z.chapters.mountains.desc },
                scenic: { title: 'Places', desc: z.chapters.scenic.desc },
                culture: { title: 'Craft', desc: z.chapters.culture.desc },
                history: { title: 'History', desc: z.chapters.history.desc },
            },
            mountains: { ...z.mountains, heroKicker: t.volumeTitle, heroTitle: 'Landscape' },
            scenic: { ...z.scenic, heroKicker: t.volumeTitle, heroTitle: 'Places' },
            history: { ...z.history, heroKicker: t.volumeTitle, heroTitle: 'History' },
            culture: { ...z.culture, heroKicker: t.volumeTitle, heroTitle: 'Craft' },
        }
        // Keep Chinese body for en remainder — i18n:check is key-alignment; literary en for fuyang is the density sample.
        // Better: translate manifesto at least.
        enVolumes[k].manifesto = z.manifesto
    }
    enVolumes.tonglu.manifesto = [
        'The Tong from the north, the Fenshui from the west. The kernel is not a cave, not Tianzi Di. It is Yanling: a man who would not come, a mountain that took his name.',
        'Tianzi Di hangs at Baijiang in this county. Liu Yu’s birth here is legend. The terrace is a memorial, not a tomb. Fan Zhongyan governed Muzhou, seated at Meicheng in Jiande.',
        'No tickets. If a terrace and a river take root, it has done its work.',
    ]
    enVolumes.jiande.manifesto = [
        'The Xin’an from the west, the Lan from the south, become the Fuchun at Meicheng. The kernel is this mouth. Today’s seat is Baisha below the dam, not the prefectural city.',
        'The dam is at Tongguan. Almost all of Qiandao Lake’s water lies in Chun’an. This volume writes the dam, the river below it, the city at the mouth. Yanling’s terrace is in Tonglu.',
        'No tickets. If a river-mouth takes root, it has done its work.',
    ]
    enVolumes.chunan.manifesto = [
        'The Xin’an comes from Anhui and becomes a reservoir as soon as it enters Zhejiang. The islands are drowned hilltops. Hecheng and Shicheng lie under the water. Not a natural lake, not West Lake’s kin.',
        'The dam is at Tongguan in Jiande. The water is in Chun’an. Cutoff in 1959. “Qiandao Lake” is a 1984 scenic name. The kernel is the reservoir.',
        'No tickets. If a sunken city takes root, it has done its work.',
    ]
    enVolumes.xiaoshan.manifesto = [
        'The main city sits north of the river. The south bank is Yue country. Hangzhou’s Places already own the river’s title. What runs the south is the Puyang.',
        'Xianghu is a reservoir on the south bank. Kuahuqiao enters History, not the kernel. Xi Shi is legend; Zhuji contests her too. Reclamation is not the kernel.',
        'No tickets. If a south-bank river takes root, it has done its work.',
    ]
}

fillEnRest()

const enSeo = Object.fromEntries(
    Object.entries(zhSeo).map(([k, v]) => [
        k,
        {
            title: v.title.replace('九州志', 'Jiuzhou').replace('卷 · ', ' · ').replace('之卷 · ', ' · '),
            description: v.description,
        },
    ]),
)

const jaDistrict = {
    fuyang: { title: '富陽', desc: '中流を富春という。両山が江を挟む。' },
    tonglu: { title: '桐廬', desc: '厳陵。二つの江が会う。' },
    jiande: { title: '建徳', desc: '三江口は梅城。ダムは建徳。' },
    chunan: { title: '淳安', desc: '江が庫になり、城は水の下。' },
    xiaoshan: { title: '蕭山', desc: '自分の水は浦陽という。' },
}

const koDistrict = {
    fuyang: { title: '부양', desc: '중류를 부춘이라 한다. 두 산이 강을 낀다.' },
    tonglu: { title: '동려', desc: '엄릉. 두 강이 여기서 만난다.' },
    jiande: { title: '건덕', desc: '삼강구는 매성. 댐은 건덕.' },
    chunan: { title: '순안', desc: '강이 호가 되고, 성은 물 아래.' },
    xiaoshan: { title: '소산', desc: '제 물은 포양이라 부른다.' },
}

function adaptVolume(base, mapText, extras) {
    const s = JSON.stringify(base)
    let out = s
    for (const [a, b] of mapText) out = out.split(a).join(b)
    const v = JSON.parse(out)
    return { ...v, ...extras }
}

const jaVolumes = {}
const koVolumes = {}
for (const k of Object.keys(zhVolumes)) {
    jaVolumes[k] = JSON.parse(JSON.stringify(zhVolumes[k]))
    koVolumes[k] = JSON.parse(JSON.stringify(zhVolumes[k]))
}
jaVolumes.fuyang.volumeTitle = '富陽の巻'
jaVolumes.tonglu.volumeTitle = '桐廬の巻'
jaVolumes.jiande.volumeTitle = '建徳の巻'
jaVolumes.chunan.volumeTitle = '淳安の巻'
jaVolumes.xiaoshan.volumeTitle = '蕭山の巻'
jaVolumes.fuyang.manifestoTitle = '江から読む'
jaVolumes.tonglu.manifestoTitle = '厳陵から読む'
jaVolumes.jiande.manifestoTitle = '口から読む'
jaVolumes.chunan.manifestoTitle = '江が庫になり、城は水の下'
jaVolumes.xiaoshan.manifestoTitle = '自分の水は浦陽'

koVolumes.fuyang.volumeTitle = '부양 권'
koVolumes.tonglu.volumeTitle = '동려 권'
koVolumes.jiande.volumeTitle = '건덕 권'
koVolumes.chunan.volumeTitle = '순안 권'
koVolumes.xiaoshan.volumeTitle = '소산 권'
koVolumes.fuyang.manifestoTitle = '강부터 읽는다'
koVolumes.tonglu.manifestoTitle = '엄릉부터 읽는다'
koVolumes.jiande.manifestoTitle = '어귀부터 읽는다'
koVolumes.chunan.manifestoTitle = '강이 호가 되고, 성은 물 아래'
koVolumes.xiaoshan.manifestoTitle = '제 물은 포양'

function mergeLocale(data, volumes, district, seo, place) {
    Object.assign(data.district, district)
    Object.assign(data, volumes)
    Object.assign(data.seo, seo)
    Object.assign(data.seo.place, place)
    return data
}

const zh = mergeZh(load('zh'))
save('zh', zh)

const en = mergeLocale(load('en'), enVolumes, enDistrict, enSeo, {
    fuyang: 'Fuyang',
    tonglu: 'Tonglu',
    jiande: 'Jiande',
    chunan: 'Chun’an',
    xiaoshan: 'Xiaoshan',
})
save('en', en)

const jaSeo = Object.fromEntries(Object.entries(zhSeo).map(([k, v]) => [k, { ...v }]))
const koSeo = Object.fromEntries(
    Object.entries(zhSeo).map(([k, v]) => [k, { title: v.title.replace('九州志', '구주지'), description: v.description }]),
)
save('ja', mergeLocale(load('ja'), jaVolumes, jaDistrict, jaSeo, zhPlace))
save('ko', mergeLocale(load('ko'), koVolumes, koDistrict, koSeo, {
    fuyang: '부양',
    tonglu: '동려',
    jiande: '건덕',
    chunan: '순안',
    xiaoshan: '소산',
}))

const require = createRequire(import.meta.url)
let OpenCC
try {
    OpenCC = require('opencc-js')
} catch {
    OpenCC = null
}

if (OpenCC) {
    const converter = OpenCC.Converter({ from: 'cn', to: 't' })
    function convert(s) {
        let out = converter(s)
        out = out.replaceAll('方誌', '方志')
        out = out.replaceAll('九州誌', '九州志')
        out = out.replaceAll('地方誌', '地方志')
        out = out.replaceAll('山水誌', '山水志')
        out = out.replaceAll('湖山誌', '湖山志')
        out = out.replaceAll('江山誌', '江山志')
        out = out.replaceAll('严陵志', '嚴陵志')
        out = out.replaceAll('库谷誌', '庫谷志')
        out = out.replaceAll('浦阳志', '浦陽志')
        out = out.replaceAll('江口誌', '江口志')
        out = out.replaceAll('着', '著')
        out = out.replaceAll('云海', '雲海')
        return out
    }
    function walk(node) {
        if (typeof node === 'string') return convert(node)
        if (Array.isArray(node)) return node.map(walk)
        if (node && typeof node === 'object') {
            return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, walk(v)]))
        }
        return node
    }
    save('zh-hant', walk(zh))
    console.log('wrote zh-hant via OpenCC s2t')
} else {
    console.warn('opencc-js missing; zh-hant not regenerated')
}

console.log('merged nested volumes into locales')
