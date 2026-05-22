import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Section } from './Section'
import { openContactCard } from './ContactCard'
import { Spotlight } from './ui/Spotlight'

export function ContactSection() {
  return (
    <Section id="contact" title="欢迎沟通">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-black/[0.96] p-8 text-white shadow-soft-lg md:p-12"
      >
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="text-2xl font-semibold md:text-3xl">
              欢迎和我聊聊新机会、合作或开源协作
            </h3>
            <p className="mt-3 max-w-2xl text-neutral-400">
              我会在 24 小时内回复每一封邮件,期待你的故事。
            </p>
          </div>
          <button
            type="button"
            onClick={openContactCard}
            className="group inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg transition hover:bg-neutral-200 md:self-center"
          >
            查看联系方式
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.div>

      <footer className="mt-10 flex items-center justify-end text-sm text-ink-300">
        <a
          href="#top"
          className="text-ink-300 transition hover:text-brand-blue"
        >
          回到顶部 ↑
        </a>
      </footer>
    </Section>
  )
}
