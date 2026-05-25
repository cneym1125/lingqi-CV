import { AnimatePresence, motion } from 'framer-motion'
import { Info, ExternalLink } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Props {
  name: string
  description: string
  href?: string
  logo?: string
}

export function InfoBadge({ name, description, href, logo }: Props) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | null>(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  const show = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setOpen(true)
  }
  const scheduleHide = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(false), 120)
  }

  return (
    <div
      ref={wrapRef}
      className="relative inline-flex items-center gap-1.5"
      onMouseEnter={show}
      onMouseLeave={scheduleHide}
    >
      {/* Logo（无边框） */}
      {logo && (
        <img src={logo} alt={name} className="h-5 w-auto select-none" />
      )}

      {/* 感叹号圆形按钮 */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${name} 介绍`}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-ink-100 text-ink-500 transition hover:bg-brand-blue hover:text-white"
      >
        <Info className="h-3 w-3" />
      </button>

      {/* 悬停卡片 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={show}
            onMouseLeave={scheduleHide}
            role="tooltip"
            className="fixed z-[200] w-72 rounded-2xl border border-ink-100 bg-white p-4 text-left shadow-soft-lg"
            style={{
              top: wrapRef.current
                ? wrapRef.current.getBoundingClientRect().bottom + 8
                : 0,
              left: wrapRef.current
                ? Math.min(
                    wrapRef.current.getBoundingClientRect().left,
                    window.innerWidth - 296
                  )
                : 0,
            }}
          >
            <div className="relative">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-ink-900">
                  {name}
                </span>
                {href && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs text-brand-blue transition hover:opacity-80"
                  >
                    访问官网
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <p className="text-xs leading-relaxed text-ink-500">
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
