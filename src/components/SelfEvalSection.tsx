import { motion } from 'framer-motion'
import { Sparkles, Target, ShieldCheck, Rocket } from 'lucide-react'
import { Section } from './Section'
import { selfEvaluation } from '../data/resume'
import { RichText } from './RichText'

const iconMap = {
  sparkles: Sparkles,
  target: Target,
  shield: ShieldCheck,
  rocket: Rocket,
}

export function SelfEvalSection() {
  return (
    <Section
      id="about"
      eyebrow="ABOUT ME"
      title="自我评价"
      description="四个关键词,定义我的工作方式。"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {selfEvaluation.map((item, i) => {
          const Icon = iconMap[item.icon]
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-6 shadow-soft transition hover:shadow-soft-lg"
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 blur-2xl transition group-hover:scale-110"
              />
              <div className="relative flex items-start gap-4">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple text-white shadow-soft">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                    <RichText paragraph={item.content} />
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
