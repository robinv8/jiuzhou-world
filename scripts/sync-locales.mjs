/**
 * ja / ko are full locales now. Do not prune strings that match English —
 * that would silently drop keys and break `npm run i18n:check`.
 *
 * This script only reports keys whose value is identical to English,
 * so a translator can review them. It never writes files.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'i18n', 'locales')

function load(code) {
    return JSON.parse(readFileSync(join(root, `${code}.json`), 'utf8'))
}

function collectSame(node, en, prefix = '', out = []) {
    if (typeof node === 'string') {
        if (typeof en === 'string' && node === en) out.push(prefix)
        return out
    }
    if (Array.isArray(node)) {
        if (Array.isArray(en) && JSON.stringify(node) === JSON.stringify(en)) out.push(prefix)
        return out
    }
    if (!node || typeof node !== 'object') return out
    for (const [key, value] of Object.entries(node)) {
        const nextEn = en && typeof en === 'object' && !Array.isArray(en) ? en[key] : undefined
        collectSame(value, nextEn, prefix ? `${prefix}.${key}` : key, out)
    }
    return out
}

const en = load('en')
for (const code of ['ja', 'ko']) {
    const same = collectSame(load(code), en)
    if (same.length) {
        console.log(`[i18n] ${code}.json has ${same.length} value(s) identical to en:`)
        for (const key of same) console.log('  ', key)
    } else {
        console.log(`[i18n] ${code}.json has no values identical to en`)
    }
}
