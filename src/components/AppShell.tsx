import type { ReactNode } from 'react'
import { LanguageProvider } from '@/i18n/LanguageContext'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function AppShell({
    path,
    children,
}: {
    path: string
    children: ReactNode
}) {
    return (
        <LanguageProvider>
            <SiteHeader path={path} />
            {children}
            <SiteFooter />
        </LanguageProvider>
    )
}
