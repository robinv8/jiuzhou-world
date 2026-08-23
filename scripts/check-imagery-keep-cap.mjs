/**
 * Drive shipped pickHits: more than 50 classified-keep hits must cap at KEEP_TARGET (50).
 * No network.
 */
import { pickHits, KEEP_TARGET, QUEUE_PICK } from './imagery-studio-plugin.mjs'

const query = '杭州西湖'
const hits = Array.from({ length: 60 }, (_, i) => ({
    title: `杭州西湖实景 ${i + 1}`,
    url: `https://photos.example.org/xihu/${i + 1}.jpg`,
    page: `https://photos.example.org/hangzhou/xihu/${i + 1}`,
    murl: `https://photos.example.org/xihu/${i + 1}.jpg`,
}))

const dropped = {}
const picked = pickHits(hits, query, dropped)

if (KEEP_TARGET !== 50) {
    console.error(`[imagery] KEEP_TARGET is ${KEEP_TARGET}, expected 50`)
    process.exit(1)
}
if (picked.length !== 50) {
    console.error(`[imagery] pickHits kept ${picked.length} of 60 synthetic keeps, expected 50`)
    console.error('dropped', dropped)
    process.exit(1)
}
if (picked.some((h, i) => h.title !== `杭州西湖实景 ${i + 1}`)) {
    console.error('[imagery] pickHits did not preserve keep order for the first 50')
    process.exit(1)
}

if (QUEUE_PICK !== 5) {
    console.error(`[imagery] QUEUE_PICK is ${QUEUE_PICK}, expected 5`)
    process.exit(1)
}

console.log(`[imagery] keep cap ${KEEP_TARGET}; synthetic 60 keep hits → picked ${picked.length}; queue pick ${QUEUE_PICK}`)
