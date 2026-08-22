/**
 * Structural check for Hangzhou nested volumes: catalog keys, kernels, no title-steal.
 * Reads shipped locale JSON + catalogs.ts source.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const zh = JSON.parse(readFileSync(join(root, 'src/i18n/locales/zh.json'), 'utf8'))
const catalogs = readFileSync(join(root, 'src/i18n/catalogs.ts'), 'utf8')

const nested = ['fuyang', 'tonglu', 'jiande', 'chunan', 'xiaoshan']
const forbidden = ['西湖', '运河', '钱塘江', '龙井', '良渚']
let failed = false

function fail(msg) {
    failed = true
    console.error(msg)
}

if (!catalogs.includes("key: 'linan'") || !zh.linan) fail('临安 missing')
for (const k of ['binjiang', 'linping', 'yuhang', 'qiantang', 'shangcheng', 'xihu', 'gongshu']) {
    if (new RegExp(`key: '${k}'`).test(catalogs) && catalogs.includes(`route: '/hangzhou/${k}'`)) {
        fail(`must not open 并入/不写 district as volume: ${k}`)
    }
}

for (const key of nested) {
    if (!catalogs.includes(`key: '${key}'`) || !catalogs.includes(`route: '/hangzhou/${key}'`)) {
        fail(`catalog missing ${key}`)
    }
    for (const ch of ['mountains', 'scenic', 'culture', 'history']) {
        if (!catalogs.includes(`path: \`\${vol.route}/\${c.key}\``) && !catalogs.includes(`/hangzhou/${key}/${ch}`)) {
            // seo pages generated from chapters; volumeContent must exist
        }
        if (!zh[key]?.[ch === 'culture' ? 'culture' : ch === 'scenic' ? 'scenic' : ch === 'history' ? 'history' : 'mountains']) {
            fail(`${key} missing chapter tree ${ch}`)
        }
    }
    if (!zh[key]) fail(`zh missing volume ${key}`)
}

const kernels = {
    fuyang: ['从江读起'],
    tonglu: ['严陵', '天子地', '传说'],
    jiande: ['三江口', '梅城'],
    chunan: ['江成库', '城在水下', '千岛湖'],
    xiaoshan: ['自己的水叫浦阳'],
}

function flattenStrings(node, acc = []) {
    if (typeof node === 'string') acc.push(node)
    else if (Array.isArray(node)) node.forEach((n) => flattenStrings(n, acc))
    else if (node && typeof node === 'object') Object.values(node).forEach((n) => flattenStrings(n, acc))
    return acc
}

for (const [key, needles] of Object.entries(kernels)) {
    const blob = flattenStrings(zh[key]).join('\n')
    for (const n of needles) {
        if (!blob.includes(n)) fail(`${key} missing kernel phrase: ${n}`)
    }
}

if (!zh.tonglu?.scenic?.spots?.tianzi) fail('天子地 must be a Tonglu spot')
if (!zh.chunan?.scenic?.spots?.lake) fail('千岛湖 must hang as Chun’an spot')
if (zh.hangzhou?.scenic?.spots?.tianzi) fail('天子地 must not be Hangzhou 景')
if (zh.hangzhou?.scenic?.spots?.lake) fail('千岛湖 must not be Hangzhou 景')

for (const key of nested) {
    const essays = zh[key]?.mountains?.essays ?? {}
    const spots = zh[key]?.scenic?.spots ?? {}
    for (const [id, e] of Object.entries(essays)) {
        for (const f of forbidden) {
            if (e.title === f || e.title?.startsWith(`${f}：`) || e.title?.startsWith(`${f}:`)) {
                fail(`${key} essay ${id} steals title ${f}`)
            }
        }
    }
    for (const [id, s] of Object.entries(spots)) {
        for (const f of forbidden) {
            if (s.name === f) fail(`${key} spot ${id} steals name ${f}`)
        }
    }
}

const about = flattenStrings(zh.about).join('\n')
if (!about.includes('山川为纲') && !about.includes('禹奠高山大川')) {
    fail('缘起 missing 山川为纲')
}
if (zh.hangzhou?.culture?.colophon?.includes('最后一卷')) {
    fail('Hangzhou 物 still 最后一卷')
}

if (!catalogs.includes("parent: 'hangzhou'")) fail('nested parent hangzhou missing')

if (failed) {
    process.exit(1)
}
console.log('nested volumes structural check OK')
console.log('volumes:', ['linan', ...nested].join(', '))
console.log('chapters: mountains scenic culture history')
