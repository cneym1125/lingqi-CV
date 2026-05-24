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
    if (isActive) return {
      zIndex: 3, opacity: 1, pointerEvents: 'auto',
      transform: 'translateX(0) translateY(0) scale(1) rotateY(0deg)',
      transition: 'all 0.75s cubic-bezier(.4,2,.3,1)',
    }
    return { zIndex: 1, opacity: 0, pointerEvents: 'none', transition: 'all 0.75s cubic-bezier(.4,2,.3,1)' }
  }

  function getSideStyle(side: 'left' | 'right'): React.CSSProperties {
    const x = side === 'left' ? -gap : gap
    const ry = side === 'left' ? 12 : -12
    return {
      zIndex: 2, opacity: 0.9, pointerEvents: 'auto',
      transform: `translateX(${x}px) translateY(-${stickUp}px) scale(0.85) rotateY(${ry}deg)`,
      transition: 'all 0.75s cubic-bezier(.4,2,.3,1)',
    }
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
        style={{ perspective: '1000px' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* active 图片 — 正常流，撑开容器高度 */}
        <div style={getStyle(activeIndex)}>
          <img
            src={slides[activeIndex].src}
            alt={slides[activeIndex].caption ?? ''}
            onClick={() => setLightboxOpen(activeIndex)}
            className="w-full cursor-zoom-in"
            style={{
              display: 'block',
              height: 'auto',
              borderRadius: '14px',
              border: '3px solid #1F2329',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* 左侧图片 — absolute，3D 偏移 */}
        {total > 1 && (() => {
          const li = (activeIndex - 1 + total) % total
          return (
            <div
              style={{ ...getSideStyle('left'), position: 'absolute', top: 0, left: 0, width: '100%' }}
              onClick={() => go(-1)}
            >
              <img
                src={slides[li].src}
                alt={slides[li].caption ?? ''}
                className="w-full cursor-pointer"
                style={{
                  display: 'block',
                  height: 'auto',
                  borderRadius: '14px',
                  border: '3px solid #1F2329',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                loading="lazy"
                draggable={false}
              />
            </div>
          )
        })()}

        {/* 右侧图片 — absolute，3D 偏移 */}
        {total > 1 && (() => {
          const ri = (activeIndex + 1) % total
          return (
            <div
              style={{ ...getSideStyle('right'), position: 'absolute', top: 0, left: 0, width: '100%' }}
              onClick={() => go(1)}
            >
              <img
                src={slides[ri].src}
                alt={slides[ri].caption ?? ''}
                className="w-full cursor-pointer"
                style={{
                  display: 'block',
                  height: 'auto',
                  borderRadius: '14px',
                  border: '3px solid #1F2329',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                loading="lazy"
                draggable={false}
              />
            </div>
          )
        })()}

        {/* caption */}
        {slides[activeIndex].caption && (
          <div className="mt-2 text-center text-xs text-ink-400">
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
