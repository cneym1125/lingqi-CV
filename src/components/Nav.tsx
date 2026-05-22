import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const items = [
  { id: 'experience', label: '实习经历' },
  { id: 'projects', label: '项目经历' },
  { id: 'contact', label: '联系' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      let current = ''
      for (const it of items) {
        const el = document.getElementById(it.id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top < window.innerHeight * 0.4) current = it.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled
          ? 'border-b border-ink-100/70 bg-white/70 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-center px-6">
        <nav className="hidden items-center gap-1 md:flex">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={`relative rounded-full px-3 py-1.5 text-sm transition ${
                active === it.id
                  ? 'text-brand-blue'
                  : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              {active === it.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full bg-brand-blue-soft"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {it.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
