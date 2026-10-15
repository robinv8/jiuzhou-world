import type { ReactNode } from 'react'

/** Large section character (卷 / 省 / 市 / 目) with a hairline. */
export default function SectionMark({
    mark,
    kicker,
    aside,
    ink = '#1F2A26',
    muted = '#4A514B',
}: {
    mark: string
    kicker?: ReactNode
    aside?: ReactNode
    ink?: string
    muted?: string
}) {
    return (
        <div
            className="flex items-end justify-between gap-4 border-b pb-3"
            style={{ borderColor: ink }}
        >
            <div className="flex items-end gap-4 min-w-0">
                <h2
                    className="font-display text-[clamp(2.5rem,4.167vw,60px)] font-black leading-none"
                    style={{ color: ink }}
                >
                    {mark}
                </h2>
                {kicker && (
                    <p
                        className="mb-1.5 font-display text-sm tracking-[0.35em]"
                        style={{ color: muted }}
                    >
                        {kicker}
                    </p>
                )}
            </div>
            {aside && (
                <p
                    className="mb-1.5 shrink-0 font-display text-sm tracking-[0.35em]"
                    style={{ color: muted }}
                >
                    {aside}
                </p>
            )}
        </div>
    )
}
