import {
    CONTRIBUTE_EMAIL,
    contributePlaceSections,
    getContributePlace,
    type ContributePlaceKey,
} from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import Reveal from '@/components/Reveal'
import Seal from '@/components/Seal'
import { withLocale } from '@/lib/i18n-path'

/**
 * Per-place contribute page: 收什么 differs by region.
 * Shared hub is /contribute; this page is the volume's own rules + mail.
 */
export default function ContributePlace({
    lang,
    place,
}: {
    lang: Lang
    place: ContributePlaceKey
}) {
    const meta = getContributePlace(place)
    if (!meta) return null

    const { t, tList } = messages(lang)
    const root = `contribute.${place}`
    const subject = t(`${root}.mailSubject`)
    const mailto = `mailto:${CONTRIBUTE_EMAIL}?subject=${encodeURIComponent(subject)}`

    return (
        <main>
            <header className="mx-auto max-w-3xl px-6 pt-40 md:pt-52 pb-16 md:pb-24">
                <Reveal>
                    <p className="micro-label text-[#8ca693]">
                        <a
                            href={withLocale('/contribute', lang)}
                            className="transition-opacity hover:opacity-70"
                        >
                            {t('contribute.hub.heroTitle')}
                        </a>
                        <span className="mx-2 opacity-40">/</span>
                        <a
                            href={withLocale(meta.volumeRoute, lang)}
                            className="transition-opacity hover:opacity-70"
                        >
                            {t(`anthology.volumes.${place}.title`)}
                        </a>
                    </p>
                    <h1 className="mt-4 font-display text-5xl md:text-7xl font-semibold tracking-wide">
                        {t(`${root}.heroTitle`)}
                    </h1>
                    <p className="mt-6 font-display text-lg md:text-xl text-[#5a665e]">
                        {t(`${root}.heroSub`)}
                    </p>
                </Reveal>
            </header>

            <section className="mx-auto max-w-3xl px-6 pb-24 md:pb-36 flex flex-col gap-16 md:gap-20">
                {contributePlaceSections.map((s) => (
                    <Reveal key={s.id}>
                        <h2 className="font-display text-2xl md:text-3xl font-semibold">
                            {t(`${root}.sections.${s.id}.title`)}
                        </h2>
                        <span className="mt-5 block h-px w-16 bg-[#b03a2e]" aria-hidden />
                        {tList(`${root}.sections.${s.id}.paragraphs`).map((p, j) => (
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
                        <span className="font-display text-lg tracking-[0.2em]">{t(`${root}.write`)}</span>
                        <span className="micro-label text-[#8ca693]">{CONTRIBUTE_EMAIL}</span>
                    </a>
                </Reveal>

                <Reveal>
                    <p className="text-sm leading-7 text-[#8b958d]">
                        <a
                            href={withLocale('/contribute', lang)}
                            className="link-underline link-underline-faint"
                        >
                            {t('contribute.hub.openLabel')}
                        </a>
                    </p>
                </Reveal>

                <Reveal>
                    <Seal char="影" />
                </Reveal>
            </section>
        </main>
    )
}
