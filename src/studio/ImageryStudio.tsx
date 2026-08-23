import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
    listStudioPages,
    matchSlots,
    type ImagerySlot,
} from '@/lib/imagery-slots'

type Candidate = {
    id: string
    title: string
    commons: string
    filename: string
    query?: string
    width: number
    height: number
    confirmed: boolean
    source?: 'bing' | 'commons'
}

type Generated = {
    id: string
    url: string
    name: string
    mtime: string
}

type SlotState = {
    slotId: string
    query: string
    candidates: Candidate[]
    queuedAt: string | null
    generated: Generated[]
}

type QueueItem = {
    slotId: string
    query?: string
    refs?: string[]
}

const CITY_RE = /^(杭州|临安|富阳|桐庐|建德|淳安|萧山|海宁|中国)/

function placeShort(place: string): string {
    return place.replace(CITY_RE, '') || place
}

function inferPlace(title: string, places: string[]): string {
    const hay = title.replace(/\s+/g, '')
    let best = ''
    let bestLen = 0
    for (const place of places) {
        const short = placeShort(place)
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

function candidatePlace(candidate: Candidate, places: string[], fallback: string): string {
    return candidate.query || inferPlace(candidate.title, places) || fallback
}

type SelectMsg = {
    type: 'imagery:select'
    slotId: string | null
    src: string | null
    alt: string
    path: string
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(path, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers ?? {}),
        },
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || res.statusText)
    return data as T
}

function candidateUrl(slotId: string, filename: string): string {
    return `/_studio/media/${slotId}/${encodeURIComponent(filename)}`
}

const SIDE_KEY = 'jiuzhou-studio-side'
const PAGE_KEY = 'jiuzhou-studio-page'
const SIDE_MIN = 380
const SIDE_DEFAULT = 640
const PREVIEW_MIN = 280

function readStudioPage(): string {
    if (typeof window === 'undefined') return '/hangzhou'
    return window.sessionStorage.getItem(PAGE_KEY) || '/hangzhou'
}

function clampSide(width: number, viewport = typeof window === 'undefined' ? 1280 : window.innerWidth): number {
    const max = Math.max(SIDE_MIN, viewport - PREVIEW_MIN)
    return Math.min(max, Math.max(SIDE_MIN, Math.round(width)))
}

function readSideWidth(): number {
    if (typeof window === 'undefined') return SIDE_DEFAULT
    const n = Number(window.localStorage.getItem(SIDE_KEY))
    return Number.isFinite(n) ? clampSide(n) : SIDE_DEFAULT
}

export default function ImageryStudio() {
    const pages = useMemo(() => listStudioPages(), [])
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [page, setPage] = useState(readStudioPage)
    const [iframePath, setIframePath] = useState(readStudioPage)
    const [slot, setSlot] = useState<ImagerySlot | null>(null)
    const [altSlots, setAltSlots] = useState<ImagerySlot[]>([])
    const [state, setState] = useState<SlotState | null>(null)
    const [query, setQuery] = useState('')
    const [source, setSource] = useState<'bing' | 'commons'>('bing')
    const [busy, setBusy] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [filterNote, setFilterNote] = useState('')
    const [queueCount, setQueueCount] = useState(0)
    const [slotQueued, setSlotQueued] = useState(false)
    const [sideWidth, setSideWidth] = useState(SIDE_DEFAULT)
    const [dragging, setDragging] = useState(false)
    const dragRef = useRef<{ startX: number; startW: number } | null>(null)
    const sideRef = useRef(SIDE_DEFAULT)

    useEffect(() => {
        const width = readSideWidth()
        sideRef.current = width
        setSideWidth(width)
        const onResize = () => {
            const next = clampSide(sideRef.current)
            sideRef.current = next
            setSideWidth(next)
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const refreshQueue = useCallback(async (slotId?: string, place?: string) => {
        const items = await api<QueueItem[]>('/_studio/api/queue')
        setQueueCount(items.length)
        if (slotId) {
            setSlotQueued(
                items.some((item) => item.slotId === slotId && (!place || (item.query || '') === place)),
            )
        }
    }, [])

    useEffect(() => {
        void refreshQueue()
    }, [refreshQueue])

    const loadState = useCallback(async (slotId: string, place?: string) => {
        const next = await api<SlotState>(`/_studio/api/state?slot=${encodeURIComponent(slotId)}`)
        setState(next)
        await refreshQueue(slotId, place)
    }, [refreshQueue])

    const selectSlot = useCallback(
        async (next: ImagerySlot, others: ImagerySlot[] = []) => {
            setSlot(next)
            setState(null)
            setQuery(next.search)
            setAltSlots(others.filter((s) => s.id !== next.id))
            setError(null)
            setFilterNote('')
            iframeRef.current?.contentWindow?.postMessage(
                { type: 'imagery:highlight', slotId: next.id, src: next.src },
                '*',
            )
            try {
                await loadState(next.id, next.search)
            } catch (err) {
                setError(String(err))
            }
        },
        [loadState],
    )

    useEffect(() => {
        const onMessage = (event: MessageEvent<SelectMsg>) => {
            if (event.data?.type !== 'imagery:select') return
            const hits = matchSlots({
                path: event.data.path,
                src: event.data.src,
                slotId: event.data.slotId,
            })
            setIframePath(event.data.path)
            if (!hits.length) {
                setSlot(null)
                setAltSlots([])
                setState(null)
                setError('这个图位还没登记成槽。')
                return
            }
            void selectSlot(hits[0], hits.slice(1))
        }
        window.addEventListener('message', onMessage)
        return () => window.removeEventListener('message', onMessage)
    }, [selectSlot])

    const onIframeLoad = () => {
        try {
            const path = iframeRef.current?.contentWindow?.location.pathname
            if (path) {
                setIframePath(path)
                const known = pages.find((p) => p.path === path)
                if (known) {
                    setPage(known.path)
                    window.sessionStorage.setItem(PAGE_KEY, known.path)
                }
            }
        } catch {
            /* ignore */
        }
    }

    const fetchCandidates = async () => {
        if (!slot) return
        setBusy('fetch')
        setError(null)
        setFilterNote('')
        try {
            const result = await api<{
                added: number
                dropped?: Record<string, number>
                slot: SlotState
            }>('/_studio/api/fetch', {
                method: 'POST',
                body: JSON.stringify({
                    slotId: slot.id,
                    query,
                    places: slot.places,
                    source,
                    aspect: slot.aspect,
                }),
            })
            setState(result.slot)
            await refreshQueue(slot.id, query)
            const note = formatDropped(result.dropped, result.added)
            setFilterNote(note)
            if (result.added === 0) setError(note || '没有新图。换个检索词再抓。')
        } catch (err) {
            setError(String(err))
        } finally {
            setBusy(null)
        }
    }

    const toggleConfirm = async (candidate: Candidate) => {
        if (!slot) return
        try {
            const next = await api<SlotState>('/_studio/api/confirm', {
                method: 'POST',
                body: JSON.stringify({
                    slotId: slot.id,
                    candidateId: candidate.id,
                    confirmed: !candidate.confirmed,
                    query,
                    places: slot.places,
                }),
            })
            setState(next)
        } catch (err) {
            setError(String(err))
        }
    }

    const clearCandidates = async () => {
        if (!slot) return
        setBusy('clear')
        setError(null)
        try {
            const next = await api<SlotState>('/_studio/api/clear', {
                method: 'POST',
                body: JSON.stringify({ slotId: slot.id, query, places: slot.places }),
            })
            setState(next)
            await refreshQueue(slot.id, query)
        } catch (err) {
            setError(String(err))
        } finally {
            setBusy(null)
        }
    }

    const confirmQueue = async () => {
        if (!slot) return
        setBusy('queue')
        setError(null)
        try {
            const result = await api<{ slot: SlotState }>('/_studio/api/queue', {
                method: 'POST',
                body: JSON.stringify({
                    slotId: slot.id,
                    aspect: slot.aspect,
                    query,
                    places: slot.places,
                }),
            })
            setState(result.slot)
            setSlotQueued(true)
            await refreshQueue(slot.id, query)
        } catch (err) {
            setError(String(err))
        } finally {
            setBusy(null)
        }
    }

    const placeTabs = slot?.places && slot.places.length > 1 ? slot.places : []
    const visible =
        state?.candidates.filter((c) => {
            if (!placeTabs.length) return true
            return candidatePlace(c, placeTabs, query) === query
        }) ?? []
    const confirmed = visible.filter((c) => c.confirmed)
    const rest = visible.filter((c) => !c.confirmed)
    const tabCount = (place: string) =>
        state?.candidates.filter((c) => candidatePlace(c, placeTabs, slot?.search ?? '') === place).length ?? 0
    const thumbCols = sideWidth >= 620 ? 3 : 2

    const onSplitPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        event.preventDefault()
        dragRef.current = { startX: event.clientX, startW: sideRef.current }
        setDragging(true)
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    const onSplitPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current
        if (!drag) return
        const next = clampSide(drag.startW - (event.clientX - drag.startX))
        sideRef.current = next
        setSideWidth(next)
    }

    const onSplitPointerUp = () => {
        dragRef.current = null
        setDragging(false)
        window.localStorage.setItem(SIDE_KEY, String(sideRef.current))
    }

    return (
        <div className="flex h-screen flex-col font-body-sans">
            <header className="flex h-12 shrink-0 items-center gap-4 border-b border-white/10 px-4">
                <p className="font-display text-lg tracking-[0.2em]">配图</p>
                <span className="text-[11px] tracking-widest text-white/40">仅本地 · 原片不上站</span>
                {queueCount > 0 && (
                    <span className="text-[11px] tracking-widest text-[#c4a36a]">队列 {queueCount}</span>
                )}
                <label className="ml-auto flex items-center gap-2 text-sm text-white/70">
                    页面
                    <select
                        className="max-w-[280px] rounded-sm border border-white/15 bg-[#1a201c] px-2 py-1 text-[#e8ebe4]"
                        value={page}
                        onChange={(e) => {
                            const next = e.target.value
                            setPage(next)
                            setIframePath(next)
                            window.sessionStorage.setItem(PAGE_KEY, next)
                        }}
                    >
                        {pages.map((p) => (
                            <option key={p.path} value={p.path}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                </label>
                <span className="hidden text-xs text-white/35 md:inline">{iframePath}</span>
            </header>

            <div
                className={`flex min-h-0 flex-1 flex-col md:flex-row ${dragging ? 'cursor-col-resize select-none' : ''}`}
            >
                <section className="min-h-0 min-w-0 flex-1 bg-[#0c100e]">
                    <iframe
                        ref={iframeRef}
                        title="站点预览"
                        src={page}
                        className={`h-full w-full border-0 bg-white ${dragging ? 'pointer-events-none' : ''}`}
                        onLoad={onIframeLoad}
                    />
                </section>

                <div
                    role="separator"
                    aria-orientation="vertical"
                    aria-label="调整抓图栏宽度"
                    aria-valuemin={SIDE_MIN}
                    aria-valuenow={sideWidth}
                    tabIndex={0}
                    className="group hidden w-3 shrink-0 cursor-col-resize items-stretch justify-center touch-none md:flex"
                    onPointerDown={onSplitPointerDown}
                    onPointerMove={onSplitPointerMove}
                    onPointerUp={onSplitPointerUp}
                    onPointerCancel={onSplitPointerUp}
                    onDoubleClick={() => {
                        sideRef.current = SIDE_DEFAULT
                        setSideWidth(SIDE_DEFAULT)
                        window.localStorage.setItem(SIDE_KEY, String(SIDE_DEFAULT))
                    }}
                    onKeyDown={(event) => {
                        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
                        event.preventDefault()
                        const delta = event.key === 'ArrowLeft' ? 32 : -32
                        const next = clampSide(sideRef.current + delta)
                        sideRef.current = next
                        setSideWidth(next)
                        window.localStorage.setItem(SIDE_KEY, String(next))
                    }}
                >
                    <span
                        className={`my-auto h-12 w-0.5 rounded-full ${
                            dragging ? 'bg-[#c4a36a]' : 'bg-white/25 group-hover:bg-[#c4a36a]/80'
                        }`}
                    />
                </div>

                <aside
                    className="flex min-h-0 w-full flex-col border-t border-white/10 bg-[#161c19] max-md:!w-full md:shrink-0 md:border-t-0 md:border-l"
                    style={{ width: sideWidth }}
                >
                    {!slot ? (
                        <div className="flex flex-1 items-center justify-center px-8 text-center text-sm leading-7 text-white/50">
                            点左边网页里的图。右侧出现这个槽抓到的底，和已经生成的稿。
                        </div>
                    ) : (
                        <>
                            <div className="border-b border-white/10 px-4 py-3">
                                <p className="text-[11px] tracking-[0.18em] text-[#c4a36a] uppercase">
                                    {slot.kind} · {slot.aspect}
                                </p>
                                <h2 className="mt-1 font-display text-xl">{slot.label}</h2>
                                <p className="mt-1 truncate text-xs text-white/40">{slot.id}</p>
                                {altSlots.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {altSlots.map((s) => (
                                            <button
                                                key={s.id}
                                                type="button"
                                                className="rounded-sm border border-white/15 px-2 py-0.5 text-[11px] text-white/70 hover:border-[#c4a36a]"
                                                onClick={() => void selectSlot(s, [slot, ...altSlots])}
                                            >
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <div className="mt-3 flex items-center gap-3">
                                    <img
                                        src={slot.src}
                                        alt=""
                                        className="h-12 w-20 shrink-0 object-cover"
                                    />
                                    <p className="min-w-0 text-xs leading-5 text-white/50">
                                        当前在站
                                        <span className="mt-0.5 block truncate text-white/70">{slot.src}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="border-b border-white/10 px-4 py-3">
                                <div className="mb-2 flex gap-1 text-[11px]">
                                    {(['bing', 'commons'] as const).map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            className={`rounded-sm px-2 py-0.5 ${
                                                source === s
                                                    ? 'bg-[#c4a36a] text-[#1a1710]'
                                                    : 'border border-white/15 text-white/60'
                                            }`}
                                            onClick={() => setSource(s)}
                                        >
                                            {s === 'bing' ? '必应' : '维基'}
                                        </button>
                                    ))}
                                </div>
                                {placeTabs.length > 0 && (
                                    <nav className="mb-3 flex gap-5 overflow-x-auto border-b border-white/10">
                                        {placeTabs.map((p) => {
                                            const active = query === p
                                            const n = tabCount(p)
                                            return (
                                                <button
                                                    key={p}
                                                    type="button"
                                                    className={`shrink-0 pb-2 text-[13px] tracking-wide ${
                                                        active
                                                            ? 'border-b-2 border-[#c4a36a] text-[#e8ebe4]'
                                                            : 'border-b-2 border-transparent text-white/40 hover:text-white/70'
                                                    }`}
                                                    onClick={() => {
                                                        setQuery(p)
                                                        setError(null)
                                                        setFilterNote('')
                                                        void refreshQueue(slot.id, p)
                                                    }}
                                                >
                                                    {placeShort(p)}
                                                    {n > 0 && (
                                                        <span className="ml-1.5 text-[10px] text-white/35">{n}</span>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </nav>
                                )}
                                <div className="flex gap-2">
                                    <input
                                        className="min-w-0 flex-1 rounded-sm border border-white/15 bg-[#111614] px-2 py-1.5 text-sm"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') void fetchCandidates()
                                        }}
                                        placeholder="一次搜一个地名"
                                    />
                                    <button
                                        type="button"
                                        className="shrink-0 rounded-sm bg-[#c4a36a] px-3 py-1.5 text-sm text-[#1a1710] disabled:opacity-40"
                                        disabled={busy === 'fetch' || !query.trim()}
                                        onClick={() => void fetchCandidates()}
                                    >
                                        {busy === 'fetch' ? '抓取中' : '抓取'}
                                    </button>
                                    <button
                                        type="button"
                                        className="shrink-0 rounded-sm border border-white/20 px-3 py-1.5 text-sm text-white/70 disabled:opacity-40"
                                        disabled={busy === 'clear' || !(state?.candidates.length)}
                                        onClick={() => void clearCandidates()}
                                    >
                                        {busy === 'clear' ? '清空中' : placeTabs.length ? '清空此地' : '清空'}
                                    </button>
                                </div>
                                {source === 'bing' && query.trim() && (
                                    <a
                                        className="mt-2 inline-block text-[11px] text-[#c4a36a]/80 underline underline-offset-2"
                                        href={
                                            'https://cn.bing.com/images/search?' +
                                            new URLSearchParams({
                                                q: query,
                                                form: 'BESBTB',
                                                first: '1',
                                                ensearch: '1',
                                                qft:
                                                    slot.aspect === '16:9'
                                                        ? '+filterui:photo-photo+filterui:imagesize-large+filterui:aspect-wide'
                                                        : '+filterui:photo-photo+filterui:imagesize-large',
                                            })
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        打开同一条必应结果
                                    </a>
                                )}
                                {error && <p className="mt-2 text-xs text-[#e2a394]">{error}</p>}
                                {!error && filterNote && (
                                    <p className="mt-2 text-xs leading-5 text-white/45">{filterNote}</p>
                                )}
                            </div>

                            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
                                <SectionTitle
                                    title="已确认的底"
                                    hint="AI 只读这些"
                                    count={confirmed.length}
                                />
                                {confirmed.length === 0 ? (
                                    <p className="mb-4 text-xs text-white/35">点下面的候选，勾成底。</p>
                                ) : (
                                    <ThumbGrid
                                        slotId={slot.id}
                                        items={confirmed}
                                        cols={thumbCols}
                                        onToggle={(c) => void toggleConfirm(c)}
                                    />
                                )}

                                <SectionTitle
                                    title="抓取的候选"
                                    hint="真地方的照片，不上站"
                                    count={rest.length}
                                />
                                {rest.length === 0 ? (
                                    <p className="mb-4 text-xs text-white/35">
                                        {placeTabs.length ? '此地还没有。切 tab 或抓取。' : '还没有。改检索词再抓。'}
                                    </p>
                                ) : (
                                    <ThumbGrid
                                        slotId={slot.id}
                                        items={rest}
                                        cols={thumbCols}
                                        onToggle={(c) => void toggleConfirm(c)}
                                    />
                                )}

                                <SectionTitle
                                    title="已生成"
                                    hint="重画的稿，可对照"
                                    count={state?.generated.length ?? 0}
                                />
                                {(state?.generated.length ?? 0) === 0 ? (
                                    <p className="text-xs text-white/35">
                                        生成稿放在 _photo_candidates/studio/{slot.id}/generated/
                                    </p>
                                ) : (
                                    <div className={`grid gap-2 ${thumbCols === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                                        {state?.generated.map((g) => (
                                            <figure key={g.id} className="overflow-hidden bg-black/30">
                                                <img src={g.url} alt={g.name} className="aspect-3/2 w-full object-cover" />
                                                <figcaption className="truncate px-1 py-1 text-[10px] text-white/45">
                                                    {g.name}
                                                </figcaption>
                                            </figure>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-white/10 px-4 py-3">
                                <button
                                    type="button"
                                    className="w-full rounded-sm bg-[#c4a36a] px-3 py-2 text-sm text-[#1a1710] disabled:opacity-40"
                                    disabled={busy === 'queue' || confirmed.length === 0}
                                    onClick={() => void confirmQueue()}
                                >
                                    {busy === 'queue'
                                        ? '写入队列中'
                                        : slotQueued
                                          ? `已确定进队列 · ${confirmed.length} 张底`
                                          : `确定进队列（${confirmed.length} 张底）`}
                                </button>
                                <p className="mt-2 text-[11px] leading-5 text-white/35">
                                    勾选底之后点确定。进队列按地名分开，原片不上站。
                                </p>
                            </div>
                        </>
                    )}
                </aside>
            </div>
        </div>
    )
}

function formatDropped(dropped: Record<string, number> | undefined, added: number): string {
    const zh: Record<string, string> = {
        guide: '攻略门票',
        host: '问答百科视频',
        stock: '水印图库',
        place: '不是这个地名',
        small: '太小或竖图',
        dup: '重复',
        fail: '下载失败',
    }
    const parts = Object.entries(dropped ?? {})
        .filter(([, n]) => n)
        .map(([k, n]) => `${zh[k] || k} ${n}`)
    const total = Object.values(dropped ?? {}).reduce((a, b) => a + b, 0)
    if (!added && !total) return ''
    return `留下 ${added} 张实景` + (total ? `，筛掉 ${total}（${parts.join(' · ')}）` : '')
}

function SectionTitle({
    title,
    hint,
    count,
}: {
    title: string
    hint: string
    count: number
}) {
    return (
        <div className="mb-2 mt-1 flex items-baseline justify-between">
            <h3 className="text-sm text-white/80">{title}</h3>
            <p className="text-[11px] text-white/35">
                {hint}
                {count ? ` · ${count}` : ''}
            </p>
        </div>
    )
}

function ThumbGrid({
    slotId,
    items,
    cols,
    onToggle,
}: {
    slotId: string
    items: Candidate[]
    cols: number
    onToggle: (c: Candidate) => void
}) {
    return (
        <div className={`mb-5 grid gap-2 ${cols === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {items.map((c) => (
                <button
                    key={c.id}
                    type="button"
                    onClick={() => onToggle(c)}
                    className={`group relative overflow-hidden text-left ${
                        c.confirmed ? 'ring-2 ring-[#c4a36a]' : 'ring-1 ring-white/10'
                    }`}
                >
                    <img
                        src={candidateUrl(slotId, c.filename)}
                        alt={c.title}
                        className="aspect-3/2 w-full object-cover"
                    />
                    <span
                        className={`absolute left-1.5 top-1.5 rounded-sm px-1.5 py-0.5 text-[10px] ${
                            c.confirmed ? 'bg-[#c4a36a] text-[#1a1710]' : 'bg-black/55 text-white/80'
                        }`}
                    >
                        {c.confirmed ? '底' : c.source === 'bing' ? '必应' : c.source === 'commons' ? '维基' : '候选'}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 truncate bg-black/55 px-1.5 py-1 text-[10px] text-white/75">
                        {c.title.replace(/^File:/, '')}
                    </span>
                </button>
            ))}
        </div>
    )
}
