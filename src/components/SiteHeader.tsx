import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { linanNav } from '@/i18n/catalogs'
import { LANG_META, LOCALES, isTranslated, type Lang } from '@/i18n/config'
import { useLanguage } from '@/i18n/LanguageContext'
import { stripLocale, withLocale } from '@/lib/i18n-path'

export default function SiteHeader({ path }: { path: string }) {
    const { lang, setLang, t } = useLanguage()
    const [scrolled, setScrolled] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [open, setOpen] = useState(false)
    const [langOpen, setLangOpen] = useState(false)

    const basePath = stripLocale(path)
    const inLinan = basePath === '/linan' || basePath.startsWith('/linan/')
    const href = (p: string) => withLocale(p, lang)
    const active = (p: string) => basePath === p

    useEffect(() => {
        let lastY = window.scrollY
        const onScroll = () => {
            const y = window.scrollY
            setScrolled(y > 40)
            setHidden(y > lastY && y > 300)
            lastY = y
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        setOpen(false)
        setLangOpen(false)
    }, [path])

    const onDark = !scrolled

    const langButtonClass = onDark
        ? 'border-[#f7f5ee]/40 text-[#f7f5ee] hover:bg-[#f7f5ee] hover:text-[#1f2a26]'
        : 'border-[#1f2a26]/30 text-[#1f2a26] hover:bg-[#1f2a26] hover:text-[#f7f5ee]'

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                hidden ? '-translate-y-full' : 'translate-y-0'
            } ${scrolled ? 'bg-[#f7f5ee]/92 backdrop-blur-sm border-b hairline' : 'bg-transparent'}`}
        >
            <div
                className={`mx-auto flex max-w-7xl items-center justify-between px-6 md:px-16 transition-all duration-500 ${
                    scrolled ? 'py-4' : 'py-7'
                }`}
            >
                <div className="flex items-baseline gap-3">
                    <a href={href('/')} className="group flex items-baseline gap-3">
                        <span
                            className={`font-display text-xl md:text-2xl font-semibold tracking-wide transition-colors ${
                                onDark ? 'text-[#f7f5ee]' : 'text-[#1f2a26]'
                            }`}
                        >
                            {t('anthology.name')}
                        </span>
                        <span
                            className={`micro-label hidden sm:inline transition-colors ${
                                onDark ? 'text-[#f7f5ee]/70' : 'text-[#5a665e]'
                            }`}
                        >
                            Jiuzhou
                        </span>
                    </a>
                    {inLinan && (
                        <>
                            <span className={onDark ? 'text-[#f7f5ee]/40' : 'text-[#1f2a26]/30'}>/</span>
                            <a
                                href={href('/linan')}
                                className={`font-display text-base tracking-[0.15em] transition-colors ${
                                    onDark
                                        ? 'text-[#f7f5ee]/85 hover:text-[#f7f5ee]'
                                        : 'text-[#1f2a26]/70 hover:text-[#1f2a26]'
                                }`}
                            >
                                {t('ui.linanVolume')}
                            </a>
                        </>
                    )}
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    {inLinan &&
                        linanNav.map((l) => {
                            const isActive = active(l.base)
                            return (
                                <a key={l.base} href={href(l.base)}>
                                    <span
                                        className={`flex flex-col items-start transition-colors ${
                                            onDark ? 'text-[#f7f5ee]' : 'text-[#1f2a26]'
                                        } ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                                    >
                                        <span className="micro-label">{t(l.key, 'en')}</span>
                                        <span className="font-display text-base tracking-[0.2em]">
                                            {t(l.key, 'zh')}
                                        </span>
                                        {isActive && (
                                            <span className="mt-1 h-px w-full bg-[#b03a2e]" aria-hidden />
                                        )}
                                    </span>
                                </a>
                            )
                        })}
                    {!inLinan && (
                        <a href={href('/about')}>
                            <span
                                className={`flex flex-col items-start transition-colors opacity-70 hover:opacity-100 ${
                                    onDark ? 'text-[#f7f5ee]' : 'text-[#1f2a26]'
                                }`}
                            >
                                <span className="micro-label">{t('anthology.about', 'en')}</span>
                                <span className="font-display text-base tracking-[0.2em]">
                                    {t('anthology.about', 'zh')}
                                </span>
                            </span>
                        </a>
                    )}

                    <div className="relative ml-4">
                        <button
                            type="button"
                            onClick={() => setLangOpen((v) => !v)}
                            className={`border px-3 py-1.5 text-xs tracking-[0.2em] transition-colors font-display ${langButtonClass}`}
                            aria-label="Language"
                            aria-expanded={langOpen}
                        >
                            {LANG_META[lang].short}
                        </button>
                        {langOpen && (
                            <ul
                                className="absolute right-0 mt-2 min-w-[9rem] border border-[#1f2a26]/15 bg-[#f7f5ee] py-1 shadow-sm"
                                role="listbox"
                            >
                                {LOCALES.map((code) => (
                                    <li key={code}>
                                        <button
                                            type="button"
                                            role="option"
                                            aria-selected={code === lang}
                                            onClick={() => setLang(code as Lang)}
                                            className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-[#1f2a26]/06 ${
                                                code === lang ? 'text-[#b03a2e]' : 'text-[#1f2a26]'
                                            }`}
                                        >
                                            <span className="font-display tracking-wide">
                                                {LANG_META[code].label}
                                            </span>
                                            {!isTranslated(code) && (
                                                <span className="text-[10px] tracking-wider text-[#8b958d]">
                                                    β
                                                </span>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </nav>

                <button
                    className={`md:hidden ${onDark ? 'text-[#f7f5ee]' : 'text-[#1f2a26]'}`}
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {open && (
                <nav className="md:hidden bg-[#f7f5ee] border-t hairline px-6 py-6 flex flex-col gap-5">
                    <a href={href('/')} className="flex items-baseline gap-3 text-[#1f2a26]">
                        <span className="font-display text-lg">{t('anthology.name')}</span>
                        <span className="micro-label text-[#5a665e]">Home</span>
                    </a>
                    <a href={href('/linan')} className="flex items-baseline gap-3 text-[#1f2a26]">
                        <span className="font-display text-lg">
                            {t('ui.linanVolume')}
                        </span>
                        <span className="micro-label text-[#5a665e]">Vol. I</span>
                    </a>
                    {inLinan &&
                        linanNav.map((l) => (
                            <a
                                key={l.base}
                                href={href(l.base)}
                                className="flex items-baseline gap-3 pl-4 text-[#1f2a26]"
                            >
                                <span className="font-display text-base">{t(l.key, 'zh')}</span>
                                <span className="micro-label text-[#5a665e]">{t(l.key, 'en')}</span>
                            </a>
                        ))}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {LOCALES.map((code) => (
                            <button
                                key={code}
                                type="button"
                                onClick={() => setLang(code as Lang)}
                                className={`border px-3 py-1.5 text-xs tracking-[0.2em] font-display ${
                                    code === lang
                                        ? 'border-[#b03a2e] text-[#b03a2e]'
                                        : 'border-[#1f2a26]/30 text-[#1f2a26]'
                                }`}
                            >
                                {LANG_META[code].short}
                                {!isTranslated(code) ? ' · β' : ''}
                            </button>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    )
}
