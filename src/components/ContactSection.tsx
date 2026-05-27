import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Section } from './Section'
import { openContactCard } from './ContactCard'
import { Spotlight } from './ui/Spotlight'
import { MouseSpotlight } from './ui/MouseSpotlight'

export function ContactSection() {
  return (
    <Section id="contact" title="欢迎联系">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-black/[0.96] p-8 text-white shadow-soft-lg md:p-12"
      >
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        <MouseSpotlight size={200} />

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="text-2xl font-semibold md:text-3xl">
              期待与您进一步沟通！
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 self-start md:self-center">
            <button
              type="button"
              onClick={openContactCard}
              className="group inline-flex w-44 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg transition hover:bg-neutral-200"
            >
              查看联系方式
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            <a
              href="/resume.pdf"
              download="lingqi 李哲 简历.pdf"
              className="group inline-flex w-44 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg transition hover:bg-neutral-200"
            >
              下载简历
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
