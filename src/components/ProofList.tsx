import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, ExternalLink, FileText, X } from 'lucide-react'
import { useState } from 'react'
import type { Proof } from '../data/resume'

export function ProofList({ proofs }: { proofs?: Proof[] }) {
  const [active, setActive] = useState<Proof | null>(null)
  if (!proofs?.length) return null
  return (
    <>
      <div className="mt-5 flex items-center gap-2 text-xs font-medium text-neutral-400">
        <ShieldCheck className="h-4 w-4 text-brand-green" />
        <span>证明材料</span>
        <span className="text-neutral-600">·</span>
        <span className="text-neutral-500">{proofs.length} 项</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        {proofs.map((p, i) => (
          <motion.button
            key={i}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -2 }}
            onClick={() => {
              if (p.type === 'link') {
                window.open(p.src, '_blank')
              } else {
                setActive(p)
              }
            }}
            className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#141416] px-3 py-2.5 text-left shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition hover:border-brand-blue/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]-lg"
          >
            <div className="h-10 w-10 overflow-hidden rounded-lg bg-white/[0.04]">
              {p.thumbnail ? (
                <img
                  src={p.thumbnail}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-neutral-500">
                  <FileText className="h-5 w-5" />
                </div>
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-neutral-100 group-hover:text-brand-blue">
                {p.title}
              </div>
              {p.description && (
                <div className="text-xs text-neutral-400">{p.description}</div>
              )}
            </div>
            {p.type === 'link' && (
              <ExternalLink className="ml-1 h-4 w-4 text-neutral-500" />
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur"
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 rounded-full bg-[#141416]/10 p-2 text-white transition hover:bg-[#141416]/20"
              onClick={() => setActive(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="max-h-[88vh] max-w-[92vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.src}
                alt={active.title}
                className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
              />
              <div className="mt-3 text-center text-sm text-white/80">
                {active.title}
                {active.description ? ` · ${active.description}` : ''}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
