import { DEFAULT_LANG, type Lang } from '@/i18n/config'
import zh from '@/i18n/locales/zh.json'
import en from '@/i18n/locales/en.json'
import ja from '@/i18n/locales/ja.json'
import ko from '@/i18n/locales/ko.json'

type MessageNode = string | string[] | { [key: string]: MessageNode }

const catalogs: Record<Lang, MessageNode> = {
    zh: zh as MessageNode,
    en: en as MessageNode,
    ja: ja as MessageNode,
    ko: ko as MessageNode,
}

const FALLBACK: Lang[] = [DEFAULT_LANG]

function lookup(tree: MessageNode | undefined, path: string[]): MessageNode | undefined {
    let node: MessageNode | undefined = tree
    for (const key of path) {
        if (!node || typeof node === 'string' || Array.isArray(node)) return undefined
        node = node[key]
    }
    return node
}

function resolve(key: string, lang: Lang): MessageNode | undefined {
    const path = key.split('.')
    const own = lookup(catalogs[lang], path)
    if (own !== undefined && own !== '') return own
    for (const next of FALLBACK) {
        if (next === lang) continue
        const found = lookup(catalogs[next], path)
        if (found !== undefined && found !== '') return found
    }
    return undefined
}

/** Look up a string. Fallback: current lang → zh. */
export function t(key: string, lang: Lang): string {
    const value = resolve(key, lang)
    if (typeof value === 'string') return value
    if (import.meta.env.DEV && value === undefined) {
        console.warn(`[i18n] missing string: ${key} (${lang})`)
    }
    return typeof value === 'undefined' ? key : String(value)
}

/** Look up a string list (paragraphs). Same fallback as `t`. */
export function tList(key: string, lang: Lang): string[] {
    const value = resolve(key, lang)
    if (Array.isArray(value)) return value.map(String)
    if (typeof value === 'string') return [value]
    if (import.meta.env.DEV) {
        console.warn(`[i18n] missing list: ${key} (${lang})`)
    }
    return []
}

/** Bind t / tList to a locale so views do not need React context. */
export function messages(lang: Lang) {
    return {
        t: (key: string, locale: Lang = lang) => t(key, locale),
        tList: (key: string, locale: Lang = lang) => tList(key, locale),
    }
}
