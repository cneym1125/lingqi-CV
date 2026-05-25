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
  if (width <= 400) return 28
  if (width >= 800) return 56
  return 28 + (56 - 28) * ((width - 400) / 400)
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

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; touchEndX.current = e.touches[0].clientX }
  const onTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 80) {
      e.preventDefault()
      go(diff > 0 ? 1 : -1)
    }
    // 重置，防止误判
    touchStartX.current = 0
    touchEndX.current = 0
  }

  const handleImgClick = (index: number) => {
    // 如果发生了明显滑动，不触发放大
    const diff = Math.abs(touchStartX.current - touchEndX.current)
    if (diff > 10) return
    setLightboxOpen(index)
  }

  const gap = calculateGap(containerWidth)
  const stickUp = gap * 0.55
  // 固定高度让所有图片统一，3D 效果才能正常
  const fixedH = Math.round(containerWidth * 0.62)

  function getStyle(index: number): React.CSSProperties {
    const isActive = index === activeIndex
    const isLeft = (activeIndex - 1 + total) % total === index
    const isRight = (activeIndex + 1) % total === index
    const base = 'all 0.75s cubic-bezier(.4,2,.3,1)'
    if (isActive) return {
      zIndex: 3, opacity: 1, pointerEvents: 'auto',
      transform: 'translateX(0) translateY(0) scale(1) rotateY(0deg)',
      transition: base,
    }
    if (isLeft) return {
      zIndex: 2, opacity: 0.88, pointerEvents: 'auto',
      transform: `translateX(-${gap}px) translateY(-${stickUp}px) scale(0.84) rotateY(12deg)`,
      transition: base,
    }
    if (isRight) return {
      zIndex: 2, opacity: 0.88, pointerEvents: 'auto',
      transform: `translateX(${gap}px) translateY(-${stickUp}px) scale(0.84) rotateY(-12deg)`,
      transition: base,
    }
    return { zIndex: 1, opacity: 0, pointerEvents: 'none', transition: base }
  }

  const lightboxItems = useMemo(
    () => slides.map((s) => ({ type: 'image' as const, src: s.src, caption: s.caption })),
    [slides]
  )

  if (total === 0) return null

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ perspective: '1000px', height: fixedH + stickUp + 8 }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, index) => (
          <img
            key={slide.src + index}
            src={slide.src}
            alt={slide.caption ?? ''}
            onClick={() => handleImgClick(index)}
            className="absolute inset-0 w-full rounded-2xl"
            style={{
              ...getStyle(index),
              height: fixedH,
              objectFit: 'contain',
              background: '#f5f6f7',
              cursor: 'zoom-in',
              boxShadow: index === activeIndex
                ? '0 8px 28px rgba(0,0,0,0.18)'
                : '0 4px 12px rgba(0,0,0,0.12)',
            }}
            loading="lazy"
            draggable={false}
          />
        ))}

        {slides[activeIndex].caption && (
          <div
            className="absolute inset-x-0 z-10 text-center text-xs text-ink-400"
            style={{ top: fixedH + 6 }}
          >
            {slides[activeIndex].caption}
          </div>
        )}
      </div>

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
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIndex ? 'w-5 bg-ink-700' : 'w-1.5 bg-ink-200'
                }`}
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
