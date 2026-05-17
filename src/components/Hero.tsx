import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MapPin, Mail, Phone, ExternalLink } from 'lucide-react'
import { useRef } from 'react'
import { profile } from '../data/resume'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32"
    >
      <div className="aurora" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid-fade"
      />
      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-6xl px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-100 bg-white/70 px-4 py-1.5 text-sm text-ink-500 shadow-sm backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-feishu-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-feishu-green" />
          </span>
          <span>正在寻找合适的机会</span>
          <span className="text-ink-200">·</span>
          <span>{profile.location}</span>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="text-5xl font-semibold tracking-tight text-ink-900 md:text-7xl"
            >
              你好,我是 <span className="text-gradient">{profile.name}</span>
              {profile.enName && (
                <span className="block pt-2 text-2xl font-normal text-ink-300 md:text-3xl">
                  {profile.enName}
                </span>
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-5 text-xl font-medium text-ink-700 md:text-2xl"
            >
              {profile.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500 md:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#experience"
                className="group inline-flex items-center gap-2 rounded-full bg-feishu-blue px-5 py-2.5 text-sm font-medium text-white shadow-feishu transition hover:bg-feishu-blue-hover hover:shadow-feishu-lg"
              >
                查看我的故事
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-white/80 px-5 py-2.5 text-sm font-medium text-ink-700 backdrop-blur transition hover:border-feishu-blue hover:text-feishu-blue"
              >
                <Mail className="h-4 w-4" />
                联系我
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                {profile.email}
              </span>
              {profile.phone && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-4 w-4" />
                  {profile.phone}
                </span>
              )}
              {profile.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-feishu-blue transition hover:opacity-80"
                >
                  {l.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </motion.div>

            {profile.meta && profile.meta.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-4 flex flex-wrap gap-2"
              >
                {profile.meta.map((m) => (
                  <span
                    key={m.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-white/70 px-3 py-1 text-xs text-ink-500 backdrop-blur"
                  >
                    <span className="text-ink-300">{m.label}</span>
                    <span className="font-medium text-ink-700">{m.value}</span>
                  </span>
                ))}
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto"
          >
            <div className="relative h-44 w-44 md:h-56 md:w-56">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-feishu-blue via-feishu-purple to-pink-400 opacity-40 blur-2xl" />
              <div className="relative flex h-full w-full animate-floaty items-center justify-center overflow-hidden rounded-3xl border border-white/60 bg-white shadow-feishu-lg">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* 数据卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-16 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-5"
        >
          {profile.highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-5 shadow-feishu transition hover:shadow-feishu-lg"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-ink-900 md:text-4xl">
                  {h.value}
                </span>
                {h.suffix && (
                  <span className="text-base font-medium text-ink-500">
                    {h.suffix}
                  </span>
                )}
              </div>
              <div className="mt-1 text-sm text-ink-500">{h.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
