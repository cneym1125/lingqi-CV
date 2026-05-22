import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Lightbox } from './Lightbox'

interface Slide {
  src: string
  caption?: string
}

interface Props {
  slides: Slide[]
  autoplayInterval?: number
  className?: string
}

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0.4,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0.4,
  }),
}

export function Carousel({
  slides,
  autoplayInterval = 4500,
  className = '',
}: Props) {
  const [[idx, direction], setPage] = useState([0, 0])
  const [paused, setPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState<number | null>(null)
  const total = slides.length

  // 自动轮播
  useEffect(() => {
    if (!autoplayInterval || total <= 1 || paused) return
    const t = window.setInterval(() => {
      setPage(([prev]) => [(prev + 1) % total, 1])
    }, autoplayInterval)
    return () => window.clearInterval(t)
  }, [autoplayInterval, total, paused])

  const go = useCallback(
    (delta: number) => {
      setPage(([prev]) => [(prev + delta + total) % total, delta])
    },
    [total]
  )

  if (total === 0) return null

  const slide = slides[idx]

  // Lightbox 需要的格式
  const lightboxItems = slides.map((s) => ({
    type: 'image' as const,
    src: s.src,
    caption: s.caption,
  }))

  return (
    <>
      <div
        className={`group relative h-full w-full overflow-hidden ${className}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* 图片滑动层 */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={idx}
            src={slide.src}
            alt={slide.caption ?? ''}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            onClick={() => setLightboxOpen(idx)}
            className="absolute inset-0 h-full w-full cursor-pointer object-cover"
            loading="lazy"
            draggable={false}
          />
        </AnimatePresence>

        {/* 底部渐变 + caption */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/50 to-transparent" />
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-3 left-4 right-20 z-10 text-xs font-medium text-white/95 drop-shadow-md"
          >
            {slide.caption}
          </motion.div>
        </AnimatePresence>

        {/* 左右箭头 */}
        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="上一张"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-ink-900/70 p-2.5 text-white shadow-soft-lg backdrop-blur transition hover:bg-brand-blue md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="下一张"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-ink-900/70 p-2.5 text-white shadow-soft-lg backdrop-blur transition hover:bg-brand-blue md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* 指示点 */}
        {total > 1 && (
          <div className="absolute bottom-3 right-4 z-10 flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`切到第 ${i + 1} 张`}
                onClick={() => setPage([i, i > idx ? 1 : -1])}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx
                    ? 'w-5 bg-white'
                    : 'w-1.5 bg-white/55 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}

        {/* 点击放大提示 */}
        <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-black/40 px-2 py-1 text-[10px] text-white/80 backdrop-blur md:opacity-0 md:group-hover:opacity-100">
          点击放大
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        items={lightboxItems}
        openIndex={lightboxOpen}
        onClose={() => setLightboxOpen(null)}
      />
    </>
  )
}
