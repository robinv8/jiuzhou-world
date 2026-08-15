/**
 * Prune ja.json / ko.json: drop any string that is identical to English.
 * Those keys should fall back (en → zh), not pretend to be Japanese/Korean.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'i18n', 'locales')

function load(code) {
    return JSON.parse(readFileSync(join(root, `${code}.json`), 'utf8'))
}

function prune(node, en) {
    if (typeof node === 'string') {
        if (typeof en === 'string' && node === en) return undefined
        return node
    }
    if (Array.isArray(node)) {
        if (Array.isArray(en) && JSON.stringify(node) === JSON.stringify(en)) return undefined
        return node
    }
    const out = {}
    for (const [key, value] of Object.entries(node)) {
        const next = prune(value, en && typeof en === 'object' && !Array.isArray(en) ? en[key] : undefined)
        if (next !== undefined) out[key] = next
    }
    return Object.keys(out).length ? out : undefined
}

const en = load('en')
for (const code of ['ja', 'ko']) {
    const next = prune(load(code), en) ?? {}
    writeFileSync(join(root, `${code}.json`), JSON.stringify(next, null, 2) + '\n')
    console.log('pruned', code)
}
