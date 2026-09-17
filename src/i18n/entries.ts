import type { ChapterKey, PlaceKind, SeoPageType } from '@/i18n/catalogs'

export type EntryLinkFrom = {
    volume: string
    chapter: ChapterKey
    id: string
}

export type GazetteerEntry = {
    id: string
    slug: string
    /** Language-neutral path, no trailing slash. */
    path: string
    parentPath: string
    volume: string
    chapter: ChapterKey
    catalogId: string | null
    catalogKind: PlaceKind | null
    heroSlot: string | null
    image: string
    imagerySlotId: string | null
    latin: string
    seoKey: string
    /** Parent-chapter 条 that should link to this entry. */
    linksFrom: EntryLinkFrom[]
}

function entry(
    spec: Omit<GazetteerEntry, 'seoKey'> & { seoKey?: string },
): GazetteerEntry {
    return { ...spec, seoKey: spec.seoKey ?? `entry_${spec.slug}` }
}

/**
 * Published gazetteer entries. Leaf slugs prefer catalog ids.
 * Hero images reuse existing catalog slots — no new covers.
 */
export const gazetteerEntries: GazetteerEntry[] = [
    entry({
        id: 'ROBIN-30',
        slug: 'westlake',
        path: '/hangzhou/mountains/westlake',
        parentPath: '/hangzhou/mountains',
        volume: 'hangzhou',
        chapter: 'mountains',
        catalogId: 'westlake',
        catalogKind: 'essay',
        heroSlot: 'westlake',
        image: '/images/hangzhou-westlake.webp',
        imagerySlotId: 'hangzhou.mountains.essays.westlake',
        latin: 'West Lake',
        linksFrom: [{ volume: 'hangzhou', chapter: 'mountains', id: 'westlake' }],
    }),
    entry({
        id: 'ROBIN-31',
        slug: 'su-bai-causeway',
        path: '/hangzhou/scenic/su-bai-causeway',
        parentPath: '/hangzhou/scenic',
        volume: 'hangzhou',
        chapter: 'scenic',
        catalogId: null,
        catalogKind: null,
        heroSlot: null,
        image: '/images/hangzhou-lingyin.webp',
        imagerySlotId: null,
        latin: 'Su & Bai Causeways',
        linksFrom: [{ volume: 'hangzhou', chapter: 'mountains', id: 'westlake' }],
    }),
    entry({
        id: 'ROBIN-32',
        slug: 'tianmu',
        path: '/hangzhou/linan/mountains/tianmu',
        parentPath: '/hangzhou/linan/mountains',
        volume: 'linan',
        chapter: 'mountains',
        catalogId: 'tianmu',
        catalogKind: 'essay',
        heroSlot: 'tianmu',
        image: '/images/hero-tianmu.webp',
        imagerySlotId: 'linan.mountains.essays.tianmu',
        latin: 'Mount Tianmu',
        linksFrom: [{ volume: 'linan', chapter: 'mountains', id: 'tianmu' }],
    }),
    entry({
        id: 'ROBIN-33',
        slug: 'linan-gazetteers',
        path: '/hangzhou/linan/history/linan-gazetteers',
        parentPath: '/hangzhou/linan/history',
        volume: 'linan',
        chapter: 'history',
        catalogId: null,
        catalogKind: null,
        heroSlot: null,
        image: '/images/history-birth.webp',
        imagerySlotId: null,
        latin: 'The Three Lin’an Gazetteers',
        linksFrom: [],
    }),
    entry({
        id: 'ROBIN-34',
        slug: 'qian-liu',
        path: '/hangzhou/linan/history/qian-liu',
        parentPath: '/hangzhou/linan/history',
        volume: 'linan',
        chapter: 'history',
        catalogId: null,
        catalogKind: null,
        heroSlot: null,
        image: '/images/history-birth.webp',
        imagerySlotId: null,
        latin: 'Qian Liu',
        linksFrom: [
            { volume: 'linan', chapter: 'history', id: 'birth' },
            { volume: 'linan', chapter: 'history', id: 'kingdom' },
            { volume: 'linan', chapter: 'history', id: 'song' },
            { volume: 'linan', chapter: 'history', id: 'precept' },
            { volume: 'linan', chapter: 'history', id: 'name' },
        ],
    }),
    entry({
        id: 'ROBIN-35',
        slug: 'liangzhu',
        path: '/hangzhou/history/liangzhu',
        parentPath: '/hangzhou/history',
        volume: 'hangzhou',
        chapter: 'history',
        catalogId: 'liangzhu',
        catalogKind: 'history',
        heroSlot: 'liangzhu',
        image: '/images/hangzhou-history-liangzhu.webp',
        imagerySlotId: 'hangzhou.history.entries.liangzhu',
        latin: 'Liangzhu',
        linksFrom: [{ volume: 'hangzhou', chapter: 'history', id: 'liangzhu' }],
    }),
    entry({
        id: 'ROBIN-36',
        slug: 'lingyin',
        path: '/hangzhou/scenic/lingyin',
        parentPath: '/hangzhou/scenic',
        volume: 'hangzhou',
        chapter: 'scenic',
        catalogId: 'lingyin',
        catalogKind: 'spot',
        heroSlot: 'lingyin',
        image: '/images/hangzhou-lingyin.webp',
        imagerySlotId: 'hangzhou.scenic.spots.lingyin',
        latin: 'Lingyin Temple',
        linksFrom: [{ volume: 'hangzhou', chapter: 'scenic', id: 'lingyin' }],
    }),
    entry({
        id: 'ROBIN-37',
        slug: 'tea',
        path: '/hangzhou/culture/tea',
        parentPath: '/hangzhou/culture',
        volume: 'hangzhou',
        chapter: 'culture',
        catalogId: 'tea',
        catalogKind: 'culture',
        heroSlot: 'tea',
        image: '/images/hangzhou-longjing.webp',
        imagerySlotId: 'hangzhou.culture.items.tea',
        latin: 'Longjing Tea',
        linksFrom: [{ volume: 'hangzhou', chapter: 'culture', id: 'tea' }],
    }),
    entry({
        id: 'ROBIN-38',
        slug: 'canal',
        path: '/hangzhou/scenic/canal',
        parentPath: '/hangzhou/scenic',
        volume: 'hangzhou',
        chapter: 'scenic',
        catalogId: 'canal',
        catalogKind: 'spot',
        heroSlot: 'canal',
        image: '/images/hangzhou-canal.webp',
        imagerySlotId: 'hangzhou.scenic.spots.canal',
        latin: 'Grand Canal',
        linksFrom: [{ volume: 'hangzhou', chapter: 'scenic', id: 'canal' }],
    }),
    entry({
        id: 'ROBIN-39',
        slug: 'zhinan',
        path: '/hangzhou/linan/scenic/zhinan',
        parentPath: '/hangzhou/linan/scenic',
        volume: 'linan',
        chapter: 'scenic',
        catalogId: 'zhinan',
        catalogKind: 'spot',
        heroSlot: 'zhinan',
        image: '/images/spot-zhinan.webp',
        imagerySlotId: 'linan.scenic.spots.zhinan',
        latin: 'Zhinan Village',
        linksFrom: [{ volume: 'linan', chapter: 'scenic', id: 'zhinan' }],
    }),
]

export function getEntry(slug: string): GazetteerEntry | undefined {
    return gazetteerEntries.find((e) => e.slug === slug)
}

export function getEntryByPath(path: string): GazetteerEntry | undefined {
    const normalized = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
    return gazetteerEntries.find((e) => e.path === normalized)
}

/** Rest segments after /hangzhou/, e.g. `mountains/westlake` or `linan/mountains/tianmu`. */
export function getEntryByHangzhouRest(rest: string): GazetteerEntry | undefined {
    return getEntryByPath(`/hangzhou/${rest.replace(/^\/|\/$/g, '')}`)
}

export function entriesLinkedFrom(volume: string, chapter: ChapterKey, itemId: string): GazetteerEntry[] {
    return gazetteerEntries.filter((e) =>
        e.linksFrom.some((link) => link.volume === volume && link.chapter === chapter && link.id === itemId),
    )
}

/** Entries whose parent is this chapter, but that are not already linked from a 条 on it. */
export function extraEntriesForChapter(volume: string, chapter: ChapterKey): GazetteerEntry[] {
    return gazetteerEntries.filter(
        (e) =>
            e.volume === volume &&
            e.chapter === chapter &&
            !e.linksFrom.some((link) => link.volume === volume && link.chapter === chapter),
    )
}

export const CHAPTER_SEAL: Record<ChapterKey, string> = {
    mountains: '山',
    scenic: '景',
    culture: '物',
    history: '史',
}

export const entrySeoPages: {
    path: string
    key: string
    type: SeoPageType
    image: string
}[] = gazetteerEntries.map((e) => ({
    path: e.path,
    key: e.seoKey,
    type: 'entry',
    image: e.image,
}))
