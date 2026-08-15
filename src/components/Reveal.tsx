import type { ReactNode, CSSProperties } from 'react'

interface RevealProps {
    children: ReactNode
    delay?: number
    className?: string
    as?: 'div' | 'section' | 'figure' | 'blockquote' | 'header'
}

/** Fade-up on first paint (CSS only — no hydration). */
export default function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
    const Tag = as as 'div'
    const style = { '--reveal-delay': `${delay}ms` } as CSSProperties

    return (
        <Tag className={`reveal ${className}`} style={style}>
            {children}
        </Tag>
    )
}
