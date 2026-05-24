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

function calculateGap(width: number) {
  const minGap = 30
  const maxGap = 60
  if (width <= 400) return minGap
  if (width >= 800) return maxGap
  return minGap + (maxGap - minGap) * ((width - 400) / 400)
}

export function Carousel({ slides, autoplay = true }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverPrev, setHoverPrev] = useState(false)
  const [hoverNext, setHoverNext] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState<number | null>(null)
  const [containerWidth, setContainerWidth] = useState(500)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const total = slides.length

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (!autoplay || total <= 1) return
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 5000)
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  }, [autoplay, total])

  const go = useCallback((delta: number) => {
    setActiveIndex((prev) => (prev + delta + total) % total)
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }, [total])

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX }
  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1)
  }

  const gap = calculateGap(containerWidth)
  const stickUp = gap * 0.6

  function getStyle(index: number): React.CSSProperties {
    const isActive = index === activeIndex
    const isLeft = (activeIndex - 1 + total) % total === index
    const isRight = (activeIndex + 1) % total === index

    if (isActive) return {
      zIndex: 3, opacity: 1, pointerEvents: 'auto',
      transform: 'translateX(0) translateY(0) scale(1) rotateY(0deg)',
      transition: 'all 0.75s cubic-bezier(.4,2,.3,1)',
    }
    if (isLeft) return {
      zIndex: 2, opacity: 0.9, pointerEvents: 'auto',
      transform: `translateX(-${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(12deg)`,
      transition: 'all 0.75s cubic-bezier(.4,2,.3,1)',
    }
    if (isRight) return {
      zIndex: 2, opacity: 0.9, pointerEvents: 'auto',
      transform: `translateX(${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(-12deg)`,
      transition: 'all 0.75s cubic-bezier(.4,2,.3,1)',
    }
    return {
      zIndex: 1, opacity: 0, pointerEvents: 'none',
      transition: 'all 0.75s cubic-bezier(.4,2,.3,1)',
    }
  }

  const lightboxItems = useMemo(
    () => slides.map((s) => ({ type: 'image' as const, src: s.src, caption: s.caption })),
    [slides]
  )

  if (total === 0) return null

  // 固定高度 = 容器宽度 * 0.65（接近常见截图比例），图片 object-contain 完整显示
  const fixedHeight = Math.round(containerWidth * 0.65)

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ perspective: '1000px', height: fixedHeight + stickUp }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, index) => (
          <img
            key={slide.src + index}
            src={slide.src}
            alt={slide.caption ?? ''}
            onClick={() => {
              if (index === activeIndex) setLightboxOpen(index)
              else if ((activeIndex - 1 + total) % total === index) go(-1)
              else if ((activeIndex + 1) % total === index) go(1)
            }}
            className="absolute inset-0 w-full rounded-2xl shadow-lg ring-1 ring-ink-100"
            style={{
              ...getStyle(index),
              height: fixedHeight,
              objectFit: 'contain',
              background: '#f0f1f3',
              cursor: index === activeIndex ? 'zoom-in' : 'pointer',
            }}
            loading="lazy"
            draggable={false}
          />
        ))}

        {/* caption */}
        {slides[activeIndex].caption && (
          <div className="absolute bottom-0 inset-x-0 z-10 text-center text-xs text-ink-400 pb-1">
            {slides[activeIndex].caption}
          </div>
        )}
      </div>

      {/* 箭头 + 指示点 */}
      {total > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            onMouseEnter={() => setHoverPrev(true)}
            onMouseLeave={() => setHoverPrev(false)}
            aria-label="上一张"
            className="flex h-9 w-9 items-center justify-center rounded-full shadow transition-colors"
            style={{ backgroundColor: hoverPrev ? '#3370FF' : '#1F2329' }}
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === activeIndex ? 'w-5 bg-ink-700' : 'w-1.5 bg-ink-200'}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            aria-label="下一张"
            className="flex h-9 w-9 items-center justify-center rounded-full shadow transition-colors"
            style={{ backgroundColor: hoverNext ? '#3370FF' : '#1F2329' }}
          >
            <ArrowRight className="h-4 w-4 text-white" />
          </button>
        </div>
      )}

      <Lightbox
        items={lightboxItems}
        openIndex={lightboxOpen}
        onClose={() => setLightboxOpen(null)}
      />
    </>
  )
}
