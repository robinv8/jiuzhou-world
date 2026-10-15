/** Square vermilion stamp, as on a title page. Not rotated. */
export default function Stamp({
    char,
    size = 36,
}: {
    char: string
    size?: number
}) {
    return (
        <span
            aria-hidden
            className="inline-flex shrink-0 items-center justify-center font-display font-bold leading-none select-none"
            style={{
                width: size,
                height: size,
                background: '#B03A2E',
                color: '#F7F1E3',
                fontSize: size * 0.62,
            }}
        >
            {char}
        </span>
    )
}
