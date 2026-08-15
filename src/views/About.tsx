import { aboutSections } from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import { withLocale } from '@/lib/i18n-path'
import Reveal from '@/components/Reveal'
import Seal from '@/components/Seal'

export default function About({ lang }: { lang: Lang }) {
    const { t, tList } = messages(lang)

    return (
        <main>
            <header className="mx-auto max-w-3xl px-6 pt-40 md:pt-52 pb-16 md:pb-24">
                <Reveal>
                    <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-wide">
                        {t('about.heroTitle')}
                    </h1>
                    <p className="mt-6 font-display text-lg md:text-xl text-[#5a665e]">{t('about.heroSub')}</p>
                </Reveal>
            </header>

            <section className="mx-auto max-w-3xl px-6 pb-24 md:pb-36 flex flex-col gap-16 md:gap-20">
                {aboutSections.map((s) => (
                    <Reveal key={s.id}>
                        <h2 className="font-display text-2xl md:text-3xl font-semibold">
                            {t(`about.sections.${s.id}.title`)}
                        </h2>
                        <span className="mt-5 block h-px w-16 bg-[#b03a2e]" aria-hidden />
                        {tList(`about.sections.${s.id}.paragraphs`).map((p, j) => (
                            <p key={j} className="mt-6 leading-8 md:leading-9 text-[#3d4842]">
                                {p}
                            </p>
                        ))}
                    </Reveal>
                ))}
                <Reveal>
                    <a
                        href={withLocale('/contribute', lang)}
                        className="font-display text-lg tracking-[0.2em] text-[#b03a2e] transition-opacity hover:opacity-70"
                    >
                        {t('anthology.contribute')}
                    </a>
                </Reveal>
                <Reveal>
                    <Seal char="志" />
                </Reveal>
            </section>
        </main>
    )
}
