import { ANTHOLOGY_DOMAIN, anthologyVolumes, provinces, volumeNav } from '@/i18n/catalogs'
import { LANG_META, counterpartLang, type Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import { withLocale } from '@/lib/i18n-path'
import Seal from './Seal'

export default function SiteFooter({ lang }: { lang: Lang }) {
    const { t } = messages(lang)
    const href = (p: string) => withLocale(p, lang)
    const gloss = counterpartLang(lang)
    const glossLang = LANG_META[gloss].htmlLang

    return (
        <footer className="bg-[#1f2a26] text-[#f7f5ee]">
            <div className="mx-auto max-w-7xl px-6 md:px-16 py-16 md:py-24">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
                    <div className="max-w-md">
                        <div className="flex items-center gap-4">
                            <Seal char="九" />
                            <div>
                                <p className="font-display text-2xl font-semibold">{t('anthology.name')}</p>
                                <p className="micro-label text-[#b0c6b3] mt-1">{ANTHOLOGY_DOMAIN}</p>
                            </div>
                        </div>
                        <p className="mt-6 text-sm leading-7 text-[#f7f5ee]/70">{t('footer.colophon')}</p>
                    </div>
                    <nav className="grid grid-cols-2 gap-x-16 gap-y-4">
                        {provinces.map((prov) => (
                            <div key={prov.key} className="col-span-2">
                                <a href={href(prov.route)} className="group">
                                    <span className="micro-label text-[#b0c6b3]/70 block">{prov.latin}</span>
                                    <span className="font-display text-lg tracking-[0.2em] text-[#f7f5ee]/90 group-hover:text-[#b0c6b3] transition-colors">
                                        {t(`province.${prov.key}.title`)}
                                    </span>
                                </a>
                                <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2">
                                    {prov.cities.map((city) => (
                                        <div key={city.key}>
                                            <a href={href(city.route)} className="group">
                                                <span className="micro-label text-[#b0c6b3]/50 block" lang={glossLang}>
                                                    {city.latin}
                                                </span>
                                                <span className="font-display text-sm tracking-[0.2em] text-[#f7f5ee]/70 group-hover:text-[#b0c6b3] transition-colors">
                                                    {t(`city.${city.key}.title`)}
                                                </span>
                                            </a>
                                            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                                                {city.districts.map((district) => (
                                                    <a key={district.key} href={href(district.route)} className="group pl-0">
                                                        <span className="micro-label text-[#b0c6b3]/40 block" lang={glossLang}>
                                                            {district.latin}
                                                        </span>
                                                        <span className="font-display text-xs tracking-[0.2em] text-[#f7f5ee]/50 group-hover:text-[#b0c6b3] transition-colors">
                                                            {t(`district.${district.key}.title`)}
                                                        </span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <a href={href('/about')} className="group col-span-2 mt-4">
                            <span className="micro-label text-[#b0c6b3]/70 block" lang={glossLang}>
                                {t('anthology.about', gloss)}
                            </span>
                            <span className="font-display text-base tracking-[0.2em] text-[#f7f5ee]/70 group-hover:text-[#b0c6b3] transition-colors">
                                {t('anthology.about')}
                            </span>
                        </a>
                        <a href={href('/contribute')} className="group col-span-2">
                            <span className="micro-label text-[#b0c6b3]/70 block" lang={glossLang}>
                                {t('anthology.contribute', gloss)}
                            </span>
                            <span className="font-display text-base tracking-[0.2em] text-[#f7f5ee]/70 group-hover:text-[#b0c6b3] transition-colors">
                                {t('anthology.contribute')}
                            </span>
                        </a>
                    </nav>
                </div>
                <div className="mt-16 pt-8 border-t border-[#f7f5ee]/15 flex flex-col md:flex-row justify-between gap-4 text-xs tracking-widest text-[#f7f5ee]/50">
                    <span>{t('ui.oneCityOneVolume')}</span>
                    <span className="micro-label">EST. MMXXVI · JIUZHOU.WORLD</span>
                </div>
            </div>
        </footer>
    )
}
