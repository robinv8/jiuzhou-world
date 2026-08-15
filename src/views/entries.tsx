import type { ReactNode } from 'react'
import type { Lang } from '@/i18n/config'
import AppShell from '@/components/AppShell'
import Home from '@/views/Home'
import About from '@/views/About'
import LinanHome from '@/views/linan/LinanHome'
import Mountains from '@/views/linan/Mountains'
import Scenic from '@/views/linan/Scenic'
import History from '@/views/linan/History'
import Culture from '@/views/linan/Culture'
import { withLocale } from '@/lib/i18n-path'

function shell(basePath: string, lang: Lang, children: ReactNode) {
    return (
        <AppShell path={withLocale(basePath, lang)} lang={lang}>
            {children}
        </AppShell>
    )
}

export function HomeEntry({ lang }: { lang: Lang }) {
    return shell('/', lang, <Home />)
}

export function AboutEntry({ lang }: { lang: Lang }) {
    return shell('/about', lang, <About />)
}

export function LinanHomeEntry({ lang }: { lang: Lang }) {
    return shell('/linan', lang, <LinanHome />)
}

export function MountainsEntry({ lang }: { lang: Lang }) {
    return shell('/linan/mountains', lang, <Mountains />)
}

export function ScenicEntry({ lang }: { lang: Lang }) {
    return shell('/linan/scenic', lang, <Scenic />)
}

export function HistoryEntry({ lang }: { lang: Lang }) {
    return shell('/linan/history', lang, <History />)
}

export function CultureEntry({ lang }: { lang: Lang }) {
    return shell('/linan/culture', lang, <Culture />)
}
