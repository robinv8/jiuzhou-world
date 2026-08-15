import { useEffect, useRef } from 'react'

interface ParallaxImageProps {
  src: string
  alt: string
  caption?: string
  heightClass?: string
}

/**
 * Full-bleed parallax band: inner image translates slower than scroll (rAF-driven).
 * Falls back to a static image under prefers-reduced-motion.
 */
export default function ParallaxImage({
  src,
  alt,
  caption,
  heightClass = 'h-[62vh] md:h-[74vh]',
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      const wrap = wrapRef.current
      const img = imgRef.current
      if (!wrap || !img) return
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.bottom < 0 || rect.top > vh) return
      // progress: 0 when band enters bottom, 1 when it leaves top
      const progress = (vh - rect.top) / (vh + rect.height)
      const shift = (progress - 0.5) * 18 // ±9% travel
      img.style.transform = `translateY(${shift}%)`
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <figure>
      <div ref={wrapRef} className={`relative overflow-hidden ${heightClass}`}>
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute left-0 w-full object-cover will-change-transform"
          style={{ height: '124%', top: '-12%' }}
        />
        <div className="absolute inset-0 bg-[#1f2a26]/10" aria-hidden />
      </div>
      {caption && (
        <figcaption className="px-6 md:px-16 pt-3 text-right text-xs tracking-widest text-[#8b958d]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
