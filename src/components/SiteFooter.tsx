import { anthology, nav } from '@/i18n/content'
import { footer } from '@/i18n/pages/culture'
import { useLanguage } from '@/i18n/LanguageContext'
import { withLocale } from '@/lib/i18n-path'
import Seal from './Seal'

export default function SiteFooter() {
    const { lang, pick } = useLanguage()
    const href = (p: string) => withLocale(p, lang)

    return (
        <footer className="bg-[#1f2a26] text-[#f7f5ee]">
            <div className="mx-auto max-w-7xl px-6 md:px-16 py-16 md:py-24">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
                    <div className="max-w-md">
                        <div className="flex items-center gap-4">
                            <Seal char="九" />
                            <div>
                                <p className="font-display text-2xl font-semibold">
                                    {pick(anthology.name)}
                                </p>
                                <p className="micro-label text-[#b0c6b3] mt-1">{anthology.domain}</p>
                            </div>
                        </div>
                        <p className="mt-6 text-sm leading-7 text-[#f7f5ee]/70">
                            {pick(footer.colophon)}
                        </p>
                    </div>
                    <nav className="grid grid-cols-2 gap-x-16 gap-y-4">
                        <a href={href('/linan')} className="group col-span-2">
                            <span className="micro-label text-[#b0c6b3]/70 block">Vol. I</span>
                            <span className="font-display text-lg tracking-[0.2em] text-[#f7f5ee]/90 group-hover:text-[#b0c6b3] transition-colors">
                                {pick({ zh: '临安卷', en: "Lin'an", ja: '臨安の巻', ko: '임안 권' })}
                            </span>
                        </a>
                        {[
                            { base: '/linan/mountains', label: nav.mountains },
                            { base: '/linan/scenic', label: nav.scenic },
                            { base: '/linan/history', label: nav.history },
                            { base: '/linan/culture', label: nav.culture },
                        ].map((l) => (
                            <a key={l.base} href={href(l.base)} className="group pl-0">
                                <span className="micro-label text-[#b0c6b3]/50 block">{l.label.en}</span>
                                <span className="font-display text-base tracking-[0.2em] text-[#f7f5ee]/70 group-hover:text-[#b0c6b3] transition-colors">
                                    {l.label.zh}
                                </span>
                            </a>
                        ))}
                        <a href={href('/about')} className="group col-span-2 mt-2">
                            <span className="micro-label text-[#b0c6b3]/70 block">
                                {anthology.about.en}
                            </span>
                            <span className="font-display text-base tracking-[0.2em] text-[#f7f5ee]/70 group-hover:text-[#b0c6b3] transition-colors">
                                {anthology.about.zh}
                            </span>
                        </a>
                    </nav>
                </div>
                <div className="mt-16 pt-8 border-t border-[#f7f5ee]/15 flex flex-col md:flex-row justify-between gap-4 text-xs tracking-widest text-[#f7f5ee]/50">
                    <span>
                        {pick({
                            zh: '九州志 · 一卷一城',
                            en: 'Jiuzhou · one city, one volume',
                            ja: '九州志 · 一巻一城',
                            ko: '구주지 · 일권일성',
                        })}
                    </span>
                    <span className="micro-label">EST. MMXXVI · JIUZHOU.WORLD</span>
                </div>
            </div>
        </footer>
    )
}
