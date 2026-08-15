import AppShell from '@/components/AppShell'
import Home from '@/views/Home'
import About from '@/views/About'
import LinanHome from '@/views/linan/LinanHome'
import Mountains from '@/views/linan/Mountains'
import Scenic from '@/views/linan/Scenic'
import History from '@/views/linan/History'
import Culture from '@/views/linan/Culture'

export function HomeEntry() {
    return (
        <AppShell path="/">
            <Home />
        </AppShell>
    )
}

export function AboutEntry() {
    return (
        <AppShell path="/about">
            <About />
        </AppShell>
    )
}

export function LinanHomeEntry() {
    return (
        <AppShell path="/linan">
            <LinanHome />
        </AppShell>
    )
}

export function MountainsEntry() {
    return (
        <AppShell path="/linan/mountains">
            <Mountains />
        </AppShell>
    )
}

export function ScenicEntry() {
    return (
        <AppShell path="/linan/scenic">
            <Scenic />
        </AppShell>
    )
}

export function HistoryEntry() {
    return (
        <AppShell path="/linan/history">
            <History />
        </AppShell>
    )
}

export function CultureEntry() {
    return (
        <AppShell path="/linan/culture">
            <Culture />
        </AppShell>
    )
}
