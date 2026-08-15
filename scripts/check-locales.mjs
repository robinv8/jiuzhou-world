/**
 * Ensure locale JSON files share the same key tree as zh.json.
 * Usage: node scripts/check-locales.mjs
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'i18n', 'locales')
const langs = ['zh', 'en', 'ja', 'ko']

function paths(node, prefix = '') {
    if (typeof node === 'string') return [prefix]
    if (Array.isArray(node)) return [prefix]
    return Object.entries(node).flatMap(([k, v]) => paths(v, prefix ? `${prefix}.${k}` : k))
}

function load(code) {
    return JSON.parse(readFileSync(join(root, `${code}.json`), 'utf8'))
}

const trees = Object.fromEntries(langs.map((code) => [code, load(code)]))
const canon = new Set(paths(trees.zh))
let failed = false

for (const code of langs.filter((c) => c !== 'zh')) {
    const have = new Set(paths(trees[code]))
    const missing = [...canon].filter((p) => !have.has(p))
    const extra = [...have].filter((p) => !canon.has(p))
    if (missing.length || extra.length) {
        failed = true
        console.error(`[i18n] ${code}.json is not aligned with zh.json`)
        if (missing.length) console.error('  missing:', missing.join(', '))
        if (extra.length) console.error('  extra:', extra.join(', '))
    } else {
        console.log(`[i18n] ${code}.json keys aligned (${have.size})`)
    }
}

if (failed) process.exit(1)
