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

  // 点外部关闭（鼠标和触摸都支持）
  useEffect(() => {
    if (!open) return
    const onOutside = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('touchstart', onOutside)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('touchstart', onOutside)
    }
  }, [open])

  // 桌面 hover 逻辑
  const show = () => {
    if (closeTimer.current) { window.clearTimeout(closeTimer.current); closeTimer.current = null }
    setOpen(true)
  }
  const scheduleHide = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(false), 150)
  }

  // 按钮点击：直接 toggle，清除 hide 定时器
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (closeTimer.current) { window.clearTimeout(closeTimer.current); closeTimer.current = null }
    setOpen((v) => !v)
  }

  // tooltip 位置
  const getTooltipStyle = (): React.CSSProperties => {
    if (!wrapRef.current) return { top: 0, left: 0 }
    const rect = wrapRef.current.getBoundingClientRect()
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - 296))
    return { top: rect.bottom + 8, left }
  }

  return (
    <div
      ref={wrapRef}
      className="relative inline-flex items-center gap-1.5"
      onMouseEnter={(e) => {
        // 只在鼠标设备上响应 hover（排除触摸设备的 mouseover 模拟）
        if (e.nativeEvent instanceof MouseEvent && !('ontouchstart' in window)) show()
      }}
      onMouseLeave={() => {
        if (!('ontouchstart' in window)) scheduleHide()
      }}
    >
      {logo && (
        <img src={logo} alt={name} className="h-5 w-auto select-none" />
      )}

      <button
        type="button"
        onClick={handleClick}
        aria-expanded={open}
        aria-label={`${name} 介绍`}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-100 text-ink-500 transition hover:bg-brand-blue hover:text-white active:bg-brand-blue active:text-white"
      >
        <Info className="h-3.5 w-3.5" />
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
            className="fixed z-[200] w-72 rounded-2xl border border-ink-100 bg-white p-4 text-left shadow-soft-lg"
            style={getTooltipStyle()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-ink-900">{name}</span>
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-brand-blue transition hover:opacity-80"
                >
                  访问官网
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <p className="text-xs leading-relaxed text-ink-500">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
