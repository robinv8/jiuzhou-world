import type { ReactNode } from 'react'

/** Figure caption: 12px on jackets, 11px on paper; tracking 2px. */
export default function ImageCaption({
    children,
    onDark = false,
    size = 'hero',
    align = 'left',
}: {
    children: ReactNode
    onDark?: boolean
    size?: 'hero' | 'card'
    align?: 'left' | 'right' | 'center'
}) {
    const color = onDark
        ? 'text-[#F7F5EE]/60'
        : size === 'hero'
          ? 'text-[#1F2A26]/60'
          : 'text-[#1F2A26]/50'
    const alignCls =
        align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'
    return (
        <p
            className={`font-display max-w-full whitespace-normal break-words tracking-[1px] sm:tracking-[2px] ${alignCls} ${color} ${
                size === 'hero' ? 'text-[12px]' : 'text-[11px]'
            }`}
        >
            {children}
        </p>
    )
}

/** Card caption under a 3:2 plate. Renders nothing when the plate key is missing. */
export function PlateCaption({ text }: { text?: string }) {
    if (!text) return null
    return (
        <div className="mt-2.5">
            <ImageCaption size="card">{text}</ImageCaption>
        </div>
    )
}
