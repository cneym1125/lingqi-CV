import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Slide {
  src: string
  caption?: string
}

interface Props {
  slides: Slide[]
  /** 自动轮播间隔(ms),0 表示禁用 */
  autoplayInterval?: number
  /** 容器额外类名,用于控制宽高比 */
  className?: string
}

export function Carousel({
  slides,
  autoplayInterval = 4500,
  className = '',
}: Props) {
  const [idx, setIdx] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const total = slides.length

  // 自动轮播
  useEffect(() => {
    if (!autoplayInterval || total <= 1 || paused) return
    const t = window.setInterval(() => {
      setDirection(1)
      setIdx((i) => (i + 1) % total)
    }, autoplayInterval)
    return () => window.clearInterval(t)
  }, [autoplayInterval, total, paused])

  const go = (delta: number) => {
    setDirection(delta)
    setIdx((i) => (i + delta + total) % total)
  }

  if (total === 0) return null

  const slide = slides[idx]

  return (
    <div
      className={`group relative h-full w-full overflow-hidden bg-ink-50 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={idx}
          src={slide.src}
          alt={slide.caption ?? ''}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40, scale: 1.04 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -direction * 40, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </AnimatePresence>

      {/* 底部渐变 + 标题 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
      {slide.caption && (
        <div className="absolute bottom-3 left-4 right-20 text-xs font-medium text-white/95 drop-shadow-md">
          {slide.caption}
        </div>
      )}

      {/* 左右切换按钮 — 桌面 hover 显示,移动端始终显示 */}
      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="上一张"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-ink-700 shadow-soft backdrop-blur transition hover:bg-white md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="下一张"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-ink-700 shadow-soft backdrop-blur transition hover:bg-white md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* 指示点 */}
      {total > 1 && (
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`切到第 ${i + 1} 张`}
              onClick={() => {
                setDirection(i > idx ? 1 : -1)
                setIdx(i)
              }}
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
  )
}
