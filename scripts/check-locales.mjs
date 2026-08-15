/**
 * zh.json is the canonical key tree.
 * en / ja / ko must have the same keys (full translation).
 * Extra keys (not in zh) are always an error.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'i18n', 'locales')
const FULL = ['en', 'ja', 'ko']

function paths(node, prefix = '') {
    if (typeof node === 'string' || Array.isArray(node)) return [prefix]
    return Object.entries(node).flatMap(([k, v]) => paths(v, prefix ? `${prefix}.${k}` : k))
}

function load(code) {
    return JSON.parse(readFileSync(join(root, `${code}.json`), 'utf8'))
}

const zh = load('zh')
const canon = new Set(paths(zh))
let failed = false

for (const code of FULL) {
    const have = new Set(paths(load(code)))
    const missing = [...canon].filter((p) => !have.has(p))
    const extra = [...have].filter((p) => !canon.has(p))
    if (missing.length || extra.length) {
        failed = true
        console.error(`[i18n] ${code}.json must match zh.json`)
        if (missing.length) console.error('  missing:', missing.join(', '))
        if (extra.length) console.error('  extra:', extra.join(', '))
    } else {
        console.log(`[i18n] ${code}.json complete (${have.size} keys)`)
    }
}

if (failed) process.exit(1)
