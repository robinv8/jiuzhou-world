/**
 * Rebuild ja.json / ko.json so they share zh.json's key tree.
 * Existing ja/ko strings are kept; missing keys are copied from en.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'i18n', 'locales')

function load(code) {
    return JSON.parse(readFileSync(join(root, `${code}.json`), 'utf8'))
}

function lookup(node, path) {
    let cur = node
    for (const key of path) {
        if (cur == null || typeof cur !== 'object' || Array.isArray(cur)) return undefined
        cur = cur[key]
    }
    return cur
}

function align(canon, en, existing, path = []) {
    if (typeof canon === 'string' || Array.isArray(canon)) {
        const own = lookup(existing, path)
        if (typeof canon === 'string') {
            return typeof own === 'string' && own ? own : lookup(en, path)
        }
        if (Array.isArray(own) && own.length === canon.length) return own
        return lookup(en, path)
    }
    const out = {}
    for (const key of Object.keys(canon)) {
        out[key] = align(canon[key], en, existing, [...path, key])
    }
    return out
}

const zh = load('zh')
const en = load('en')

for (const code of ['ja', 'ko']) {
    const next = align(zh, en, load(code))
    writeFileSync(join(root, `${code}.json`), JSON.stringify(next, null, 2) + '\n')
    console.log('aligned', code)
}
