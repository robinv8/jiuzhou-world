import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import type { HeaderCopy } from '@/lib/header-copy'

export default function SiteHeader({ copy }: { copy: HeaderCopy }) {
    const [scrolled, setScrolled] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [open, setOpen] = useState(false)
    const [langOpen, setLangOpen] = useState(false)

    const { inLinan, basePath, glossLang, hrefs, nav, locales } = copy
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
    }, [copy.basePath])

    const onDark = !scrolled

    const langButtonClass = onDark
        ? 'border-[#f7f5ee]/40 text-[#f7f5ee] hover:bg-[#f7f5ee] hover:text-[#1f2a26]'
        : 'border-[#1f2a26]/30 text-[#1f2a26] hover:bg-[#1f2a26] hover:text-[#f7f5ee]'

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                hidden ? '-translate-y-full' : 'translate-y-0'
            } ${scrolled ? 'bg-[#f7f5ee]/92 backdrop-blur-xs border-b hairline' : 'bg-transparent'}`}
        >
            <div
                className={`mx-auto flex max-w-7xl items-center justify-between px-6 md:px-16 transition-all duration-500 ${
                    scrolled ? 'py-4' : 'py-7'
                }`}
            >
                <div className="flex items-baseline gap-3">
                    <a href={hrefs.home} className="group flex items-baseline gap-3">
                        <span
                            className={`font-display text-xl md:text-2xl font-semibold tracking-wide transition-colors ${
                                onDark ? 'text-[#f7f5ee]' : 'text-[#1f2a26]'
                            }`}
                        >
                            {copy.name}
                        </span>
                        <span
                            className={`micro-label hidden sm:inline transition-colors ${
                                onDark ? 'text-[#f7f5ee]/70' : 'text-[#5a665e]'
                            }`}
                            lang={glossLang}
                        >
                            {copy.nameGloss}
                        </span>
                    </a>
                    {inLinan && (
                        <>
                            <span className={onDark ? 'text-[#f7f5ee]/40' : 'text-[#1f2a26]/30'}>/</span>
                            <a
                                href={hrefs.linan}
                                className={`font-display text-base tracking-[0.15em] transition-colors ${
                                    onDark
                                        ? 'text-[#f7f5ee]/85 hover:text-[#f7f5ee]'
                                        : 'text-[#1f2a26]/70 hover:text-[#1f2a26]'
                                }`}
                            >
                                {copy.linanVolume}
                            </a>
                        </>
                    )}
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    {inLinan &&
                        nav.map((l) => {
                            const isActive = active(l.base)
                            return (
                                <a key={l.base} href={l.href}>
                                    <span
                                        className={`flex flex-col items-start transition-colors ${
                                            onDark ? 'text-[#f7f5ee]' : 'text-[#1f2a26]'
                                        } ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                                    >
                                        <span className="micro-label" lang={glossLang}>
                                            {l.gloss}
                                        </span>
                                        <span className="font-display text-base tracking-[0.2em]">{l.label}</span>
                                        {isActive && (
                                            <span className="mt-1 h-px w-full bg-[#b03a2e]" aria-hidden />
                                        )}
                                    </span>
                                </a>
                            )
                        })}
                    {!inLinan && (
                        <>
                            <a href={hrefs.about}>
                                <span
                                    className={`flex flex-col items-start transition-colors opacity-70 hover:opacity-100 ${
                                        onDark ? 'text-[#f7f5ee]' : 'text-[#1f2a26]'
                                    }`}
                                >
                                    <span className="micro-label" lang={glossLang}>
                                        {copy.aboutGloss}
                                    </span>
                                    <span className="font-display text-base tracking-[0.2em]">{copy.about}</span>
                                </span>
                            </a>
                            <a href={hrefs.contribute}>
                                <span
                                    className={`flex flex-col items-start transition-colors opacity-70 hover:opacity-100 ${
                                        onDark ? 'text-[#f7f5ee]' : 'text-[#1f2a26]'
                                    }`}
                                >
                                    <span className="micro-label" lang={glossLang}>
                                        {copy.contributeGloss}
                                    </span>
                                    <span className="font-display text-base tracking-[0.2em]">{copy.contribute}</span>
                                </span>
                            </a>
                        </>
                    )}

                    <div className="relative ml-4">
                        <button
                            type="button"
                            onClick={() => setLangOpen((v) => !v)}
                            className={`border px-3 py-1.5 text-xs tracking-[0.2em] transition-colors font-display ${langButtonClass}`}
                            aria-label={copy.language}
                            aria-expanded={langOpen}
                        >
                            {locales.find((l) => l.code === copy.lang)?.short}
                        </button>
                        {langOpen && (
                            <ul
                                className="absolute right-0 mt-2 min-w-36 border border-[#1f2a26]/15 bg-[#f7f5ee] py-1 shadow-xs"
                                role="listbox"
                            >
                                {locales.map((item) => (
                                    <li key={item.code}>
                                        <a
                                            href={item.href}
                                            role="option"
                                            aria-selected={item.code === copy.lang}
                                            className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-[#1f2a26]/06 ${
                                                item.code === copy.lang ? 'text-[#b03a2e]' : 'text-[#1f2a26]'
                                            }`}
                                        >
                                            <span className="font-display tracking-wide">{item.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </nav>

                <button
                    className={`md:hidden ${onDark ? 'text-[#f7f5ee]' : 'text-[#1f2a26]'}`}
                    onClick={() => setOpen(!open)}
                    aria-label={copy.menu}
                    aria-expanded={open}
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {open && (
                <nav className="md:hidden bg-[#f7f5ee] border-t hairline px-6 py-6 flex flex-col gap-5">
                    <a href={hrefs.home} className="flex items-baseline gap-3 text-[#1f2a26]">
                        <span className="font-display text-lg">{copy.name}</span>
                        <span className="micro-label text-[#5a665e]" lang={glossLang}>
                            {copy.homeGloss}
                        </span>
                    </a>
                    <a href={hrefs.linan} className="flex items-baseline gap-3 text-[#1f2a26]">
                        <span className="font-display text-lg">{copy.linanVolume}</span>
                        <span className="micro-label text-[#5a665e]">{copy.volumeI}</span>
                    </a>
                    {inLinan &&
                        nav.map((l) => (
                            <a key={l.base} href={l.href} className="flex items-baseline gap-3 pl-4 text-[#1f2a26]">
                                <span className="font-display text-base">{l.label}</span>
                                <span className="micro-label text-[#5a665e]" lang={glossLang}>
                                    {l.gloss}
                                </span>
                            </a>
                        ))}
                    <a href={hrefs.about} className="flex items-baseline gap-3 text-[#1f2a26]">
                        <span className="font-display text-lg">{copy.about}</span>
                        <span className="micro-label text-[#5a665e]" lang={glossLang}>
                            {copy.aboutGloss}
                        </span>
                    </a>
                    <a href={hrefs.contribute} className="flex items-baseline gap-3 text-[#1f2a26]">
                        <span className="font-display text-lg">{copy.contribute}</span>
                        <span className="micro-label text-[#5a665e]" lang={glossLang}>
                            {copy.contributeGloss}
                        </span>
                    </a>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {locales.map((item) => (
                            <a
                                key={item.code}
                                href={item.href}
                                className={`border px-3 py-1.5 text-xs tracking-[0.2em] font-display ${
                                    item.code === copy.lang
                                        ? 'border-[#b03a2e] text-[#b03a2e]'
                                        : 'border-[#1f2a26]/30 text-[#1f2a26]'
                                }`}
                            >
                                {item.short}
                            </a>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    )
}
