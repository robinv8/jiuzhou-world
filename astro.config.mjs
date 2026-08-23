import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { imageryStudio } from './scripts/imagery-studio-plugin.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Legacy /linan URLs (pre-hierarchy) → /hangzhou/linan. Mirrors public/_redirects for dev.
const legacyLinanRedirects = Object.fromEntries(
    ['', '/en', '/ja', '/ko', '/zh-hant'].flatMap((loc) =>
        ['', '/mountains', '/scenic', '/culture', '/history', '/contribute'].map((p) => [
            `${loc}/linan${p}`,
            `${loc}/hangzhou/linan${p}`,
        ])
    )
)

export default defineConfig({
    site: 'https://jiuzhou.world',
    output: 'static',
    trailingSlash: 'always',
    redirects: legacyLinanRedirects,
    integrations: [
        react(),
        sitemap({
            filter: (page) => {
                if (page.includes('/404')) return false
                return ![
                    '/hangzhou/fuyang',
                    '/hangzhou/tonglu',
                    '/hangzhou/jiande',
                    '/hangzhou/chunan',
                    '/hangzhou/xiaoshan',
                ].some((route) => page.includes(route))
            },
            i18n: {
                defaultLocale: 'zh',
                locales: {
                    zh: 'zh-CN',
                    'zh-hant': 'zh-Hant',
                    en: 'en',
                    ja: 'ja',
                    ko: 'ko',
                },
            },
        }),
    ],
    vite: {
        plugins: [tailwindcss(), imageryStudio()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            watch: {
                ignored: [
                    '**/node_modules/**',
                    '**/.git/**',
                    '**/_photo_candidates/**',
                    '**/artifacts/**',
                ],
            },
        },
    },
})
