import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { MediaItem } from '../data/resume'

interface Props {
  items: MediaItem[]
  openIndex: number | null
  onClose: () => void
}

export function Lightbox({ items, openIndex, onClose }: Props) {
  const [idx, setIdx] = useState(openIndex ?? 0)

  useEffect(() => {
    if (openIndex !== null) setIdx(openIndex)
  }, [openIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openIndex === null) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIdx((i) => Math.min(items.length - 1, i + 1))
      if (e.key === 'ArrowLeft') setIdx((i) => Math.max(0, i - 1))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openIndex, items.length, onClose])

  const open = openIndex !== null
  const current = open ? items[idx] : null

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur"
          onClick={onClose}
        >
          <button
            type="button"
            className="absolute right-5 top-5 rounded-full bg-white/85 p-2 text-white transition hover:bg-white/20"
            onClick={onClose}
            aria-label="关闭"
          >
            <X className="h-5 w-5" />
          </button>

          {idx > 0 && (
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-3 text-white transition hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                setIdx((i) => Math.max(0, i - 1))
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {idx < items.length - 1 && (
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-3 text-white transition hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                setIdx((i) => Math.min(items.length - 1, i + 1))
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative max-h-[88vh] max-w-[92vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === 'image' ? (
              <img
                src={current.src}
                alt={current.caption ?? ''}
                className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
              />
            ) : (
              <video
                src={current.src}
                poster={current.poster}
                controls
                autoPlay
                className="max-h-[88vh] max-w-[92vw] rounded-xl shadow-2xl"
              />
            )}
            {current.caption && (
              <div className="mt-3 text-center text-sm text-white/80">
                {current.caption}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
