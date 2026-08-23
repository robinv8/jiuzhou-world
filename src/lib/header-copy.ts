import { provinces, volumeForPath, volumeNav, VOLUME_I_LATIN } from '@/i18n/catalogs'
import { LANG_META, LOCALES, counterpartLang, type Lang } from '@/i18n/config'
import { messages } from '@/i18n/t'
import { stripLocale, switchLocalePath, withLocale } from '@/lib/i18n-path'

export function headerCopy(lang: Lang, path: string) {
    const { t } = messages(lang)
    const gloss = counterpartLang(lang)
    const basePath = stripLocale(path)

    const currentVolume = volumeForPath(basePath)
    const inVolume = Boolean(currentVolume)
    const volumeTitle = currentVolume ? t(`${currentVolume.key}.volumeTitle`) : ''
    const volumeLatin = currentVolume ? currentVolume.latin : VOLUME_I_LATIN
    const nav = currentVolume ? volumeNav(currentVolume.key) : []

    const currentProvince = provinces.find((p) => basePath === p.route || basePath.startsWith(`${p.route}/`))
    const inProvince = Boolean(currentProvince) && !inVolume
    const photoHero =
        basePath === '/' ||
        Boolean(currentProvince && currentProvince.route === basePath) ||
        Boolean(currentVolume && currentVolume.route === basePath)

    return {
        lang,
        basePath,
        inVolume,
        inProvince,
        photoHero,
        volumeKey: currentVolume?.key ?? '',
        volumeTitle,
        volumeLatin,
        provinceKey: currentProvince?.key ?? '',
        provinceTitle: currentProvince ? t(`province.${currentProvince.key}.title`) : '',
        glossLang: LANG_META[gloss].htmlLang,
        name: t('anthology.name'),
        nameGloss: t('anthology.name', gloss),
        about: t('anthology.about'),
        aboutGloss: t('anthology.about', gloss),
        contribute: t('anthology.contribute'),
        contributeGloss: t('anthology.contribute', gloss),
        homeGloss: t('nav.home', gloss),
        language: t('ui.language'),
        menu: t('ui.menu'),
        hrefs: {
            home: withLocale('/', lang),
            volume: currentVolume ? withLocale(currentVolume.route, lang) : withLocale('/', lang),
            province: currentProvince ? withLocale(currentProvince.route, lang) : withLocale('/', lang),
            about: withLocale('/about', lang),
            contribute: withLocale('/contribute', lang),
        },
        nav: nav.map((l) => ({
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
