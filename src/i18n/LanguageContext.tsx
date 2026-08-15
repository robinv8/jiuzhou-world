import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'zh' | 'en'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Pick the string for the current language from a bilingual pair. */
  pick: (pair: { zh: string; en: string }) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'linan-lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
    return saved === 'en' || saved === 'zh' ? saved : 'zh'
  })

  const setLang = (next: Lang) => {
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  const pick = (pair: { zh: string; en: string }) => (lang === 'zh' ? pair.zh : pair.en)

  return (
    <LanguageContext.Provider value={{ lang, setLang, pick }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
