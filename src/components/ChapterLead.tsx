import { LANG_META, counterpartLang, type Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import Reveal from './Reveal'

/** Chapter opening: title and lead, no photograph. */
export default function ChapterLead({
    lang,
    kicker,
    title,
    sub,
    intro,
}: {
    lang: Lang
    kicker: string
    title: string
    sub: string
    intro: string
}) {
    const { t } = messages(lang)
    const gloss = counterpartLang(lang)
    return (
        <header className="mx-auto max-w-3xl px-6 pt-24 pb-12 md:pt-32 md:pb-16">
            <Reveal>
                <p className="micro-label text-[#8ca693]">
                    <span lang={LANG_META[gloss].htmlLang}>{t(kicker, gloss)}</span>
                    {' · '}
                    {t(kicker)}
                </p>
            </Reveal>
            <Reveal delay={80}>
                <h1 className="mt-5 font-display text-5xl md:text-7xl font-semibold tracking-wide text-[#1f2a26]">
                    {t(title)}
                </h1>
            </Reveal>
            <Reveal delay={160}>
                <p className="mt-5 max-w-xl font-display text-lg md:text-xl text-[#5a665e]">{t(sub)}</p>
            </Reveal>
            <Reveal delay={240}>
                <p className="mt-10 text-lg md:text-xl leading-9 md:leading-10 text-[#3d4842] font-display">{t(intro)}</p>
            </Reveal>
        </header>
    )
}
