import { linanNav, VOLUME_I_LATIN } from '@/i18n/catalogs'
import { LANG_META, LOCALES, counterpartLang, type Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import { stripLocale, switchLocalePath, withLocale } from '@/lib/i18n-path'

export function headerCopy(lang: Lang, path: string) {
    const { t } = messages(lang)
    const gloss = counterpartLang(lang)
    const basePath = stripLocale(path)

    return {
        lang,
        basePath,
        inLinan: basePath === '/linan' || basePath.startsWith('/linan/'),
        glossLang: LANG_META[gloss].htmlLang,
        volumeI: VOLUME_I_LATIN,
        name: t('anthology.name'),
        nameGloss: t('anthology.name', gloss),
        linanVolume: t('ui.linanVolume'),
        about: t('anthology.about'),
        aboutGloss: t('anthology.about', gloss),
        contribute: t('anthology.contribute'),
        contributeGloss: t('anthology.contribute', gloss),
        homeGloss: t('nav.home', gloss),
        language: t('ui.language'),
        menu: t('ui.menu'),
        hrefs: {
            home: withLocale('/', lang),
            linan: withLocale('/linan', lang),
            about: withLocale('/about', lang),
            contribute: withLocale('/contribute', lang),
        },
        nav: linanNav.map((l) => ({
            base: l.base,
            href: withLocale(l.base, lang),
            label: t(l.key),
            gloss: t(l.key, gloss),
        })),
        locales: LOCALES.map((code) => ({
            code,
            label: LANG_META[code].label,
            short: LANG_META[code].short,
            href: switchLocalePath(path, code),
        })),
    }
}

export type HeaderCopy = ReturnType<typeof headerCopy>
