import type { Lang } from '@/i18n/config'
import { withLocale } from '@/lib/i18n-path'
import westlake from '@/entries/bodies/westlake.md?raw'
import suBaiCauseway from '@/entries/bodies/su-bai-causeway.md?raw'
import tianmu from '@/entries/bodies/tianmu.md?raw'
import linanGazetteers from '@/entries/bodies/linan-gazetteers.md?raw'
import qianLiu from '@/entries/bodies/qian-liu.md?raw'
import liangzhu from '@/entries/bodies/liangzhu.md?raw'
import lingyin from '@/entries/bodies/lingyin.md?raw'
import tea from '@/entries/bodies/tea.md?raw'
import canal from '@/entries/bodies/canal.md?raw'
import zhinan from '@/entries/bodies/zhinan.md?raw'

export type InlineNode =
    | { type: 'text'; text: string }
    | { type: 'strong'; text: string }
    | { type: 'a'; href: string; text: string }

export type BlockNode =
    | { type: 'h1' | 'h2' | 'h3'; text: string }
    | { type: 'p'; children: InlineNode[] }
    | { type: 'ul'; items: InlineNode[][] }

export type ParsedEntryBody = {
    title: string
    dek: InlineNode[]
    blocks: BlockNode[]
}

function localizeHref(href: string, lang: Lang): string {
    if (!href.startsWith('/') || href.startsWith('//')) return href
    return withLocale(href, lang)
}

function parseInline(raw: string, lang: Lang): InlineNode[] {
    const nodes: InlineNode[] = []
    const token = /(\*\*[^*]+?\*\*|\[[^\]]+?\]\([^)]+?\))/g
    let last = 0
    let match: RegExpExecArray | null
    while ((match = token.exec(raw))) {
        if (match.index > last) {
            nodes.push({ type: 'text', text: raw.slice(last, match.index) })
        }
        const chunk = match[0]
        if (chunk.startsWith('**')) {
            nodes.push({ type: 'strong', text: chunk.slice(2, -2) })
        } else {
            const parsed = chunk.match(/^\[([^\]]+)]\(([^)]+)\)$/)
            if (parsed) {
                nodes.push({ type: 'a', href: localizeHref(parsed[2], lang), text: parsed[1] })
            } else {
                nodes.push({ type: 'text', text: chunk })
            }
        }
        last = match.index + chunk.length
    }
    if (last < raw.length) nodes.push({ type: 'text', text: raw.slice(last) })
    return nodes.length ? nodes : [{ type: 'text', text: raw }]
}

function headingLevel(line: string): 1 | 2 | 3 | 0 {
    if (line.startsWith('### ')) return 3
    if (line.startsWith('## ')) return 2
    if (line.startsWith('# ')) return 1
    return 0
}

/** Split a gazetteer entry markdown file (H1 + dek + sections through 参见). */
export function parseEntryMarkdown(source: string, lang: Lang): ParsedEntryBody {
    const lines = source.replace(/\r\n/g, '\n').trimEnd().split('\n')
    const blocks: BlockNode[] = []
    let title = ''
    let dek: InlineNode[] = []
    let sawTitle = false
    let sawDek = false
    let listItems: InlineNode[][] | null = null

    const flushList = () => {
        if (listItems?.length) blocks.push({ type: 'ul', items: listItems })
        listItems = null
    }

    for (const rawLine of lines) {
        const line = rawLine.replace(/\s+$/, '')
        if (!line.trim()) {
            flushList()
            continue
        }

        const level = headingLevel(line)
        if (level) {
            flushList()
            const text = line.replace(/^#{1,3}\s+/, '')
            if (level === 1 && !sawTitle) {
                title = text
                sawTitle = true
                continue
            }
            blocks.push({ type: level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3', text })
            continue
        }

        const bullet = line.match(/^\* (.+)$/)
        if (bullet) {
            if (!listItems) listItems = []
            listItems.push(parseInline(bullet[1], lang))
            continue
        }

        flushList()
        const children = parseInline(line, lang)
        if (sawTitle && !sawDek && blocks.length === 0) {
            dek = children
            sawDek = true
            continue
        }
        blocks.push({ type: 'p', children })
    }
    flushList()

    return { title, dek, blocks }
}

const bodies: Record<string, string> = {
    westlake,
    'su-bai-causeway': suBaiCauseway,
    tianmu,
    'linan-gazetteers': linanGazetteers,
    'qian-liu': qianLiu,
    liangzhu,
    lingyin,
    tea,
    canal,
    zhinan,
}

export function loadEntryMarkdown(slug: string): string {
    const source = bodies[slug]
    if (!source) throw new Error(`[entries] missing body for ${slug}`)
    return source
}
