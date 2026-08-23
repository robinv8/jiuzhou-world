import { anthologyVolumes, getVolumeContent, provinces, type Volume } from '@/i18n/catalogs'
import { messages } from '@/i18n/t'

export type SlotAspect = '16:9' | '3:2'

export type ImagerySlot = {
    id: string
    page: string
    kind: string
    label: string
    src: string
    aspect: SlotAspect
    search: string
    /** Extra toponyms in the same essay; studio switches one query at a time. */
    places?: string[]
}

export type ImageryPage = {
    path: string
    label: string
}

const VOLUME_ZH: Record<string, string> = {
    hangzhou: '杭州',
    linan: '临安',
    fuyang: '富阳',
    tonglu: '桐庐',
    jiande: '建德',
    chunan: '淳安',
    xiaoshan: '萧山',
}

const CHAPTER_ZH: Record<string, string> = {
    mountains: '山川',
    scenic: '景',
    culture: '物',
    history: '史',
}

function zhTitle(key: string, fallback: string): string {
    const { t } = messages('zh')
    const value = t(key)
    return !value || value === key ? fallback : value
}

function placeName(volume: string): string {
    return VOLUME_ZH[volume] ?? volume
}

function placeNames(item: { place: string; places?: string[] }): string[] {
    return [item.place, ...(item.places ?? [])]
}

function push(
    slots: ImagerySlot[],
    slot: ImagerySlot,
): void {
    slots.push(slot)
}

function volumeSlots(vol: Volume): ImagerySlot[] {
    const slots: ImagerySlot[] = []
    const place = placeName(vol.key)
    const content = getVolumeContent(vol.key)
    if (!content) return slots

    content.essays.forEach((essay) => {
        const title = zhTitle(`${vol.key}.mountains.essays.${essay.id}.title`, essay.latin)
        push(slots, {
            id: `${vol.key}.mountains.essays.${essay.id}`,
            page: `${vol.route}/mountains`,
            kind: 'essay',
            label: `${place} · 山川 · ${title}`,
            src: essay.image,
            aspect: '3:2',
            search: essay.place,
            places: placeNames(essay),
        })
    })

    content.spots.forEach((spot) => {
        const title = zhTitle(`${vol.key}.scenic.spots.${spot.id}.name`, spot.latin)
        push(slots, {
            id: `${vol.key}.scenic.spots.${spot.id}`,
            page: `${vol.route}/scenic`,
            kind: 'spot',
            label: `${place} · 景 · ${title}`,
            src: spot.image,
            aspect: '3:2',
            search: spot.place,
            places: placeNames(spot),
        })
    })

    content.history.forEach((entry) => {
        const title = zhTitle(`${vol.key}.history.entries.${entry.id}.title`, entry.id)
        push(slots, {
            id: `${vol.key}.history.entries.${entry.id}`,
            page: `${vol.route}/history`,
            kind: 'history',
            label: `${place} · 史 · ${title}`,
            src: entry.image,
            aspect: '3:2',
            search: entry.place,
            places: placeNames(entry),
        })
    })

    content.culture.forEach((item) => {
        const title = zhTitle(`${vol.key}.culture.items.${item.id}.title`, item.latin)
        push(slots, {
            id: `${vol.key}.culture.items.${item.id}`,
            page: `${vol.route}/culture`,
            kind: 'culture',
            label: `${place} · 物 · ${title}`,
            src: item.image,
            aspect: '3:2',
            search: item.place,
            places: placeNames(item),
        })
    })

    return slots
}

let cached: ImagerySlot[] | null = null

export function listSlots(): ImagerySlot[] {
    if (cached) return cached
    const slots: ImagerySlot[] = []

    push(slots, {
        id: 'home.hero',
        page: '/',
        kind: 'hero',
        label: '总目 · 封面',
        src: '/images/hero-jiuzhou.webp',
        aspect: '16:9',
        search: '千里江山图',
    })
    for (const vol of anthologyVolumes) {
        slots.push(...volumeSlots(vol))
    }

    cached = slots
    return slots
}

export function slotById(id: string): ImagerySlot | undefined {
    return listSlots().find((s) => s.id === id)
}

export function listStudioPages(): ImageryPage[] {
    const seen = new Map<string, string>()
    seen.set('/', '总目')
    for (const prov of provinces) {
        seen.set(prov.route, zhTitle(`province.${prov.key}.heroTitle`, prov.latin))
    }
    for (const vol of anthologyVolumes) {
        const place = placeName(vol.key)
        seen.set(vol.route, `${place}卷`)
        for (const ch of vol.chapters) {
            seen.set(`${vol.route}/${ch.key}`, `${place} · ${CHAPTER_ZH[ch.key] ?? ch.key}`)
        }
    }
    return [...seen.entries()].map(([path, label]) => ({ path, label }))
}

export function matchSlots(input: {
    path: string
    src: string | null
    slotId: string | null
}): ImagerySlot[] {
    const slots = listSlots()
    if (input.slotId) {
        const hit = slots.find((s) => s.id === input.slotId)
        return hit ? [hit] : []
    }
    const page = normalizePath(input.path)
    const src = normalizeSrc(input.src)
    if (!src) return []
    const onPage = slots.filter((s) => s.page === page && normalizeSrc(s.src) === src)
    if (onPage.length) return onPage
    return slots.filter((s) => normalizeSrc(s.src) === src)
}

export function normalizePath(pathname: string): string {
    let p = pathname.split('?')[0].split('#')[0]
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
    for (const locale of ['zh-hant', 'en', 'ja', 'ko']) {
        if (p === `/${locale}`) return '/'
        if (p.startsWith(`/${locale}/`)) {
            p = p.slice(locale.length + 1)
            if (!p.startsWith('/')) p = `/${p}`
        }
    }
    return p || '/'
}

function normalizeSrc(src: string | null): string {
    if (!src) return ''
    try {
        if (src.startsWith('http')) return new URL(src).pathname
    } catch {
        /* keep */
    }
    return src.split('?')[0]
}
