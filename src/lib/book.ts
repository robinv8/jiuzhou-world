import type { ChapterKey } from '@/i18n/catalogs'

/** Take the lemma before a fullwidth/halfwidth colon. */
export function shortTitle(s: string): string {
    const i = s.search(/[：:]/)
    return i === -1 ? s : s.slice(0, i)
}

export const CHAPTER_RAIL: Record<ChapterKey, string> = {
    mountains: '#1E3A42',
    scenic: '#2F6B5C',
    culture: '#8A5340',
    history: '#1F2A26',
}

export const CHAPTER_RAIL_STONE: Record<ChapterKey, string> = {
    mountains: '#5C6B5A',
    scenic: '#3D6B6A',
    culture: '#8A5A3C',
    history: '#ECE7D9',
}

export type VolumeTheme = {
    paper: string
    paperInk: string
    paperMuted: string
    toc: string
    tocInk: string
    tocMuted: string
    juan: string
    jacket: string
    stele: boolean
    rail: Record<ChapterKey, string>
    colophonStele: boolean
}

export const HANGZHOU_THEME: VolumeTheme = {
    paper: '#F3EEE2',
    paperInk: '#1F2A26',
    paperMuted: '#3D4842',
    toc: '#ECE5D2',
    tocInk: '#1F2A26',
    tocMuted: '#3D4842',
    juan: '#B03A2E',
    jacket: '#EFE9DC',
    stele: false,
    rail: CHAPTER_RAIL,
    colophonStele: false,
}

export const LINAN_THEME: VolumeTheme = {
    paper: '#E7E3D8',
    paperInk: '#16181A',
    paperMuted: '#3A3D38',
    toc: '#16181A',
    tocInk: '#ECE7D9',
    tocMuted: '#A9A496',
    juan: '#C9824A',
    jacket: '#EFE6CF',
    stele: true,
    rail: CHAPTER_RAIL_STONE,
    colophonStele: true,
}

export function volumeTheme(volume: string): VolumeTheme {
    return volume === 'linan' ? LINAN_THEME : HANGZHOU_THEME
}
