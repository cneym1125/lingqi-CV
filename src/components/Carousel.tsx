import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Lightbox } from './Lightbox'

interface Slide {
  src: string
  caption?: string
}

interface Props {
  slides: Slide[]
  autoplay?: boolean
}

export function Carousel({ slides, autoplay = true }: Props) {
  const [[idx, dir], setPage] = useState([0, 0])
  const [hoverPrev, setHoverPrev] = useState(false)
  const [hoverNext, setHoverNext] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState<number | null>(null)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const total = slides.length

  useEffect(() => {
    if (!autoplay || total <= 1) return
    autoplayRef.current = setInterval(() => {
      setPage(([prev]) => [(prev + 1) % total, 1])
    }, 5000)
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  }, [autoplay, total])

  const go = useCallback((delta: number) => {
    setPage(([prev]) => [(prev + delta + total) % total, delta])
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }, [total])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }
  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1)
  }

  const lightboxItems = useMemo(
    () => slides.map((s) => ({ type: 'image' as const, src: s.src, caption: s.caption })),
    [slides]
  )

  if (total === 0) return null

  const slide = slides[idx]

  return (
    <>
      <div
        className="relative w-full overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* 图片区域 — 自适应高度 */}
        <div className="relative w-full">
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.img
              key={idx}
              src={slide.src}
              alt={slide.caption ?? ''}
              custom={dir}
              initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir > 0 ? -60 : 60 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => setLightboxOpen(idx)}
              className="w-full cursor-pointer"
              style={{ display: 'block', height: 'auto' }}
              loading="lazy"
              draggable={false}
            />
          </AnimatePresence>

          {/* caption */}
          {slide.caption && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-3 text-xs text-white/90">
              {slide.caption}
            </div>
          )}
        </div>

        {/* 左右箭头 — 悬浮在图片上 */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="上一张"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-colors"
              style={{ backgroundColor: hoverPrev ? '#3370FF' : 'rgba(0,0,0,0.55)' }}
            >
              <ArrowLeft className="h-4 w-4 text-white" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="下一张"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-colors"
              style={{ backgroundColor: hoverNext ? '#3370FF' : 'rgba(0,0,0,0.55)' }}
            >
              <ArrowRight className="h-4 w-4 text-white" />
            </button>
          </>
        )}

        {/* 指示点 */}
        {total > 1 && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage([i, i > idx ? 1 : -1])}
                className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/55'}`}
              />
            ))}
          </div>
        )}
      </div>

      <Lightbox
        items={lightboxItems}
        openIndex={lightboxOpen}
        onClose={() => setLightboxOpen(null)}
      />
    </>
  )
}
