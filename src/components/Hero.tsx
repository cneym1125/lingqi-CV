import { motion } from 'framer-motion'
import { MapPin, Mail, Phone } from 'lucide-react'
import { profile } from '../data/resume'
import { openContactCard } from './ContactCard'
import { Spotlight } from './ui/Spotlight'
import { SplineScene } from './ui/SplineScene'

export function Hero() {
  return (
    <section className="relative pt-20 pb-10 md:pt-24 md:pb-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* 深色主卡片 */}
        <div className="relative w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-black/[0.96] shadow-soft-lg">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

          <div className="flex min-h-[480px] flex-col md:flex-row">
            {/* 左侧文字 */}
            <div className="relative z-10 flex flex-1 flex-col justify-center p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-neutral-400 backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  正在寻找合适的机会
                </div>

                <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                  {profile.name}
                </h1>
                {profile.enName && (
                  <span className="mt-1 block text-lg text-neutral-500">
                    {profile.enName}
                  </span>
                )}

                <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-300">
                  {profile.tagline}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-400">
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
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#experience"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200"
                  >
                    查看我的故事
                  </a>
                  <button
                    type="button"
                    onClick={openContactCard}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
                  >
                    <Mail className="h-4 w-4" />
                    联系我
                  </button>
                </div>
              </motion.div>
            </div>

            {/* 右侧 3D 场景 */}
            <div className="relative flex-1">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* 数据卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5"
        >
          {profile.highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-5 shadow-soft transition hover:shadow-soft-lg"
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
      </div>
    </section>
  )
}
