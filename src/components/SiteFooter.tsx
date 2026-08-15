import { ANTHOLOGY_DOMAIN, VOLUME_I_LATIN, linanNav } from '@/i18n/catalogs'
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
                        <a href={href('/linan')} className="group col-span-2">
                            <span className="micro-label text-[#b0c6b3]/70 block">{VOLUME_I_LATIN}</span>
                            <span className="font-display text-lg tracking-[0.2em] text-[#f7f5ee]/90 group-hover:text-[#b0c6b3] transition-colors">
                                {t('ui.linanVolume')}
                            </span>
                        </a>
                        {linanNav.map((l) => (
                            <a key={l.base} href={href(l.base)} className="group pl-0">
                                <span className="micro-label text-[#b0c6b3]/50 block" lang={glossLang}>
                                    {t(l.key, gloss)}
                                </span>
                                <span className="font-display text-base tracking-[0.2em] text-[#f7f5ee]/70 group-hover:text-[#b0c6b3] transition-colors">
                                    {t(l.key)}
                                </span>
                            </a>
                        ))}
                        <a href={href('/about')} className="group col-span-2 mt-2">
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
