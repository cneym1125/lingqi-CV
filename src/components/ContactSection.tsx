import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react'
import { Section } from './Section'
import { profile } from '../data/resume'
import { openContactCard } from './ContactCard'

export function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="CONTACT"
      title="一起聊聊"
      description="如果你看到了这里,我们很可能会聊得来。"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue via-[#5B7CFF] to-brand-purple p-8 text-white shadow-soft-lg md:p-12"
      >
        <div className="aurora opacity-40" />
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h3 className="text-2xl font-semibold md:text-3xl">
              欢迎和我聊聊新机会、合作或开源协作
            </h3>
            <p className="mt-3 max-w-2xl text-white/80">
              我会在 24 小时内回复每一封邮件,期待你的故事。
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {profile.email}
              </span>
              {profile.phone && (
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {profile.phone}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={openContactCard}
            className="group inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-blue shadow-lg transition hover:bg-white/95 md:self-end"
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
