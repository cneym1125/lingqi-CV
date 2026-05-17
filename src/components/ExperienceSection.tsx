import { motion } from 'framer-motion'
import { Section } from './Section'
import { experiences } from '../data/resume'
import { RichText } from './RichText'
import { MediaGallery } from './MediaGallery'
import { ProofList } from './ProofList'
import { Tag } from './Tag'
import { InfoBadge } from './InfoBadge'

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="WORK EXPERIENCE"
      title="工作经历"
      description="一段段真实而具体的故事,比一句句简历套话更有说服力。"
    >
      <div className="relative">
        {/* 时间线主轴 */}
        <div className="absolute left-3 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-brand-blue/40 via-ink-100 to-transparent md:left-4" />
        <div className="space-y-10">
          {experiences.map((e, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative pl-10 md:pl-14"
            >
              {/* 节点 */}
              <div className="absolute left-0 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-brand-blue shadow-soft md:left-1">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
              <div className="glass-card rounded-3xl p-6 shadow-soft transition hover:shadow-soft-lg md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {e.logo && (
                      <div className="h-12 w-12 overflow-hidden rounded-xl border border-ink-100 bg-white">
                        <img src={e.logo} alt="" className="h-full w-full" />
                      </div>
                    )}
                    <div>
                      <div className="text-xl font-semibold text-ink-900">
                        {e.role}
                      </div>
                      <div className="text-sm text-ink-500">
                        {e.company}
                        {e.location && (
                          <span className="ml-2 text-ink-300">· {e.location}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {e.product && (
                      <InfoBadge
                        name={e.product.name}
                        description={e.product.description}
                        href={e.product.href}
                      />
                    )}
                    <div className="rounded-full bg-brand-blue-soft px-3 py-1 text-xs font-medium text-brand-blue">
                      {e.period}
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-base leading-relaxed text-ink-700">
                  <RichText paragraph={e.summary} />
                </p>

                <ul className="mt-4 space-y-2.5">
                  {e.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-[15px] leading-relaxed text-ink-700"
                    >
                      <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-blue" />
                      <span>
                        <RichText paragraph={b} />
                      </span>
                    </li>
                  ))}
                </ul>

                {e.tags && e.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                )}

                {e.media && e.media.length > 0 && (
                  <div className="mt-6">
                    <MediaGallery items={e.media} />
                  </div>
                )}

                <ProofList proofs={e.proofs} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  )
}
