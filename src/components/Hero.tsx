import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail } from 'lucide-react'
import { useRef } from 'react'
import { profile } from '../data/resume'
import { openContactCard } from './ContactCard'
import { MouseSpotlight } from './ui/MouseSpotlight'

export function Hero() {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section className="mx-4 mt-6 mb-0 overflow-hidden rounded-3xl">
      <div
        ref={container}
        className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-black"
        style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
      >
        {/* 视差背景图 */}
        <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
          <motion.div className="relative h-full w-full" style={{ y }}>
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
              alt="hero background"
              className="h-full w-full object-cover opacity-60"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* 鼠标光晕 */}
        <MouseSpotlight size={250} />

        {/* 文字内容 — mix-blend-difference 反色效果 */}
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 md:p-16 lg:p-20 text-white mix-blend-difference min-h-[85vh]">
          {/* 右上角标签 */}
          <div className="flex justify-end">
            <span className="text-sm uppercase tracking-widest opacity-70">
              {profile.location} · {profile.title}
            </span>
          </div>

          {/* 中间主标题 */}
          <div className="flex flex-col gap-2">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[12vw] font-bold uppercase leading-none tracking-tight md:text-[8vw]"
            >
              {profile.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-[3.5vw] uppercase tracking-wide opacity-80 md:text-[2vw]"
            >
              {profile.enName}
            </motion.p>
          </div>

          {/* 底部信息 */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="max-w-md"
            >
              <p className="text-sm uppercase tracking-wide opacity-70 mb-2">
                2026 应届生 · ENTJ
              </p>
              <p className="text-base leading-relaxed opacity-90">
                {profile.tagline}
              </p>
              <p className="mt-1 text-sm opacity-60">
                意向：产品 / AI 解决方案 / 产品运营等一切可 AI 赋能岗位
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-current px-5 py-2.5 text-sm font-medium transition hover:bg-white hover:text-black"
              >
                查看简介
              </a>
              <button
                type="button"
                onClick={openContactCard}
                className="inline-flex items-center gap-2 rounded-full border border-current px-5 py-2.5 text-sm font-medium transition hover:bg-white hover:text-black"
              >
                <Mail className="h-4 w-4" />
                联系我
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
