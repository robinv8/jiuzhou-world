import { contributePlaces } from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import Reveal from '@/components/Reveal'
import Seal from '@/components/Seal'
import { withLocale } from '@/lib/i18n-path'

/**
 * Global hub: one city, one volume — each place takes different photographs.
 * Place-specific criteria live on /{city}/contribute.
 */
export default function ContributeHub({ lang }: { lang: Lang }) {
    const { t, tList } = messages(lang)
    const open = contributePlaces.filter((p) => p.status === 'open')

    return (
        <main>
            <header className="mx-auto max-w-3xl px-6 pt-40 md:pt-52 pb-16 md:pb-24">
                <Reveal>
                    <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-wide">
                        {t('contribute.hub.heroTitle')}
                    </h1>
                    <p className="mt-6 font-display text-lg md:text-xl text-[#5a665e]">
                        {t('contribute.hub.heroSub')}
                    </p>
                </Reveal>
            </header>

            <section className="mx-auto max-w-3xl px-6 pb-10 md:pb-14 flex flex-col gap-7">
                {tList('contribute.hub.intro').map((p, i) => (
                    <Reveal key={i} delay={i * 80}>
                        <p className="text-base md:text-lg leading-8 md:leading-9 text-[#3d4842]">{p}</p>
                    </Reveal>
                ))}
            </section>

            <section className="mx-auto max-w-3xl px-6 pb-24 md:pb-36">
                <Reveal>
                    <p className="micro-label text-[#8ca693]">{t('contribute.hub.openLabel')}</p>
                </Reveal>

                <div className="mt-8 flex flex-col">
                    {open.map((place, i) => (
                        <Reveal key={place.key} delay={i * 60}>
                            <a
                                href={withLocale(place.route, lang)}
                                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center py-10 md:py-12 border-t border-b hairline"
                            >
                                <div className="md:col-span-5 overflow-hidden">
                                    <div className="aspect-[3/2] overflow-hidden">
                                        <img
                                            src={place.image}
                                            alt={t(`anthology.volumes.${place.key}.title`)}
                                            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-6 md:col-start-7">
                                    <p className="micro-label text-[#8ca693]">{place.latin}</p>
                                    <h2 className="mt-3 font-display text-2xl md:text-3xl font-semibold tracking-wide">
                                        {t(`anthology.volumes.${place.key}.title`)}
                                    </h2>
                                    <p className="mt-4 max-w-md text-[#5a665e] leading-7">
                                        {t(`contribute.${place.key}.blurb`)}
                                    </p>
                                    <span className="mt-6 inline-block text-sm tracking-[0.2em] text-[#b03a2e]">
                                        {t('contribute.hub.openCta')}
                                    </span>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={100}>
                    <p className="mt-10 text-sm leading-7 text-[#8b958d]">{t('contribute.hub.plannedNote')}</p>
                </Reveal>

                <Reveal delay={120}>
                    <div className="mt-16">
                        <Seal char="影" />
                    </div>
                </Reveal>
            </section>
        </main>
    )
}
