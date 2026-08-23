/**
 * Fetch toward 50 screened stills per unique place.
 * Does not tick 底 or enqueue — review and 确定 are manual.
 */
import fs from 'node:fs'
import path from 'node:path'
import { handleFetch, retagCandidateQueries } from './imagery-studio-plugin.mjs'

const ROOT = path.join(import.meta.dirname, '..')
const STATE = path.join(ROOT, '_photo_candidates', 'studio', 'state.json')
const QUEUE = path.join(ROOT, '_photo_candidates', 'studio', 'queue.json')
const BASE = 'http://localhost:4321'

const STOCK =
    /摄图网|昵图网|千库网|正版图片|高清图片下载|素材网|699pic|nipic\.com|588ku|58pic|huaban|pikbest|pngtree|vcg\.com|dashangu/i
const GUIDE = /攻略|门票|预订|自由行|客路|半日游|人工讲解/

function listPlaceSlots() {
    const lines = fs.readFileSync(path.join(ROOT, 'src/i18n/catalogs.ts'), 'utf8').split('\n')
    const slots = [{ id: 'home.hero', search: '千里江山图', aspect: '16:9' }]
    const volNames = new Set(['linan', 'hangzhou', 'fuyang', 'tonglu', 'jiande', 'chunan', 'xiaoshan'])
    const kindMap = {
        essays: 'mountains.essays',
        spots: 'scenic.spots',
        history: 'history.entries',
        culture: 'culture.items',
    }
    let vol = null
    let section = null
    for (const line of lines) {
        const vm = line.match(/^    ([a-z]+): \{/)
        if (vm && volNames.has(vm[1])) vol = vm[1]
        if (line.includes('essays:')) section = 'essays'
        if (line.includes('spots:')) section = 'spots'
        if (line.includes('history:')) section = 'history'
        if (line.includes('culture:')) section = 'culture'
        const im = line.match(/id: '([^']+)'.*place: '([^']+)'/)
        if (im && vol && section && kindMap[section]) {
            const id = `${vol}.${kindMap[section]}.${im[1]}`
            slots.push({
                id,
                search: im[2],
                aspect: '3:2',
            })
            const extras = line.match(/places: \[([^\]]*)\]/)
            if (extras) {
                for (const place of extras[1].matchAll(/'([^']+)'/g)) {
                    slots.push({
                        id,
                        search: place[1],
                        aspect: '3:2',
                    })
                }
            }
        }
    }
    return slots
}

function uniquePlaceSlots(slots = listPlaceSlots()) {
    const prefixVol = [
        ['临安', 'linan'],
        ['富阳', 'fuyang'],
        ['桐庐', 'tonglu'],
        ['建德', 'jiande'],
        ['淳安', 'chunan'],
        ['萧山', 'xiaoshan'],
        ['杭州', 'hangzhou'],
        ['海宁', 'hangzhou'],
    ]
    const owner = (place) => {
        for (const [p, v] of prefixVol) if (place.startsWith(p)) return v
        return null
    }
    const byPlace = new Map()
    for (const slot of slots) {
        const prev = byPlace.get(slot.search)
        if (!prev) {
            byPlace.set(slot.search, slot)
            continue
        }
        const o = owner(slot.search)
        if (o && slot.id.startsWith(`${o}.`) && !prev.id.startsWith(`${o}.`)) {
            byPlace.set(slot.search, slot)
        }
    }
    const byId = new Map()
    for (const slot of slots) {
        const list = byId.get(slot.id) ?? []
        if (!list.includes(slot.search)) list.push(slot.search)
        byId.set(slot.id, list)
    }
    return [...byPlace.values()].map((slot) => ({
        ...slot,
        places: byId.get(slot.id) ?? [slot.search],
    }))
}

function usable(c) {
    const hay = `${c.title || ''} ${c.commons || ''}`
    if (STOCK.test(hay) || GUIDE.test(hay)) return false
    return true
}

async function api(pathname, body, timeoutMs = 30000) {
    const res = await fetch(`${BASE}${pathname}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(timeoutMs),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || res.statusText)
    return data
}

function readSlot(id) {
    try {
        const state = JSON.parse(fs.readFileSync(STATE, 'utf8'))
        return state.slots?.[id] ?? { candidates: [] }
    } catch {
        return { candidates: [] }
    }
}

export { listPlaceSlots, uniquePlaceSlots, usable }

function countQuery(slotId, query) {
    const cands = readSlot(slotId).candidates || []
    const short = query.replace(/^(杭州|临安|富阳|桐庐|建德|淳安|萧山|海宁|中国)/, '')
    return cands.filter((c) => {
        if ((c.query || '') === query) return true
        if (c.query) return false
        const hay = String(c.title || '').replace(/\s+/g, '')
        return hay.includes(query) || (short.length >= 3 && hay.includes(short))
    }).length
}

async function processSlot(slot) {
    const row = {
        id: slot.id,
        query: slot.search,
        via: 'handleFetch',
        kept: 0,
        added: 0,
        skipped: false,
        error: null,
    }
    try {
        const have = countQuery(slot.id, slot.search)
        if (have >= 50) {
            row.kept = have
            row.skipped = true
            return row
        }
        const result = await handleFetch(slot.id, slot.search, 'bing', slot.aspect, slot.places)
        row.added = result.added
        row.kept = countQuery(slot.id, slot.search)
    } catch (err) {
        row.error = String(err.message || err)
    }
    return row
}

const isMain = process.argv[1] && path.normalize(process.argv[1]).endsWith('fetch-place-stills.mjs')
if (isMain) {
    const slots = uniquePlaceSlots()
    const placesBySlot = Object.fromEntries(slots.map((s) => [s.id, s.places]))
    const retagged = retagCandidateQueries(placesBySlot)
    console.log(`[fetch] retagged ${retagged}; will not tick 底 or enqueue`)
    const only = process.argv[2]
    const picked = only
        ? slots.filter((s) => s.id === only || s.search === only)
        : slots
    console.log(`[fetch] ${picked.length} unique places`)
    const tally = []
    for (let i = 0; i < picked.length; i++) {
        const slot = picked[i]
        process.stdout.write(`[fetch] ${i + 1}/${picked.length} ${slot.id} ${slot.search} … `)
        const row = await processSlot(slot)
        tally.push(row)
        console.log(
            row.error
                ? `ERR ${row.error}`
                : row.skipped
                  ? `skip have ${row.kept}`
                  : `added ${row.added} kept ${row.kept}`,
        )
        fs.writeFileSync(
            path.join(ROOT, '_photo_candidates', 'studio', 'fetch-tally.json'),
            JSON.stringify(tally, null, 2),
        )
    }
    console.log(`[fetch] done ${tally.length}`)
}
