import { useState } from 'react'
import { Lightbox } from './Lightbox'

interface Slide {
  src: string
  caption?: string
}

interface Props {
  slides: Slide[]
  autoplay?: boolean
}

export function Carousel({ slides }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState<number | null>(null)

  if (!slides || slides.length === 0) return null

  const lightboxItems = slides.map((s) => ({
    type: 'image' as const,
    src: s.src,
    caption: s.caption,
  }))

  // 瀑布流：奇数张单列居中，偶数张两列
  const isSingle = slides.length === 1
  const isOdd = slides.length % 2 !== 0

  return (
    <>
      <div className="mt-4 w-full">
        {isSingle ? (
          // 单张：居中显示
          <div
            className="mx-auto cursor-zoom-in overflow-hidden rounded-xl border-2 border-ink-900 shadow-md transition hover:shadow-lg"
            style={{ maxWidth: '80%' }}
            onClick={() => setLightboxOpen(0)}
          >
            <img
              src={slides[0].src}
              alt={slides[0].caption ?? ''}
              className="w-full"
              style={{ display: 'block', height: 'auto' }}
              loading="lazy"
            />
            {slides[0].caption && (
              <div className="px-3 py-2 text-center text-xs text-ink-500">
                {slides[0].caption}
              </div>
            )}
          </div>
        ) : (
          // 两列瀑布流
          <div className="grid grid-cols-2 gap-3">
            {slides.map((slide, i) => {
              // 最后一张如果是奇数总数，跨两列居中
              const isLastOdd = isOdd && i === slides.length - 1
              return (
                <div
                  key={i}
                  className={`cursor-zoom-in overflow-hidden rounded-xl border-2 border-ink-900 shadow-md transition hover:shadow-lg hover:-translate-y-0.5 ${
                    isLastOdd ? 'col-span-2 mx-auto w-1/2' : ''
                  }`}
                  onClick={() => setLightboxOpen(i)}
                >
                  <img
                    src={slide.src}
                    alt={slide.caption ?? ''}
                    className="w-full"
                    style={{ display: 'block', height: 'auto' }}
                    loading="lazy"
                  />
                  {slide.caption && (
                    <div className="px-3 py-2 text-center text-xs text-ink-500">
                      {slide.caption}
                    </div>
                  )}
                </div>
              )
            })}
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
