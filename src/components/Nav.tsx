import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/resume'

const items = [
  { id: 'experience', label: '实习经历' },
  { id: 'projects', label: '项目' },
  { id: 'skills', label: '技能' },
  { id: 'education', label: '教育' },
  { id: 'awards', label: '荣誉' },
  { id: 'about', label: '自我评价' },
  { id: 'contact', label: '联系' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      // 找到当前可见的 section
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
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-feishu-blue text-sm font-semibold text-white">
            {profile.name.slice(0, 1)}
          </div>
          <span className="text-sm font-semibold text-ink-900">
            {profile.name}
            <span className="ml-1 text-ink-300">的简历</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={`relative rounded-full px-3 py-1.5 text-sm transition ${
                active === it.id
                  ? 'text-feishu-blue'
                  : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              {active === it.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full bg-feishu-blue-soft"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {it.label}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full bg-feishu-blue px-3.5 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-feishu-blue-hover"
        >
          联系我
        </a>
      </div>
    </motion.header>
  )
}
