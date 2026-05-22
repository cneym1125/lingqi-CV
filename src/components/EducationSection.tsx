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
            className="rounded-3xl border border-white/[0.06] bg-[#141416] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]-lg"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-[#141416]">
                {e.logo ? (
                  <img src={e.logo} alt="" className="h-full w-full" />
                ) : (
                  <GraduationCap className="h-6 w-6 text-neutral-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-neutral-100">
                    {e.school}
                  </h3>
                  <span className="text-sm text-neutral-500">{e.period}</span>
                </div>
                <div className="mt-1 text-sm text-neutral-400">
                  {e.degree} · {e.major}
                </div>
                {e.detail && (
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-300">
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
