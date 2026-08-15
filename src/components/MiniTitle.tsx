import { counterpartLang } from '@/i18n/config'
import { useLanguage } from '@/i18n/LanguageContext'

/** Gold-line-prefix editorial micro label (counterpart lang + current). */
export default function MiniTitle({ i18nKey, light = false }: { i18nKey: string; light?: boolean }) {
    const { lang, t } = useLanguage()
    return (
        <div className={`flex items-center gap-4 ${light ? 'text-[#f7f5ee]' : 'text-[#5a665e]'}`}>
            <span className={`h-px w-[60px] ${light ? 'bg-[#b0c6b3]' : 'bg-[#8ca693]'}`} aria-hidden />
            <span className="micro-label">{t(i18nKey, counterpartLang(lang))}</span>
            <span className="text-sm tracking-[0.3em] font-display">{t(i18nKey)}</span>
        </div>
    )
}
