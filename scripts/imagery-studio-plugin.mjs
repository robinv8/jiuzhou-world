import fs from 'node:fs'
import path from 'node:path'
import { Readable } from 'node:stream'

const UA = 'jiuzhou-world-imagery-studio/1.0 (local gazetteer workbench)'
const BROWSER_UA =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
const STUDIO_DIR = path.join(process.cwd(), '_photo_candidates', 'studio')
const ARTIFACTS_DIR = path.join(process.cwd(), 'artifacts', 'image-compare')
const STATE_FILE = path.join(STUDIO_DIR, 'state.json')
const QUEUE_FILE = path.join(STUDIO_DIR, 'queue.json')

const STUDIO_HTML = `<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>配图</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Noto+Serif+SC:wght@400;600;700&display=swap" />
</head>
<body class="m-0 bg-[#111614] text-[#e8ebe4]">
    <div id="root"></div>
    <script type="module">
        import RefreshRuntime from '/@react-refresh'
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
    </script>
    <script type="module" src="/src/studio/main.tsx"></script>
</body>
</html>
`

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true })
}

function readJson(file, fallback) {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'))
    } catch {
        return fallback
    }
}

function writeJson(file, data) {
    ensureDir(path.dirname(file))
    fs.writeFileSync(file, JSON.stringify(data, null, 4))
}

function loadState() {
    return readJson(STATE_FILE, { slots: {} })
}

function saveState(state) {
    writeJson(STATE_FILE, state)
}

/** Write one slot without clobbering other slots or user 勾底 during a long fetch. */
function commitSlot(id, slot) {
    const latest = loadState()
    const live = latest.slots[id]
    if (live?.candidates?.length) {
        const incoming = new Map(slot.candidates.map((c) => [c.id, c]))
        for (const cand of live.candidates) {
            const inc = incoming.get(cand.id)
            if (inc) {
                if (cand.confirmed) inc.confirmed = true
                if (cand.query && !inc.query) inc.query = cand.query
            } else {
                slot.candidates.push(cand)
            }
        }
    }
    latest.slots[id] = {
        ...(live ?? {}),
        ...slot,
        candidates: slot.candidates,
        queuedAt: live?.queuedAt ?? slot.queuedAt ?? null,
    }
    saveState(latest)
}

function slotKey(id) {
    if (!/^[a-z0-9][a-z0-9._-]*$/i.test(id)) {
        throw new Error('invalid slot id')
    }
    return id
}

function slotDir(id) {
    return path.join(STUDIO_DIR, slotKey(id))
}

function generatedDir(id) {
    return path.join(slotDir(id), 'generated')
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        const chunks = []
        req.on('data', (c) => chunks.push(c))
        req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
        req.on('error', reject)
    })
}

function sendJson(res, code, data) {
    res.statusCode = code
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(data))
}

function mimeFor(file) {
    const ext = path.extname(file).toLowerCase()
    if (ext === '.png') return 'image/png'
    if (ext === '.webp') return 'image/webp'
    if (ext === '.gif') return 'image/gif'
    return 'image/jpeg'
}

function listGenerated(id) {
    const items = []
    const dir = generatedDir(id)
    if (fs.existsSync(dir)) {
        for (const name of fs.readdirSync(dir)) {
            if (!/\.(jpe?g|png|webp)$/i.test(name)) continue
            const full = path.join(dir, name)
            const stat = fs.statSync(full)
            items.push({
                id: name,
                url: `/_studio/media/${id}/generated/${encodeURIComponent(name)}`,
                name,
                mtime: stat.mtime.toISOString(),
            })
        }
    }
    const prefix = id.replace(/\./g, '-')
    if (fs.existsSync(ARTIFACTS_DIR)) {
        for (const name of fs.readdirSync(ARTIFACTS_DIR)) {
            if (!/\.(jpe?g|png|webp)$/i.test(name)) continue
            if (!name.startsWith(prefix)) continue
            const full = path.join(ARTIFACTS_DIR, name)
            const stat = fs.statSync(full)
            items.push({
                id: `artifact:${name}`,
                url: `/_studio/artifact/${encodeURIComponent(name)}`,
                name,
                mtime: stat.mtime.toISOString(),
            })
        }
    }
    return items.sort((a, b) => (a.mtime < b.mtime ? 1 : -1))
}

function slotState(id) {
    const state = loadState()
    const current = state.slots[id] ?? { slotId: id, query: '', candidates: [], queuedAt: null }
    return {
        ...current,
        generated: listGenerated(id),
    }
}

async function commonsSearch(query) {
    const api =
        'https://commons.wikimedia.org/w/api.php?' +
        new URLSearchParams({
            action: 'query',
            generator: 'search',
            gsrsearch: query,
            gsrnamespace: '6',
            gsrlimit: '50',
            prop: 'imageinfo',
            iiprop: 'url|size|mime',
            iiurlwidth: '1280',
            format: 'json',
        })
    const res = await fetch(api, { headers: { 'User-Agent': UA } })
    if (!res.ok) throw new Error(`Wikimedia ${res.status}`)
    const data = await res.json()
    const pages = Object.values(data.query?.pages ?? {})
    return pages
        .map((page) => {
            const info = (page.imageinfo && page.imageinfo[0]) || null
            if (!info) return null
            const mime = info.mime || ''
            if (!mime.startsWith('image/') || mime.includes('svg')) return null
            return {
                title: page.title,
                url: info.thumburl || info.url,
                width: info.thumbwidth || info.width,
                height: info.thumbheight || info.height,
                mime,
                page: `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
                source: 'commons',
            }
        })
        .filter(Boolean)
}

function decodeEntities(s) {
    return s
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
}

function bingThumb(turl) {
    if (!turl) return ''
    if (!/mm\.bing\.net\/th/.test(turl)) return turl
    const u = new URL(turl)
    if (!u.searchParams.has('w')) u.searchParams.set('w', '1280')
    return u.toString()
}

function cleanBingTitle(s) {
    return String(s || '')
        .replace(/[\uE000-\uF8FF]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
}

const SCAN_LIMIT = 180
const DOWNLOAD_LIMIT = 50
const KEEP_TARGET = 50
const QUEUE_PICK = 5
const CITY_RE = /^(杭州|临安|富阳|桐庐|建德|淳安|萧山|海宁|中国)/

function shortPlace(place) {
    return String(place || '').replace(CITY_RE, '')
}

function inferPlace(title, places) {
    if (!places?.length) return ''
    const hay = String(title || '').replace(/\s+/g, '')
    let best = ''
    let bestLen = 0
    for (const place of places) {
        const short = shortPlace(place)
        if (hay.includes(place) || (short.length >= 2 && hay.includes(short))) {
            const n = Math.max(place.length, short.length)
            if (n > bestLen) {
                best = place
                bestLen = n
            }
        }
    }
    return best
}

function stampQueries(current, places) {
    if (!current?.candidates) return
    for (const cand of current.candidates) {
        if (!cand.query) {
            cand.query = inferPlace(cand.title, places) || ''
        }
    }
}

function matchesQuery(cand, query) {
    if (!query) return true
    return (cand.query || '') === query
}

const REJECT_HOST = [
    'qunar.com',
    'ctrip.com',
    'mafengwo.cn',
    'lvmama.com',
    'tuniu.com',
    'zhihu.com',
    'baike.baidu.com',
    'baike.com',
    'vjshi.com',
    'iqiyi.com',
    'youku.com',
    'bilibili.com',
    'klook.cn',
    'klook.com',
    'fliggy.com',
]
const DEMOTE_HOST = [
    '699pic.com',
    'nipic.com',
    '588ku.com',
    '58pic.com',
    'huaban.com',
    'pikbest.com',
    'pngtree.com',
    'vcg.com',
    'dashangu.com',
]
const REJECT_TEXT =
    /攻略|门票|预订|自由行|游记点评|视频素材|高清视频|百度百科|示意图|导游图|路线图|导览图|logo|微信|二维码|竣工验收|说明书|课件|ppt|客路|半日游|人工讲解|画舫船体验/i
const STOCK_TEXT = /正版图片|高清图片下载|摄影图库|千库网|摄图网|昵图网|素材网/i

function bingImagesUrl(query, aspect, first = 1) {
    const qft =
        aspect === '16:9'
            ? '+filterui:photo-photo+filterui:imagesize-large+filterui:aspect-wide'
            : '+filterui:photo-photo+filterui:imagesize-large'
    return (
        'https://cn.bing.com/images/search?' +
        new URLSearchParams({
            q: query,
            form: 'BESBTB',
            first: String(first),
            ensearch: '1',
            qft,
        })
    )
}

function hostOf(url) {
    try {
        return new URL(url).hostname.replace(/^www\./, '')
    } catch {
        return ''
    }
}

function hostMatch(host, list) {
    return list.some((d) => host === d || host.endsWith(`.${d}`))
}

function mentionsPlace(hit, query) {
    const hay = `${hit.title}${hit.page}${hit.url}`.replace(/\s+/g, '').toLowerCase()
    const q = query.replace(/\s+/g, '')
    const cityM = q.match(/^(杭州|临安|富阳|桐庐|建德|淳安|萧山|海宁|浙江)(.*)$/)
    const city = cityM ? cityM[1] : ''
    let rest = cityM ? cityM[2] : q
    rest = rest.replace(/^(中国|国家)/, '')
    const restNeedles = [rest]
    if (/^[东西南北]/.test(rest) && rest.length >= 4) restNeedles.push(rest.slice(1))
    const restHit = restNeedles.some((n) => n.length >= 2 && hay.includes(n.toLowerCase()))
    if (!restHit) return false
    if (city && /[江河溪]$/.test(rest) && !hay.includes(city)) return false
    return true
}

function classifyHit(hit, query) {
    const host = hostOf(hit.page) || hostOf(hit.murl) || hostOf(hit.url)
    const text = `${hit.title} ${hit.page}`
    if (REJECT_TEXT.test(text)) return { bin: 'reject', reason: 'guide' }
    if (hostMatch(host, REJECT_HOST)) return { bin: 'reject', reason: 'host' }
    if (!mentionsPlace(hit, query)) return { bin: 'reject', reason: 'place' }
    if (hostMatch(host, DEMOTE_HOST) || STOCK_TEXT.test(text)) return { bin: 'demote', reason: 'stock' }
    return { bin: 'keep', reason: 'ok' }
}

function bump(dropped, reason) {
    dropped[reason] = (dropped[reason] || 0) + 1
}

function parseBingHits(html, seen, hits) {
    const re = /\bm="(\{[^"]+\})"/g
    let match
    while ((match = re.exec(html))) {
        let data
        try {
            data = JSON.parse(decodeEntities(match[1]))
        } catch {
            continue
        }
        const murl = data.murl || ''
        const turl = data.turl || ''
        const key = data.md5 || murl || turl
        if (!key || seen.has(key)) continue
        if (/\.svg(\?|$)/i.test(murl) || /\.svg(\?|$)/i.test(turl)) continue
        seen.add(key)
        hits.push({
            title: cleanBingTitle(data.t || data.desc || 'bing') || key,
            url: bingThumb(turl) || murl,
            murl,
            fallback: murl && murl !== turl ? murl : '',
            width: 0,
            height: 0,
            page: data.purl || '',
            md5: data.md5 || '',
            source: 'bing',
        })
        if (hits.length >= SCAN_LIMIT) break
    }
}

async function bingSearch(query, aspect) {
    const hits = []
    const seen = new Set()
    for (const first of [1, 36, 71, 106, 141]) {
        if (hits.length >= SCAN_LIMIT) break
        const url = bingImagesUrl(query, aspect, first)
        const res = await fetch(url, {
            headers: {
                'User-Agent': BROWSER_UA,
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                Accept: 'text/html,application/xhtml+xml',
                Referer: 'https://cn.bing.com/',
            },
            signal: AbortSignal.timeout(20000),
        })
        if (!res.ok) throw new Error(`Bing ${res.status}`)
        const html = await res.text()
        const before = hits.length
        parseBingHits(html, seen, hits)
        if (hits.length === before) break
    }
    if (!hits.length) throw new Error('Bing 没有返回图片，换个词试试')
    return hits
}

export { bingImagesUrl }

function safeName(title, index) {
    const base = title
        .replace(/^File:/, '')
        .replace(/\.[^.]+$/, '')
        .replace(/[^\w\u4e00-\u9fff.-]+/g, '_')
        .slice(0, 60)
    return `${String(index).padStart(3, '0')}-${base || 'ref'}.jpg`
}

function readImageSize(buf) {
    if (buf.length < 24) return null
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
        return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
    }
    if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) {
        return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) }
    }
    if (buf[0] === 0xff && buf[1] === 0xd8) {
        let i = 2
        while (i < buf.length - 8) {
            if (buf[i] !== 0xff) {
                i += 1
                continue
            }
            const marker = buf[i + 1]
            if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
                return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) }
            }
            if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
                i += 2
                continue
            }
            const len = buf.readUInt16BE(i + 2)
            if (len < 2) break
            i += 2 + len
        }
    }
    if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
        const kind = buf.toString('ascii', 12, 16)
        if (kind === 'VP8X' && buf.length >= 30) {
            return {
                width: 1 + buf[24] + (buf[25] << 8) + (buf[26] << 16),
                height: 1 + buf[27] + (buf[28] << 8) + (buf[29] << 16),
            }
        }
        if (kind === 'VP8 ' && buf.length >= 30) {
            return {
                width: buf.readUInt16LE(26) & 0x3fff,
                height: buf.readUInt16LE(28) & 0x3fff,
            }
        }
    }
    return null
}

function inspectImage(buf, aspect) {
    if (buf.length < 40_000) return { ok: false, reason: 'small' }
    const size = readImageSize(buf)
    if (!size) return { ok: true, width: 0, height: 0 }
    const { width, height } = size
    if (width < 560 || height < 320 || width * height < 220_000) {
        return { ok: false, reason: 'small' }
    }
    const ar = width / height
    if (ar > 3.2 || ar < 0.45) return { ok: false, reason: 'small' }
    if (aspect === '16:9' && ar < 1.05) return { ok: false, reason: 'small' }
    return { ok: true, width, height }
}

async function downloadBuffer(url, extraHeaders = {}) {
    const res = await fetch(url, {
        headers: {
            'User-Agent': extraHeaders['User-Agent'] || UA,
            ...extraHeaders,
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`download ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 80 || buf.length > 12_000_000) throw new Error('bad size')
    const head = buf.subarray(0, 16).toString('utf8').toLowerCase()
    if (head.includes('<!doctype') || head.includes('<html')) throw new Error('html not image')
    return buf
}

async function fetchHitBuffer(hit) {
    const headers =
        hit.source === 'bing'
            ? { 'User-Agent': BROWSER_UA, Referer: 'https://www.bing.com/' }
            : { 'User-Agent': UA }
    try {
        return await downloadBuffer(hit.url, headers)
    } catch {
        if (hit.fallback) return downloadBuffer(hit.fallback, headers)
        throw new Error('download failed')
    }
}

async function mapPool(items, limit, fn) {
    const ret = new Array(items.length)
    let i = 0
    async function worker() {
        while (i < items.length) {
            const idx = i
            i += 1
            ret[idx] = await fn(items[idx], idx)
        }
    }
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()))
    return ret
}

function pickHits(hits, query, dropped) {
    const keep = []
    const demote = []
    const seenTitle = new Set()
    for (const hit of hits) {
        const titleKey = hit.title.replace(/[|｜].*$/, '').replace(/\s+/g, '').slice(0, 24)
        if (seenTitle.has(titleKey)) {
            bump(dropped, 'dup')
            continue
        }
        seenTitle.add(titleKey)
        const { bin, reason } = classifyHit(hit, query)
        if (bin === 'reject') {
            bump(dropped, reason)
            continue
        }
        if (bin === 'demote') demote.push(hit)
        else keep.push(hit)
    }
    const picked = keep.slice(0, KEEP_TARGET)
    if (picked.length < KEEP_TARGET) {
        picked.push(...demote.slice(0, KEEP_TARGET - picked.length))
    }
    return picked
}

export function retagCandidateQueries(placesBySlot) {
    const state = loadState()
    let n = 0
    for (const [id, places] of Object.entries(placesBySlot ?? {})) {
        const current = state.slots[id]
        if (!current?.candidates?.length || !places?.length) continue
        for (const cand of current.candidates) {
            const inferred = inferPlace(cand.title, places)
            if (inferred && cand.query !== inferred) {
                cand.query = inferred
                n += 1
            }
        }
    }
    saveState(state)
    return n
}

export { pickHits, KEEP_TARGET, DOWNLOAD_LIMIT, SCAN_LIMIT, QUEUE_PICK, handleFetch, inferPlace }

export function clearSlot(id, query, places) {
    const key = slotKey(id)
    const dir = slotDir(key)
    const state = loadState()
    const prev = state.slots[key] ?? { slotId: key, query: '', candidates: [], queuedAt: null }
    stampQueries(prev, places)
    const q = String(query || '').trim()
    const drop = q ? prev.candidates.filter((c) => matchesQuery(c, q)) : prev.candidates
    const keep = q ? prev.candidates.filter((c) => !matchesQuery(c, q)) : []
    for (const cand of drop) {
        const full = path.join(dir, cand.filename)
        if (cand.filename && fs.existsSync(full) && fs.statSync(full).isFile()) fs.unlinkSync(full)
    }
    state.slots[key] = {
        ...prev,
        candidates: keep,
        query: q || '',
        queuedAt: q ? prev.queuedAt : null,
    }
    saveState(state)
    writeJson(
        QUEUE_FILE,
        readJson(QUEUE_FILE, []).filter((item) => {
            if (item.slotId !== key) return true
            if (!q) return false
            return item.query !== q
        }),
    )
    return slotState(key)
}

export function confirmBy(id, predicate) {
    const key = slotKey(id)
    const state = loadState()
    const current = state.slots[key]
    if (!current) throw new Error('no candidates yet')
    let n = 0
    for (const cand of current.candidates) {
        cand.confirmed = Boolean(predicate(cand))
        if (cand.confirmed) n += 1
    }
    saveState(state)
    return n
}

/** Confirm at most `limit` usable stills (largest first, skip near-duplicate titles). */
export function selectTop(id, predicate, limit = QUEUE_PICK, query) {
    const key = slotKey(id)
    const state = loadState()
    const current = state.slots[key]
    if (!current) throw new Error('no candidates yet')
    const q = query || current.query || ''
    const ranked = [...current.candidates]
        .filter((c) => matchesQuery(c, q))
        .filter((c) => predicate(c))
        .sort((a, b) => (b.width || 0) * (b.height || 0) - (a.width || 0) * (a.height || 0))
    const picked = new Set()
    const seen = new Set()
    for (const cand of ranked) {
        const titleKey = String(cand.title || '')
            .replace(/[|｜].*$/, '')
            .replace(/\s+/g, '')
            .slice(0, 16)
        if (seen.has(titleKey)) continue
        seen.add(titleKey)
        picked.add(cand.id)
        if (picked.size >= limit) break
    }
    for (const cand of current.candidates) {
        if (!matchesQuery(cand, q)) continue
        cand.confirmed = picked.has(cand.id)
    }
    saveState(state)
    return picked.size
}

export function enqueueSlot(id, aspect, query, places) {
    const key = slotKey(id)
    const state = loadState()
    const current = state.slots[key]
    if (!current) throw new Error('no candidates yet')
    stampQueries(current, places)
    const q = String(query || current.query || '').trim()
    const confirmed = current.candidates.filter((c) => c.confirmed && matchesQuery(c, q))
    if (!confirmed.length) throw new Error('no confirmed refs')
    current.query = q
    current.queuedAt = new Date().toISOString()
    state.slots[key] = current
    saveState(state)
    const queue = readJson(QUEUE_FILE, [])
    const item = {
        slotId: key,
        queuedAt: current.queuedAt,
        aspect: aspect || '16:9',
        query: q,
        refs: confirmed.map((c) => path.join(slotDir(key), c.filename)),
    }
    const next = queue.filter((row) => !(row.slotId === key && (row.query || '') === q))
    next.push(item)
    writeJson(QUEUE_FILE, next)
    return item
}

async function handleFetch(id, query, source, aspect, places) {
    const rawHits = source === 'commons' ? await commonsSearch(query) : await bingSearch(query, aspect)
    const dropped = {}
    const hits =
        source === 'commons'
            ? rawHits.filter((hit) => {
                  if (REJECT_TEXT.test(hit.title) || /map|diagram|logo/i.test(hit.title)) {
                      bump(dropped, 'guide')
                      return false
                  }
                  return true
              }).slice(0, DOWNLOAD_LIMIT)
            : pickHits(rawHits, query, dropped)
    const dir = slotDir(id)
    ensureDir(dir)
    const state = loadState()
    const current = state.slots[id] ?? { slotId: id, query, candidates: [], queuedAt: null }
    stampQueries(current, places)
    const have = current.candidates.filter((c) => matchesQuery(c, query)).length
    const room = Math.max(0, KEEP_TARGET - have)
    const existing = new Set(current.candidates.map((c) => c.title))
    const toFetch = hits.filter((hit) => {
        if (existing.has(hit.title)) {
            bump(dropped, 'dup')
            return false
        }
        return true
    })
    const added = []
    let i = current.candidates.length
    if (!room) {
        const latest = loadState()
        if (latest.slots[id]) latest.slots[id].query = query
        else latest.slots[id] = { ...current, query }
        saveState(latest)
        return { added: 0, dropped, slot: slotState(id) }
    }
    const buffers = await mapPool(toFetch, 6, async (hit) => {
        try {
            let buf = await fetchHitBuffer(hit)
            let info = inspectImage(buf, aspect)
            if (!info.ok && hit.fallback) {
                try {
                    buf = await downloadBuffer(
                        hit.fallback,
                        hit.source === 'bing'
                            ? { 'User-Agent': BROWSER_UA, Referer: 'https://www.bing.com/' }
                            : { 'User-Agent': UA },
                    )
                    info = inspectImage(buf, aspect)
                } catch {
                    /* keep first verdict */
                }
            }
            if (!info.ok) return { hit, skip: info.reason }
            return { hit, buf, width: info.width, height: info.height }
        } catch {
            return { hit, skip: 'fail' }
        }
    })
    for (const row of buffers) {
        if (row.skip) {
            bump(dropped, row.skip)
            continue
        }
        if (added.length >= room) break
        i += 1
        const filename = safeName(row.hit.title, i)
        fs.writeFileSync(path.join(dir, filename), row.buf)
        const candidate = {
            id: filename,
            title: row.hit.title,
            source: row.hit.source,
            commons: row.hit.page,
            filename,
            query,
            width: row.width,
            height: row.height,
            confirmed: false,
        }
        current.candidates.push(candidate)
        added.push(candidate)
    }
    current.query = query
    commitSlot(id, current)
    return { added: added.length, dropped, slot: slotState(id) }
}

async function handleApi(req, res, url) {
    const route = url.pathname.replace(/^\/_studio\/api\//, '')
    if (req.method === 'GET' && route === 'state') {
        const id = url.searchParams.get('slot')
        if (!id) return sendJson(res, 400, { error: 'slot required' })
        return sendJson(res, 200, slotState(slotKey(id)))
    }
    if (req.method === 'GET' && route === 'queue') {
        return sendJson(res, 200, readJson(QUEUE_FILE, []))
    }
    if (req.method !== 'POST') return sendJson(res, 405, { error: 'method' })

    const body = JSON.parse((await readBody(req)) || '{}')
    if (route === 'fetch') {
        const id = slotKey(body.slotId)
        const query = String(body.query || '').trim()
        if (!query) return sendJson(res, 400, { error: 'query required' })
        const source = body.source === 'commons' ? 'commons' : 'bing'
        const aspect = body.aspect === '3:2' ? '3:2' : '16:9'
        try {
            const result = await handleFetch(id, query, source, aspect, body.places)
            if (source === 'bing') result.bingUrl = bingImagesUrl(query, aspect)
            return sendJson(res, 200, result)
        } catch (err) {
            return sendJson(res, 502, { error: String(err.message || err) })
        }
    }
    if (route === 'confirm') {
        const id = slotKey(body.slotId)
        const state = loadState()
        const current = state.slots[id]
        if (!current) return sendJson(res, 404, { error: 'no candidates yet' })
        stampQueries(current, body.places)
        const cand = current.candidates.find((c) => c.id === body.candidateId)
        if (!cand) return sendJson(res, 404, { error: 'candidate not found' })
        cand.confirmed = Boolean(body.confirmed)
        if (!cand.query && body.query) cand.query = String(body.query)
        saveState(state)
        return sendJson(res, 200, slotState(id))
    }
    if (route === 'query') {
        const id = slotKey(body.slotId)
        const state = loadState()
        const current = state.slots[id] ?? { slotId: id, query: '', candidates: [], queuedAt: null }
        current.query = String(body.query || '')
        state.slots[id] = current
        saveState(state)
        return sendJson(res, 200, slotState(id))
    }
    if (route === 'clear') {
        return sendJson(res, 200, clearSlot(body.slotId, body.query, body.places))
    }
    if (route === 'queue') {
        try {
            const item = enqueueSlot(body.slotId, body.aspect, body.query, body.places)
            return sendJson(res, 200, { queue: readJson(QUEUE_FILE, []), item, slot: slotState(slotKey(body.slotId)) })
        } catch (err) {
            return sendJson(res, 400, { error: String(err.message || err) })
        }
    }
    return sendJson(res, 404, { error: 'unknown api' })
}

function handleMedia(res, pathname, root, prefix) {
    const rel = decodeURIComponent(pathname.slice(prefix.length))
    const full = path.resolve(root, rel)
    if (!full.startsWith(path.resolve(root))) {
        res.statusCode = 403
        res.end('forbidden')
        return
    }
    if (!fs.existsSync(full) || !fs.statSync(full).isFile()) {
        res.statusCode = 404
        res.end('not found')
        return
    }
    res.statusCode = 200
    res.setHeader('Content-Type', mimeFor(full))
    res.setHeader('Cache-Control', 'no-cache')
    Readable.from(fs.readFileSync(full)).pipe(res)
}

function isStudioArtifact(file) {
    const n = String(file || '').replace(/\\/g, '/')
    return n.includes('/_photo_candidates/') || n.includes('/artifacts/')
}

function ignoreStudioWatch(server) {
    const extraIgnore = [STUDIO_DIR, ARTIFACTS_DIR, path.join(STUDIO_DIR, '**'), path.join(ARTIFACTS_DIR, '**')]
    for (const dir of extraIgnore) {
        try {
            server.watcher.unwatch(dir)
        } catch {
            /* watcher may not be ready */
        }
    }
}

export function unconfirmAll() {
    const state = loadState()
    let n = 0
    for (const slot of Object.values(state.slots ?? {})) {
        for (const cand of slot.candidates ?? []) {
            if (cand.confirmed) {
                cand.confirmed = false
                n += 1
            }
        }
        slot.queuedAt = null
    }
    saveState(state)
    return n
}

export function clearQueueFile() {
    writeJson(QUEUE_FILE, [])
}

export function imageryStudio() {
    return {
        name: 'imagery-studio',
        apply: 'serve',
        handleHotUpdate({ file }) {
            if (isStudioArtifact(file)) return []
        },
        configureServer(server) {
            ignoreStudioWatch(server)
            server.watcher.on('add', (file) => {
                if (isStudioArtifact(file)) server.watcher.unwatch(file)
            })
            server.watcher.on('change', (file) => {
                if (isStudioArtifact(file)) server.watcher.unwatch(file)
            })
            server.middlewares.use(async (req, res, next) => {
                const raw = req.url || ''
                let url
                try {
                    url = new URL(raw, 'http://127.0.0.1')
                } catch {
                    next()
                    return
                }
                try {
                    if (url.pathname === '/_studio' || url.pathname === '/_studio/') {
                        res.statusCode = 200
                        res.setHeader('Content-Type', 'text/html; charset=utf-8')
                        res.end(STUDIO_HTML)
                        return
                    }
                    if (url.pathname.startsWith('/_studio/api/')) {
                        await handleApi(req, res, url)
                        return
                    }
                    if (url.pathname.startsWith('/_studio/media/')) {
                        handleMedia(res, url.pathname, STUDIO_DIR, '/_studio/media/')
                        return
                    }
                    if (url.pathname.startsWith('/_studio/artifact/')) {
                        handleMedia(res, url.pathname, ARTIFACTS_DIR, '/_studio/artifact/')
                        return
                    }
                } catch (err) {
                    sendJson(res, 500, { error: String(err.message || err) })
                    return
                }
                next()
            })
        },
    }
}
