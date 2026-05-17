import { motion } from 'framer-motion'
import { Section } from './Section'
import { skills } from '../data/resume'

export function SkillsSection() {
  return (
    <Section
      id="skills"
      eyebrow="SKILLS"
      title="技能图谱"
      description="不堆砌名词,而是按场景把武器分门别类。"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {skills.map((g, i) => (
          <motion.div
            key={g.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="rounded-3xl border border-ink-100 bg-white p-6 shadow-feishu transition hover:shadow-feishu-lg"
          >
            <h3 className="text-lg font-semibold text-ink-900">{g.name}</h3>
            <div className="mt-5 space-y-4">
              {g.skills.map((s, j) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between text-sm text-ink-700">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-ink-300">{s.level}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-50">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.1 + j * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-feishu-blue via-feishu-purple to-pink-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
