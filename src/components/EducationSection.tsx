import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { Section } from './Section'
import { education } from '../data/resume'
import { RichText } from './RichText'
import { ProofList } from './ProofList'

export function EducationSection() {
  return (
    <Section
      id="education"
      eyebrow="EDUCATION"
      title="教育背景"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="rounded-3xl border border-ink-100 bg-white p-6 shadow-feishu transition hover:shadow-feishu-lg"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-xl border border-ink-100 bg-white">
                {e.logo ? (
                  <img src={e.logo} alt="" className="h-full w-full" />
                ) : (
                  <GraduationCap className="h-6 w-6 text-ink-300" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-ink-900">
                    {e.school}
                  </h3>
                  <span className="text-sm text-ink-300">{e.period}</span>
                </div>
                <div className="mt-1 text-sm text-ink-500">
                  {e.degree} · {e.major}
                </div>
                {e.detail && (
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
                    <RichText paragraph={e.detail} />
                  </p>
                )}
                <ProofList proofs={e.proofs} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
