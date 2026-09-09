/**
 * Guard: Cloudflare Pages SPA-falls back to / with HTTP 200 unless
 * dist/404.html exists. Fail CI if the build forgot it, or if it
 * reused the homepage title / canonical.
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const file = join(dist, '404.html')

if (!existsSync(file)) {
    console.error(
        '[404] dist/404.html is missing. Cloudflare Pages will serve / with HTTP 200 for unknown paths.',
    )
    process.exit(1)
}

const html = readFileSync(file, 'utf8')
const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? ''

if (!/noindex/i.test(html)) {
    console.error('[404] dist/404.html must be noindex')
    process.exit(1)
}

if (/rel=["']canonical["'][^>]*href=["']https:\/\/jiuzhou\.world\/["']/i.test(html)) {
    console.error('[404] dist/404.html must not use the homepage canonical')
    process.exit(1)
}

if (/一卷一城/.test(title)) {
    console.error('[404] dist/404.html must not reuse the homepage title, got:', title)
    process.exit(1)
}

if (!/^404\b/.test(title.trim())) {
    console.error('[404] dist/404.html title should start with 404, got:', title)
    process.exit(1)
}

console.log('[404] dist/404.html present and not a homepage stand-in')
