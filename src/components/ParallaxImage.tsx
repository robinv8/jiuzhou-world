interface ParallaxImageProps {
    src: string
    alt: string
    caption?: string
    heightClass?: string
    slotId?: string
}

/** Full-bleed photo band. Static HTML — no scroll script. */
export default function ParallaxImage({
    src,
    alt,
    caption,
    heightClass = 'h-[62vh] md:h-[74vh]',
    slotId,
}: ParallaxImageProps) {
    return (
        <figure>
            <div className={`relative overflow-hidden ${heightClass}`}>
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    {...(slotId ? { 'data-imagery-slot': slotId } : {})}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-[#1f2a26]/10" aria-hidden />
            </div>
            {caption && (
                <figcaption className="px-6 md:px-16 pt-3 text-right text-xs tracking-widest text-[#8b958d]">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}
