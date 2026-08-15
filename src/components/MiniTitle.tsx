import { LANG_META, counterpartLang, type Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'

/** Gold-line-prefix editorial micro label (counterpart lang + current). */
export default function MiniTitle({
    i18nKey,
    lang,
    light = false,
}: {
    i18nKey: string
    lang: Lang
    light?: boolean
}) {
    const { t } = messages(lang)
    const gloss = counterpartLang(lang)
    return (
        <div className={`flex items-center gap-4 ${light ? 'text-[#f7f5ee]' : 'text-[#5a665e]'}`}>
            <span className={`h-px w-[60px] ${light ? 'bg-[#b0c6b3]' : 'bg-[#8ca693]'}`} aria-hidden />
            <span className="micro-label" lang={LANG_META[gloss].htmlLang}>
                {t(i18nKey, gloss)}
            </span>
            <span className="text-sm tracking-[0.3em] font-display">{t(i18nKey)}</span>
        </div>
    )
}
