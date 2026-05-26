import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { profile } from '../data/resume'
import { openContactCard } from './ContactCard'
import { Spotlight } from './ui/Spotlight'
import { SplineScene } from './ui/SplineScene'
import { MouseSpotlight } from './ui/MouseSpotlight'

export function Hero() {
  return (
    <section className="relative pb-10 pt-20 md:pb-16 md:pt-24 -mb-4">
      <div className="mx-auto max-w-6xl px-6">
        {/* 深色主卡片 */}
        <div className="relative w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-black/[0.96] shadow-soft-lg">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
          <MouseSpotlight size={200} />

          <div className="flex min-h-[420px] flex-col md:flex-row">
            {/* 左侧文字 */}
            <div className="relative z-10 flex flex-1 flex-col justify-center p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                  Hi，我是{profile.name}
                </h1>
                {profile.enName && (
                  <span className="mt-1 block text-lg text-neutral-500">
                    {profile.enName}
                  </span>
                )}

                <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-300">
                  {profile.tagline}
                </p>

                <div className="mt-6 space-y-1 text-sm text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span>2026 应届生</span>
                    <span className="text-xs text-neutral-400">ENTJ</span>
                  </div>
                  <div>意向工作：产品 / AI 解决方案 / 产品运营等一切可 AI 赋能岗位</div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
                  >
                    查看简介
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

            {/* 右侧 3D 机器人 */}
            <div className="relative flex-1">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
