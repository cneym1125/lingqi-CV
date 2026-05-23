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
  className?: string
}

function calculateGap(width: number) {
  const minWidth = 600
  const maxWidth = 1200
  const minGap = 45
  const maxGap = 80
  if (width <= minWidth) return minGap
  if (width >= maxWidth) return maxGap
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
}

export function Carousel({ slides, autoplay = true, className = '' }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverPrev, setHoverPrev] = useState(false)
  const [hoverNext, setHoverNext] = useState(false)
  const [containerWidth, setContainerWidth] = useState(800)
  const [lightboxOpen, setLightboxOpen] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const total = slides.length

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
    if (!autoplay || total <= 1) return
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 5000)
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [autoplay, total])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total)
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }, [total])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }, [total])

  // 触摸滑动
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }
  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext()
      else handlePrev()
    }
  }

  // 3D 变换
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth)
    const maxStickUp = gap * 0.7

    const isActive = index === activeIndex
    const isLeft = (activeIndex - 1 + total) % total === index
    const isRight = (activeIndex + 1) % total === index

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: 'auto',
        transform: 'translateX(0px) translateY(0px) scale(1) rotateY(0deg)',
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      }
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.82) rotateY(14deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      }
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.82) rotateY(-14deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      }
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    }
  }

  const lightboxItems = useMemo(
    () => slides.map((s) => ({ type: 'image' as const, src: s.src, caption: s.caption })),
    [slides]
  )

  if (total === 0) return null

  return (
    <>
      <div className={`relative flex h-full w-full flex-col ${className}`}>
        {/* 3D 图片容器 */}
        <div
          ref={containerRef}
          className="relative mx-auto w-full flex-1"
          style={{ perspective: '1000px' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((slide, index) => (
            <img
              key={slide.src + index}
              src={slide.src}
              alt={slide.caption ?? ''}
              onClick={() => setLightboxOpen(index)}
              className="absolute inset-0 h-full w-full cursor-pointer rounded-2xl object-contain shadow-lg"
              style={{ ...getImageStyle(index), background: '#f5f6f7', padding: '4px' }}
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>

        {/* 箭头按钮 */}
        {total > 1 && (
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="上一张"
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors"
              style={{ backgroundColor: hoverPrev ? '#3370FF' : '#1F2329' }}
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="下一张"
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors"
              style={{ backgroundColor: hoverNext ? '#3370FF' : '#1F2329' }}
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </button>
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
