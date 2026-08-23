const STYLE = `
html[data-imagery-probe] img[data-imagery-slot] {
    cursor: crosshair !important;
    outline: 2px solid transparent;
    outline-offset: -2px;
    transition: outline-color 0.15s ease;
}
html[data-imagery-probe] img[data-imagery-slot]:hover,
html[data-imagery-probe] img[data-imagery-slot][data-imagery-active] {
    outline-color: #c4a36a;
}
`

function slottedImageFrom(node: Element): HTMLImageElement | null {
    const direct = node.closest('img[data-imagery-slot]')
    if (direct instanceof HTMLImageElement) return direct
    const host = node.closest('section, figure')
    if (!host) return null
    const hits = host.querySelectorAll('img[data-imagery-slot]')
    return hits.length === 1 && hits[0] instanceof HTMLImageElement ? hits[0] : null
}

export function installImageryProbe(): void {
    if (window.self === window.top) return
    if (document.documentElement.hasAttribute('data-imagery-probe')) return

    document.documentElement.setAttribute('data-imagery-probe', '')
    const style = document.createElement('style')
    style.textContent = STYLE
    document.head.appendChild(style)

    document.addEventListener(
        'click',
        (event) => {
            const node = event.target
            if (!(node instanceof Element)) return
            const img = slottedImageFrom(node)
            if (!img) return
            event.preventDefault()
            event.stopPropagation()
            document
                .querySelectorAll('img[data-imagery-active]')
                .forEach((el) => el.removeAttribute('data-imagery-active'))
            img.setAttribute('data-imagery-active', '')
            window.parent.postMessage(
                {
                    type: 'imagery:select',
                    slotId: img.getAttribute('data-imagery-slot'),
                    src: img.getAttribute('src'),
                    alt: img.getAttribute('alt') ?? '',
                    path: location.pathname,
                },
                '*',
            )
        },
        true,
    )

    window.addEventListener('message', (event) => {
        if (event.data?.type !== 'imagery:highlight') return
        document
            .querySelectorAll('img[data-imagery-active]')
            .forEach((el) => el.removeAttribute('data-imagery-active'))
        const slotId = event.data.slotId as string | undefined
        const src = event.data.src as string | undefined
        const img = slotId
            ? document.querySelector(`img[data-imagery-slot="${CSS.escape(slotId)}"]`)
            : src
              ? document.querySelector(`img[data-imagery-slot][src="${CSS.escape(src)}"]`)
              : null
        if (!(img instanceof HTMLElement)) return
        img.setAttribute('data-imagery-active', '')
        img.scrollIntoView({ block: 'center', behavior: 'smooth' })
    })
}

installImageryProbe()
