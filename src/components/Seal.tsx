/** Vermilion seal stamp, as on a colophon. */
export default function Seal({ char = '志' }: { char?: string }) {
  return (
    <span
      aria-hidden
      className="seal-stamp inline-flex h-10 w-10 items-center justify-center font-display text-xl leading-none select-none rounded-[3px] -rotate-3"
    >
      {char}
    </span>
  )
}
