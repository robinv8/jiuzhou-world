export function BookEssay({
    mouth,
    kicker,
    title,
    paragraphs,
    note,
    paper = '#F3EEE2',
    ink = '#1F2A26',
    muted = '#3D4842',
    lightMouth = false,
}: {
    mouth: string
    kicker: string
    title: string
    paragraphs: string[]
    note?: string
    paper?: string
    ink?: string
    muted?: string
    lightMouth?: boolean
}) {
    return (
        <section className="px-5 py-16 md:py-24" style={{ background: paper, color: ink }}>
            <div className="mx-auto flex max-w-5xl flex-col gap-5 md:flex-row md:items-stretch md:gap-8">
                <BookMouthInner text={mouth} light={lightMouth} ink={ink} />
                <div
                    className="flex-1 p-[5px] border"
                    style={{ borderColor: ink }}
                >
                    <div className="border px-7 py-8 md:px-12 md:py-12" style={{ borderColor: ink }}>
                        <p className="font-display text-sm tracking-[0.45em] text-[#B03A2E]">
                            {kicker}
                        </p>
                        <h2 className="mt-5 font-display text-3xl md:text-[2.6rem] font-semibold leading-snug">
                            {title}
                        </h2>
                        <div
                            className="mt-6 h-px w-full"
                            style={{ background: `${ink}22` }}
                        />
                        <div className="mt-8 flex flex-col gap-6">
                            {paragraphs.map((p) => (
                                <p
                                    key={p.slice(0, 24)}
                                    className="font-display text-base md:text-[17px] leading-8 md:leading-9"
                                    style={{ color: muted }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                {note && (
                    <p className="self-center font-display text-sm tracking-[0.55em] text-[#B03A2E] md:vertical-rl">
                        {note}
                    </p>
                )}
            </div>
        </section>
    )
}

function BookMouthInner({
    text,
    light,
    ink,
}: {
    text: string
    light: boolean
    ink: string
}) {
    const fill = light ? '#ECE7D9' : ink
    return (
        <>
            <div className="hidden md:flex w-10 shrink-0 flex-col items-center gap-3 pt-2">
                <span
                    className="block h-2.5 w-5"
                    style={{
                        background: fill,
                        clipPath: 'polygon(0 0, 100% 0, 70% 100%, 30% 100%)',
                    }}
                />
                <p className="vertical-rl font-display text-[13px] tracking-[0.5em]" style={{ color: fill }}>
                    {text}
                </p>
                <span
                    className="block h-2.5 w-5"
                    style={{
                        background: fill,
                        clipPath: 'polygon(30% 0, 70% 0, 100% 100%, 0 100%)',
                    }}
                />
            </div>
            <p className="md:hidden font-display text-xs tracking-[0.35em]" style={{ color: fill }}>
                {text}
            </p>
        </>
    )
}

export function Colophon({
    title,
    line,
    credit,
    stele = false,
    bg,
}: {
    title: string
    line: string
    credit: string
    stele?: boolean
    bg?: string
}) {
    const background = bg ?? (stele ? '#16181A' : '#1F2A26')
    const ink = '#E9E4D6'
    const radius = stele ? '72px 72px 0 0' : undefined
    return (
        <footer className="px-5 py-16 md:py-20" style={{ background }}>
            <div
                className="mx-auto max-w-lg p-[5px] border"
                style={{ borderColor: `${ink}99`, borderRadius: radius }}
            >
                <div
                    className="border px-8 py-10 md:px-12 md:py-12 text-center"
                    style={{ borderColor: `${ink}99`, borderRadius: radius }}
                >
                    <p
                        className="font-display text-2xl md:text-[1.75rem] tracking-[0.45em]"
                        style={{ color: ink }}
                    >
                        {title}
                    </p>
                    <div
                        className="mx-auto mt-6 h-px w-28"
                        style={{ background: `${ink}4D` }}
                    />
                    <p
                        className="mt-6 font-display text-[13px] tracking-[0.28em]"
                        style={{ color: `${ink}B3` }}
                    >
                        {line}
                    </p>
                    <p
                        className="mt-3 font-display text-[12px] tracking-[0.22em]"
                        style={{ color: `${ink}80` }}
                    >
                        {credit}
                    </p>
                </div>
            </div>
        </footer>
    )
}

