import Stamp from './Stamp'

/** Vertical paper-slip colophon on a volume jacket (affiliation + issued + seal). */
export default function JacketColophon({
    affiliation,
    published,
    seal,
    sealSize = 50,
    slip,
    compact = false,
}: {
    affiliation: string
    published: string
    seal: string
    sealSize?: number
    slip: string
    compact?: boolean
}) {
    const stamp = compact ? Math.round(sealSize * 0.72) : sealSize
    return (
        <div
            className="flex items-end"
            style={{
                background: slip,
                boxShadow: 'inset 0.75px 0 0 #1E232033, inset -0.75px 0 0 #1E232033',
                padding: compact ? '10px 8px' : '14px 12px',
                gap: compact ? 10 : 14,
            }}
        >
            <p
                className="vertical-rl whitespace-nowrap font-display leading-relaxed"
                style={{
                    fontSize: compact ? 13 : 15,
                    color: '#1F2A26CC',
                    letterSpacing: '0.08em',
                }}
            >
                {affiliation}
            </p>
            <p
                className="vertical-rl whitespace-nowrap font-display leading-relaxed"
                style={{
                    fontSize: compact ? 12 : 13,
                    color: '#1F2A2699',
                    letterSpacing: '0.08em',
                }}
            >
                {published}
            </p>
            <Stamp char={seal} size={stamp} />
        </div>
    )
}
