import type { Pair } from '@/i18n/content'
import { useLanguage } from '@/i18n/LanguageContext'

/** Gold-line-prefix editorial micro label (EN small caps + Chinese). */
export default function MiniTitle({ pair, light = false }: { pair: Pair; light?: boolean }) {
  const { lang, pick } = useLanguage()
  return (
    <div className={`flex items-center gap-4 ${light ? 'text-[#f7f5ee]' : 'text-[#5a665e]'}`}>
      <span className={`h-px w-[60px] ${light ? 'bg-[#b0c6b3]' : 'bg-[#8ca693]'}`} aria-hidden />
      <span className="micro-label">{lang === 'zh' ? pair.en : pair.zh}</span>
      <span className="text-sm tracking-[0.3em] font-display">{pick(pair)}</span>
    </div>
  )
}
