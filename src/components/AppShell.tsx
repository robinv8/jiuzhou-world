import type { ReactNode } from 'react'
import type { Lang } from '@/i18n/config'
import { LanguageProvider } from '@/i18n/LanguageContext'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function AppShell({
    path,
    lang,
    children,
}: {
    path: string
    lang: Lang
    children: ReactNode
}) {
    return (
        <LanguageProvider lang={lang}>
            <SiteHeader path={path} />
            {children}
            <SiteFooter />
        </LanguageProvider>
    )
}
