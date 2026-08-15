import { createContext, useContext, useEffect, useCallback, type ReactNode } from 'react'
import { DEFAULT_LANG, type Lang } from '@/i18n/config'
import type { LocalizedString } from '@/i18n/content'
import { pickLocalized } from '@/i18n/pick'
import { switchLocalePath } from '@/lib/i18n-path'

export { pickLocalized } from '@/i18n/pick'

interface LanguageContextValue {
    lang: Lang
    setLang: (lang: Lang) => void
    /** Resolve a localized string with fallback: lang → en → zh */
    pick: (pair: LocalizedString) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({
    children,
    lang = DEFAULT_LANG,
}: {
    children: ReactNode
    lang?: Lang
}) {
    const setLang = useCallback(
        (next: Lang) => {
            if (next === lang) return
            const target = switchLocalePath(window.location.pathname, next)
            window.location.assign(target)
        },
        [lang],
    )

    useEffect(() => {
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang
    }, [lang])

    const pick = useCallback((pair: LocalizedString) => pickLocalized(pair, lang), [lang])
    return (
        <LanguageContext.Provider value={{ lang, setLang, pick }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const ctx = useContext(LanguageContext)
    if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
    return ctx
}
