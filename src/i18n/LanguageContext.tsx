import { createContext, useContext, useCallback, type ReactNode } from 'react'
import { DEFAULT_LANG, type Lang } from '@/i18n/config'
import { t as translate, tList as translateList } from '@/i18n/t'
import { switchLocalePath } from '@/lib/i18n-path'

interface LanguageContextValue {
    lang: Lang
    setLang: (lang: Lang) => void
    /** Resolve a catalog key. Optional locale override (e.g. bilingual labels). */
    t: (key: string, locale?: Lang) => string
    tList: (key: string, locale?: Lang) => string[]
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

    const t = useCallback((key: string, locale?: Lang) => translate(key, locale ?? lang), [lang])
    const tList = useCallback((key: string, locale?: Lang) => translateList(key, locale ?? lang), [lang])

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, tList }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const ctx = useContext(LanguageContext)
    if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
    return ctx
}
