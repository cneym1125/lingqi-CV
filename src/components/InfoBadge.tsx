import { AnimatePresence, motion } from 'framer-motion'
import { Info, ExternalLink } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Props {
  name: string
  description: string
  href?: string
  /** 若提供则徽章只显示 logo;否则显示文字 + ⓘ 图标 */
  logo?: string
}

/** 紧凑徽章 + 鼠标悬停 / 点击展开的信息卡片(支持移动端) */
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
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={scheduleHide}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${name} 介绍`}
        className={
          logo
            ? 'group inline-flex h-7 items-center justify-center rounded-lg border border-ink-100 bg-white px-2.5 transition hover:border-brand-blue/40 hover:shadow-soft'
            : 'group inline-flex items-center gap-1 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-2.5 py-1 text-xs font-medium text-brand-blue transition hover:border-brand-blue/40 hover:bg-brand-blue/10'
        }
      >
        {logo ? (
          <img src={logo} alt={name} className="h-4 w-auto select-none" />
        ) : (
          <>
            <span>{name}</span>
            <Info className="h-3.5 w-3.5 opacity-70 transition group-hover:opacity-100" />
          </>
        )}
      </button>

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
            className="absolute left-1/2 top-full z-30 mt-2 w-72 -translate-x-1/2 rounded-2xl border border-ink-100 bg-white p-4 text-left shadow-soft-lg"
          >
            <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-ink-100 bg-white" />
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
