import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import Seal from '@/components/Seal'

type ChapterCloseProps = {
    seal: string
    colophon: string
    nextHref?: string
    nextLabel?: string
    footnote?: string
    tone?: 'paper' | 'ink'
}

export default function ChapterClose({
    seal,
    colophon,
    nextHref,
    nextLabel,
    footnote,
    tone = 'paper',
}: ChapterCloseProps) {
    const ink = tone === 'ink'

    return (
        <section className={ink ? 'bg-[#1f2a26] text-[#f7f5ee]' : 'bg-[#edeae0]'}>
            <div className="mx-auto max-w-3xl px-6 py-20 md:py-28 text-center">
                <Reveal>
                    <Seal char={seal} />
                    <p
                        className={`mt-8 font-display text-2xl md:text-3xl leading-relaxed ${
                            ink ? 'text-[#f7f5ee]/90' : ''
                        }`}
                    >
                        {colophon}
                    </p>
                    {nextHref && nextLabel && (
                        <a
                            href={nextHref}
                            className={`mt-10 inline-flex items-center gap-2 text-sm tracking-[0.25em] ${
                                ink ? 'text-[#f7f5ee]/80' : 'text-[#1f2a26]'
                            }`}
                        >
                            {nextLabel}
                            <ArrowRight size={16} />
                        </a>
                    )}
                    {footnote && (
                        <p className={`mt-10 text-sm leading-7 ${ink ? 'text-[#f7f5ee]/45' : 'text-[#5a665e]'}`}>
                            {footnote}
                        </p>
                    )}
                </Reveal>
            </div>
        </section>
    )
}
