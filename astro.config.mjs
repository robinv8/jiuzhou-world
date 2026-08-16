import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    site: 'https://jiuzhou.world',
    output: 'static',
    integrations: [
        react(),
        sitemap({
            filter: (page) => !page.includes('/404'),
            i18n: {
                defaultLocale: 'zh',
                locales: {
                    zh: 'zh-CN',
                    en: 'en',
                    ja: 'ja',
                    ko: 'ko',
                },
            },
        }),
    ],
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
    },
})
