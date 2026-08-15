import { useLanguage } from '@/i18n/LanguageContext'
import Reveal from './Reveal'

interface PageHeroProps {
    kicker: string
    title: string
    sub: string
    image: string
    imageAlt?: string
}

/** Interior page hero: tall image band with ink-gradient and serif title. */
export default function PageHero({ kicker, title, sub, image, imageAlt }: PageHeroProps) {
    const { lang, t } = useLanguage()
    const alt = imageAlt ?? t(title)
    return (
        <header className="relative h-[78vh] min-h-[520px] overflow-hidden">
            <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
            <div
                className="absolute inset-0 bg-gradient-to-t from-[#1f2a26]/85 via-[#1f2a26]/25 to-[#1f2a26]/20"
                aria-hidden
            />
            <div className="relative h-full mx-auto max-w-7xl px-6 md:px-16 flex flex-col justify-end pb-16 md:pb-24">
                <Reveal>
                    <p className="micro-label text-[#b0c6b3]">
                        {lang === 'zh' ? t(kicker, 'en') : t(kicker, 'zh')} · {t(kicker)}
                    </p>
                </Reveal>
                <Reveal delay={120}>
                    <h1 className="mt-4 font-display text-5xl md:text-7xl font-semibold tracking-wide text-[#f7f5ee]">
                        {t(title)}
                    </h1>
                </Reveal>
                <Reveal delay={240}>
                    <p className="mt-5 max-w-xl font-display text-lg md:text-xl text-[#f7f5ee]/85">
                        {t(sub)}
                    </p>
                </Reveal>
            </div>
        </header>
    )
}
