import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useState } from 'react'
import type { MediaItem } from '../data/resume'
import { Lightbox } from './Lightbox'

export function MediaGallery({ items }: { items: MediaItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  if (!items?.length) return null
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((m, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141416] text-left shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]-lg"
          >
            <div className="relative aspect-video overflow-hidden bg-white/[0.04]">
              <img
                src={m.type === 'video' ? m.poster ?? m.src : m.src}
                alt={m.caption ?? ''}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {m.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#141416]/90 text-brand-blue shadow-[0_4px_12px_rgba(0,0,0,0.4)]-lg transition group-hover:scale-110">
                    <Play className="ml-0.5 h-6 w-6 fill-current" />
                  </span>
                </div>
              )}
            </div>
            {m.caption && (
              <div className="px-4 py-3 text-sm text-neutral-400">{m.caption}</div>
            )}
          </motion.button>
        ))}
      </div>
      <Lightbox
        items={items}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
      />
    </>
  )
}
