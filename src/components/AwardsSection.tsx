import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { Section } from './Section'
import { awards } from '../data/resume'
import { RichText } from './RichText'
import { ProofList } from './ProofList'

export function AwardsSection() {
  return (
    <Section
      id="awards"
      eyebrow="AWARDS"
      title="荣誉与证书"
      description="点击证明材料可放大查看,真实可核验。"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {awards.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-white/[0.06] bg-[#141416] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]-lg"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-tr from-amber-200 to-amber-400 text-white">
                <Trophy className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-neutral-100">{a.title}</h3>
                  <span className="text-xs text-neutral-500">{a.date}</span>
                </div>
                <div className="text-sm text-neutral-400">{a.issuer}</div>
                {a.description && (
                  <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                    <RichText paragraph={a.description} />
                  </p>
                )}
                <ProofList proofs={a.proof ? [a.proof] : undefined} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
