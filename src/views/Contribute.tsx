import { CONTRIBUTE_EMAIL, contributeSections } from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import Reveal from '@/components/Reveal'
import Seal from '@/components/Seal'

export default function Contribute({ lang }: { lang: Lang }) {
    const { t, tList } = messages(lang)
    const mailto = `mailto:${CONTRIBUTE_EMAIL}?subject=${encodeURIComponent(t('anthology.contribute'))}`

    return (
        <main>
            <header className="mx-auto max-w-3xl px-6 pt-40 md:pt-52 pb-16 md:pb-24">
                <Reveal>
                    <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-wide">
                        {t('contribute.heroTitle')}
                    </h1>
                    <p className="mt-6 font-display text-lg md:text-xl text-[#5a665e]">{t('contribute.heroSub')}</p>
                </Reveal>
            </header>

            <section className="mx-auto max-w-3xl px-6 pb-24 md:pb-36 flex flex-col gap-16 md:gap-20">
                {contributeSections.map((s) => (
                    <Reveal key={s.id}>
                        <h2 className="font-display text-2xl md:text-3xl font-semibold">
                            {t(`contribute.sections.${s.id}.title`)}
                        </h2>
                        <span className="mt-5 block h-px w-16 bg-[#b03a2e]" aria-hidden />
                        {tList(`contribute.sections.${s.id}.paragraphs`).map((p, j) => (
                            <p key={j} className="mt-6 leading-8 md:leading-9 text-[#3d4842]">
                                {p}
                            </p>
                        ))}
                    </Reveal>
                ))}

                <Reveal>
                    <a
                        href={mailto}
                        className="inline-flex items-baseline gap-4 border border-[#1f2a26]/20 px-6 py-4 transition-colors hover:bg-[#1f2a26] hover:text-[#f7f5ee]"
                    >
                        <span className="font-display text-lg tracking-[0.2em]">{t('contribute.write')}</span>
                        <span className="micro-label text-[#8ca693]">{CONTRIBUTE_EMAIL}</span>
                    </a>
                </Reveal>

                <Reveal>
                    <Seal char="影" />
                </Reveal>
            </section>
        </main>
    )
}
