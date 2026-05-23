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

  // 3D 变换 — 只有 active 图片参与布局流，左右图片 absolute 叠在上面
  const gap = Math.min(containerWidth * 0.14, 70)
  const stickUp = gap * 0.65

  function getSideStyle(side: 'left' | 'right'): React.CSSProperties {
    const x = side === 'left' ? -gap : gap
    const ry = side === 'left' ? 12 : -12
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 2,
      opacity: 0.85,
      pointerEvents: 'auto',
      transform: `translateX(${x}px) translateY(-${stickUp}px) scale(0.82) rotateY(${ry}deg)`,
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    }
  }

  const activeStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 3,
    opacity: 1,
    transform: 'translateX(0) translateY(0) scale(1) rotateY(0deg)',
    transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
  }

  const hiddenStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
    opacity: 0,
    pointerEvents: 'none',
    transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
  }

  const lightboxItems = useMemo(
    () => slides.map((s) => ({ type: 'image' as const, src: s.src, caption: s.caption })),
    [slides]
  )

  if (total === 0) return null

  const leftIdx = (activeIndex - 1 + total) % total
  const rightIdx = (activeIndex + 1) % total

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
        {/* active 图片撑开容器高度 */}
        <img
          key={`active-${activeIndex}`}
          src={slides[activeIndex].src}
          alt={slides[activeIndex].caption ?? ''}
          onClick={() => setLightboxOpen(activeIndex)}
          className="w-full cursor-pointer rounded-xl shadow-lg"
          style={{ ...activeStyle, display: 'block', height: 'auto' }}
          loading="lazy"
          draggable={false}
        />

        {/* 左侧图片 */}
        {total > 1 && (
          <img
            key={`left-${leftIdx}`}
            src={slides[leftIdx].src}
            alt={slides[leftIdx].caption ?? ''}
            onClick={() => go(-1)}
            className="w-full cursor-pointer rounded-xl shadow-md"
            style={{ ...getSideStyle('left'), height: 'auto' }}
            loading="lazy"
            draggable={false}
          />
        )}

        {/* 右侧图片 */}
        {total > 1 && (
          <img
            key={`right-${rightIdx}`}
            src={slides[rightIdx].src}
            alt={slides[rightIdx].caption ?? ''}
            onClick={() => go(1)}
            className="w-full cursor-pointer rounded-xl shadow-md"
            style={{ ...getSideStyle('right'), height: 'auto' }}
            loading="lazy"
            draggable={false}
          />
        )}

        {/* caption */}
        {slides[activeIndex].caption && (
          <div className="absolute bottom-0 inset-x-0 z-10 bg-gradient-to-t from-black/50 to-transparent px-4 py-3 text-xs text-white/90 rounded-b-xl">
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
