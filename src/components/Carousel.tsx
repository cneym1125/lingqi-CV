import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
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

export function Carousel({
  slides,
  autoplayInterval = 4500,
  className = '',
}: Props) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState<number | null>(null)
  const total = slides.length
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(500)

  // 响应式宽度
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // 自动轮播
  useEffect(() => {
    if (!autoplayInterval || total <= 1 || paused) return
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % total)
    }, autoplayInterval)
    return () => window.clearInterval(t)
  }, [autoplayInterval, total, paused])

  const go = useCallback(
    (delta: number) => {
      setIdx((i) => (i + delta + total) % total)
    },
    [total]
  )

  if (total === 0) return null

  // 计算每张图的 3D 变换
  const gap = Math.min(containerWidth * 0.18, 90)
  const stickUp = gap * 0.6

  function getStyle(index: number): React.CSSProperties {
    const isActive = index === idx
    const isLeft = (idx - 1 + total) % total === index
    const isRight = (idx + 1) % total === index

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        transform: 'translateX(0) translateY(0) scale(1) rotateY(0deg)',
        transition: 'all 0.7s cubic-bezier(.4,1.6,.3,1)',
      }
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.85,
        transform: `translateX(-${gap}px) translateY(-${stickUp}px) scale(0.82) rotateY(12deg)`,
        transition: 'all 0.7s cubic-bezier(.4,1.6,.3,1)',
      }
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.85,
        transform: `translateX(${gap}px) translateY(-${stickUp}px) scale(0.82) rotateY(-12deg)`,
        transition: 'all 0.7s cubic-bezier(.4,1.6,.3,1)',
      }
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none',
      transform: 'translateX(0) translateY(0) scale(0.7) rotateY(0deg)',
      transition: 'all 0.7s cubic-bezier(.4,1.6,.3,1)',
    }
  }

  // 把 slides 转成 Lightbox 需要的 MediaItem 格式
  const lightboxItems = slides.map((s) => ({
    type: 'image' as const,
    src: s.src,
    caption: s.caption,
  }))

  return (
    <>
      <div
        ref={containerRef}
        className={`group relative h-full w-full overflow-hidden ${className}`}
        style={{ perspective: '1200px' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* 图片层 */}
        <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
          {slides.map((slide, i) => (
            <img
              key={slide.src + i}
              src={slide.src}
              alt={slide.caption ?? ''}
              onClick={() => setLightboxOpen(i)}
              className="absolute inset-0 h-full w-full cursor-pointer rounded-2xl object-cover shadow-soft-lg"
              style={getStyle(i)}
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>

        {/* 底部渐变 + caption */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 rounded-b-2xl bg-gradient-to-t from-black/50 to-transparent" />
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-3 left-4 right-20 z-10 text-xs font-medium text-white/95 drop-shadow-md"
          >
            {slides[idx].caption}
          </motion.div>
        </AnimatePresence>

        {/* 左右箭头 */}
        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="上一张"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-ink-900/80 p-2.5 text-white shadow-soft-lg backdrop-blur transition hover:bg-brand-blue md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="下一张"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-ink-900/80 p-2.5 text-white shadow-soft-lg backdrop-blur transition hover:bg-brand-blue md:opacity-0 md:group-hover:opacity-100"
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
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx
                    ? 'w-5 bg-white'
                    : 'w-1.5 bg-white/55 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 点击放大 Lightbox */}
      <Lightbox
        items={lightboxItems}
        openIndex={lightboxOpen}
        onClose={() => setLightboxOpen(null)}
      />
    </>
  )
}
