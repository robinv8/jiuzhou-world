import { ArrowRight } from 'lucide-react'
import { getProvince } from '@/i18n/catalogs'
import type { Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import Reveal from '@/components/Reveal'
import MiniTitle from '@/components/MiniTitle'
import Seal from '@/components/Seal'
import { withLocale } from '@/lib/i18n-path'

export default function ProvinceHome({ lang, province }: { lang: Lang; province: string }) {
    const { t } = messages(lang)
    const href = (p: string) => withLocale(p, lang)
    const prov = getProvince(province)

    if (!prov) return null

    return (
        <main>
            <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#1f2a26]">
                <div className="ken-burns-slide">
                    <img src={prov.image} alt={t(`province.${province}.heroTitle`)} />
                </div>
                <div
                    className="absolute inset-0 bg-linear-to-t from-[#1f2a26]/80 via-[#1f2a26]/20 to-[#1f2a26]/30"
                    aria-hidden
                />

                <div className="relative h-full mx-auto max-w-7xl px-6 md:px-16 flex flex-col justify-end pb-24 md:pb-28">
                    <Reveal>
                        <p className="micro-label text-[#b0c6b3]">{t(`province.${province}.heroKicker`)}</p>
                    </Reveal>
                    <Reveal delay={150}>
                        <h1 className="mt-5 font-display font-semibold text-[#f7f5ee] leading-none tracking-wide text-6xl md:text-8xl">
                            {t(`province.${province}.heroTitle`)}
                        </h1>
                    </Reveal>
                    <Reveal delay={300}>
                        <p className="mt-6 max-w-xl font-display text-lg md:text-2xl text-[#f7f5ee]/85 leading-relaxed">
                            {t(`province.${province}.heroSub`)}
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 md:px-16 py-24 md:py-36">
                <Reveal>
                    <MiniTitle i18nKey={`province.${province}.citiesLabel`} lang={lang} />
                </Reveal>
                <Reveal delay={100}>
                    <h2 className="mt-10 font-display text-4xl md:text-5xl font-semibold">
                        {t(`province.${province}.citiesTitle`)}
                    </h2>
                </Reveal>

                <div className="mt-16 flex flex-col">
                    {prov.cities.map((city, i) => (
                        <Reveal key={city.key} delay={i * 80}>
                            <a
                                href={href(city.route)}
                                className={`group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center py-10 md:py-14 border-t hairline ${
                                    i === prov.cities.length - 1 ? 'border-b' : ''
                                }`}
                            >
                                <div
                                    className={`md:col-span-5 overflow-hidden ${
                                        i % 2 === 1 ? 'md:order-2 md:col-start-8' : ''
                                    }`}
                                >
                                    <div className="aspect-3/2 overflow-hidden">
                                        <img
                                            src={city.image}
                                            alt={t(`city.${city.key}.title`)}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.05]"
                                        />
                                    </div>
                                </div>
                                <div
                                    className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}
                                >
                                    <p className="micro-label text-[#8ca693]">{city.latin}</p>
                                    <h3 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-wide">
                                        {t(`city.${city.key}.title`)}
                                    </h3>
                                    <p className="mt-4 max-w-md text-[#5a665e] leading-7">
                                        {t(`city.${city.key}.desc`)}
                                    </p>
                                    <span className="mt-6 inline-flex items-center gap-2 text-sm tracking-[0.25em] text-[#1f2a26]">
                                        {t('ui.openVolume')}
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform duration-500 group-hover:translate-x-1.5"
                                        />
                                    </span>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </section>
        </main>
    )
}
